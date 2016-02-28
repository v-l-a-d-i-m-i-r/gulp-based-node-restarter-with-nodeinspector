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
