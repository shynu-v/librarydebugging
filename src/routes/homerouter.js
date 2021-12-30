const express = require('express'); 
const homeRouter = express.Router();

function homeRoute(nav){
    homeRouter.get("/", function (req, res) {
			res.render("home", {nav});
		});
    return homeRouter;
}








module.exports = homeRoute;