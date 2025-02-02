const express = require('express')
const router = express.Router()
const loggedIn = require('../controllers/loggedInController')
const checkAuth = require('../middleware/checkAuth')

router.use(checkAuth.isAuthenticated)

const routes = [
    { method: 'get', path: '/', action: loggedIn.mainpage }, //V // ngeshow semua task yang ada dan blom completed
    { method: 'put', path: '/edit', action: loggedIn.editData }, //V //ngedit data 
    { method: 'get', path: '/completed', action: loggedIn.completed }, //V // ngeshow semua task yang completed
    { method: 'get', path: '/completed/:sort', action: loggedIn.completedSort}, //V //ngeshow sorted completed task
    { method: 'post', path: '/status/:id', action: loggedIn.statusById }, //V //ngubah status jadi completed
    { method: 'post', path: '/add', action: loggedIn.addData }, // V
    { method: 'get', path: '/:sort', action: loggedIn.sort }, //V 
    { method: 'delete', path: '/delete', action: loggedIn.deleteData }, //V
    { method: 'delete', path: '/completed/delete', action: loggedIn.deleteCompletedData } //V
  ]
  
  routes.forEach(route => {
    router[route.method](route.path, route.action)
  })

module.exports = router