const express   = require('express')
const router    = express.Router()

const apiController = require('../controllers/apiControllers')

//Routes for GET, POST, DELETE Method

router.get('/getImages', apiController.index)
router.post('/addImages', apiController.store)
router.delete('/deleteImages', apiController.destroy)

module.exports = router