import { MongoClient } from "mongodb";
import { MONGO_DB_NAME, MONGO_URI } from "./helpers.js";

export async function getRequest(firstName, lastName, type, phone) {
  const client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db(MONGO_DB_NAME);
    const collection = database.collection("UserCommunals");
    const result = await collection.findOne({
      firstName: firstName,
      lastName: lastName,
      phone: +phone,
    });
    if (result[type]) {
      return result[type];
    } else return null;
  } catch (err) {
    return null;
  } finally {
    await client.close();
  }
}
