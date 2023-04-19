import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.SCHEMA_URL;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

export async function getRequest(credentials, type, phone) {
	const client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });

	try {
		await client.connect();
		const database = client.db(MONGO_DB_NAME);
		const collection = database.collection('requests');

		const query = { credentials, type, phone };
		const result = await collection.findOne(query);

		return result;
	} catch (err) {
		console.log(err);
	} finally {
		await client.close();
	}
}


