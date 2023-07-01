import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Add import for axios

function GlobalAddresses() {
  const [balances, setBalances] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3042/balances');
        const data = response.data;
        setBalances(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateBalance = async () => {
      try {
        const response = await axios.get('http://localhost:3042/balances');
        const data = response.data;
        setBalances(data);
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(() => {
      updateBalance();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Global Balances</h1>
      {balances ? (
        <div style={{ marginTop: '20px' }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '10px' }}>
              <span style={{ flex: 1 }}>Public Key</span>
              <span style={{ flex: 1 }}>Amount</span>
            </li>
            {Object.entries(balances).map(([publicKey, amount]) => (
              <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }} key={publicKey}>
                <span>{publicKey}</span>
                <span>{amount}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading balances...</p>
      )}  
    </div>
  );
}

export default GlobalAddresses;
