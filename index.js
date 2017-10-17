var crypto    = require("crypto");
var fs        = require("fs");
var path      = require("path");

module.exports = function(fn) {
  var from = path.join(process.cwd(), process.argv[2]);
  var to   = path.join(process.cwd(), process.argv[3]);

  var password = process.env['CONFIG_LEAF_PASSWORD'];

  from = fs.createReadStream(from);
  to   = fs.createWriteStream(to);
  fn   = fn("cast5-cbc", password);

  from.pipe(fn).pipe(to);
  from.on("end", function () {
    console.log("done");
  });

};
