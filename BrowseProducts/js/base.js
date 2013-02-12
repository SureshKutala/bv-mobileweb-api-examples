$(document).ready(function() {
	// Setting jquery mobile defaults here.
    $.mobile.pushStateEnabled = true;
    $.mobile.page.prototype.options.backBtnText = "Back";
    $.mobile.page.prototype.options.domCache = true;					  

	// Handlebar helper to render stars
	Handlebars.registerHelper('starRating', function(rating, range) {
            var ratingFloor = Math.floor(rating);
            var ratingTens = Math.floor(((rating - ratingFloor) * 10));
            var strStarRating = "<img src=\"http://reviews.myshco.com/9344/" + ratingFloor + "_" + ratingTens + "/" + range + "/rating.gif\" />";
	  	return new Handlebars.SafeString(
	  		strStarRating
	  	);
	});		
});



