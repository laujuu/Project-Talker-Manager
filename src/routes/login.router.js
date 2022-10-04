const express = require('express');

const loginRouter = express.Router();

const crypto = require('crypto');

const HTTP_OK_STATUS = 200;

loginRouter.post('/login', (_req, res) => {
  res
    .status(HTTP_OK_STATUS)
    .json({ token: crypto.randomBytes(8).toString('hex') });
});

module.exports = loginRouter;