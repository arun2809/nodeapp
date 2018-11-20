const mongoose = require('mongoose')
const Schema = mongoose.Schema

let designmodel = new Schema(
    {name:String,
    email:String,

address:String}
)

module.exports = mongoose.model('Datapart',designmodel)