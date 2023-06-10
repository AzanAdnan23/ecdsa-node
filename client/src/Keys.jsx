import { useState } from 'react';
import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';
import { keccak256 } from "ethereum-cryptography/keccak";
import server from "./server";

function Keys() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(0); // Add state for balance

  const generateKeys = async () => {
    const privateKey = secp.secp256k1.utils.randomPrivateKey();
    const publicKey = secp.secp256k1.getPublicKey(privateKey);
    const hash = keccak256(publicKey.slice(1, publicKey.length));

    setPrivateKey(toHex(privateKey));
    setPublicKey(toHex(publicKey));
    setAddress("0x" + toHex(hash.slice(-20)));

    // Send the public key to the server
    try {
      const response = await server.get(`balance/${toHex(publicKey)}`);
      if (response.ok) {
        const { balance } = response.data;
        setBalance(balance);
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }

    setPopupOpen(true);
  };

  return (
    <div className="container keys">
      <h2>Generate New Keys</h2>

      <button style={{ backgroundColor: '#319795', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} onClick={generateKeys}>Generate Keys</button>
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Generated Keys</h2>
            <h4>Keep your private key safe! You will need it to access your wallet.</h4>
            <p>Private Key: {privateKey}</p>
            <p>Public Key: {publicKey}</p>
            <p>Address: {address}</p>
           
            <button style={{ backgroundColor: '#319795', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} onClick={() => setPopupOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Keys;
