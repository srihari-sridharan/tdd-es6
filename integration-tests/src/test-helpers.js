import { MongoClient } from "mongodb";

export const setDatabaseData = async (collectionName, data) => {
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

  // Insert fake data into database.
  await db.collection(collectionName).insertMany(data);

  // Close client
  client.close();
};

export const getDatabaseData = async collectionName => {
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

  // Get data from database
  const result = await db
    .collection(collectionName)
    .find()
    .toArray();

  // Close client
  client.close();
  return result;
};

export const resetDatabase = async () => {
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

  // Drop database before the assertions to ensure
  // that database is dropped irrespective of the
  // assertion result.
  await db.dropDatabase();

  // Close client
  client.close();
};
