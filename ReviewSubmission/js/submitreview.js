var BV = BV || {};
BV.mobile.submitReview = function(){  	
    var $bm = BV.mobile,
    options = {
        parentId : 'submit-review'      
    };
    return {
        init:function(){			
            $this = this;
            this.initStarRating();
            $.mobile.page.prototype.options.addBackBtn = false;
            // Set the form Action
            var submitUrl = BV.config.baseUrl + "submitreview.json?passkey=" + BV.config.passkey + "&apiversion=5.3"
            $('form').get(0).setAttribute('action', submitUrl);
           
           $("#content-placeholder").html(template(data));

           $("#bv-submit-review-form").submit(function(e) {
                if(!$this.submitReviewForm(e)){
                    e.preventDefault();
                    return false;
                } 
                return true;
            });
        },
        initStarRating:function(){
            $('.bv-fieldset-rating').mouseenter(
                function() { 
                    $(this).addClass("hover");
                    $(this).prevUntil("ul").addClass("hover");
                }).mouseleave(
                function() { 
                    $(this).removeClass("hover");
                    $(this).prevUntil("ul").removeClass("hover");
                });
            $('.bv-fieldset-rating').click(
                function(e) {
                    $(this).parent('ul.bv-fieldset-rating-group').addClass("rated");	
                    $(this).removeClass("off").addClass("on");
                    $(this).prevUntil("ul").removeClass("off").addClass("on");
                    $(this).nextUntil("ul").removeClass("on").addClass("off");
                    $('#review-rating').val($(this).attr('rating'));
                });
        },
        submitReviewForm:function(e){
            var arrError = [];
            var formValues = {};
            var isComplete = true;
            var formData = $('#bv-submit-review-form').serializeArray();
            for (var i=0;i<formData.length;i++){
                if (formData[i].value == '') {
                    isComplete = false;
                    arrError.push(formData[i].name);
                } else {
                    formValues[formData[i].name.toLowerCase()] = formData[i].value;
                }                
            }            
            if (isComplete) {
                if (formValues.review.length < 50) {
                    window.alert('Your review is too short. Please use at least 50 characters!');
                    return false;
                }
                return true;
            } else {
                var messageString = 'Please fix the following fields: ';
                var totalErrors = arrError.length;
                for (var i=0;i<arrError.length;i++) {
                    if (i == totalErrors) {
                        messageString += 'and';
                    }  
                    messageString += arrError[i].toLowerCase();
                    if (i = totalErrors) {
                        messageString += '.';
                    } else {
                        messageString += ', ';       
                    }
                }
                window.alert(messageString);
                return false;
            }
        }
    }
}();

$( document ).unbind("pagechange");
$( document ).bind( "pagechange", function( event, ui ){
    if (!ui.options.reverse) {
        if (ui.toPage[0].id == "submit-review") {
            BV.mobile.submitReview.init()	
        }	
    }	
});