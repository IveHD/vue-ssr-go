const path = require('path');
const express = require('express');
// const LRU = require('lru-cache');
const microcache = require('route-cache');
const { createBundleRenderer } = require('vue-server-renderer');

const app = express();
const isProd = process.env.NODE_ENV === 'production';

let renderer, readyPromise;
let templatePath = path.resolve(__dirname, './index.template.html');
if(isProd) {
	const template = require('fs').readFileSync(templatePath, 'utf-8')
	const serverBundle = require('./dist/vue-ssr-server-bundle.json')
	const clientManifest = require('./dist/vue-ssr-client-manifest.json')

	renderer = createBundleRenderer(serverBundle, {
		// cache: LRU({
		// 	max: 1000,
		// 	maxAge: 1000 * 60 * 15
		// }),
		template,
		clientManifest
	});
}else {
	readyPromise = require('./build/setup-dev')(app, templatePath, (bundle, option) => {
		renderer = createBundleRenderer(bundle, option);
	});
}


const serve = (_path, cache) => express.static(path.resolve(__dirname, _path), {
	maxAge: cache ? 1000 * 60 * 60 * 24 * 30 : 0
});

app.use('/favicon.ico', serve('./public'));
app.use('/dist', serve('./dist', true));
app.use('/public', serve('./public', true));
app.use('/manifest.json', serve('./manifest.json', true));

app.use(microcache.cacheSeconds(10, req => true && req.originalUrl));

function render (req, res) {
	const s = Date.now();
	res.setHeader("Content-Type", "text/html");
	res.setHeader("Server", "vue-server-render");

	const handleError = err => {
		if (err.url) {
			res.redirect(err.url);
		} else if (err.code === 404) {
			res.status(404).send('404 | Page Not Found...');
		} else {
			res.status(500).send('500 | Internal Server Error...');
			console.log(err.stack);
		}
	};

	const context = {
		title: 'Vue RSS',
		url: req.url
	}

	renderer.renderToString(context, (err, html) => {
		if (err) {
			return handleError(err);
		}
		res.send(html);
		console.log(`${req.url}: ${Date.now() - s}ms`)
	});
}

app.get('/', isProd ? render : (req, res) => {
	readyPromise.then(() => render(req, res));
});

app.get('/view/*', isProd ? render : (req, res) => {
	readyPromise.then(() => render(req, res));
});

if(!isProd) {
	require('./mock/index.js')(app);
}

app.listen(4000, () => {
	console.log('listening 127.0.0.1:4000');
});