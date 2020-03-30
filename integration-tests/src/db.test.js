// These tests are example of boundary tests.
import { expect } from "chai";
import { getUserByUsername } from "./db";
import {
  setDatabaseData,
  getDatabaseData,
  resetDatabase
} from "./test-helpers";

describe("getUserByUsername", () => {
  afterEach("Reset the database", async () => {
    await resetDatabase();
  });

  it("get the correct user given the username", async () => {
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

    await setDatabaseData("users", fakeData);

    // Get the data
    const actual = await getUserByUsername("abc");

    // Get the final database state - use this to compare
    // against the data that we inserted.
    const finalDBState = await getDatabaseData("users");

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

  it("returns null when user is not found", async () => {
    await setDatabaseData("users", [
      {
        id: "999",
        username: "xyz",
        email: "nobody@gmail.com"
      }
    ]);

    const actual = await getUserByUsername("def");
    expect(actual).to.be.null;
  });
});
