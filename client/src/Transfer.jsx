import { useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import * as utils from "ethereum-cryptography/utils";
import * as keccak from "ethereum-cryptography/keccak";


function Transfer({ address, privateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const getpublicKey = (privKey) => secp256k1.getPublicKey(privKey);


  // Hash a message
  const hashMessage = (message) => {
    const bytes = utils.utf8ToBytes(message);
    return keccak.keccak256(bytes);
  };

  // Sign a message
  const signMessage = (message) => {
    const hashedMessage = utils.toHex(hashMessage(message));
    try {
      const sign = secp256k1.sign(hashedMessage, privateKey);
      return sign;
    } catch (e) {
      console.log(e);
    }
  };

  async function transfer(evt) {
    evt.preventDefault();

    // Get the public key
    const senderPubKey = getpublicKey(privateKey);

    // Create the message
    const message = address + "_" + sendAmount + "_" + recipient;

    // Sign the message
    let sign = await signMessage(message);

    // Convert sign components to strings and stringify the sign object
    sign = JSON.stringify({
      ...sign,
      r: sign.r.toString(),
      s: sign.s.toString(),
    });

    try {
      const {
        data: { balance },} = await server.post(`send`, {
        message,
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        sign,
        senderPubKey,
      });

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
