import { MongoClient } from "mongodb";
import { expect } from "chai";
import { getUserByUsername } from "./db";

describe("getUseerByUsername", () => {
  it("get the correct user given the username", async () => {
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

    // Fake data
    const fakeData = [
      {
        id: 123,
        username: "abc",
        email: "abc@abc.com"
      },
      {
        id: 124,
        username: "def",
        email: "def@def.com"
      }
    ];

    // Insert fake data into database.
    await db.collection("users").insertMany(fakeData);

    // Get the data
    const actual = await getUserByUsername("abc");

    // Get the final database state - use this to compare
    // against the data that we inserted.
    const finalDBState = await db
      .collection("users")
      .find()
      .toArray();

    // Drop database before the assertions to ensure
    // that database is dropped irrespective of the
    // assertion result.
    await db.dropDatabase();

    // Close client
    client.close();

    const expected = {
      id: 123,
      username: "abc",
      email: "abc@abc.com"
    };

    // Assertions
    // Use chai-exlude and exlude the _id property
    // See mocha-setup.js for chai-exclude setup!
    expect(actual)
      .excludingEvery("_id")
      .to.deep.equals(expected);
    expect(finalDBState).to.deep.equals(fakeData);
  });
});
