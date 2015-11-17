/* jshint node: true */

/**
 * General Grunt setup
 */

module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    dirs: {
      output: 'app/dist'
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
      js: {
        files: 'app/js/**/*.js',
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      reload: {
        files: ['app/css/**/*.css', 'app/js/*.js', 'app/**/*.html'],
        options: {
          livereload: true
        }
      }
    },

    // node-sass task for Scss partials
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
          '<%= dirs.output %>/css/main.css': 'app/scss/main.scss'
        }
      }
    },

    // Lint the JS source
    jshint: {
      files: ['app/js/**/*.js', '!app/dist/**'],
      options: {
        curly:   true,
        eqeqeq:  true,
        latedef: true,
        undef:   true,
        eqnull:  true,
        browser: true,

        globals: {
          // Environments
          console:    true,

          // General Purpose Libraries
          $:          true,
          jQuery:     true
        }
      }
    },

    // Minify html
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          // Dictionary of files 'destination': 'source'
          '<%= dirs.output %>/index.html': 'app/index.html'
        }
      }
    },

    // minify scripts and add a banner
    uglify: {
      options: {
        banner: '<%= tag.banner %>',
        screwIE8: true
      },
      dist: {
        files: {
          '<%= dirs.output %>/js/main.js': ['app/js/main.js']
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

  // Load grunt tasks from package.json
  require('load-grunt-tasks')(grunt);
  // Time how long tasks take (to optimize build times)
  require('time-grunt')(grunt);

  grunt.registerTask('default', [
    'sass:dev',
    'jshint',
    'connect',
    'watch'
    ]);

  grunt.registerTask('build', [
    'sass:dist',
    'jshint',
    'uglify:dist',
    'htmlmin'
    ]);
};