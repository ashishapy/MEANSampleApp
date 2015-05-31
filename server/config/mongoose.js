var mongoose = require('mongoose');

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
		userName: String
	});
	
	var User = mongoose.model('User', userSchema);
	
	User.find({}).exec(function (err, collection) {
		if(collection.length === 0){
			User.create({firstName:'Ashish', lastName:'Pandey', userName:'ashish'}); 
		}
	});
};