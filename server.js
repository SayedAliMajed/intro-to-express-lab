
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

// 3. I Want THAT One !

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

  // 4. Filter Shoes by Query Parameters

  const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];

  app.get('/shoes', (req, res) => {

    const minPrice = parseFloat(req.query['min-price']);
    const maxPrice = parseFloat(req.query['max-price']);
    const type = req.query.type;

    let results = shoes;

    if (!isNaN(minPrice)) {
        results = results.filter(shoe => shoe.price >= minPrice);
    }

    if (!isNaN(maxPrice)) {
        results=results.filter(shoe => shoe.price <= maxPrice);
    }
   
    else {shoes.filter(shoe=> shoe.type === 'type');

    }
     res.send(results);
  });