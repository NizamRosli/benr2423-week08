const bcrypt = require("bcrypt")
let visitors;
// 
class Visitor {
	static async injectDB(conn) {
		visitors = await conn.db("Prison_VMS").collection("visitors")
	}

	/**
	 * @remarks
	 * This method is not implemented yet. To register a new user, you need to call this method.
	 * 
	 * @param {*} username 
	 * @param {*} password 
	 * @param {*} phone 
	 */
	static async register(username, password, name, age, gender, Road, Zipcode, State, relation) {
		// TODO: Check if username exists
		const res = await visitors.findOne({ username: username })

			if (res){
				return { status: "duplicate username"}
			}

			// TODO: Hash password
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt)

			// TODO: Save user to database
				return await visitors.insertOne({
							"username": username,
							"Password": password,
							"HashedPassword": hash,
							"Name": name,
							"Age": age,
							"Gender": gender,
							"Address":{
								"Road":Road,
								"Zipcode":Zipcode,
								"State":State},
              "Relation": relation
            });
	}


	static async login(username, password) {
			// TODO: Check if username exists
			const result = await visitors.findOne({username: username});

				if (!result) {
					return { status: "invalid username" }
				}

			// TODO: Validate password
				const com = await bcrypt.compare(password, result.HashedPassword)
				if (!com){
					return { status: "invalid password"}
				}
			// TODO: Return user object
				return result;
				
	}
	
		static async update(username, name, age, gender, Road, Zipcode, State, relation){
				return visitors.updateOne({username:username},{$set:{
				"Name": name,
				"Age": age,
				"Gender": gender,
				"Address":{
					"Road":Road,
					"Zipcode":Zipcode,
					"State":State},
        "Relation": relation}})
		}

		static async delete(username) {
			return visitors.deleteOne({username: username})
		}

	}


module.exports = Visitor;