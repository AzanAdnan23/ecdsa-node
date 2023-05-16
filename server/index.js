const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "03ab267539d9a21b0e573e99ec9ff6ba3ee2d845fa7adf290efd4349af0bbfd413": 100,
  "02257fe3e9e19e4098830f35b437f6af74df8e164be4479e1b253ab9a18eab9a89": 50,
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
