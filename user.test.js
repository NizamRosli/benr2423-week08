const MongoClient = require("mongodb").MongoClient;
const User = require("./user")

describe("User Account Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.can3v.mongodb.net",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await User.delete("test");
		await client.close();
	})

	test("New user registration", async () => {
		const res = await User.register("test", "password", "nizam", 345, "admin", "0123456789")
		expect(res.insertedId).not.toBeUndefined();
	})

	test("Duplicate username", async () => {
		const res = await User.register("test", "password")
		expect(res).toEqual({ "status": "duplicate username" })
	})

	test("User login invalid username", async () => {
		const res = await User.login("test-fail", "password")
		expect(res).toEqual({ "status": "invalid username" })
	})

	test("User login invalid password", async () => {
		const res = await User.login("test", "test123")
		expect(res).toEqual({ "status": "invalid password" }) 
	})

	test("User login successfully", async () => {
		const res = await User.login("test", "password")
		expect(res).toEqual(
			expect.objectContaining({
				username: expect.any(String),
        Password: expect.any(String),
				HashedPassword: expect.any(String),
        Name: expect.any(String),
        OfficerNo: expect.any(Number),
        Rank: expect.any(String),
        Phone: expect.any(String),
			})
		);
	})

	// test('should run', () => {
	// });
});