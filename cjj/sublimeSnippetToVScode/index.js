const fs = require('fs')
const path = require('path')
const util = require('util')

const REG_BODY = /\[CDATA\[\s*([\s\t\S]*)\s*\]\]/
const REG_PREFIX = /<tabTrigger>(.+)<\/tabTrigger>/
const REG_DESC = /<description>(.+)<\/description>/

const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const stat = util.promisify(fs.stat)

async function sublimeSnippetToVScode (src) {
  try {
    const result = {}
    const list = await readdir(src)
    for (const name of list) {
      let prefix
      let body
      let description
      const filePath = path.join(src, name)
      const statIns = await stat(filePath)
      
      if (statIns.isDirectory()) continue
      const content = await readFile(filePath, { encoding: 'utf-8' })
      prefix = REG_PREFIX.test(content) && RegExp.$1
      body = REG_BODY.test(content) && RegExp.$1.split(/[\r\n]+/).filter(value => value) || ''
      description = REG_DESC.test(content) && RegExp.$1 || ''
      if (prefix) {
        result[prefix] = { prefix, body, description }
      }
    }
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

sublimeSnippetToVScode(path.join(__dirname, 'src'))
.then(result => writeFile('lua.json', JSON.stringify(result), { encoding: 'utf-8' }))
.then(() => {
  console.log('Convert success!')
}).catch(err => {
  console.error(`Convert Fail!\n${err}`)
})
