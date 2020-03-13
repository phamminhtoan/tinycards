const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', (req, res) => {
  const numberOfCards = cards.length;
  const flashcardId = Math.floor(Math.random() * numberOfCards);
  return res.redirect(`/cards/${flashcardId}?side=question`);
});

router.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params;

  const sideArr = ['question', 'answer'];
  if (!side || !sideArr.includes(side)) {
    return res.redirect(`/cards/${id}?side=question`);
  }

  const name = req.cookies.username;
  const text = cards[id][side];
  // console.log(side, text);
  const { hint } = cards[id];

  const templateData = { id, text, name, side };
  if (side === 'question') {
    templateData.hint = hint;
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'Answer';
  } else if (side === 'answer') {
    templateData.sideToShow = 'question';
    templateData.sideToShowDisplay = 'Question';
  }
  // console.log(templateData);

  res.render('card', templateData);
});

module.exports = router;