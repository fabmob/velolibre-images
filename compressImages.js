const util = require("util");
const path = require("path");
const fs = require("graceful-fs");
const makeDir = require("make-dir");
const writeFile = util.promisify(fs.writeFile);
const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");

const srcdir = "vl1";
const distdir = "dist";

imagemin([srcdir + "/**/*.{jpg,png}"], {
  plugins: [
    imageminWebp({
      //   quality: 90
      //   ,
      //   resize: {
      //     width: 1000,
      //     height: 0
      //   }
    }),
  ],
}).then((files) =>
  files.forEach(async (v) => {
    let source = path.parse(v.sourcePath);
    v.destinationPath = `${source.dir.replace(srcdir, distdir)}/${
      source.name
    }${".webp"}`;
    await makeDir(path.dirname(v.destinationPath));
    await writeFile(v.destinationPath, v.data);
  })
);
