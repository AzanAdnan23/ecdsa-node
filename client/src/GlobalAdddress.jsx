import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Add import for axios
import server from './server';

function GlobalAddresses() {
  const [balances, setBalances] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const copiedUrl = 'http://localhost:3042/balances';

        const response = await axios.get(copiedUrl); // Use axios.get() instead of copiedUrl

        const data = response.data; // Extract data from response

        setBalances(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const formatPublicKey = (publicKey) => {
    // Format the publicKey here according to your preference
    return publicKey;
  };

  const formatAmount = (amount) => {
    // Format the amount here according to your preference
    return amount;
  };

  return (
    <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Global Balances</h1>
      {balances ? (
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '10px' }}>
            <span style={{ width: '50%' }}>Public Key</span>
            <span style={{ width: '50%' }}>Amount</span>
          </div>
          {Object.entries(balances).map(([publicKey, amount]) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }} key={publicKey}>
              <span style={{ marginRight: '10px' }}>{formatPublicKey(publicKey)}</span>
              <span style={{ marginLeft: '10px' }}>{formatAmount(amount)}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading balances...</p>
      )}
    </div>
  );
}

export default GlobalAddresses;
