const express = require('express'); 
const authorsRouter = express.Router();
// const authors = require('../data/authors');
const authordata = require('../model/AuthorModel');

function authorsRoute(nav){
	//router to render authors page
	authorsRouter.get("/", function (req, res) {
		authordata.find().then(function (authors) {
			res.render("authors", {
				authors,
				nav,
			});
		});
	});

	//router to render add author page
	authorsRouter.get("/addauthor", function (req, res) {
		res.render("addauthor", {nav});
	});

	//router to add author
	authorsRouter.post("/add", function (req, res) {
		var item = {
			title: req.body.title,
			image: req.body.image, //part#2point#8
			about: req.body.about,
		};
		console.log(item);
		const author = new authordata(item);
		author.save();
		res.redirect("/authors");
	});

	//router for single author
	authorsRouter.get("/:id", function (req, res) {
		const id = req.params.id;
		authordata.findOne({ _id: id }).then(function (author) {
			res.render("author", {
				author,
                nav
			});
		});
	});

	//router to delete author//part#2point#9
	authorsRouter.delete("/delete", function (req, res) {
		const id = req.body.id;

		authordata.findOneAndDelete({ _id: id }).then(function () {
			res.redirect("/authors");
		});
	});

	//router to edit author
	authorsRouter.post("/edit", function (req, res) {
		authordata.findById(req.body.id, function (err, data) {
			if (err) {
				throw err;
			} else {
				res.render("editauthor", { data, nav });
			}
		});
	});

	//router to update author //part#2point#9
	authorsRouter.put("/update", function (req, res) {
		if (req.body.image == "" || req.body.image == null) {
			var item = {
				title: req.body.title,
				about: req.body.about,
			};
		} else {
			var item = {
				title: req.body.title,
				image: req.body.image,
				about: req.body.about,
			};
		}

		authordata.findByIdAndUpdate({ _id: req.body.id }, item, function (err, data) {
			if (err) {
				res.json({ status: "Failed" });
			} else if (data.n == 0) {
				res.json({ status: "No match Found" });
			} else {
				res.redirect("/authors");
			}
		});
	});
    return authorsRouter;
}







module.exports = authorsRoute;