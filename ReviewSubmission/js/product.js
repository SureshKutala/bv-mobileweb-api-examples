var BV = BV || {};
BV.productResults = function(){
	var $bm = BV.mobile,
		options = {
			pageType : 'product',
			parentId : 'product-page',
			template : 'productPage',
			requestType:'products',
			resultType:'reviews'        
		};   	
	return {
		init:function(){
			$.mobile.page.prototype.options.addBackBtn = true;			
			var url = $.mobile.path.parseUrl(location.href)
			var id = url.search.replace('?','')
			var callback = this.attachResultListeners;			
			$bm.sendRequest(id,options,callback)
			$bm.toggleThrobber(true, options);
		},	
		attachResultListeners:function(){
			$('.bv-review-results').click(function(e){
				e.stopPropagation();
				e.preventDefault();			
				$.mobile.changePage( e.currentTarget.href, {
					data: encodeURIComponent($(e.currentTarget).attr('data-id')),					
					transition: "slidefade",
					reverse: false,
				});
			})
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
$( document ).bind( "pagechange", function( event, ui ){
	if (!ui.options.reverse) {
		if (ui.toPage[0].id == "product-page") {
			BV.productResults.init()	
		}
	}
});