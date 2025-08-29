
const express = require('express');
const app = express();

const validator = require('validator');
const port = 3000;


app.listen(port, () => {
  console.log(`Listening to PORT: ${port}`);
});

//1. Be Polite, Greet the User
app.get('/greeting/:name', (req, res) => {
    res.send(`<h1>What a delight it is to see you once more, ${req.params.name}</h1>`)
});

//2. Rolling the Dice

app.get('/roll/:itemNumber',(req, res) => {
    const itemNumber = Number(req.params.itemNumber);
    if (isNaN(itemNumber) || !Number.isInteger(itemNumber)) {
        return res.send("You must specify a number.");
    }

    const rolledNumber = Math.floor(Math.random() * (itemNumber + 1));
    res.send (`You rolled a ${rolledNumber}.`);
});

  const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  app.get('/collectibles/:index', (req,res) => {
    const idx = parseInt(req.params.index, 10);
    if (isNaN(idx) || idx < 0 || idx >= collectibles.length) {
        return res.send("This item is not yet in stock. Check back soon!")
    }
    const {name, price} = collectibles[idx];
    res.send(`"So, you want the ${name}? For ${price}, it can be yours!”`);
  });
