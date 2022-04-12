const app = require('./api.js')
const connect = require('./database/connect.js')

const start = () => {
    app.listen(3000, () => {
        // Database
        connect.then(db => console.log('Database connect')).catch(err => console.log(err))
        // Server
        console.log('Server in localhost:'+3000)
    })
}

module.exports = start