# gulp-based-node-restarter-with-nodeinspector #

## This restarter does the following work: ##

1. Run Node.js server in `debug` mode;
2. Run `node-inspector` for server;
3. Automaticaly restart sever and `node-inspector` after changing source files;
4. Kill processes after exiting;


## Install ##

1. Instal modules
```
$ npm install --save-dev gulp
$ npm install --save-dev gulp-livereload
$ npm install --save-dev gulp-node-inspector
$ npm install --save-dev gulp-develop-server
```

2. Add gulp command to npm scripts to package.json
```json
{
	"scripts": {
		"start": "gulp server"
	}
}
```

3. Add gulpfile.js to project
```js
var gulp = require('gulp'),
	server = require('gulp-develop-server'),
	livereload = require('gulp-livereload'),
	nodeInspector = require('gulp-node-inspector'),
	serverFile = require('./package.json').main,
	tasks;


tasks = {
	serverWatch: function(){
		server.listen( { path: './' + serverFile, execArgv: ['--debug'] }, livereload.listen );
	},
	server: function(){
		function restart(file) {
			server.changed( function(error) {
				if(!error) livereload.changed({path: './' + serverFile, execArgv: ['--debug']});
			});
		}
		gulp.watch(["./**/*", "!./node_modules/**/*"]).on('change', restart);
	},
	nodeInspector: function(){
		gulp.src([]).pipe(nodeInspector());
	}
}

gulp.task('server:watch', ['debug'], tasks.serverWatch);
gulp.task('server', ['server:watch'], tasks.server);
gulp.task('debug', tasks.nodeInspector);
```

## Use ##
1. Run server
```
$ npm start
```

2. Open node-inspector in browser <http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=5858>
or <http://127.0.0.1:8080/?port=5858>
