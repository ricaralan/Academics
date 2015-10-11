var Mailer = function() {

	/**
	*	INIT PRIVATE VARIABLES
	*/
	var configMailer = require("./ConfigMailer"),
		nodemailer = require("nodemailer"),
		encriptation = require("./../encriptation");

	/**
	*	EXAMPLE:
	*	@param json {
	*		type : "support",
	*		to   : "example@example.com",
	*		subject  : "subject",
	*		text : "text",
	*		html : "<h1>HTML</h1>"
	*	}
	*	@done function(err, info) {}
	*/
	this.sendMail = function(json, done) {
		console.log(configMailer[json.type], configMailer[json.type].user, encriptation.decipher(configMailer[json.type].user));
		if(json.type && configMailer[json.type]){
			mailOptions = this.getMailOptions(json.type, json.to, json.subject, json.text, json.html);
			transporter = this.getTransporter(configMailer[json.type].service,
						encriptation.decipher(configMailer[json.type].user), encriptation.decipher(configMailer[json.type].pass));
			transporter.sendMail(mailOptions, done);
		}else {
			done({error : "No existe el typo de email"});
		}
	};

	this.getTransporter = function(service, user, pass) {
		console.log(user, pass);
		return nodemailer.createTransport({
			service : service,
			auth : {
				user : user,
				pass : pass
			}
		});
	};

	this.getMailOptions = function(type, to, subject, text, html) {
		return {
			from :   configMailer[type].fromTitle + " <"
					+ encriptation.decipher(configMailer[type].user) + ">",
			to   : to,
			subject : subject,
			text : text,
			html : html
		};
	}

	this.sendConfirmEmail = function(to, user_id, done) {
		this.sendMail({
			type : "support",
			to : to,
			subject : "Confirmation of your email on academics",
			text : "Confirmation of your email on academics",
			html : "<h1>Welcome to academics</h1>"
				 + "<p>So you’d like to confirm the email address linked to your getday account? Marvelous! <a href='http://localhost:3000/confirm_email/"
				 + encriptation.cipher(user_id) + "'>Confirm</a><br/>"
				 + "<p>More information about academics <a href='http://localhost:3000'>here</a></p>"
		}, done);
	};

};

module.exports = new Mailer();
