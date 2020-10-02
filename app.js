var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
	flash      = require("connect-flash"),
	passport   = require("passport"),
	localStrategy = require("passport-local"),
    Campground = require("./models/campground"),
	Comment    = require("./models/comment"),
	User       = require("./models/user"),
	app        = express(),
	//seedDB     = require("./seeds"),
    methodOverride = require("method-override");
//requiring routes
var commentRoutes     = require("./routes/comments"),
	campgroundRoutes  = require("./routes/campgrounds"), 
	indexRoutes       = require("./routes/index"); 

//seedDB();
//mongoose.connect("mongodb://localhost/yelpcamp");
mongoose.connect("mongodb+srv://Rufus:*Rufus123*@webdev.aitzi.mongodb.net/<dbname>?retryWrites=true&w=majority",{
	useNewUrlParser : true,
	useCreateIndex  : true
}).then(()=>{
	console.log("Connected to database");
}).catch(err=>{
	console.log("Error:",err.message);
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());

//passportConfig
app.use(require("express-session")({
	secret : "Rusty is a cute dog!!!",
	resave : false,
	saveUninitialized : false 
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen( 3000 ,function(){
	console.log("Yelp Camp has Started y5!!");
});