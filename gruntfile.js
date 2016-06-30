module.exports = function(grunt) {
  grunt.initConfig ({

    /**
     * Import project information
     */
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Linting
     */
    jshint: {
      files: {
        src: [
          'src/*.js',
          'src/**/*.js'
        ]
      }
    },

    /**
     * Concatenate files into a build file.
     */
    concat: {
      options: {
        separator: ''
      },
      dist: {
        src: [
          'src/*.js',
          'src/**/*.js'
        ],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    /**
     * Minify build.
     */
    uglify: {
      lib: {
        options: {
          banner: '/*!\n' +
          ' * <%= pkg.name %>\n' +
          ' * @author <%= pkg.author %>\n' +
          ' * @version <%= pkg.version %>\n' +
          ' * @license <%= pkg.license %> licensed.\n' +
          ' */\n',
          mangle: {
            except: []
          },
          beautify: {
            width: 80,
            beautify: false
          }
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: '**/*.js',
          dest: 'dist'
        }]
      }
    },

    /**
     * Watch task
     */
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: [
          'src/*.js',
          'src/**/*.js'
        ],
        options: {
          spawn: false
        },
        tasks: ['jshint', 'concat', 'uglify']
      },
      html: {
        files: [
          '**/*.html'
        ],
        options: {
          spawn: false
        }
      }
    }
  });

  /**
   * Load grunt plugins
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'watch'
  ]);

  /**
   * Testing task
   */
  grunt.registerTask('lint', [
    'jshint'
  ]);

  /**
   * Minify task
   */
  grunt.registerTask('minify', [
    'uglify'
  ]);

  /**
   * Testing task
   */
  grunt.registerTask('lint', [
    'jshint'
  ]);
};
