var express = require('express'),
	stylus = require('stylus'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	passport = require('passport'),
	path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');

module.exports = function (app, config) {
	
	function compile(str, path) {
		return stylus(str).set('filename', path);
	}
	
	app.set('views', rootPath + '/server/views');
	app.set('view engine', 'jade');
	
	app.use(logger('dev'));
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({
	  extended: true
	}));
	app.use(bodyParser.json());
	app.use(session({
		secret: 'ashishapy unicorns',
		resave: true,
		saveUninitialized: true
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(stylus.middleware(
		{
			src: rootPath + '/public',
			compile: compile
		}
	));
	app.use(express.static(rootPath + '/public'));
		
};
