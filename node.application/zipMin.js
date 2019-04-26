let path = require('path')
let nodeJsZip = require('nodeJs-zip')
let fs = require('fs-extra')
let _ = require('lodash')

/*
* zip不能实现深层次的文件过滤
* 通过复制文件来实现文件过滤,先将过滤后的文件存储至临时目录,再打包临时目录,完成后删除临时目录
* */
let copyFilter = (basicPath, copyTemp) => {
  return fs.copy(basicPath, copyTemp, {
    filter: (src, dest) => {
      return !_.some(['node_modules', '.idea', '.git', '.vscode'], (n) => {
        return src.includes(n)
      })
    },
  }).then(() => {
    console.log('copy success')
  }).catch((n) => {
    console.log(`error`, n)
  })
}


module.exports = async (outFile) => {
  let basicPath = outFile || process.cwd()

  let baseName = path.basename(basicPath) // 被复制文件夹的名字
  let copyTemp = path.resolve(basicPath, `../${baseName}_temp_${new Date().getTime()}`) // 过滤文件复制出来的临时目录
  let zipPath = path.join(basicPath, baseName + '.zip') // zip文件的目录

  // 清空缓存,历史数据
  await fs.remove(copyTemp)
  await fs.remove(zipPath)

  // 备份过滤文件
  await copyFilter(basicPath, copyTemp)

  let tempFileList = await fs.readdir(copyTemp)

  // 文件过滤(可删除,已无效)
  let fileListFilter = tempFileList.filter((n) => {
    return !['node_modules', '.idea', '.git', '.vscode'].includes(n) // 待排除文件名
  }).map((n) => {
    return path.join(copyTemp, n)
  })

  // .zip 是同步操作
  nodeJsZip.zip(fileListFilter, {
    name: baseName,
    dir: basicPath,// zip放置的文件目录
  })

  // 删除临时文件夹
  await fs.remove(copyTemp)
}
