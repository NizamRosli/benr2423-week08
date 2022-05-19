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
	 static async register(username, password) {
		// TODO: Check if username exists
		let res = await users.findOne({'userName':username});
			//console.log(username)
			//console.log(res);
			if (res == null){
				// TODO: Hash password
				const bcrypt = require("bcrypt")
				const saltRounds = 10;
				bcrypt.genSalt(saltRounds, function (saltError, salt) {
					if (saltError) {
						throw saltError
					} else {
						bcrypt.hash(password, salt, function(hashError, hash) {
							if (hashError) {
								throw hashError
							}  else {
			// TODO: Save user to database
								users.insertOne({
									"userName": username,
									"Password": password,
									"HashedPassword": hash});
							}
							console.log("Inserted!!!")
							

						})
					
					}
				}); return 1;
			}
			else{
				console.log("Please choose other username!")
				return 0;
			}
			
		 }

		 static async login(username, password) {
			// TODO: Check if username exists
			let result = await users.findOne({'userName':username});
				//console.log(result)
				//console.log(result[0].Password)
				if (result == null){
					return null
				}
				else{
				// TODO: Validate password
				const bcrypt = require("bcrypt")
				let com = await bcrypt.compare(password, result.HashedPassword)
					//result == true
					//console.log(result);
					if (com == true){
						console.log("Login Successfully!")
						return 1;
					}
					else{
						console.log("Login failed!")
						return 0;
					}
				
				}
	
			// TODO: Return user object
			
		}
	}


module.exports = User;