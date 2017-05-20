var AWS = require('aws-sdk');

AWS.config.region = 'us-west-2'

var s3bucket = new AWS.S3({params: {Bucket: 'pingpong-status'}});

const fs = require('fs');
fs.watch('pingpong', function() {

var status = fs.readFileSync('pingpong');

s3bucket.upload({Key: 'pingpong-current-status', Body: '{"pingpong": "'+status+'"}'}, function(err, data) {
  if (err) {
    console.log("Error uploading data: ", err);
  } else {
    console.log("Success");
	var params = {
	  Bucket: 'pingpong-status', /* required */
	  Key: 'pingpong-current-status', /* required */
	  ACL: 'public-read'
	};
	
	var s3 = new AWS.S3();
	s3.putObjectAcl(params, function(err, data) {
	  if (err) {
	    console.log("Error setting permissions: ", err);
	  } else {
	    console.log("Permissions Set");
	  }
});
  }
});

});
console.log("Now watching the ping pong room");




