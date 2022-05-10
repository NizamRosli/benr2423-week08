let users;

class User {
	static async injectDB(conn) {
		users = await conn.db("my-database-name").collection("users")
	}

	/**
	 * @remarks
	 * This method is not implemented yet. To register a new user, you need to call this method.
	 * 
	 * @param {*} username 
	 * @param {*} password 
	 * @param {*} phone 
	 */
	static async register(username, password, phone) {
		// TODO: Check if username exists
		// TODO: Hash password
		// TODO: Save user to database
		// faker.js
		// return
	}

	static async login(username, password) {
		// TODO: Check if username exists
		findOne({username: username})

		// TODO: Validate password
		compared()
		return false

		// TODO: Return user object
		return user;

		// faker.js
		return
	}
}

module.exports = User;