var BV = BV || {};
BV.mobile.photoupload = function(){
    var $bm = BV.mobile,
    options = {
        template : 'product-page',
        parentId : 'photo-upload',
        requestType:'products',
        resultType:'product'
    };
    return {
        init:function(){
            $bm.toggleThrobber(false,options);
            this.destroyListeners();
            $bm.sendRequest('1000001',options,this.displayProduct);
        },
        destroyListeners:function(){
            $('html').unbind();
        },
        displayProduct:function(data,options){
            $bm.toggleThrobber(false,options)
            $this = this;
            var template = $bm.retreiveTemplate(options.template);
            var markup = template(data.Results[0])
            $('#'+options.parentId+' .bv-app-content').empty()
            $('#'+options.parentId+' .bv-app-content').append(markup);
        }
    }
}();
 
$( document ).delegate("#photo-upload", "pagecreate", function() {
    BV.mobile.photoupload.init() 
});