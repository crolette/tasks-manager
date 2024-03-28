const { connectToDatabase, endConnection } = require('./database');

// function to get all the tasks
async function getUser(username) {
	try {
		const conn = await connectToDatabase();
		const [result] = await conn.query(
			'SELECT * FROM users WHERE username = ?',
			[username]
		);
		endConnection(conn);
		return result;
	} catch (err) {
		console.log(err);
	}
}

async function checkUserExists(username) {
	try {
		const conn = await connectToDatabase();
		const result = await conn.query('SELECT * FROM users WHERE username = ?', [
			username,
		]);
		console.log(result);
		console.log(result.length);
		if (result.length == 0) {
			console.log('user do not exist');
			return false;
		} else {
			console.log('user exists');
			return true;
		}
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	getUser,
	checkUserExists,
};
