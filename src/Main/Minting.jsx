import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { nfts } from './Utils';
import genAbi from '../contract/abi/genesis.json';

const { ethers } = require("ethers");

function Minting() {
  // Replace this with your actual data

  const ethprovider = new ethers.BrowserProvider(window.ethereum);
  const [signer, setSigner] = useState();
  const genContract = new ethers.Contract(ethers.getAddress("0x0316BcCd466eF3151Ee803dB66E780e82c8FF0ff"), genAbi.abi, signer);

  const navigate = useNavigate();

  const handleMintClick = (nftId) => {
    navigate(`/mintingnft/${nftId-1}`);
  };

  useEffect(() => {
    (async () => {
      const _signer = await ethprovider.getSigner();
      setSigner(_signer);
      for(const i in nfts){
        console.log(nfts[i].address);
      }
    })();
  }, []);

  return (
    <div className="p-4 bg-background text-text font-pop ">
      <h2 className="text-2xl font-bold mb-4">Available Collections</h2>
      <div className="grid grid-cols-5 gap-12">
        {nfts.map(nft => (
          <div key={nft.id} className="border border-secondary rounded-lg p-4 transition-all duration-500 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 shadow-lg">
            <div className="overflow-hidden relative">
              <img className="w-full h-64 object-cover mb-4 rounded" src={nft.image} alt={nft.name} />
              <div className="flex justify-between items-center mb-2 absolute bottom-0 left-0 bg-background bg-opacity-75 w-full p-2">
                <div>
                  <h3 className="text-lg font-bold">{nft.name}</h3>
                  <p className="text-sm text-dark-bg">{nft.collection}</p>
                </div>
              </div>
            </div>
            <button onClick={() => handleMintClick(nft.id)} className="w-full bg-accent text-dark-bg py-2 rounded hover:bg-secondary transition-colors duration-300 hover:text-background">Mint</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Minting;
