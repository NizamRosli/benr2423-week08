let inmate;

class Inmate {
	static async injectDB(conn) {
		inmate = await conn.db("Prison_VMS").collection("inmate")
	}

	static async register(Inmateno,Firstname, Lastname,  age, gender) {
		// TODO: Check if Inmateno exists
		const res = await inmate.findOne({ Inmateno: Inmateno })

			if (res){
				return { status: "duplicate Inmateno"}
			}
			// TODO: Save inmate to database
				return await inmate.insertOne({
              "Inmateno": Inmateno,
							"Firstname": Firstname,
							"Lastname": Lastname,
							"Age": age,
							"Gender": gender,						
            });
	}

		static async update(Inmateno,Firstname, Lastname,  age, gender){
				return inmate.updateOne({Inmateno: Inmateno},{$set:{
              "Firstname": Firstname,
              "Lastname": Lastname,
              "Age": age,
              "Gender": gender,		}})
		}

		static async delete(Inmateno) {
			return inmate.deleteOne({Inmateno: Inmateno})
		}

    static async find(Inmateno) {
			return inmate.findOne({Inmateno: Inmateno})
		}

	}

module.exports = Inmate;