const supertest = require('supertest');
const request = supertest('http://localhost:3030');

describe('Express Route Test', function () {
	// it('should return hello world', async () => {
	// 	return request.get('/hello')
	// 		.expect(200)
	// 		.expect('Content-Type', /text/)
	// 		.then(res => {
	// 			expect(res.text).toBe('Hello BENR2423');
	// 		});
	// })

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
			.send({username: "helloworld", password: "string" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(  
					expect.objectContaining({
						username: expect.any(String),
						name: expect.any(String),
						age: expect.any(Number),
						gender: expect.any(String),
						address: expect.any(String),
						relation: expect.any(String),
					})
				);
			});
	});

	// it('login failed', async () => {
	// })

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
				expect(response.body).not.toEqual(
					expect.objectContaining({
						insertedId: expect.any(String),
					})
				);
			});
	});

	it('register visitor', async () => {
		return request
			.post('/register/user')
			.send({
				username: "testing",
				password: "password",
				name: "aishah",
				age: 23,
				gender: "female",
				address: "no 2 jalan tuah 76100 melaka",
				relation: "husband" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).not.toEqual(
					expect.objectContaining({
						insertedId: expect.any(String),
					})
				);
			});
	});

	// it('login successfully', async () => {
	// 	return request
	// 		.patch('/login/update')
	// 		.send({username: 'user1', password: "test" })
	// 		.send({name: 'Nizam', phone: '0136797035', officeno: '1234'})
	// 		.expect('Content-Type', /json/)
	// 		.expect(200).then(response => {
	// 			expect(response.body).toEqual(
	// 				expect.objectContaining({
	// 					_id: expect.any(String),
	// 					Name: expect.any(String),
	// 					Phone: expect.any(Number),
	// 					Email: expect.any(Number),
	// 				})
	// 			);
	// 		});
	// });

	// it('register failed', async () => {
	// })
});