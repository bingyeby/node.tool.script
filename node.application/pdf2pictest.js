/*
步骤:
1、npm init -y
2、npm i pdf2pic pdf-lib fs-extra
*/
const { fromPath, fromBuffer } = require('pdf2pic')
const { PDFDocument } = require('pdf-lib')
const fs = require('fs')
const fsExtra = require('fs-extra') // npm i


const pdfToImage = async (pdfBuffer, savePath) => {
  try {
    if (!fsExtra.pathExistsSync(savePath)) fsExtra.ensureDirSync(savePath)

    const baseOptions = {
      density: 330, // 图片缩放比例
      saveFilename: 'untitled', // 图片保存前缀名
      format: 'png', // 图片格式
      savePath, // 保存路径
    }

    let imgBufferList = [], imgBase64List = []

    // 获取PDF
    const pdfDoc = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true }) // ignoreEncryption: true 用于获取加密文档 但是有一定的风险


    // 获取PDF所有页面
    const pages = await pdfDoc.getPages()

    // 循环处理页面达到我们想要的效果(此处我们只是将页面转为图片并存储)
    for (let [pageIndex, page] of pages.entries()) {
      // 获取页面的尺寸
      const { width, height } = await page.getSize()

      // 接下来开始转换 可以从很多格式转换 具体看这个文档 https://github.com/yakovmeister/pdf2pic-examples
      const toImageOptions = { ...baseOptions, width, height }

      // 1、保存图片
      const storeAsImage = fromBuffer(pdfBuffer, toImageOptions);
      storeAsImage(pageIndex + 1).then(({ path }) => {
        // 获取图片Buffer
        const data = fs.readFileSync(path)
        imgBufferList.push({ page: pageIndex + 1, data })
        if (pageIndex + 1 === pages.length) {
          console.log(imgBufferList)
        }
      }).catch(err => {
        console.log(`第${pageIndex + 1}页转换失败`);
        console.log(err)
      })

      // 2、直接获取图片的base64
      // new Promise(async (resolve, reject) => {
      //   const [{ base64: data }] = await fromBuffer(pdfBuffer, toImageOptions).bulk(pageIndex + 1, true)
      //   if (data) resolve({ pageIndex, data })
      //   else reject()
      // }).then(({ data }) => {
      //   imgBase64List.push({ page: pageIndex + 1, data })
      //   if (pageIndex + 1 === pages.length) {
      //     console.log(imgBase64List);
      //   }
      // }).catch(err => {
      //   console.log(`第${pageIndex + 1}页转换失败`);
      //   console.log(err)
      // })
    }
  } catch (err) {
    console.log(err);
  }
}
// pdf-lib要求file必须是Buffer 所以我们先用fs模块获取PDF的Buffer格式
const pdfBuffer = fs.readFileSync('./大学物理知识点的总结.pdf') // 这里我们就直接同步获取了
pdfToImage(pdfBuffer, './images')
