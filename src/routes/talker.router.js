const express = require('express');

const talkerRouter = express.Router();

const fs = require('fs/promises');

const {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
} = require('../middlewares/talkerValidations');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_CREATED_STATUS = 201;
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

talkerRouter.post(
  '/talker',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (req, res) => {
    const talkers = JSON.parse(await fs.readFile(TALKER_FILE));

    const { name, age, talk } = req.body;

    const addNewTalker = {
      id: talkers.length + 1,
      name,
      age,
      talk,
    };

    talkers.push(addNewTalker);
    await fs.writeFile(TALKER_FILE, JSON.stringify(talkers));
    res.status(HTTP_CREATED_STATUS).json(addNewTalker);
  },
);

module.exports = talkerRouter;
