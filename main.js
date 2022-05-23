const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

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
})

const express = require('express')
const app = express()
const port = 3030

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'MyVMS API for Prison',
			version: '1.0.0',
		},
	},
	apis: ['./main.js'], // files containing annotations as above
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/hello', (req, res) => {
	res.send('Hello BENR2423')
})

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *         username: 
 *           type: string
 *         phone: 
 *           type: string
 */

/**
 * @swagger
 * /login:
 *   post:
 *     description: User Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               password: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid username or password
 */
app.post('/login', async (req, res) => {
	console.log(req.body);

	let user = await User.login(req.body.username, req.body.password);
	console.log(user.status);
	if (user.status == 'Invalid Username') {
		res.status(401).send("Invalid username or password");
		return
	}

	res.status(200).json({
		username: user.username,
		name: user.Name,
		officerNo: user.officerNo,
		rank: user.Rank,
		phone: user.Phone,

	})
})

/**
 * @swagger
 * /register:
 *   post:
 *     description: User Register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               password: 
 *                 type: string
 *               name: 
 *                 type: string
 *               officerNo: 
 *                 type: integer
 *               rank: 
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful Register new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid username or password
 */

app.post('/register', async (req, res) => {
	console.log(req.body);

	const reg = await User.register(req.body.username, req.body.password, req.body.name, req.body.officerno, req.body.rank, req.body.phone);
	console.log(reg);

	res.json({reg})
})

app.patch('/login/update', async (req, res) => {
	console.log(req.body);

	const log = await User.login(req.body.username, req.body.password);

	if (log == 1){
		const update = await User.update(req.body.Name, req.body.Phone, req.body.Email);
		res.json({update})
	}
	else{
		res.status(401, "invalid username or password!")
	} 
})

/**
 * @swagger
 * /visitor/{id}:
 *   get:
 *     description: Get visitor by id
 *     parameters:
 *       - in: path
 *         name: id 
 *         schema: 
 *           type: string
 *         required: true
 *         description: visitor id
 */
 app.get('/visitor/:id', async (req, res) => {
	console.log(req.params.id);

	res.status(200).json({})
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
