const util = require("util");
const path = require("path");
const fs = require("graceful-fs");
const makeDir = require("make-dir");
const writeFile = util.promisify(fs.writeFile);
const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");
const imageminJpegAutorotate = require("./imagemin-jpeg-autorotate");

const srcdir = "vl1";
const distdir = "dist";

const compress = (quality = 100, width, suffix) =>
  imagemin([srcdir + "/**/*.{jpg,png}"], {
    plugins: [
      imageminJpegAutorotate({
        disable: false,
      }),
      imageminWebp({
        metadata: "all",
        quality: quality,
        ...(width
          ? {
              resize: {
                width,
                height: 0,
              },
            }
          : {}),
      }),
    ],
  }).then((files) =>
    files.forEach(async (v) => {
      let source = path.parse(v.sourcePath);
      v.destinationPath = `${source.dir.replace(srcdir, distdir)}/${
        source.name
      }${suffix ? "." + suffix : ""}.webp`;
      await makeDir(path.dirname(v.destinationPath));
      await writeFile(v.destinationPath, v.data);
    })
  );

compress();
compress(80, 600, "medium");
