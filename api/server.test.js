const request = require("supertest");
const server = require("./server.js");
const db = require("../database/dbConfig");

const Thor = {
  superhero: "Thor",
  power: "God of thunder",
};

const Hulk = {
  superhero: "Hulk",
  power: "STRONG!",
};

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("avengers").truncate();
});
afterAll(async () => {
  await db.destroy();
});

describe("server", () => {
  describe("GET /avengers", () => {
    it("responds with status code 200", async () => {
      const res = await request(server).get("/avengers");
      expect(res.status).toBe(200);
    });
    it("retrieves all avengers from the database", async () => {
      await db.migrate.latest();
      await db.seed.run();

      const all = await request(server).get("/avengers");
      expect(all.body).toHaveLength(4);
    });
  });
});
