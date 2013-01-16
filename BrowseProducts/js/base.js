$(document).ready(function() {
	// Setting jquery mobile defaults here.
    $.mobile.pushStateEnabled = true;
    $.mobile.page.prototype.options.backBtnText = "Back";
    $.mobile.page.prototype.options.domCache = true;					  

	// Handlebar helper to render stars
	Handlebars.registerHelper('starRating', function(rating, range) {										
		var strStarRating = '';
		for (var i=0;i<range;i++) {
			if (i < rating)	{
				strStarRating += '<span>&#x272D;</span>';
			} else {
				strStarRating += '<span>&#x2729;</span>';
			}
		}
	  	return new Handlebars.SafeString(
	  		strStarRating
	  	);
	});		
});



