/*
步骤:
1、npm init -y
2、npm i pdf2pic pdf-lib fs-extra
*/
const {fromPath, fromBuffer} = require('pdf2pic') // GraphicsMagick-1.3.33-Q8 gs952w64.exe
const {PDFDocument} = require('pdf-lib')
const fs = require('fs')
const fsExtra = require('fs-extra')
// https://github.com/yakovmeister/pdf2image

const glob = require('glob')
const path = require('path')

/**
 *
 * @param pdfPath
 * @param savePath
 * @returns {Promise<void>}
 */
const pdfToImage = async (pdfPath, savePath) => {

  let  pdfBuffer = fs.readFileSync(pdfPath)
  try {
    if (!fsExtra.pathExistsSync(savePath)) fsExtra.ensureDirSync(savePath)

    const baseOptions = {
      density: 330, // 图片缩放比例 330 模糊与否 会影响执行时间
      saveFilename: path.basename(pdfPath), // 图片保存前缀名
      format: 'png', // 图片格式
      savePath, // 保存路径
    }

    let imgBufferList = [], imgBase64List = []

    // 获取PDF
    const pdfDoc = await PDFDocument.load(pdfBuffer, {ignoreEncryption: true}) // ignoreEncryption: true 用于获取加密文档 但是有一定的风险

    // 获取PDF所有页面
    const pages = await pdfDoc.getPages()

    // 循环处理页面达到我们想要的效果(此处我们只是将页面转为图片并存储)
    for (let [pageIndex, page] of pages.entries()) {
      // 获取页面的尺寸
      const {width, height} = await page.getSize()

      // 接下来开始转换 可以从很多格式转换 具体看这个文档 https://github.com/yakovmeister/pdf2pic-examples
      const toImageOptions = {...baseOptions, width, height}

      // 1、保存图片
      const storeAsImage = fromBuffer(pdfBuffer, toImageOptions);

      console.log(`22:25 pageIndex`, pageIndex)

      try {
        await storeAsImage(pageIndex + 1)
        console.log(`11:23 成功 ${pageIndex}`)
      } catch (e) {
        console.log(`11:23 失败 ${pageIndex}`)
        console.log(`11:23 e`, e)
      }

      // storeAsImage(pageIndex + 1).then(({path}) => {
      //   // 获取图片Buffer
      //   const data = fs.readFileSync(path)
      //   imgBufferList.push({page: pageIndex + 1, data})
      //   if (pageIndex + 1 === pages.length) {
      //     console.log(imgBufferList)
      //   }
      // }).catch(err => {
      //   console.log(`第${pageIndex + 1}页转换失败`);
      //   console.log(err)
      // })

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

module.exports = async (params) => {

  glob('**/*.pdf', {ignore: 'node_modules/**'}, async (er, files) => {

    console.log(`16:06 files`, files)

    await pdfToImage(files[0], './')
  })

  return


// pdf-lib要求file必须是Buffer 所以我们先用fs模块获取PDF的Buffer格式
  await pdfToImage('./11111.pdf', './')
}


/*
*     // pages[0]
https://pdf-lib.js.org/
*
*
    const pdfDoc1 = await PDFDocument.create()
    const [existingPage] = await pdfDoc1.copyPages(pdfDoc, [0])
    await pdfDoc1.addPage(existingPage)

    let base64DataUri = await pdfDoc.saveAsBase64({ dataUri: true })

    console.log(`1:18 base64DataUri`, base64DataUri)
    const fileDataDecoded = Buffer.from(base64DataUri, 'base64');
    fs.writeFile("./test.png", fileDataDecoded, function (err) {
      //Handle Error
    });
* */

/*
* pdf2Image Pdf文件存为jpg NodeJs实现
https://blog.csdn.net/GYBIN02/article/details/123132817?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-1-123132817-blog-125925437.pc_relevant_3mothn_strategy_and_data_recovery&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-1-123132817-blog-125925437.pc_relevant_3mothn_strategy_and_data_recovery&utm_relevant_index=2
https://github.com/yakovmeister/pdf2image
https://github.com/yakovmeister/pdf2image/blob/master/docs/gm-installation.md
https://stackoverflow.com/questions/69115086/gm-exe-convert-no-decode-delegate-for-this-image-format-input-pdf
https://sourceforge.net/p/graphicsmagick/support-requests/41/#7ecd/beb0
需要安装在c盘  GraphicsMagick 要添加到path  Ghostscript 不一定添加到path
* */
