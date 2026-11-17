import { readFileSync } from 'node:fs';
import { MongoClient } from 'mongodb';
import defaultSkips from './defaultSkips.js';

const config = readConfig();

let client;

export let userCollection;
export let skipCollection;
export let voteCollection;

function readConfig() {
  try {
    return JSON.parse(readFileSync(new URL('./dbConfig.json', import.meta.url), 'utf8'));
  } catch {
    return null;
  }
}

export async function connectDatabase() {
  if (!config?.hostname || !config.userName || !config.password) {
    throw new Error(
      'Missing service/dbConfig.json. Copy service/dbConfig.example.json and add your MongoDB Atlas hostname, username, and password.'
    );
  }

  const url = `mongodb+srv://${encodeURIComponent(config.userName)}:${encodeURIComponent(config.password)}@${config.hostname}`;
  client = new MongoClient(url);
  await client.connect();

  const db = client.db('startup');
  await db.command({ ping: 1 });

  userCollection = db.collection('user');
  skipCollection = db.collection('skip');
  voteCollection = db.collection('vote');

  await userCollection.createIndex({ email: 1 }, { unique: true });
  await voteCollection.createIndex({ email: 1, skipId: 1 }, { unique: true });

  if ((await skipCollection.countDocuments()) === 0) {
    await skipCollection.insertMany(defaultSkips.map((skip) => ({ ...skip })));
  }

  console.log(`Connected to database at ${config.hostname}`);
  return db;
}

export async function addUser(user) {
  await userCollection.insertOne(user);
}

export function getUserByEmail(email) {
  return userCollection.findOne({ email });
}

export function getUserByToken(token) {
  if (!token) return null;
  return userCollection.findOne({ token });
}

export async function updateUserToken(email, token) {
  await userCollection.updateOne({ email }, { $set: { token } });
}

export async function removeUserToken(email) {
  await userCollection.updateOne({ email }, { $unset: { token: '' } });
}

export function getSkips() {
  return skipCollection.find({}, { projection: { _id: 0 } }).sort({ votes: -1, title: 1 }).toArray();
}

export async function addSkip(skip) {
  await skipCollection.insertOne(skip);
}

export function getSkipById(id) {
  return skipCollection.findOne({ id });
}

export async function addVote(email, skipId) {
  try {
    await voteCollection.insertOne({ email, skipId });
  } catch (ex) {
    if (ex.code === 11000) return false;
    throw ex;
  }
  await skipCollection.updateOne({ id: skipId }, { $inc: { votes: 1 } });
  return true;
}
