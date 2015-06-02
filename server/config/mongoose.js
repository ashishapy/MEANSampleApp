var mongoose = require('mongoose'),
	crypto = require('crypto');

module.exports = function (config) {
	mongoose.connect(config.db);

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Db connection error...'));
	db.once('open', function callback() {
		console.log('MEANApp db opened');
	});

	var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		userName: String,
		salt: String,
		hashed_pwd: String,
		roles: [String]
	});
	
	userSchema.methods = {
		authenticate: function (passwordToMatch) {
			return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
		}
	};
	
	var User = mongoose.model('User', userSchema);
	
	User.find({}).exec(function (err, collection) {
		if(collection.length === 0){
			var salt = createSalt(),
				hash = hashPwd (salt, 'ashish');
			User.create({
				firstName:'Ashish', 
				lastName:'Pandey', 
				userName:'ashish',
				salt: salt,
				hashed_pwd: hash,
				roles: ['admin']
			}); 
		}
	});
};

function createSalt() {
	return crypto.randomBytes(256).toString('base64');
}

function hashPwd(salt, pwd) {
	var hmac = crypto.createHmac('sha256', salt);
	return hmac.update(pwd).digest('hex');
}