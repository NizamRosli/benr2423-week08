let visitorlog;

class Visitorlog {
	static async injectDB(conn) {
		visitorlog = await conn.db("Prison_VMS").collection("visitorlog")
	}

	static async register(Logno, username, inmateno, Dateofvisit, Timein, Timeout, Purpose, Officerno, Insertby) {
		// TODO: Check if Logno exists
		const res = await visitorlog.findOne({ Logno: Logno })

			if (res){
				return { status: "duplicate Logno"}
			}

			// TODO: Save inmate to database
				return await visitorlog.insertOne({
              "Logno":Logno,
              "username": username,
							"InmateNo": inmateno,
							"Dateofvisit": Dateofvisit,
							"Timein": Timein,
							"Timeout": Timeout,			
              "Purpose": Purpose,
              "OfficeNo":Officerno,
              "Insertby":Insertby			
            });
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