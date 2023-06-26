import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { nfts } from './Utils';
import genAbi from '../contract/abi/genesis.json';
import erc20Abi from '../contract/abi/erc20.json';
import * as fs from 'fs';

const { ethers } = require("ethers");

function MintingNFT() {

  const {id} = useParams();
  const navigate = useNavigate();
  const ethprovider = new ethers.BrowserProvider(window.ethereum);
  const [signer, setSigner] = useState();
  const [collection, setCollection] = useState(nfts[id]);
  const [minted, setMinted] = useState(0);
  const [loading, setLoading] = useState(false);

  const genContract = new ethers.Contract(ethers.getAddress("0xecA2Aa3C74f8481009851A78B5aC8Af971ddb6dB"), genAbi.abi, signer);

  const getBlob = async (url) => {
    fetch(url)
      .then( response => {
        const data = response.blob()
        console.log(data)
        return data
    })
  }

  const handleMint = async () => {
    setLoading(true);
    try{
  //  let contract = new ethers.Contract(ethers.getAddress("0x87d5D0d30F52d121788b1000C3F35b4a0688D34C"), erc20Abi.abi, signer);
  //  const approv = await contract.approve(ethers.getAddress("0xecA2Aa3C74f8481009851A78B5aC8Af971ddb6dB"), Number("5000000000000"));
  //  await approv.wait();
    const result = await genContract.mintTree(collection.id, collection.metadata);
    await result.wait();
    console.log(result);
    alert("Mint Successfull!");
    setLoading(false);
    navigate('/minting');
    } catch (error) {
      alert("Something went wrong" + error);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const _signer = await ethprovider.getSigner();
      setSigner(_signer);
      const temp = new ethers.Contract(ethers.getAddress("0xecA2Aa3C74f8481009851A78B5aC8Af971ddb6dB"), genAbi.abi, _signer);
      const count = await temp.returnNFTcount(collection.id);
      setMinted(Number(count));
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
              <span className="ml-auto text-text">{ 30 - minted }</span>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-text">5 stNEAR</span>
              <button onClick={handleMint} className="flex ml-auto text-secondary bg-accent border-0 py-2 px-6 focus:outline-none hover:bg-secondary rounded hover:text-background duration-300">{ loading ? "Loading..." : "Mint" }</button>
            </div>
          </div>
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-56 object-cover object-center rounded" src="https://cdn.discordapp.com/attachments/1063991835871154277/1122019549496233984/1e7d6cdd-dee8-48ae-b7f8-3bd478bd6444.jpg" />
        </div>
      </div>
    </section>
  );
}

export default MintingNFT;
