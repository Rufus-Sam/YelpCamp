var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX 
router.get("/",function(req,res){
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log("cannot get");
		}
		else{
			res.render("campgrounds/index",{
				campgrounds:allCampgrounds,
				currentUser:req.user
			});
		}
	})
});

//CREATE
router.post("/",middleware.isLoggedIn,function(req,res){
	var name= req.body.name;
	var price= req.body.price;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id : req.user._id,
		username : req.user.username 
	};
	var newCampground = {
		name :name ,
		price :price,
		image:image ,
		description : description,
		author : author 
	};
	//create new campground and  save to database
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log("no");
		}
		else{
			res.redirect("/campgrounds");
		}
	})
});

//SHOW FORM TO CREATE
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
})

//SHOW
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err || !foundCampground){
			req.flash("error" , "Campground Not found");
			res.redirect("back");
		}
		else{
			res.render("campgrounds/show",{campground : foundCampground});
		}
	});	
});

//EDIT route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		res.render("campgrounds/edit" , {campground : foundCampground});
	});		
});
//UPDATE route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndUpdate(
		req.params.id,
		req.body.campground,
		function(err,updatedCampground){
		if(err){
			res.redirect("/campground");	
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});
//DESTROY
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	})
});

module.exports = router;
