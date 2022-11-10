let path = require('path')
let fs = require('fs-extra')
let _ = require('lodash')


/*
* 修改名字 将名字中的-去除
* */
module.exports = async (outFile) => {
  let basicPath = outFile || process.cwd()
  console.log(`basicPath`, basicPath)
  let tempFileList = await fs.readdir(basicPath)
  for (let i = 0; i < tempFileList.length; i++) {
    let n = tempFileList[i]
    if (/[jpg|png|mp4|mp3]$/.test(n)) {
      console.log(`n`, n)
      await fs.rename(`${basicPath}/${n}`, `${basicPath}/${n.replace(/^\d+\-/, '')}`)
    }
  }

}
