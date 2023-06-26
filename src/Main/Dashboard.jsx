import React, { useEffect, useState } from 'react';
import { getTimeStamp, onConnect } from './Utils';
import { Link } from 'react-router-dom';
import genAbi from '../contract/abi/genesis.json';
import treeAbi from '../contract/abi/treeCollection.json';
import { nfts } from './Utils';

const { ethers } = require("ethers");

function Dashboard() {

  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const ethprovider = new ethers.BrowserProvider(window.ethereum);
  const [signer, setSigner] = useState();
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [nftList, setNftList] = useState([]);
  const [displayedNFT, setDisplayedNFT] = useState(nftList[0]);
  const genContract = new ethers.Contract(ethers.getAddress("0xecA2Aa3C74f8481009851A78B5aC8Af971ddb6dB"), genAbi.abi, signer);

  const handleFetch = async () => {
    setLoading(true);
    var temp_list = [];
    const timestamp = await getTimeStamp();
    console.log(timestamp);
    for(const i in nfts) {
      let contract = new ethers.Contract(ethers.getAddress(nfts[i].address), treeAbi.abi, signer);
      const bal = await contract.balanceOf(account.res);
      console.log(bal);
      for (var j = 1; j <= bal; j++) {
        console.log(Number(i + 1), j);
        let temp = await contract.ownerOf(j);
        if(String(temp).toLowerCase() == account.res.toLowerCase()) {
          const res = await genContract.getTreeDetails(Number(i) + 1, j);
          let tree = {
            id : temp_list.length + 1,
            name : nfts[i].name,
            collection : nfts[i].collection,
            image : nfts[i].image,
            number : Number(j),
            collection_id : Number(nfts[i].id),
            claimable : timestamp - Number(res[1]) > 86400,
            water_level : timestamp - Number(res[0]),
            yield : Number(res[3])
          }
          temp_list.push(tree);
        }
      }
    }
    console.log(temp_list);
    setNftList(temp_list);
    setDisplayedNFT(temp_list[0]);
    setLoaded(true);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      const res = await onConnect(connected);
      setAccount(res);
      setConnected(true);
      const _signer = await ethprovider.getSigner();
      setSigner(_signer);
    })();
  }, []);

  // Hydration state
  const [hydration, setHydration] = useState(0);

  const handleWater =  async () => {
    setLoading(true);
    console.log(displayedNFT.collection_id, displayedNFT.number);
    try{
    const res = await genContract.water(displayedNFT.collection_id, displayedNFT.number);
    await res.wait();
    alert("Watered Successfully!!"); 
    } catch (error) {
      alert("Something went wrong - " + error);
    }
    setLoading(false);
  }

  const handleClaim =  async () => {
    setLoading(true);
    if(displayedNFT.claimable) {
    console.log(displayedNFT.collection_id, displayedNFT.number);
    try{
    const res = await genContract.claim(displayedNFT.collection_id, displayedNFT.number);
    await res.wait();
    alert("Claimed Successfully!!"); 
    } catch (error) {
      alert("Something went wrong - " + error);
    }
    } else {
      alert("Can't claim, too early!!");
    } 
    setLoading(false);
  }

  const handleRowClick = (nft) => {
    if((nft.water_level / 43200) * 100 > 100) {
      setHydration(0);
    } else if((nft.water_level / 43200) * 100 < 1){
      setHydration(100);
    } else {
      setHydration(Math.floor(100 - ((nft.water_level / 43200) * 100)));
    }
    setDisplayedNFT(nft);
  };

  return (
    <div className="h-screen flex">
      { loaded ? 
      <>
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
        <button onClick={handleWater} className="w-full bg-dark-bg text-background py-2 rounded hover:bg-secondary transition-colors duration-300">{ loading ? "Loading.." : "Hydrate" }</button>
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
            {nftList.map(nft => (
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
      </> 
    : 
      <>
        <button onClick={handleFetch} className="w-full bg-dark-bg text-background py-2 rounded hover:bg-secondary transition-colors duration-300 text-pop">{ loading ? "Loading.." : "Fetch" }</button>
      </>
    }
    </div>
  );
}

export default Dashboard;
