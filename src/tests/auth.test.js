require("dotenv").config(); 
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });
});
it("should login an existing user", async () => {
  // first register
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Test User",
      email: "testlogin@example.com",
      password: "password123",
    });

  // then login
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "testlogin@example.com",
      password: "password123",
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe("Login successful");
});
it("should not login with wrong password", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Test User",
      email: "wrongpass@example.com",
      password: "password123",
    });

  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "wrongpass@example.com",
      password: "wrongpassword",
    });

  expect(res.statusCode).toBe(400);
  expect(res.body.message).toBe("Invalid credentials");
});

it("should not login non-existing user", async () => {
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "nouser@example.com",
      password: "password123",
    });

  expect(res.statusCode).toBe(400);
  expect(res.body.message).toBe("Invalid credentials");
});
it("should return JWT token on login", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "JWT User",
      email: "jwt@example.com",
      password: "password123",
    });

  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "jwt@example.com",
      password: "password123",
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.token).toBeDefined();
});

