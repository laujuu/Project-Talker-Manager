const express = require('express');

const router = express.Router();

const talkerRoute = require('./talker.router');
const loginRoute = require('./login.router');

router.use(talkerRoute);
router.use(loginRoute);

module.exports = router;