const morgan = require('morgan')
const express = require('express')
const pkg = require('../package.json')

// Inicio de express
const app = express()

app.set('package-json', pkg)
app.use(morgan('dev'))


app.get('/', (req, res) => {
    res.json({
        name: app.get('package-json').name,
        autor: app.get('package-json').author,
        descripcion: app.get('package-json').description,
        version: app.get('package-json').version
    })
})

app.use(require('./routes/products.routes.js'))

module.exports = app

