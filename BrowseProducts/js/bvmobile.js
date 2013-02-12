var BV = BV || {};
// **** Basic config parameters for BV API *****
BV.config = { baseUrl : "http://reviews.myshco.com/bvstaging/data/", version: '5.4', passkey : '72n07szwiwjspk7x6idcry4ch' };
BV.mobile = function(){
	return {
		// Handles all ajax calls for application
		// str = {string} - value to be passed to the api
		// options = {object} - data to help build query string
		// cb = {function} - callback function - optional
		sendRequest:function(str,options,cb){
			$this = this;
			$.ajax({
				url:$this.buildQuery(str,options),
                                dataType:"jsonp",
				success:function(data){
					if (!data.hasErrors) {
						if (data.Results.length > 0) {
							$this.populateResults(data,options);
							if ($.isFunction(cb)) {
								cb.call();								
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
		// Handler for ajax submussion failure, displays appropriate error message
		handleExceptionResult:function(exception,options) {
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
		// Method returns properly formatted BV API url 
		// val = {string} - value to be passed to API
		// options = {object} - data values to determine url string ie: options.products.reviews to retreive API url for retreiving product reviews
		buildQuery:function(val,options){
                         // **** Construct query string for BV API product and reviews requests *****
			oStringFn = {
				'products': {
                                    'product':BV.config.baseUrl + "/products.json?passkey=" + BV.config.passkey + "&apiversion=5.3&search=" + val + "&stats=reviews&filter=categoryid:neq:BV_MISCELLANEOUS_CATEGORY",
                                    'reviews':BV.config.baseUrl + "/products.json?passkey=" + BV.config.passkey + "&apiversion=5.3&include=reviews&stats=reviews&limit=10&filter=id:" + val
				},
				'reviews':{
                                    'reviews':BV.config.baseUrl + "/reviews.json?passkey=" + BV.config.passkey + "&apiversion=5.3&filter=id:" + val
				}
			};
			return oStringFn[options.requestType][options.resultType];
		},

		// Method responsible for mergeing API data and Handlebar templates
		// data = {object} - response from BV API
		// options = {object} - data values which determine where processed templates should be rendered ie: options.parentId = id of container where content will be placed
		populateResults:function(data,options){
			this.toggleThrobber(false,options);
			$this = this;
			var sortedReviews = [];
			if (!$.isEmptyObject(data.Includes)){
				if (data.Includes.ReviewsOrder.length > 0) {
					for (var i=0;i < data.Includes.ReviewsOrder.length;i++) {
						sortedReviews.push(data.Includes.Reviews[data.Includes.ReviewsOrder[i]]);
					}
				}
				data['sortedReviews'] = sortedReviews;
			}
			var template = this.retreiveTemplate(options.template);
			var markup = template(data);
			$('#'+options.parentId+' .bv-app-content').empty();
			$('#'+options.parentId+' .bv-app-content').append(markup);
		},
		// Helper method which processes and compiles data into the handlebar template.
		// strTemplate = {string} - string representing a handlebar template
		retreiveTemplate:function(strTemplate) {
			var tplSource = $("#"+strTemplate).html();
			var template = Handlebars.compile(tplSource);
			return template;
		},
		// Helper method to toggle throbber
		// toggle = {boolean} - true will display throbber, false will remove throbber
		toggleThrobber:function(toggle, options){
			if (toggle) {
				var throbber = $(document.createElement('img'));
				throbber.attr('src','images/throbber.gif');
				throbber.attr('id','bv-throbber');				
				$('#'+options.parentId+' .bv-app-content').append(throbber);	
			} else {
				$('#bv-throbber').remove();
			}			
		}	
	}
}();