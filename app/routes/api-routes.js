const express = require('express'),
      auth = require('../scripts/auth');
const {
    expPost,
    loginApi,
} = require('../controllers/apiController');

const router = express.Router();

router.post('/api/post-expression', auth, expPost);

router.post('/api/login', loginApi)
module.exports = router;