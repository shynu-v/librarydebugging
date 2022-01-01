const express = require('express'); 
const path = require ('path'); 
const bodyParser = require('body-parser'); //part#1point#2
const cors = require('cors');
const methodOverride = require('method-override');
const mongoose = require("mongoose");

//database connectivity to avoid some warnings some options are added
mongoose.connect(
	"mongodb+srv://shynu:KabFSjVr6J56GBuq@library.i9mll.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: true,
	}
);

const nav = [
	{
		link: "/books",
		title: "Books",
	},
	{
		link: "/authors",
		title: "Authors",
	},
	{
		link: "/books/addbook",
		title: "Add Book",
	},
	{
		link: "/authors/addauthor",
		title: "Add Author",
	},
	{
		link: "/",
		title: "LogOut",
	},
];

const loginRouter = require('./src/routes/loginroute');
const signupRouter = require('./src/routes/signuproute');
const homeRouter = require('./src/routes/homerouter')(nav); //part#1point#3
const booksRouter = require('./src/routes/booksroute')(nav);
const authorsRouter = require('./src/routes/authorsroute')(nav);        //part#2point#6 navbars

const app = new express; 


app.set('views','./src/views'); 
app.set('view engine','ejs'); 

app.use(methodOverride('_method')); //to call put/delete in html
app.use(cors()); //part#2point#7
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname , '/public'))); 

app.use('/login',loginRouter); 
app.use('/signup',signupRouter); 
app.use('/home',homeRouter); 
app.use('/books',booksRouter); 
app.use('/authors',authorsRouter); 



app.get('/',function(req,res){

    res.render('index',{});
    
});




const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Server Ready on"+PORT); //part#1point#5
});