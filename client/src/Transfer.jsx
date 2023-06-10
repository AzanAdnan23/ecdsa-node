import { useState } from "react";
import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak";
import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { utf8ToBytes } from "ethereum-cryptography/utils";

function Transfer({ address, privateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const msg = {
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
    };
  // Calculating hash of the msg
  const msghash = keccak256(utf8ToBytes(JSON.stringify(msg)));

  // Signing the transaction
  const signature =  secp256k1.sign(msghash, privateKey);


  const transaction = { 
    sender: address,  // remove this after completing signature code
    amount: parseInt(sendAmount),
    recipient,
    //signature,
  };

    try {
      const {
        data: { balance },
      } = await server.post(`send`, transaction);
      
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
