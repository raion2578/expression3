const express = require('express'),
       auth = require('../scripts/auth');
const {
    loginApi,
    expPostNew,
    addOperation,
} = require('../controllers/apiController');

const router = express.Router();

router.post('/api/login', loginApi)

router.post('/api/post-expr', auth, expPostNew);

router.post('/api/add-sign', auth, addOperation);

module.exports = router;