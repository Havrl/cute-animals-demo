module.exports = function (lineman) {
  return {
    config: {
      strip_code: {
        /*options: {
          start_comment: "start-jQuery-lib",
          end_comment: "end-jQuery-lib"
        },*/
        src: "<%= files.js.concatenated %>"
      }
    }
  };
};
