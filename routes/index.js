const router = require('express').Router();
const fs = require('fs');
const { readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

const REQUIRE_DATABASE_FILE_PATH = '../database/db.json';
const FS_DATABASE_FILE_PATH = './database/db.json';

router.get('/notes', (req, res) => {
  const db = require(REQUIRE_DATABASE_FILE_PATH);
  res.json(db);
});

router.post('/notes', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      id: uuid(),
      title,
      text,
    };

    readAndAppend(newNote, FS_DATABASE_FILE_PATH);
  }
  res.send();
});

router.delete('/notes/:id', (req, res) => {
  const notesArray = require(REQUIRE_DATABASE_FILE_PATH);
  const newNotesArr = notesArray.filter((element) => {
    return element.id !== req.params.id;
  });
  writeToFile(FS_DATABASE_FILE_PATH, newNotesArr);
  res.send();
});

module.exports = router;
