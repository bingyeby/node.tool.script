#!/usr/bin/env node
const program = require('commander')
let glob = require('glob')
let getJsonFromHar = require('./src/getJsonFromHar.js')

program
  .version('0.0.1')
  .option('-h, --har [har]', 'deal har')
  .parse(process.argv)

if (program.har) {
  getJsonFromHar.dealHarAll()
}
