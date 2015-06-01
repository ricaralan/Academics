var express = require('express');
var router = express.Router();

router.get('/setDummySession', function(req, res, next) {
	req.session.passport.user = {
				"user_id":  "807847965989128" ,
				"user_name":  "Richard Alan Oli" ,
				"user_photo": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/p50x50/10553603_708668662573726_7233996381321767465_n.jpg?oh=915a9cdca6e1b8fc0920950affe19da0&oe=55C51D55&__gda__=1443413758_8e1b367a8370a1daf1bcdd30177fb2a6"
				};
	// Success init dummy session
	res.redirect('/');
});

module.exports = router;
