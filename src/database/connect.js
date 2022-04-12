const { default: mongoose } = require("mongoose");

const HOST = "localhost"
const DATABASE = "companydb"

const connect = mongoose.connect(`mongodb://${HOST}/${DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = connect