nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
	service : "gmail",
	auth : {
		user : "",
		pass : ""
	}
});

var mailOptions = {
	from : "getdate support  <richard.alan.oli@gmail.com>",
	to   : "richard.alan.oli@gmail.com",
	subject : "subject",
	text : "text",
	html : "<h1>HTML</h1>"
};

transporter.sendMail(mailOptions, function(err, info) {
	if(err) {
		console.log(err);
	} else {
		console.log("Message sent: " + info.response);
	}
});

