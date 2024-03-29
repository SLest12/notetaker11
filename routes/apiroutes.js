const router = require('express').Router();
const Store = require('../db/store');
const store = new Store()

router.get('/notes', (req, res) => {
  store
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

router.post('/notes', (req, res) => {
  console.log (req.body,"POST")
  store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.json(err));
});


router.delete('/notes/:id', (req, res) => {
  store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;