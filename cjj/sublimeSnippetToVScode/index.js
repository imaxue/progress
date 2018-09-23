const fs = require('fs')
const path = require('path')
const util = require('util')
const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const stat = util.promisify(fs.stat)
const REG_RULE = /(?<=\[CDATA\[\s*)([\s\t\S]*)(?=\s*\]\])|(?<=<tabTrigger>)(.+)(?=<\/tabTrigger>)|(?<=<description>)(.+)(?=<\/description>)/g

async function sublimeSnippetToVScode (src) {
  try {
    const result = {}
    const list = await readdir(src)
    for (const name of list) {
      const filePath = path.join(src, name)
      const statIns = await stat(filePath)
      
      if (statIns.isDirectory()) continue
      const content = await readFile(filePath, { encoding: 'utf-8' })
      let [ body = '', prefix = '', description = '' ] = content.match(REG_RULE)
      if (prefix && body) {
        body = body.split(/[\r\n]+/).filter(value => value)
        result[prefix] = { prefix, body, description }
      }
    }
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

sublimeSnippetToVScode(path.join(__dirname, 'src'))
.then(result => writeFile('snippet.json', JSON.stringify(result), { encoding: 'utf-8' }))
.then(() => {
  console.log('convert success!')
}).catch(err => {
  console.error(`convert failed!\n${err}`)
})
