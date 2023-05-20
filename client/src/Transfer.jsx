import { useState } from "react";
import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak";
import * as secp from 'ethereum-cryptography/secp256k1';
import { utf8ToBytes } from "ethereum-cryptography/utils";

function Transfer({ address, setBalance ,privateKey}) 
  {                                                             ///chanegs here 
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();



    const msg ={
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
    }
      // calculating hash of the msg 
    const msghash = keccak256(utf8ToBytes(JSON.stringify(msg))); 

    // signing the transaction 
    const signmsg =secp.secp256k1.sign(msghash, privateKey);

    signature.toCompactHex(signmsg);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {   
        // send signed signature  here 
        sender: address,    // no need to send send sender address cuz we are rcovering it from digital signature
        amount: parseInt(sendAmount),
        recipient,

        
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
