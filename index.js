var crypto    = require("crypto");
var fs        = require("fs");
var prompt    = require("prompt");
var path      = require("path");

module.exports = function(fn) {
  var from = path.join(process.cwd(), process.argv[2]);
  var to   = path.join(process.cwd(), process.argv[3]);

  var password = process.env['CONFIG_LEAF_PASSWORD'];

  console.log(1,password,process.env);

  prompt.start();

  prompt.get([
    {
      description: "Enter the config password (" + path.basename(to) + "):\n",
      name: "password",
      type: "string",
      hidden: true,
      replace: "*"
    }
  ], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      password = password || result.password;
      from = fs.createReadStream(from);
      to   = fs.createWriteStream(to);
      fn   = fn("cast5-cbc", password);

      from.pipe(fn).pipe(to);
      from.on("end", function () {
        console.log("done");
        prompt.stop();
      });
    }
  });
};
