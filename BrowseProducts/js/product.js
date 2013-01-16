var BV = BV || {};
BV.productResults = function(){
	var $bm = BV.mobile,
		// Define page options here
		options = {
			parentId : 'product-page',
			template : 'productPage',
			requestType:'products',
			resultType:'reviews'        
		};   	
	return {
		init:function(){
			$.mobile.page.prototype.options.addBackBtn = true;
			// Retrieve product id from url 		
			var url = $.mobile.path.parseUrl(location.href);
			var id = url.search.replace('?','');
			var callback = this.attachResultListeners;			
			// Kicks off request to BV API
			// id = {string} - product id
			// options = {object}
			// callback = {function} - callback function
			$bm.sendRequest(id,options,callback);
			$bm.toggleThrobber(true, options);
		},	
		attachResultListeners:function(){
			// fire jQuery Mobile method to change view and loads referenced page, defined in href of target link. Append review ID to URL to be consumed by review.js
			$('.bv-review-results').click(function(e){
				e.stopPropagation();
				e.preventDefault();			
				$.mobile.changePage( e.currentTarget.href, {
					data: encodeURIComponent($(e.currentTarget).attr('data-id')),					
					transition: "slidefade",
					reverse: false,
				});
			})
			// fire jQuery Mobile method to change view and loads referenced page, defined in href of target link. Append review ID to URL to be consumed by review.js, listening for right to left sw
			$('.bv-review-results').bind("swipeleft", function(e){
				$.mobile.changePage( e.currentTarget.href, {
					data: encodeURIComponent($(e.currentTarget).attr('data-id')),
					transition: "slidefade",					
					reverse: false,
				});
			});			
		}
	}
}();
$( document ).unbind("pagechange");
// Listens for jquery mobile event 'pagechange' to fire init function
// Will not fire if back button has been clicked
$( document ).bind( "pagechange", function( event, ui ){
	if (!ui.options.reverse) {
		if (ui.toPage[0].id == "product-page") {
            BV.productResults.init();
		}
	}
});