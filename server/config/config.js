var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		db: 'mongodb://localhost/meanapp',
		rootPath: rootPath,
		port: process.env.PORT || 3030
	},
	production: {
		db: 'mongodb://ashishapy:mongolab@ds041432.mongolab.com:41432/meanapp',
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
};