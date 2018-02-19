const fetch = require('node-fetch')
const moment = require('moment')
const config = require('./config.js')

/**
 * @return {string} access token
 */
function auth() {
  const url = `${config.server}/auth/token`
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${config.auth.base64}`,
    },
    body: JSON.stringify({ email: config.auth.email })
  })
    .then(resp => resp.json())
    .then(json => json.token)
    .catch(err => console.error(err))
}

/**
 * @param {string} accessToken
 * @param {string} position [3, 2, 1, B1, B2]
 * @return {obj} json
 */
function callElevator(accessToken, position) {
  const url = `${config.server}/elevators/${position}`
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-UIDC-Authorization-Token': accessToken
    }
  })
    .then(resp => resp.json())
    .then(json => json)
    .catch(err => console.error(err))
}

/**
 * @param {string} position [3, 2, 1, B1, B2]
 */
function run(position) {
  const date = moment()
  console.log(date.format('YYYY/MM/DD HH:mm'))
  auth()
    .then(accessToken => {
      const resp = callElevator(accessToken, position)
        .then(resp => console.log(resp.state))
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
}

module.exports = run
