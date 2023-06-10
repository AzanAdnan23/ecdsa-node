import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import Keys from "./Keys";
import GlobalAddresses from "./GlobalAdddress";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
      
      <Keys />
      <Wallet
        balance={balance}
        setBalance={setBalance}

        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} privateKey={privateKey}/>  

      <GlobalAddresses />
      
    </div>
  );
}

export default App;
