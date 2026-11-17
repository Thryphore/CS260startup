import { readFileSync } from 'node:fs';
import { MongoClient } from 'mongodb';
import defaultSkips from './defaultSkips.js';

const config = readConfig();

let userCollection;
let skipCollection;
let voteCollection;

function readConfigFile() {
  try {
    return JSON.parse(readFileSync(new URL('./dbConfig.json', import.meta.url), 'utf8'));
  } catch {
    return null;
  }
}

function readConfig() {
  const file = readConfigFile();
  return {
    hostname: process.env.MONGO_HOSTNAME || file?.hostname,
    userName: process.env.MONGO_USERNAME || file?.userName,
    password: process.env.MONGO_PASSWORD || file?.password,
  };
}

export async function connectDatabase() {
  if (!config.hostname || !config.userName || !config.password) {
    throw new Error(
      'Missing MongoDB credentials. Set MONGO_HOSTNAME, MONGO_USERNAME, and MONGO_PASSWORD, or copy service/dbConfig.example.json to service/dbConfig.json.'
    );
  }

  const url = `mongodb+srv://${encodeURIComponent(config.userName)}:${encodeURIComponent(config.password)}@${config.hostname}`;
  const client = new MongoClient(url);
  await client.connect();

  const db = client.db('startup');
  await db.command({ ping: 1 });

  userCollection = db.collection('user');
  skipCollection = db.collection('skip');
  voteCollection = db.collection('vote');

  await userCollection.createIndex({ email: 1 }, { unique: true });
  await skipCollection.createIndex({ id: 1 }, { unique: true });
  await voteCollection.createIndex({ email: 1, skipId: 1 }, { unique: true });

  if ((await skipCollection.countDocuments()) === 0) {
    await skipCollection.insertMany(defaultSkips.map((skip) => ({ ...skip })));
  }

  console.log(`Connected to database at ${config.hostname}`);
  return db;
}

function requireCollections() {
  if (!userCollection || !skipCollection || !voteCollection) {
    throw new Error('Database is not connected yet.');
  }
}

export async function addUser(user) {
  requireCollections();
  await userCollection.insertOne(user);
}

export function getUserByEmail(email) {
  requireCollections();
  return userCollection.findOne({ email });
}

export function getUserByToken(token) {
  requireCollections();
  if (!token) return null;
  return userCollection.findOne({ token });
}

export async function updateUserToken(email, token) {
  requireCollections();
  await userCollection.updateOne({ email }, { $set: { token } });
}

export async function removeUserToken(email) {
  requireCollections();
  await userCollection.updateOne({ email }, { $unset: { token: '' } });
}

export function getSkips() {
  requireCollections();
  return skipCollection.find({}, { projection: { _id: 0 } }).sort({ votes: -1, title: 1 }).toArray();
}

export async function addSkip(skip) {
  requireCollections();
  await skipCollection.insertOne(skip);
}

export function getSkipById(id) {
  requireCollections();
  return skipCollection.findOne({ id });
}

export async function addVote(email, skipId) {
  requireCollections();
  try {
    await voteCollection.insertOne({ email, skipId });
  } catch (ex) {
    if (ex.code === 11000) return false;
    throw ex;
  }
  await skipCollection.updateOne({ id: skipId }, { $inc: { votes: 1 } });
  return true;
}
