import React, { useEffect, useState } from 'react';
import { onConnect } from './Utils';
import { useNavigate } from "react-router-dom";
import { nfts } from './Utils';

function Minting() {
  // Replace this with your actual data

  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");

  const navigate = useNavigate();

  const handleMintClick = (nftId) => {
    navigate(`/mintingnft/`);
  };

  useEffect(() => {
    (async () => {
      const {res, conn} = await onConnect(connected);
      setAccount(res);
      setConnected(conn);
      console.log(account);
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
                <span className="text-lg font-bold text-accent">{nft.number}</span>
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
