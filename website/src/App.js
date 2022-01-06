import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import ABI from './ABI.json'
const ethers = require('ethers');

function App() {

  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    connect()
  }, []) // call this when we load the page - only once

  const connect = async () => {
    
    // Fetch and set our ethereum account to the variable "account"
    const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
    setAccount(accounts[0])

    // instantiating a provider that allows us to communicate with the ethereum blockchain - call functions from the Player contract
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();

    const contract = new ethers.Contract("0x461d995E57abEBcB8218175B42704AC46fc0f596", ABI, signer);
    setContract(contract) // getting and setting the contract from the blockchain
    setCoords([(await contract.xCoordinate()).toNumber(), (await contract.yCoordinate()).toNumber()]) // fetching and setting the coordinates of our player
  }

  const moveDown = async () => {
    const call = await contract.moveDown();
    console.log(call)
    updateCoords()
  }

  const moveUp = async () => {
    const call = await contract.moveUp();
    console.log(call)
    updateCoords()
  }

  const moveLeft = async () => {
    const call = await contract.moveLeft();
    console.log(call)
    updateCoords()
  }

  const moveRight = async () => {
    const call = await contract.moveRight();
    console.log(call)
    updateCoords()
  }

  const updateCoords = async () => {  // doesn't work for some reason
    setCoords([(await contract.xCoordinate()).toNumber(), (await contract.yCoordinate()).toNumber()])
  }

  return (
    <div className="App">
      <div style={{paddingTop: '10vh'}}>{account}</div>
      { coords ? 
      <div>Player Coordinates: {coords[0]} and {coords[1]}</div>
      : <div>loading...</div>}
      {/* Bunch of buttons that allow us to click and call the functions above ^^ */}
      <button onClick={moveDown}>Move Down</button> 
      <button onClick={moveUp}>Move Up</button>
      <button onClick={moveLeft}>Move Left</button>
      <button onClick={moveRight}>Move Right</button>
    </div>
  );
}

export default App;
