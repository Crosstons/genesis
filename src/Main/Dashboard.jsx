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
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 inline-block mr-2" fill=""
 width="1037.000000pt" height="1042.000000pt" viewBox="0 0 1037.000000 1042.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,1042.000000) scale(0.100000,-0.100000)"
fill="#3a5a40" stroke="#a3b18a">
<path d="M4815 10414 c-389 -38 -606 -73 -890 -144 -1341 -332 -2488 -1187
-3208 -2390 -93 -155 -280 -534 -345 -698 -205 -517 -322 -1027 -363 -1582
-15 -202 -6 -715 16 -915 165 -1499 953 -2833 2185 -3699 897 -631 1996 -962
3095 -933 264 8 390 18 635 53 1507 215 2867 1112 3668 2420 503 821 761 1741
762 2711 1 1615 -730 3105 -2015 4108 -132 103 -439 309 -585 393 -616 351
-1288 571 -2015 657 -102 13 -243 18 -520 20 -209 1 -398 1 -420 -1z m-223
-1374 c79 -29 159 -104 199 -186 53 -107 51 -151 -20 -554 -34 -191 -61 -350
-61 -356 0 -6 38 -5 103 3 130 15 471 16 613 2 60 -6 161 -19 224 -29 63 -11
116 -17 119 -14 3 2 28 136 56 297 57 322 66 347 146 433 68 71 148 106 255
112 165 9 297 -69 367 -217 50 -105 48 -152 -22 -541 -32 -184 -56 -336 -51
-338 4 -2 52 -29 106 -61 144 -85 255 -171 372 -286 57 -56 105 -97 107 -91 2
6 15 81 30 166 15 85 28 156 29 158 3 3 1200 -206 1229 -214 9 -3 17 -13 17
-22 0 -30 -308 -1774 -315 -1780 -7 -7 -1237 207 -1246 217 -3 3 -18 42 -34
86 -101 291 -282 513 -528 645 -249 134 -617 179 -842 102 -226 -76 -362 -207
-485 -464 -122 -256 -223 -656 -279 -1098 -70 -549 -13 -876 190 -1094 119
-127 262 -207 464 -258 76 -19 117 -23 255 -23 146 0 172 3 230 23 143 51 254
155 326 307 34 72 82 231 72 241 -3 3 -119 25 -258 49 -140 25 -256 47 -258
50 -6 6 160 962 169 977 5 7 399 -58 1160 -192 635 -111 1155 -203 1156 -204
6 -5 -101 -511 -137 -651 -87 -341 -195 -609 -315 -785 -118 -174 -289 -353
-489 -513 -337 -269 -723 -428 -1162 -478 l-101 -11 -57 -327 c-47 -267 -62
-337 -86 -387 -36 -74 -110 -146 -188 -182 -49 -23 -70 -27 -152 -27 -126 1
-193 26 -270 104 -66 66 -98 127 -113 216 -10 59 -7 85 37 340 27 154 45 280
40 284 -5 4 -67 18 -139 30 -240 43 -532 121 -752 202 -63 23 -116 39 -119 36
-3 -3 -30 -146 -60 -318 -62 -351 -75 -391 -156 -472 -27 -26 -74 -60 -106
-75 -51 -24 -69 -27 -167 -27 -102 0 -114 2 -168 30 -77 38 -159 127 -186 201
-41 107 -39 133 43 596 42 234 76 432 76 440 -1 7 -43 44 -94 81 -300 219
-555 545 -709 907 -89 210 -156 448 -192 680 -22 143 -31 485 -16 646 38 420
159 848 333 1174 118 223 257 410 438 590 172 172 396 338 592 440 l64 33 100
571 c108 610 112 627 184 709 41 46 132 100 196 117 58 14 171 5 236 -20z"/>
</g>
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
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 inline-block mr-2" fill=""
 width="1037.000000pt" height="1042.000000pt" viewBox="0 0 1037.000000 1042.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,1042.000000) scale(0.100000,-0.100000)"
fill="#3a5a40" stroke="#a3b18a">
<path d="M4815 10414 c-389 -38 -606 -73 -890 -144 -1341 -332 -2488 -1187
-3208 -2390 -93 -155 -280 -534 -345 -698 -205 -517 -322 -1027 -363 -1582
-15 -202 -6 -715 16 -915 165 -1499 953 -2833 2185 -3699 897 -631 1996 -962
3095 -933 264 8 390 18 635 53 1507 215 2867 1112 3668 2420 503 821 761 1741
762 2711 1 1615 -730 3105 -2015 4108 -132 103 -439 309 -585 393 -616 351
-1288 571 -2015 657 -102 13 -243 18 -520 20 -209 1 -398 1 -420 -1z m-223
-1374 c79 -29 159 -104 199 -186 53 -107 51 -151 -20 -554 -34 -191 -61 -350
-61 -356 0 -6 38 -5 103 3 130 15 471 16 613 2 60 -6 161 -19 224 -29 63 -11
116 -17 119 -14 3 2 28 136 56 297 57 322 66 347 146 433 68 71 148 106 255
112 165 9 297 -69 367 -217 50 -105 48 -152 -22 -541 -32 -184 -56 -336 -51
-338 4 -2 52 -29 106 -61 144 -85 255 -171 372 -286 57 -56 105 -97 107 -91 2
6 15 81 30 166 15 85 28 156 29 158 3 3 1200 -206 1229 -214 9 -3 17 -13 17
-22 0 -30 -308 -1774 -315 -1780 -7 -7 -1237 207 -1246 217 -3 3 -18 42 -34
86 -101 291 -282 513 -528 645 -249 134 -617 179 -842 102 -226 -76 -362 -207
-485 -464 -122 -256 -223 -656 -279 -1098 -70 -549 -13 -876 190 -1094 119
-127 262 -207 464 -258 76 -19 117 -23 255 -23 146 0 172 3 230 23 143 51 254
155 326 307 34 72 82 231 72 241 -3 3 -119 25 -258 49 -140 25 -256 47 -258
50 -6 6 160 962 169 977 5 7 399 -58 1160 -192 635 -111 1155 -203 1156 -204
6 -5 -101 -511 -137 -651 -87 -341 -195 -609 -315 -785 -118 -174 -289 -353
-489 -513 -337 -269 -723 -428 -1162 -478 l-101 -11 -57 -327 c-47 -267 -62
-337 -86 -387 -36 -74 -110 -146 -188 -182 -49 -23 -70 -27 -152 -27 -126 1
-193 26 -270 104 -66 66 -98 127 -113 216 -10 59 -7 85 37 340 27 154 45 280
40 284 -5 4 -67 18 -139 30 -240 43 -532 121 -752 202 -63 23 -116 39 -119 36
-3 -3 -30 -146 -60 -318 -62 -351 -75 -391 -156 -472 -27 -26 -74 -60 -106
-75 -51 -24 -69 -27 -167 -27 -102 0 -114 2 -168 30 -77 38 -159 127 -186 201
-41 107 -39 133 43 596 42 234 76 432 76 440 -1 7 -43 44 -94 81 -300 219
-555 545 -709 907 -89 210 -156 448 -192 680 -22 143 -31 485 -16 646 38 420
159 848 333 1174 118 223 257 410 438 590 172 172 396 338 592 440 l64 33 100
571 c108 610 112 627 184 709 41 46 132 100 196 117 58 14 171 5 236 -20z"/>
</g>
</svg>
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
