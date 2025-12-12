const request = require("supertest");
const app = require("../app");

describe("Auth API", () => {
  test("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Shraddha",
        email: "shraddha@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });
});
