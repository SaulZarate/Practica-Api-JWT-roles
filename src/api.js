const morgan = require('morgan')
const express = require('express')
const createRoles = require('./database/initialSetup.js')
const pkg = require('../package.json')


// Inicio de express
const app = express()
// Crear roles por defecto
createRoles()


// App Middelwares 
app.set('package-json', pkg)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


/* 
    Routes 
*/

app.get('/', (req, res) => {
    res.json({
        name: app.get('package-json').name,
        autor: app.get('package-json').author,
        descripcion: app.get('package-json').description,
        version: app.get('package-json').version
    })
})

app.use('/api/products', require('./routes/products.routes.js'))
app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/users', require('./routes/user.routes.js'))

/* 
    404
*/
app.all('*', (req,res) => res.send('No existe el recurso al que quiere acceder'))



module.exports = app

