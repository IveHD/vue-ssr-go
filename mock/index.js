const path = require('path');
const fs = require('fs');

module.exports = function(app) {
	app.all('/api/*', (req, res) => {
		console.log('mock-path:', req.url);
		fs.readFile(path.resolve(__dirname, './mock.json'), function(err, json){
			if(!err){
				let data = JSON.parse(json);
				let urls = Object.keys(data);
				if(!data[req.url.split('?')[0]]) {
					res.end(`There is no \'${req.url.split('?')[0]}\' in mock.json...`);
					return;
				}
				res.send(data[req.url.split('?')[0]]);	
			}else{
				console.log(err)
			}
		});
	});
}