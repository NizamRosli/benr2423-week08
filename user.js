const bcrypt = require("bcrypt")
let users;

class User {
	static async injectDB(conn) {
		users = await conn.db("sample_training").collection("users")
	}

	/**
	 * @remarks
	 * This method is not implemented yet. To register a new user, you need to call this method.
	 * 
	 * @param {*} username 
	 * @param {*} password 
	 * @param {*} phone 
	 */
	static async register(username, password, name, officerno, rank, phone) {
		// TODO: Check if username exists
		const res = await users.findOne({'username':username});
			if (res){
				return { status: "Duplicate Username"}
			}
			// TODO: Hash password
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt)
			// TODO: Save user to database
				return await users.insertOne({
							"username": username,
							"Password": password,
							"HashedPassword": hash,
							"Name": name,
							"OfficerNo": officerno,
							"Rank": rank,
							"Phone": phone,});
	}


	static async login(username, password) {
			// TODO: Check if username exists
			const result = await users.findOne({'username':username});
				if (!result){
					return { status: "Invalid Username"};
				}

			// TODO: Validate password
				const com = await bcrypt.compare(password, result.HashedPassword)
				if (!com){
					return { status: "Invalid Password"};
				}
			// TODO: Return user object
				return users;
				
	}
	
		static async update(name, phone, email){
			const result = await users.findOne({'username':username});
			if (!result){
				return { status: "Invalid Username"};
			}
			const com = await bcrypt.compare(password, result.HashedPassword)
			if (!com){
				return { status: "Invalid Password"};
					}
				return users.updateOne({
					"username": username,
					"Password": password,
					"HashedPassword": hash,
					"Name": name,
					"OfficerNo": officerno,
					"Rank": rank,
					"Phone": phone,})
		}

		static async delete(username) {
			return users.deleteOne({username: username})
		}

	}


module.exports = User;