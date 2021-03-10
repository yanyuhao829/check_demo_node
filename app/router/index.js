const UserRoute = require('./user')
const ItemRoute = require('./item')

module.exports = app =>{
    app.use('/user',UserRoute)
    app.use('/item',ItemRoute)
}