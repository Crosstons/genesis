import React, { useEffect, useState } from 'react';
import { NFTStorage } from 'nft.storage';
import { useParams } from 'react-router-dom';
import { nfts } from './Utils';

const { ethers } = require("ethers");

function MintingNFT() {

  const {id} = useParams();
  const ethprovider = new ethers.BrowserProvider(window.ethereum);
  const [signer, setSigner] = useState();
  const [collection, setCollection] = useState(nfts[id]);

  const handleMint = async () => {
    const client = new NFTStorage({ token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE3MTBiNDk4RTE3ZTU4OTVBMjMyZEUwMGQwMUEzMTZiYzVhYWQxQWUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NzY4NzI4NDI1NSwibmFtZSI6IkdlbmVzaXMifQ.lGue5CF2tk-bHsgbKOr72ifY5vi-r8W4MedyBMxcgCw });
    const metadata = await client.store({

    });
  };

  useEffect(() => {
    (async () => {
      const _signer = await ethprovider.getSigner();
      setSigner(_signer);
    })();
  }, []);

  return (
    <section className="text-text bg-background h-screen">
      <div className="container px-5 py-24 mx-auto ">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <h1 className="text-text text-3xl title-font font-medium ">{collection.collection}</h1>
            <h2 className="text-sm title-font text-dark-bg tracking-widest mb-4">{collection.name}</h2>
            <p className="leading-relaxed mb-4">{collection.description}</p>
            <div className="flex border-t border-secondary py-2">
              <span className="text-dark-bg">Collection Addr.</span>
              <span className="ml-auto text-text">{collection.address}</span>
            </div>
            <div className="flex border-t border-secondary py-2">
              <span className="text-dark-bg">Location</span>
              <span className="ml-auto text-text">{collection.location}</span>
            </div>
            <div className="flex border-t border-b mb-6 border-secondary py-2">
              <span className="text-dark-bg">Available NFTs</span>
              <span className="ml-auto text-text">30</span>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-text">5 stNEAR</span>
              <button className="flex ml-auto text-secondary bg-accent border-0 py-2 px-6 focus:outline-none hover:bg-secondary rounded hover:text-background duration-300">Mint</button>
            </div>
          </div>
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-56 object-cover object-center rounded" src="https://cdn.discordapp.com/attachments/1063991835871154277/1122019549496233984/1e7d6cdd-dee8-48ae-b7f8-3bd478bd6444.jpg" />
        </div>
      </div>
    </section>
  );
}

export default MintingNFT;
