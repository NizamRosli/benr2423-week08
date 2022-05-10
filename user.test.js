const MongoClient = require("mongodb").MongoClient;
const User = require("./user")

describe("User Account Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"my-mongodb+srv-connection-string",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	test("New user registration", async () => {
		const res = await User.register("username", "password", "123456")
		expect().toBe()
	})

	test("Duplicate username", async () => {
		const res = await User.register("username", "1234")
		expect().toBe()
	})

	test("User login invalid username", async () => {
		const res = await User.login("test", "test")
		expect(res).toBe("??")
	})

	test("User login invalid password", async () => {
		const res = await User.login("test", "test")
		expect(res).toBe("??") 
	})

	test("User login successfully", async () => {
		const res = await User.login("test", "test")
		expect(res).toBe()
	})

	test('should run', () => {
	});
});