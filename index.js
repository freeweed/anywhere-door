#!/usr/bin/env node
const argv = require('yargs').argv
const chalk = require('chalk')
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const cors = require('cors')

const app = express()
const port = argv.port || 3000
const log = console.log

if (!argv.url) {
  app.use(cors())

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use(sendRequest)

  app.listen(port, () => {
    console.log(`open the door at port ${chalk.blue(port)} 
power by ${chalk.red('Noob Studio')}`)
  })
} else {
  sendRequest()
}

function sendRequest (req = null, res = null) {
  const id = new Date()
  let uri = argv.url || req.query.url
  const method = argv.method || req.method
  let header = argv.header || req.headers
  const body = argv.body || req.body

  if (uri.indexOf('http://') < 0 && uri.indexOf('https://') < 0) {
    uri = 'http://' + uri
  }

  header = { authorization: header.authorization, 'content-type': header['content-type'], accpet: header.accpet }

  log(chalk.black.bgWhite(` Sending Request ID: #${id.getTime()}`))
  log(`
uri: ${chalk.blue(uri)}
method: ${chalk.blue(method)}
headers: ${chalk.blue(JSON.stringify(header))}
body: ${chalk.blue(JSON.stringify(body))}
`)
  request({
    uri: uri,
    method: method,
    headers: header,
    rejectUnauthorized: false,
    body: JSON.stringify(body)
  }, (error, response, body) => {
    if (error) {
      log(`
error: ${chalk.red(error)}
`)
    } else {
      log(chalk.black.bgWhite(`Sending Response ID: #${id.getTime()}`))
      log(`
status code: ${chalk.green(response.statusCode)}
headers: ${chalk.green(JSON.stringify(response.headers))}
body: ${chalk.green(JSON.stringify(body))}
`)
      if (!argv.url) {
        try {
          body = JSON.parse(body)
        } catch (err) { }
        res.status(response.statusCode).send(body).end()
      }
    }
  })
}

module.exports = sendRequest
