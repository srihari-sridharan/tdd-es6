import { MongoClient } from "mongodb";

const DB_NAME = process.env.NODE_ENV === "test" ? "TEST_DB" : "PROD_DB";

export const getUserByUsername = async username => {
  // Create the database client
  const client = await MongoClient.connect(
    `mongodb://localhost:27017/${DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  // Get reference to the database.
  const db = client.db(DB_NAME);

  const result = await db.collection("users").findOne({ username: username });

  // Close client
  client.close();

  return result;
};

export default { getUserByUsername };
