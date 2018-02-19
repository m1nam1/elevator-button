const { macAddr } = require('./config')
const callElevator = require('./call_elevator')
const dash_button = require('node-dash-button')

const dash = dash_button(macAddr, null, null, 'all')
console.log('Listening...')
dash.on('detected', () => {
    callElevator(position="3")
});
