const express = require('express');

const router = express.Router();

const talkerRoute = require('./talker.router');

router.use(talkerRoute);

module.exports = router;