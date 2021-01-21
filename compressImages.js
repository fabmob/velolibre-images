const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");

imagemin(["./vl1/**/*.{jpg,png}"], {
  destination: "./dist/",
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
}).then(() => {
  console.log("Images Converted Successfully!!!");
});
