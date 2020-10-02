var mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment   = require("./models/comment");


var data = [
	{
		name : "Viking nest",
		image : "https://visithoodriver.com/wp-content/uploads/2018/03/camp.jpg",
		author : {
			username : "Guess if you can "
		},
		description:"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
	},
	{
		name : "king",
		image : "http://www.info-namibia.com/images/galleries/kaoko/epupa-camp/07.jpg",
		author : {
			username : "Guess if you can "
		},
		description:"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
	},
	{
		name : "Vit",
		image : "https://www.scotland-holiday-cottage.com/borders/scottish-borders-cottage-front.jpg",
		author : {
			username : "Guess if you can "
		},
		description:"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
	}
]



function seedDB(){
	//Remove all campgrounds
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		}
		console.log("Removed campgrounds");
		//add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed,function(err,campground){
				if(err){
					console.log(err);
				}
				console.log("Added a campground");
				Comment.create({
					text : "I wish there was internet here.",
					author : {
						username : "Guess if you can "
					}
				},function(err,comment){
					if(err){
						console.log(err);
					}
					else{
						campground.comments.push(comment);
						campground.save();
						console.log("Added a comment");
					}
				});
			});
	    });
	});
};	
	//add a few comment
module.exports = seedDB;


