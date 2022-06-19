const MongoClient = require("mongodb").MongoClient;
const Visitor = require("./visitor")

describe("User Account Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.can3v.mongodb.net",
			{ useNewUrlParser: true },
		);
		Visitor.injectDB(client);
	})

	afterAll(async () => {
    await Visitor.delete("test");
		await client.close();
	})

	test("New visitor registration", async () => {
		 const res = await Visitor.register("test", "password", "nizam", 23, "male", "no 1 jalan tuah", 76100, "melaka", "uncle")
		expect(res.insertedId).not.toBeUndefined();
	})

	test("Duplicate username", async () => {
		const res = await Visitor.register("test", "password")
		expect(res).toEqual({ "status": "duplicate username" })
	})

	test("Visitor login invalid username", async () => {
		const res = await Visitor.login("test-fail", "password")
		expect(res).toEqual({ "status": "invalid username" })
	})

	test("Visitor login invalid password", async () => {
		const res = await Visitor.login("test", "test123")
		expect(res).toEqual({ "status": "invalid password" })
	})

	test("Visitor login successfully", async () => {
		const res = await Visitor.login("test", "password")
		expect(res).toEqual(
      expect.objectContaining({
        username: expect.any(String),
        Password: expect.any(String),
        HashedPassword: expect.any(String),
        Name: expect.any(String),
        Age: expect.any(Number),
        Gender: expect.any(String),
        Address: expect.objectContaining({
					Road: expect.any(String),
					Zipcode: expect.any(Number),
					State: expect.any(String)
				}),
        Relation: expect.any(String)
      })
    );
	})

	// test('should run', () => {
	// });
});