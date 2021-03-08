const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const ResponseModel = require('../models/ResponseModel')

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
        res.redirect("/chat/route");
    }
)

router.get('/isAuthenticated',isAuthenticated,(req,res)=>{
    res.json(ResponseModel.ok());
})

module.exports = router;
