import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const contractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "x",
        "type": "uint256"
      }
    ],
    "name": "set",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "get",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];
const contractAddress = '0xEB3a7fF5A5dE319Fe954Da357a77EE977F3385DA'; // Sözleşmenizin adresini buraya yapıştırın

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [number, setNumber] = useState('');
  const [storedNumber, setStoredNumber] = useState('');

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          const accounts = await web3Instance.eth.getAccounts();
          const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
          setWeb3(web3Instance);
          setAccount(accounts[0]);
          setContract(contractInstance);
        } catch (error) {
          console.error("User denied account access");
        }
      } else {
        console.log('No Ethereum browser detected. Check out MetaMask!');
      }
    };
    init();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract) {
      try {
        await contract.methods.set(number).send({ from: account });
        alert('Number stored successfully');
      } catch (error) {
        console.error(error);
        alert('Failed to store number');
      }
    }
  };

  const handleRetrieve = async () => {
    if (contract) {
      try {
        const result = await contract.methods.get().call();
        setStoredNumber(result);
      } catch (error) {
        console.error(error);
        alert('Failed to retrieve number');
      }
    }
  };

  return (
    <div>
      <h1>Number Storage on Blockchain</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="submit">Store Number</button>
      </form>
      <button onClick={handleRetrieve}>Retrieve Stored Number</button>
      {storedNumber && <p>Stored Number: {storedNumber}</p>}
    </div>
  );
}

export default App;
