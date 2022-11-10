var PDFImage = require("pdf-image").PDFImage;

var pdfImage = new PDFImage("大学物理知识点的总结.pdf");
pdfImage.convertFile().then(function (imagePaths) {
// [ /tmp/slide-0.png, /tmp/slide-1.png ]
});
