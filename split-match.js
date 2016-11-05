var fs = require('fs')
var through2 = require('through2')
var split2 = require('split2')

var token = process.argv[2];

var stream = fs.createReadStream('input-sensor.txt').pipe(
		through2({ objectMode: true }, function(chunk, enc, callback) {
    		var string = chunk.toString()
            string = string.substr(0, string.lastIndexOf(token));
    		var count = 0;
    		console.log('---------INPUT---------')
    		console.log(string)
    		
    		var result = string.replace(/\n/, '').split(token+' ')

		    this.push(result)
    		callback()
		})
	)

stream.on('data', function(data) {
    console.log('\n---------OUTPUT---------')
    console.log(data)
})

process.stdin
    .pipe(split2())
    .pipe(stream)