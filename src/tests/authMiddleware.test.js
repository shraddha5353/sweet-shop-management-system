const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
require("dotenv").config();


describe("Auth Middleware", () => {
  it("should block access without token", async () => {
    const res = await request(app).get("/api/test/protected");
    expect(res.statusCode).toBe(401);
  });

  it("should allow access with valid token", async () => {
    const token = jwt.sign(
      { id: "12345" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const res = await request(app)
      .get("/api/test/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Access granted");
  });
});
