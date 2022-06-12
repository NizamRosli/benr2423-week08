const MongoClient = require("mongodb").MongoClient;
const User = require("./user");
const Visitor = require("./visitor");

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.can3v.mongodb.net",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
	Visitor.injectDB(client);
})

const express = require('express')
const app = express()
const port = process.env.PORT || 3030

const jwt = require ('jsonwebtoken');
function generateAccessToken(payload){
	return jwt.sign(payload, "secretcode", { expiresIn: '1h' });
}

function verifyToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) return res.sendStatus(401)

	jwt.verify(token, "secretcode", (err, user) => {
		console.log(err);

		if (err) return res.sendStatus(403)

		req.user = user

		next()
	})
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/hello', (req, res) => {
	res.send('Hello BENR2423')
})

app.post('/login/user', async (req, res) => {
	console.log(req.body);

	let user = await User.login(req.body.username, req.body.password);
	
	if (user.status == ("invalid username" || "invalid password")) {
		res.status(401).send("invalid username or password");
		return
	}

	res.status(200).json({
		username: user.username,
		name: user.Name,
		officerNo: user.officerNo,
		rank: user.Rank,
		phone: user.Phone,
		token: generateAccessToken({ rank: user.Rank })

	});
})

app.post('/login/visitor', async (req, res) => {
	console.log(req.body);

	let user = await Visitor.login(req.body.username, req.body.password);
	// console.log(user);
	// console.log(user.status);
	
	if (user.status == ("invalid username" || "invalid password")) {
		res.status(401).send("invalid username or password");
		return
	}

	res.status(200).json({
		username: user.username,
		name: user.Name,
		age: user.Age,
		gender: user.Gender,
		address: user.Address,
		relation: user.Relation
	});
})

app.post('/register/user', async (req, res) => {
	console.log(req.body);

	const reg = await User.register(req.body.username, req.body.password, req.body.name, req.body.officerno, req.body.rank, req.body.phone);
	console.log(reg);

	res.json({reg})
})

app.post('/register/visitor', async (req, res) => {
	console.log(req.body);

	const reg = await Visitor.register(req.body.username, req.body.password, req.body.name, req.body.age, req.body.gender, req.body.address, req.body.relation);
	console.log(reg);

	res.json({reg})
})

app.patch('/login/update', async (req, res) => {
	console.log(req.body);

	const log = await User.login(req.body.username, req.body.password);
	//console.log(log.status);

	if (log.status == ('invalid username' || 'invalid password')) {
		res.status(401).send("invalid username or password")
	}
	const update = await User.update(req.body.username,req.body.name, req.body.officerno, req.body.rank, req.body.phone);
	res.json({update})

})

app.use(verifyToken);

app.delete('/delete/user', async (req, res) => {
	const del = await User.delete(req.body.username)

	res.json({del})

})

app.delete('/delete/visitor', async (req, res) => {
	const del = await Visitor.delete(req.body.username)

	res.json({del})

})

app.get('/visitor/:id', async (req, res) => {
	console.log(req.params.id);

	res.status(200).json({})
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
