/**
 * General Grunt setup
 */
'use strict';

var path = require('path');

module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  // Time how long tasks take (to optimize build times)
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    dirs: {
      output: 'dist'
    },

    connect: {
        server: {
          options: {
            port: 9001,
            livereload: true,
            base: 'app'
          }
        }
    },

    watch: {
      scss: {
        files: 'app/scss/**/*.scss',
        tasks: ['sass:dev']
      },
      reload: {
        files: ['app/css/**/*.css', 'app/js/*.js', 'app/**/*.html'],
        options: {
          livereload: true
        }
      }
    },

    sass: {
      dev: {
        options: {
          sourceMap: true
        },
        files: {
          'app/css/main.css': 'app/scss/main.scss'
        }
      },
      dist: {
        options: {
          outputStyle: "compressed"
        },
        files: {
          'app/<%= dirs.output %>/css/main.css': 'app/scss/main.scss'
        }
      }
    },

    // Minify html
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'app/<%= dirs.output %>/index.html': 'app/index.html'     // 'destination': 'source'
        }
      }
    },

    // The banner
    tag: {
      banner: '/*!\n' +
      ' * <%= pkg.name %>\n' +
      ' * <%= pkg.description %>\n' +
      ' * @author <%= pkg.author.name %>\n' +
      ' * @version <%= pkg.version %>\n' +
      ' */\n'
    }

  });

  grunt.registerTask('default', [
    'sass:dev',
    'connect',
    'watch'
    ]);

  grunt.registerTask('build', [
    'sass:dist',
    'htmlmin'
    ]);
};