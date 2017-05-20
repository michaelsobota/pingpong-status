const fs = require('fs');
fs.watch('pingpong', function() {
	console.log("File 'pingpong' just changed!");
});
console.log("Now watching pingpong for changes...");