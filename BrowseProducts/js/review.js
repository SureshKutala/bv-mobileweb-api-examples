var BV = BV || {};
BV.productReview = function(){
	var $bm = BV.mobile,
		// Define page options here
		options = {
			parentId : 'review-page',
			template : 'reviewPage',
			requestType:'reviews',
			resultType:'reviews'        
		};  	
	return {
		init:function(){
			$.mobile.page.prototype.options.addBackBtn = true;
			var url = $.mobile.path.parseUrl(location.href);
			var id = url.search.replace('?','');
			// Kicks off request to BV API
			// id = {string} - product id
			// options = {object}
			// callback = {function} - callback function - optional		
			$bm.sendRequest(id,options,'');
			$bm.toggleThrobber(true,options);
		}
	}
}();
$( document ).unbind("pagechange");
// Listens for jquery mobile event 'pagechange' to fire init function
// Will not fire if back button has been clicked
$( document ).bind( "pagechange", function( event, ui ){
	if (!ui.options.reverse) {
		if (ui.toPage[0].id == "review-page") {
            BV.productReview.init();
		}	
	}	
});