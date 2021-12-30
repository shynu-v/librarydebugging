const express = require("express");
const booksRouter = express.Router();
// const books = require('../data/books');
const bookdata = require("../model/BookModel");

function booksRoute(nav){
	//router to render books page
	booksRouter.get("/", function (req, res) {
		bookdata.find().then(function (books) {
			res.render("books", {
				books,
				nav
			});
		});
	});

	//router to render addbook page
	booksRouter.get("/addbook", function (req, res) {
		res.render("addbook", {nav});
	});

	//router to add book
	booksRouter.post("/add", function (req, res) {
		var item = {
			title: req.body.title,
			author: req.body.author,
			image: req.body.image,
			about: req.body.about,
		};
		console.log(item);
		const book = new bookdata(item);
		book.save();
		res.redirect("/books");
	});

	//router for singlebook
	booksRouter.get("/:id", function (req, res) {
		const id = req.params.id;
		bookdata.findOne({ _id: id }).then(function (book) {
			res.render("book", {
				book,
				nav
			});
		});
	});

	//router to delete book //part#2point#9
	booksRouter.delete("/delete", function (req, res) {
		const id = req.body.id;

		bookdata.findOneAndDelete({ _id: id }).then(function () {
			res.redirect("/books");
		});
	});

	//router to edit book
	booksRouter.post("/edit", function (req, res) {
		bookdata.findById(req.body.id, function (err, data) {
			if (err) {
				throw err;
			} else {
				res.render("editbook", { data, nav });
				//console.log(data)
			}
		});
	});

	//router to update book //part#2point#9
	booksRouter.put("/update", function (req, res) {
		if (req.body.image == "" || req.body.image == null) {
			var item = {
				title: req.body.title,
				author: req.body.author,
				about: req.body.about,
			};
		} else {
			var item = {
				title: req.body.title,
				author: req.body.author,
				image: req.body.image,
				about: req.body.about,
			};
		}

		bookdata.findByIdAndUpdate({ _id: req.body.id }, item, function (err, data) {
			if (err) {
				res.json({ status: "Failed" });
			} else if (data.n == 0) {
				res.json({ status: "No match Found" });
			} else {
				//console.log(item);
				res.redirect("/books");
			}
		});
	});
	return booksRouter;
}




module.exports = booksRoute;
