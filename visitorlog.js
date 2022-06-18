let visitorlog;

class Visitorlog {
	static async injectDB(conn) {
		visitorlog = await conn.db("Prison_VMS").collection("visitorlog")
	}

	static async register(Logno, username, inmateid, Dateofvisit, Timein, Timeout, Purpose, Officerid, Insertby) {
		// TODO: Check if Logno exists
		const res = await visitorlog.findOne({ Logno: Logno })

			if (res){
				return { status: "duplicate Logno"}
			}

			// TODO: Save inmate to database
				return await visitorlog.insertOne({
              "Logno":Logno,
              "username": username,
							"Inmateid": inmateid,
							"Dateofvisit": Dateofvisit,
							"Timein": Timein,
							"Timeout": Timeout,			
              "Purpose": Purpose,
              "OfficeNo":Officerid,
              "Insertby":Insertby			
            });
	}

		static async update(Logno, visitorid,inmateid,Dateofvisit,Timein,Timeout,Purpose,Officerid,Insertby){
				return visitorlog.updateOne({ Logno: Logno },{$set:{
                            "Visitorid": visitorid,
							"Inmateid": inmateid,
							"Dateofvisit": Dateofvisit,
							"Timein": Timein,
							"Timeout": Timeout,			
                            "Purpose": Purpose,
                            "Officeid":Officerid,
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