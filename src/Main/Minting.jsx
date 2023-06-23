import React from 'react';
import { useNavigate } from "react-router-dom";

function Minting() {
  // Replace this with your actual data
  const navigate = useNavigate();
  const nfts = [
    { id: 1, name: 'NFT 1', collection: 'Collection 1', image: 'https://i.seadn.io/gcs/files/415542b9cfaf4f6128e2bb4048592ae3.png?auto=format&dpr=1&w=256', number: '#1' },
    { id: 2, name: 'NFT 2', collection: 'Collection 2', image: 'https://via.placeholder.com/150', number: '#2' },
    { id: 3, name: 'NFT 3', collection: 'Collection 3', image: 'https://via.placeholder.com/150', number: '#3' },
    { id: 4, name: 'NFT 4', collection: 'Collection 4', image: 'https://via.placeholder.com/150', number: '#4' },
    { id: 5, name: 'NFT 1', collection: 'Collection 1', image: 'https://via.placeholder.com/150', number: '#5' },
    { id: 6, name: 'NFT 2', collection: 'Collection 2', image: 'https://via.placeholder.com/150', number: '#6' },
    { id: 7, name: 'NFT 3', collection: 'Collection 3', image: 'https://via.placeholder.com/150', number: '#7' },
    { id: 8, name: 'NFT 1', collection: 'Collection 1', image: 'https://via.placeholder.com/150', number: '#8' },
    { id: 9, name: 'NFT 2', collection: 'Collection 2', image: 'https://via.placeholder.com/150', number: '#9' },
    { id: 10, name: 'NFT 3', collection: 'Collection 3', image: 'https://via.placeholder.com/150', number: '#10' },
    // More NFTs...
  ];
  const handleMintClick = (nftId) => {
    navigate(`/mintingnft`);
  };

  return (
    <div className="p-4 bg-background text-text font-pop ">
      <h2 className="text-2xl font-bold mb-4">Available NFTs</h2>
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
