import { useState } from 'react';

import * as secp from 'ethereum-cryptography/secp256k1';
import {toHex} from 'ethereum-cryptography/utils';


function Keys() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [address, setAddress] = useState('');

  const generateKeys = () => {

    const privateKey = secp.secp256k1.utils.randomPrivateKey();

    const publicKey = secp.secp256k1.getPublicKey(privateKey); // comvert this into address



    // Generate private key, public key, and address here
    // Assign the generated values to privateKey, publicKey, and address states
    setPopupOpen(true);
  };

  return (
    <div className="container keys">
        <h2> Genrate New Keys </h2>

      <button onClick={generateKeys}>Generate Keys</button>
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Generated Keys</h2>
            <p>Private Key: {privateKey}</p>
            <p>Public Key: {publicKey}</p>
            <p>Address: {address}</p>
            <button onClick={() => setPopupOpen(false)}>Close</button>
          </div>
        </div>
      )}
      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .popup {
          background-color: white;
          padding: 20px;
          border-radius: 4px;
          max-width: 400px;
          text-align: center;
        }
        
        .popup h2 {
          margin-top: 0;
        }
        
        .popup p {
          margin-bottom: 10px;
        }
        
        .popup button {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}

export default Keys;
