import { MongoClient } from "mongodb";

export const getUserByUsername = async username => {
  // Create the database client
  const client = await MongoClient.connect(
    `mongodb://localhost:27017/TEST_DB`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  // Get reference to the database.
  const db = client.db("TEST_DB");

  const result = await db.collection("users").findOne({ username: username });

  // Close client
  client.close();

  return result;
};
