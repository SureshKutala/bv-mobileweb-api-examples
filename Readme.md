# Bazaarvoice Web Reference Examples
<hr />

###Browse Products
Illustrates use of the Bazzarvoice API to fetch and display products and associated reviews.

* js/bvmobile.js - Shows how to form a request to the API.  Pay particular attention to the initial configuration setup and "buildQuery" functions.

###Review Submission.
Illustrates use of the Bazzarvoice API to submit reviews via the BV API.

* js/submitreview.js - Shows how to craft submission endpoint and do partial validation of submission parameters.  Note that due to cross-domain security restrictions, the form will post directly to our API and display an example ajax response.  In practice, this would likely be an ajax call instead.

Additionally, it is worth noting that default submission behavior is "Preview."  In order to affect server data, add an additional parameter "Action=Submit."