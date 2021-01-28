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

  describe("POST /avengers", () => {
    it("responds with status code 201", async () => {
      const res = await request(server).post("/avengers").send(Thor);
      expect(res.status).toBe(201);
    });
    it("responds with new avenger", async () => {
      const res = await request(server).post("/avengers").send(Thor);
      expect(res.body).toMatchObject({ id: 1, ...Thor });
    });
  });

  describe("DELETE /avengers/:id", () => {
    it("responds with status code 200", async () => {
        await db.migrate.latest();
        await db.seed.run();
        const res = await request(server).delete("/avengers/1");
        expect(res.status).toBe(200);
    });
    it("responds with confirmation", async () => {
        await db.migrate.latest();
        await db.seed.run();
        const res = await request(server).delete("/avengers/1");
        expect(res.text).toMatch(/The avenger has been snapped into dust by Thanos.../);
    });
    it("the new database is the correct length", async () => {
        await db.migrate.latest();
        await db.seed.run();
        let all = await db("avengers")
        expect(all).toHaveLength(4)
        await request(server).delete("/avengers/1");
        all = await db("avengers")
        expect(all).toHaveLength(3)
    });
  });
});
