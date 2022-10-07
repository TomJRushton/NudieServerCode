import { useEffect, useState } from "react";
import React, { Component } from 'react';
import { connectWallet, getCurrentWalletConnected } from "./interact.js";
import "./Minting.css"

export const Minter = (props) => {

  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
 
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
        }
      });
    } else {
    }
  }

  useEffect(() => {
    const getDetails = async () => {
      const {address, status} = await getCurrentWalletConnected()
      setWallet(address)
      setStatus(status); 
    }
  });


  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };


  return (
    <div>
      <div className="Minter">
          <button className="MinterButton" onClick={connectWalletPressed}>
            {walletAddress.length > 0 ? (
              String(walletAddress).substring(0, 6) +
              "..." +
              String(walletAddress).substring(38)
            ) : (
              <span>Connect Wallet</span>
            )}
          </button>
      </div>    
      </div>
  );
};

