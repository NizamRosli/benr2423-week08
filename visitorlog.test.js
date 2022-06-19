const MongoClient = require("mongodb").MongoClient;
const Visitorlog = require("./visitorlog")

describe("User Account Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.can3v.mongodb.net",
			{ useNewUrlParser: true },
		);
		Visitorlog.injectDB(client);
	})

	afterAll(async () => {
    await Visitorlog.delete(1);
		await client.close();
	})

	test("New visitorlog registration", async () => {
		 const res = await Visitorlog.register( 1, "mirul", 1234, "12 jun 2022", "9:00", "11:00", "miss", 345, "azfan")
		 expect(res).toEqual({ "status": "Succesfully register visitorlog" })
	})

	test("Duplicate visitorlog", async () => {
		const res = await Visitorlog.register(1)
		expect(res).toEqual({ "status": "duplicate Logno" })
	})

	// test('should run', () => {
	// });
});