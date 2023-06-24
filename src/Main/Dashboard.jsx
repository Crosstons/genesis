import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Dashboard() {
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
    
  ];

  // Adding yield to each NFT
  nfts.forEach(nft => {
    nft.yield = 5; // 5 GNE tokens every 24 hours
  });

  // Hydration state
  const [hydration, setHydration] = useState(100);

  // NFT for displaying in the left panel
  const [displayedNFT, setDisplayedNFT] = useState(nfts[0]);

  const handleHydrate = () => {
    setHydration(100);
  };

  const handleHydrationChange = (event) => {
    const newHydration = event.target.value;
    if (newHydration >= 0 && newHydration <= 100) {
      setHydration(newHydration);
    }
  };

  const handleRowClick = (nft) => {
    setDisplayedNFT(nft);
  };

  return (
    <div className="h-screen flex">
      <div className="w-1/3 bg-background p-4 ">
        {displayedNFT && (
          <>
            <img className="w-full h-2/3 object-cover mb-4 rounded" src={displayedNFT.image} alt={displayedNFT.name} />
            <div className="flex justify-center items-center">
            <div className="inline-flex justify-center items-center bg-accent mx-auto my-4 py-2 px-4 rounded-full">
    <svg className="w-8 h-8 text-secondary mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
        <path d="M360-160q-134 0-227-93T40-480q0-134 93-227t227-93q134 0 227 93t93 227q0 134-93 227t-227 93Zm0-60q108 0 184-76t76-184q0-108-76-184t-184-76q-108 0-184 76t-76 184q0 108 76 184t184 76Zm0-130q13 0 21.5-8.5T390-380v-170h60q8 0 14-6t6-14q0-8-6-14t-14-6H270q-8 0-14 6t-6 14q0 8 6 14t14 6h60v170q0 13 8.5 21.5T360-350Zm410-329-28-63-63-28q-9-4-9-14t9-14l63-28 28-63q4-9 14-9t14 9l28 63 63 28q9 4 9 14t-9 14l-63 28-28 63q-4 9-14 9t-14-9Zm0 608-28-63-63-28q-9-4-9-14t9-14l63-28 28-63q4-9 14-9t14 9l28 63 63 28q9 4 9 14t-9 14l-63 28-28 63q-4 9-14 9t-14-9ZM360-480Z"/>
    </svg>
    <p className="text-secondary text-xl">{displayedNFT.yield}</p>
</div>
</div>

          </>
        )}
        <div className="relative pt-1">
          <div className="overflow-hidden h-3 mb-4 text-xs flex rounded bg-dark-bg">
            <div style={{ width: `${hydration}%`, background: `linear-gradient(90deg, #10b981 ${hydration}%, #a1a1a1 0%)` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-width duration-500 ease-in-out"></div>
          </div>
        </div>
        <input type="number" min="0" max="100" value={hydration} onChange={handleHydrationChange} className="w-full mb-4 text-background bg-dark-bg p-2 rounded" />
        <button onClick={handleHydrate} className="w-full bg-dark-bg text-background py-2 rounded hover:bg-secondary transition-colors duration-300">Hydrate</button>
      </div>

      <div className="w-2/3 bg-background p-4">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">NFT Number</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Tokens Yielded</th>
            </tr>
          </thead>
          <tbody>
            {nfts.map(nft => (
              <tr key={nft.id} onClick={() => handleRowClick(nft)} className="cursor-pointer transition-colors duration-300 hover:bg-accent">
                <td className="border px-4 py-2">
                  <img className="h-12 object-cover rounded" src={nft.image} alt={nft.name} />
                </td>
                <td className="border px-4 py-2">{nft.number}</td>
                <td className="border px-4 py-2">{nft.name}</td>
                <td className="border px-4 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6" fill="currentColor" height="48" viewBox="0 -960 960 960" width="48"><path d="M360-160q-134 0-227-93T40-480q0-134 93-227t227-93q134 0 227 93t93 227q0 134-93 227t-227 93Zm0-60q108 0 184-76t76-184q0-108-76-184t-184-76q-108 0-184 76t-76 184q0 108 76 184t184 76Zm0-130q13 0 21.5-8.5T390-380v-170h60q8 0 14-6t6-14q0-8-6-14t-14-6H270q-8 0-14 6t-6 14q0 8 6 14t14 6h60v170q0 13 8.5 21.5T360-350Zm410-329-28-63-63-28q-9-4-9-14t9-14l63-28 28-63q4-9 14-9t14 9l28 63 63 28q9 4 9 14t-9 14l-63 28-28 63q-4 9-14 9t-14-9Zm0 608-28-63-63-28q-9-4-9-14t9-14l63-28 28-63q4-9 14-9t14 9l28 63 63 28q9 4 9 14t-9 14l-63 28-28 63q-4 9-14 9t-14-9ZM360-480Z"/></svg>
                  {nft.yield}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
