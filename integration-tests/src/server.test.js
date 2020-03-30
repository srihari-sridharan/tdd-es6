// These tests are example of single service tests
import sinon from "sinon";
import request from "supertest";
import { expect } from "chai";
import db from "./db";
import { app } from "./server";

describe("GET /users/:username", () => {
  it("server should send the correct response, when user with the username is found", async () => {
    // Since the database test will test database connectivity,
    // we can use a test double for database in this intergration test.
    const fakeData = {
      id: 123,
      username: "abc",
      email: "abc@abc.com"
    };

    const stub = sinon.stub(db, "getUserByUsername").resolves(fakeData);

    await request(app)
      .get("/users/abc")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(fakeData);

    // On the first call of the stub, expect the first argument to be abc.
    expect(stub.getCall(0).args[0]).to.equal("abc");

    // At the bottom of the test call stub.restore()
    stub.restore();
  });

  it("sends a correct response when there is an error", async () => {
    const fakeError = { message: "Something went wrong!" };
    const stub = sinon.stub(db, "getUserByUsername").throws(fakeError);
    await request(app)
      .get("/users/abc")
      .expect(500)
      .expect("Content-Type", /json/)
      .expect(fakeError);
    stub.restore();
  });

  it("returns the appropriate response when the user is not found", async () => {
    const stub = sinon.stub(db, "getUserByUsername").resolves(null);
    await request(app)
      .get("/users/def")
      .expect(404);

    stub.restore();
  });
});
