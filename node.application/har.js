let fss = require('fs-extra')
let Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
let url = require('url')
let path = require('path')
let glob = require('glob')

async function dealHar(harPath) {
  let workspacePath = process.cwd()
  let harJson = await fss.readJSON(harPath)
  let filterData = harJson.log.entries.filter((n) => {
    return n.response.headers.some((obj) => {
      return obj.name === 'Content-Type' && /application\/json/.test(obj.value)
    })
  }).map((n) => {
    return {
      requestUrl: n.request.url,
      method: n.request.method,
      responseContentText: n.response.content.text,
    }
  })

  await fss.ensureDir(path.join(workspacePath, 'mock.temp')) // 创建存放文件的目录

  let responseMockJsStr = `module.exports = {`

  for (let n of filterData) {
    let urlPathName = url.parse(n.requestUrl).pathname
    // console.log(` urlPathName`, urlPathName)
    let ws = fs.createWriteStream(path.join(workspacePath, 'mock.temp', urlPathName.replace(/^\//, '').replace(/\//gi, '.') + '.json'), {start: 0})
    ws.write(JSON.stringify(JSON.parse(n.responseContentText), null, 2), 'utf8')
    ws.end('')

    responseMockJsStr += `
        '${n.method} ${urlPathName}' (req, res){
            console.log('${urlPathName}:',${ /get/gi.test(n.method) ? 'req.query' : 'JSON.parse(req.body)'})
            let response = ${JSON.stringify(JSON.parse(n.responseContentText))}
            res.json(response)
        },`
  }
  responseMockJsStr += '\n}'
  let ws = fs.createWriteStream(path.join(workspacePath, 'mock.temp', `${harPath}.js`), {start: 0})
  ws.write(responseMockJsStr, 'utf8')
  ws.end('')
}


let dealHarAll = () => {
  glob('*.har', {ignore: 'node_modules/**'}, (er, files) => {
    (async () => {
      for (const harFile of files) {
        await dealHar(harFile)
        console.log('处理文件:', harFile)
      }
    })()
  })
}

module.exports.dealHarAll = dealHarAll
