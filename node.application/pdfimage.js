var PDFImage = require("pdf-image").PDFImage;




module.exports = async (outFile) => {
  console.log(`22:30 1`, 1)
  var pdfImage = new PDFImage("11111.pdf");

  console.log(`22:43 pdfImage`, pdfImage)

  pdfImage.convertFile().then(function (imagePaths) {
    console.log(`22:30 imagePaths`, imagePaths)
// [ /tmp/slide-0.png, /tmp/slide-1.png ]
  }).catch((res) => {
    console.log(`res`, res)
  });
}

/*
* 需要借助外部架包
* D:\01\practice\node.tool.script\node_modules\pdf-image\index.js
*       "pdfinfo \"%s\"",
* */
