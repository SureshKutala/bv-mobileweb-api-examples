var BV = BV || {};
// **** Basic config parameters for BV API *****
BV.config = { baseUrl : "http://reviews.apitestcustomer.bazaarvoice.com/bvstaging/data/", version: '5.3', passkey : '2cpdrhohmgmwfz8vqyo48f52g' };
BV.mobile = function(){
	return {
		sendRequest:function(val,options,cb){		
			$this = this;
			$.ajax({
				url:$this.buildQuery(val,options),
                                dataType:"jsonp",
				success:function(data){
					if (!data.hasErrors) {
						if (data.Results.length > 0) {
							if ($.isFunction(cb)) {								
								cb.call(this,data,options);								
							} else {
								$this.populateResults(data,options);
							}
						} else {
                            $this.handleExceptionResult('empty',options);
						}
					} else {
                        $this.handleExceptionResult('error',options);
					}
				}
			})
		},
		handleExceptionResult:function(exception,options) {
			this.toggleThrobber(false,options);
			var oExceptions = {
				'error':'There was an error when communicating with the server, please try again.',
				'empty':'No products found'
			};
			var oData = {
				exception:true,
				exceptionString:oExceptions[exception]
			};
			this.populateResults(oData,options);
		},
		buildQuery:function(val,options){
                        // **** Construct query string for BV API product request *****
			return BV.config.baseUrl + "/products.json?passkey=" + BV.config.passkey + "&apiversion=5.3&include=reviews&limit=10&filter=id:" + val
		},
		populateResults:function(data,url,options){
			var preWrapper = $(document.createElement('code'));
			preWrapper.addClass('prettyprint');
			var resultsMarkup =  preWrapper.html(JSON.stringify(data));
			$('#'+options.parentId+' #bv-api-url').append(url);
			$('#'+options.parentId+' #bv-api-response').append(resultsMarkup);
			prettyPrint();
			this.toggleThrobber(false,options);
			$('#'+options.parentId+' #bv-api-url').removeClass('none');
			$('#'+options.parentId+' #bv-api-response').removeClass('none');						
		},
		retreiveTemplate:function(strTemplate) {
			var tplSource = $("#"+strTemplate).html();
			var template = Handlebars.compile(tplSource);
			return template;
		},
        getCenter:function(el){
        	return {"top":$(el).height()/2,"left":$(el).width()/2}
        }, 		
        toggleThrobberWithOverlay:function(toggle){
        	if (toggle) {
	        	var backdrop = $(document.createElement('div'));
	        	backdrop.addClass('overlay');
				var throbber = $(document.createElement('img'));
				throbber.attr('src','images/throbber.gif');
				throbber.attr('id','bv-throbber');	
				throbber.addClass('throbber shadow rounded-corners none');
				$('body').append(throbber);
				var offsetWidth = throbber.outerWidth();
				var offsetHeight = throbber.outerHeight();
				var coords = this.getCenter('body');
				throbber.css('top',coords.top-offsetHeight);
				throbber.css('left',coords.left-offsetWidth);
				$('body').append(backdrop);	
				throbber.removeClass('none');
			} else {
				$('#bv-throbber').remove();	
			}
		},	
		toggleThrobber:function(toggle, options){
			if (toggle) {
				var throbber = $(document.createElement('img'));
				throbber.attr('src','images/throbber.gif');
				throbber.attr('id','bv-throbber');
				throbber.addClass('throbber rounded-corners shadow');
				$('#'+options.parentId+' .bv-app-content').append(throbber);	
			} else {
				$('#bv-throbber').remove();
			}			
		},				
		getURLParameter:function(name) {
		    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
		},
		hasHtml5Support: function() {
			try {
		   		return 'localStorage' in window && window['localStorage'] !== null;
		  	} catch (e) {
		    	return false;
		  }
		}	
	}
}();