const express = require('express');
const router = express.Router();
const passportGoogle = require('../helpers/auth/GoogleAuth');

router.get('/google', passportGoogle.authenticate(
    "google",
    {
        scope: ["profile"] //Google information permissions.
    }
));

router.get('/google/callback', passportGoogle.authenticate(
    "google",
    {
        failureRedirect: "/"
    }),
    (req, res) => {
        console.log(req.headers.host);
        res.redirect("/chat/route");
    }
)

module.exports = router;
