let visitorlog;

class Visitorlog {
	static async injectDB(conn) {
		visitorlog = await conn.db("Prison_VMS").collection("visitorlog")
	}

	static async register(logno, username, inmateno, dateofvisit, timein, timeout, purpose, officerno, insertby) {
		// TODO: Check if Logno exists
		const res = await visitorlog.findOne({ Logno: logno })

			if (res){
				return { status: "duplicate Logno"}
			}

			// TODO: Save inmate to database
				visitorlog.insertOne({
              "Logno": logno,
              "username": username,
							"InmateNo": inmateno,
							"Dateofvisit": dateofvisit,
							"Timein": timein,
							"Timeout": timeout,			
              "Purpose": purpose,
              "OfficeNo":officerno,
              "Insertby":insertby			
            });
            return { status: "Succesfully register visitorlog"}
	}

		static async update(Logno, Dateofvisit,Timein,Timeout,Purpose,Officerno,Insertby){
				return visitorlog.updateOne({ Logno: Logno },{$set:{
							"Dateofvisit": Dateofvisit,
							"Timein": Timein,
							"Timeout": Timeout,			
              "Purpose": Purpose,
              "OfficeNo":Officerno,
              "Insertby":Insertby				}})
		}

		static async delete(Logno) {
			return visitorlog.deleteOne({Logno: Logno})
		}

    static async find(Logno) {
			return visitorlog.findOne({Logno: Logno})
		}

	}


module.exports = Visitorlog;