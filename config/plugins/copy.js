module.exports = function(lineman) {
  return {
    config: {
      copy: {
        server: {
          files: [
            {
              expand: true,
              cwd: "server",
              src: "**",
              dest: 'dist'
            }
          ]
        }
      }
    }
  };
};