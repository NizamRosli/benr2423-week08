const supertest = require('supertest');
const request = supertest('http://localhost:3030');
const user_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyYW5rIjoib2ZmaWNlciIsImlhdCI6MTY1NTY0ODMxMiwiZXhwIjoxNjU1NjUxOTEyfQ.6QKJ-R7bsffj0izJ3d4kO_O389ICDiBuW8F0E3XPxmo';
const visitor_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjMiLCJpYXQiOjE2NTU2NDgyODUsImV4cCI6MTY1NTY1MTg4NX0.nLkQ8eTGAE6X-2BVCItxElqtaq_HeE7i4bFJtCZTDRs';

describe('Express Route Test', function () {

	it('user login successfully', async () => {
		return request
			.post('/login/user')
			.send({username: "test123", password: "password" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						username: expect.any(String),
						name: expect.any(String),
						rank: expect.any(String),
						phone: expect.any(String),
						token: expect.any(String),
					})
				);
			});
	});

	it('visitor login successfully', async () => {
		return request
			.post('/login/visitor')
			.send({username: "test123", password: "password" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(  
					expect.objectContaining({
						username: expect.any(String),
						name: expect.any(String),
						age: expect.any(Number),
						gender: expect.any(String),
						// Address: expect.objectContaining({
						// 	Road: expect.any(String),
						// 	Zipcode: expect.any(Number),
						// 	State: expect.any(String)
						// }),
						relation: expect.any(String),
					})
				);
			});
	});


	it('register user', async () => {
		return request
			.post('/register/user')
			.send({
				username: "testing",
				password: "password",
				name: "azrin",
				officerno: 756,
				rank: "user",
				phone: "0178456789" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body.reg.status).toEqual("Succesfully register user")
			});
	});

	it('register visitor', async () => {
		return request
			.post('/register/visitor')
			.send({
				username: "testing",
				password: "password",
				name: "aishah",
				age: 23,
				gender: "female",
				road: "no 2 jalan tuah",
				zipcode: 76100,
				state: "melaka",
				relation: "husband" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body.reg.status).toEqual("Succesfully register Visitor")
			});
	});

	it('register inmate', async () => {
		return request
			.post('/register/inmate')
			.set('authorization', 'Bearer '+ user_token) //set token to header
			.send({
				inmateno: 13,
				firstname: "test",
				lastname: "uji",
				age: 33,
			  gender: "male", })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body.status).toEqual("Succesfully register inmate")
			});
	});

	it('register visitorlog', async () => {
		return request
			.post('/register/visitorlog')
			.set('authorization', 'Bearer '+ user_token) //set token to header
			.send({
				logno: 12,
        username: "azfan",
				inmateno: 23,
				dateofvisit: "12 jun 2022",
				timein: "9:00",
				timeout: "12:00",			
        purpose: "miss",
        officerno: 1234,
        insertby: "nizam" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body.status).toEqual("Succesfully register visitorlog")
			});
	});

	// it('user update', async () => {
	// 	return request
	// 		.patch('/user/update')
	// 		.set('authorization', 'Bearer '+ user_token) //set token to header
	// 		.send({
	// 			username: "azfan",
	// 		  name: "test", 
	// 			phone: "0123476789"})
	// 		.expect('Content-Type', /json/)
	// 		.expect(200).then(response => {
	// 			expect(response.body.reg.status).toEqual("Information updated");
	// 		});
	// });

	// it('visitor update', async () => {
	// 	return request
	// 		.patch('/visitor/update')
	// 		.set('authorization', 'Bearer '+ visitor_token) //set token to header
	// 		.send({
	// 			username: "azfan",
	// 		  name: "test", 
	// 			phone: "0123476789"})
	// 		.expect('Content-Type', /json/)
	// 		.expect(200).then(response => {
	// 			expect(response.body.reg.status).toEqual("Information updated");
	// 		});
	// });

	// it('register failed', async () => {
	// })
});