import { readFileSync } from 'node:fs';
import { MongoClient } from 'mongodb';

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

  console.log(`Connected to database at ${config.hostname}`);
  return db;
}
