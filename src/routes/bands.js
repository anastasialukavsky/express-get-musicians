const express = require('express');
const router = express.Router();
const { Band } = require('../../models/index');
const { check, validationResult } = require('express-validator');



router.get('/', async (req, res) => {
  try {
    const band = await Band.findAll();

    if (band) res.status(200).json(band);
  } catch (e) {
    console.error(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const band = await Band.findByPk(id);

    if (!id || !band)
      res.status(404).send(`Mucisian with ID ${id} not found`);
    else res.status(200).json(band);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

router.post(
  '/',
  [
    check('name').notEmpty().trim().withMessage('Name is required'),
    check('genre').notEmpty().trim().withMessage('Genre is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newBand = await Band.create(req.body);
      res.status(201).json(newBand);
    } catch (e) {
      console.error(e);
      res.status(500).send('Internal Server Error');
    }
  }
);

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const band = await Band.findByPk(id);

    if (band) {
      await band.update(req.body);
      res.status(200).json(band);
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
    const band = await Band.findByPk(id);

    if (band) {
      await band.destroy(band);
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
