const express = require('express');

const talkerRouter = express.Router();

const fs = require('fs/promises');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const TALKER_FILE = './src/talker.json';

talkerRouter.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile(TALKER_FILE);
  if (talkers.length === 0) return res.status(HTTP_OK_STATUS).send([]);
  return res.status(HTTP_OK_STATUS).json(JSON.parse(talkers));
});

talkerRouter.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = JSON.parse(await fs.readFile(TALKER_FILE));
    const findTalker = talkers.find((talker) => talker.id === Number(id));
    if (findTalker) {
      return res.status(HTTP_OK_STATUS).send(findTalker);
    }
    res
      .status(HTTP_NOT_FOUND_STATUS)
      .json({ message: 'Pessoa palestrante não encontrada' });
  });

module.exports = talkerRouter;
