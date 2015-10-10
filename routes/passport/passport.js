/**
*	@version 0.0.0
*	@author Team Academics
*/
var userModel = require("./../../database/models/UserModel");

var TwitterStrategy		= require("passport-twitter").Strategy;
var FacebookStrategy	= require("passport-facebook").Strategy;

// Este modulo contiene la configuración de API keys para Academics
var configPassport = require("./configPassport");

function authenticationPassport (accessToken, refreshToken, profile, done) {
		userModel.getById(profile.id, function(err, user) {
			if (err) {
				console.log("ERROR rethinkdb getUserById: " + err.message);
			} else if (user != null) {
				// Si existe entonces se regresa la info del usuario
				done(null, user);
			} else {
				// Se tiene que crear el usuario
				userModel.insert({
					user_id : profile.id,
					user_name  : profile.displayName,
					user_photo : profile.photos[0].value
				}, function (err, results) {
					if (results.inserted == 1){
						userModel.getById(profile.id, function(err, user) {
							if (err){
								console.log("ERROR: rethinkdb: " + err.message);
							}else{
								done(null, user);
							}
						});
					}
				});
			}
		})
	}

module.exports = function (passport) {
	// Serializa al usuario para meterlo en la sesión
	passport.serializeUser(function (user, done){
		done(null, user);
	});

	// Deserializa el usuario en la sesión para poder utilizalo
	passport.deserializeUser(function (obj, done){
		done(null, obj);
	});

	// Configuración de autenticación con twitter
	passport.use(new TwitterStrategy({
		consumerKey 	: configPassport.twitter.key,
		consumerSecret  : configPassport.twitter.secret,
		callbackURL 	: configPassport.twitter.callbackURL
	}, authenticationPassport));

	// Configuración de autenticación con facebook
	passport.use(new FacebookStrategy({
		clientID 	  : configPassport.facebook.key,
		clientSecret  : configPassport.facebook.secret,
		callbackURL   : configPassport.facebook.callbackURL,
		profileFields : ["id", "displayName", "photos"]
	}, authenticationPassport));

};

