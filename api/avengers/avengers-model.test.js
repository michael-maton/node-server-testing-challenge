it("sanity check, correct ENV", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

const Avenger = require("./avengers-model");
const db = require("../../database/dbConfig");

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

describe("tests the avengers model", () => {
  describe("get function", () => {
    it("get function returns entire avengers db", async () => {
      await db.migrate.latest();
      await db.seed.run();

      const all = await Avenger.getAll();
      expect(all).toHaveLength(4);
    });
  });

  describe("insert function", () => {
    it("inserts avenger into database", async () => {
      let all;
      await Avenger.add(Thor);
      all = await db("avengers");
      expect(all).toHaveLength(1);

      await Avenger.add(Hulk);
      all = await db("avengers");
      expect(all).toHaveLength(2);
    });

    it("returns newly added avenger", async () => {
      const newAvenger = await Avenger.add(Thor);
      expect(newAvenger).toMatchObject({ ...Thor });
    });
  });

  describe("delete function", () => {
    it("deletes avenger from database", async () => {
      let all;
      await Avenger.add(Thor);
      all = await db("avengers");
      expect(all).toHaveLength(1);

      await Avenger.remove(1);
      all = await db("avengers");
      expect(all).toHaveLength(0);
    });
  });
});
