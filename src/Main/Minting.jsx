import React from 'react';
import { useNavigate } from "react-router-dom";

function Minting() {
  // Replace this with your actual data
  const navigate = useNavigate();
  const nfts = [
    { id: 1, name: 'NFT 1', collection: 'Collection 1', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122018737135038544/92e25f4c-e473-4d00-91e9-55eba4711e35.jpg', number: '#1' },
    { id: 2, name: 'NFT 2', collection: 'Collection 2', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122018729023250442/837c15b3-cec9-4dd0-bab5-75e2b9d781dc.jpg', number: '#2' },
    { id: 3, name: 'NFT 3', collection: 'Collection 3', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122019164945662012/7153e52c-618e-463d-aa96-95bc5021671a.jpg', number: '#3' },
    { id: 4, name: 'NFT 4', collection: 'Collection 4', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122019175074897940/01dfa54c-21d0-4d23-a18b-2acdd438618e.jpg', number: '#4' },
    { id: 5, name: 'NFT 1', collection: 'Collection 1', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122019549496233984/1e7d6cdd-dee8-48ae-b7f8-3bd478bd6444.jpg', number: '#5' },
    { id: 6, name: 'NFT 2', collection: 'Collection 2', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122019992003674202/ae6617f9-d4ba-4b31-9a54-2ce10bb8b504.jpg', number: '#6' },
    { id: 7, name: 'NFT 3', collection: 'Collection 3', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122019999947685960/ed6cf5d1-744e-45d8-bd82-1de701f9b4fe.jpg', number: '#7' },
    { id: 8, name: 'NFT 1', collection: 'Collection 1', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122022213156085840/d87450c1-8ade-4f73-9ece-042fa02717d2.jpg', number: '#8' },
    { id: 9, name: 'NFT 2', collection: 'Collection 2', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122022797615562842/1125eb85-59cd-4312-9dc1-069d59165fe4.jpg', number: '#9' },
    { id: 10, name: 'NFT 3', collection: 'Collection 3', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122024320202448926/e0ce5f27-c560-4d8f-8608-5fa351c86489.jpg', number: '#10' },
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
