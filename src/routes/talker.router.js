const express = require('express');

const talkerRouter = express.Router();

const fs = require('fs/promises');

const HTTP_OK_STATUS = 200;
const TALKER_FILE = './src/talker.json';

talkerRouter.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile(TALKER_FILE);
  if (talkers.length === 0) return res.status(HTTP_OK_STATUS).send([]);
  return res.status(HTTP_OK_STATUS).json(JSON.parse(talkers));
});

module.exports = talkerRouter;
