const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "03bf8f5ced5b4cb1c04e83b8026f3226320fb8bfc3b9cd0fe4cd2a30de7a7f259b": 100,
  "022e22d3570c7125d3a9ee0172c4d4375ff9f04a7ffd816e60a87d9c8e6c5447e1": 50,
  "02da51a453ce3847a46aa44850f22c9dfd06656a81deae543fb0e9f1eeadcbdc4e": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  
  // TODO get a signature from client side application
  // recover the public address from the signature 
  
  const { sender, recipient, amount } = req.body;

  // reicve signature from client side application here
  // recover the public address from the signature
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
