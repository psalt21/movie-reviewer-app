import { MongoClient, Db } from 'mongodb';

const uri: string = process.env.MONGODB_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

const client = new MongoClient(uri, options);

export async function connectToDatabase(): Promise<{ db: Db; client: MongoClient }> {
    if (!client.isConnected()) await client.connect();
    const db = client.db('movie-reviewer-app-cluster');
    return { db, client };
}
