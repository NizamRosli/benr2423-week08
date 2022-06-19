const MongoClient = require("mongodb").MongoClient;
const Inmate = require("./inmate")

describe("User Account Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.can3v.mongodb.net",
			{ useNewUrlParser: true },
		);
		Inmate.injectDB(client);
	})

	afterAll(async () => {
    await Inmate.delete(1234);
		await client.close();
	})

	test("New inmate registration", async () => {
		 const res = await Inmate.register( 1234, "azfan", "shah", 23, "male")
		 expect(res).toEqual({ "status": "Succesfully register inmate" })
	})

	test("Duplicate inmateno", async () => {
		const res = await Inmate.register(1234)
		expect(res).toEqual({ "status": "duplicate Inmateno" })
	})

	// test('should run', () => {
	// });
});