const seeder =  require('mongoose-seeder')
const roles = require('../data/roles.json')


seeder.seed(roles, {dropDatabase: false})
.then(data => {
    console.log(data)
})
.catch(err => {
    console.log('Error saving the roles data', err)
})