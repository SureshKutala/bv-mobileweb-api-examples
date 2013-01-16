var BV = BV || {};
BV.mobile.productSearch = function(){
  var $bm = BV.mobile,
      // Define page options here
      options = {
        parentId : 'search-home',
        template : 'searchResults',
        requestType:'products',
        resultType:'product'        
      }
  ;   
  return {
    init:function(){
      // tells jQuery Mobile to not destroy rendered views when page is changed
      $.mobile.page.prototype.options.domCache = true;
      this.destroyListeners();
      this.initListeners();     
    },
    destroyListeners:function(){
        $('html').unbind();
    }, 
    initListeners:function(){
      $this = this;    
      // Listening to enter keypress to fire search request       
      $('html').bind('keypress', function(e){
          if(e.keyCode == 13) {            
            if ($('#search-input').hasClass('no-searches')) {
              var animOptions = { direction: "vertical" };
              $("#bv-header").hide('blind', animOptions , 300);
              $('#search-input').removeClass('no-searches');
            }
            // Defining callback function to perform after results have returned
            var callback = $this.attachResultListeners;
            // Kicks off request to BV API
            // id = {string} - value for search input
            // options = {object}
            // callback = {function} - callback function
            $bm.sendRequest($('#search-input').val(),options,callback);
            $('#search-input').blur();
            if ($('#bv-throbber')) {
              $('#bv-throbber').remove();       
            }
            $('#'+options.parentId+' .bv-app-content').empty();
            $bm.toggleThrobber(true, options);
          }
      });
    },
    // Attaching listeners to rendered results, sent as callback function
    attachResultListeners:function(){   
      // fire jQuery Mobile method to change view and loads referenced page, defined in href of target link. Append product ID to URL to be consumed by product.js
      $('.bv-search-results').click(function(e){
        e.stopPropagation();
        e.preventDefault();

        $.mobile.changePage( e.currentTarget.href, {
          data: encodeURIComponent($(e.currentTarget).attr('data-id')),
          reverse: false,
          transition: "slidefade",
        });
      });
      // fire jQuery Mobile method to change view and loads referenced page, defined in href of target link. Append product ID to URL to be consumed by product.js, listening for right to left swipe
      $('.bv-search-results').bind("swipeleft", function(e){

        $.mobile.changePage( e.currentTarget.href, {
          data: encodeURIComponent($(e.currentTarget).attr('data-id')),
          reverse: false,
          transition: "slidefade",
        });
      });  
    } 
  }
}();
$(document).unbind("pagechange");
// Listens for jquery mobile event 'pageshow' to fire init function
$(document).on('pageshow','#search-home',function(event, ui){  
    BV.mobile.productSearch.init();       
}); 