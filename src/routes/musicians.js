const express = require('express');
const router = express.Router();
const  {Musician}  = require('../../models/index');
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const musicians = await Musician.findAll();

    if (musicians) res.status(200).json(musicians);
  } catch (e) {
    console.error(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const musician = await Musician.findByPk(id);

    if (!id || !musician)
      res.status(404).send(`Mucisian with ID ${id} not found`);
    else res.status(200).json(musician);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

router.post(
  '/',
  [
    check('name').notEmpty().trim().withMessage('Name is required'),
    check('instrument').notEmpty().trim().withMessage('Instrument is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newMucisian = await Musician.create(req.body);
      res.status(201).json(newMucisian);
    } catch (e) {
      console.error(e);
      res.status(500).send('Internal Server Error');
    }
  }
);

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const musician = await Musician.findByPk(id);

    if (musician) {
      await musician.update(req.body);
      res.status(200).json(musician);
    } else {
      res.status(404).send(`Musician with ID: ${id} is not found`);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const musician = await Musician.findByPk(id);

    if (musician) {
      await musician.destroy(musician);
      res.status(204).send();
    } else {
      res.status(404).send(`Musician with ID ${id} is not found`);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
