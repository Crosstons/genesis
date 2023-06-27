const provider = window.ethereum;
const { ethers } = require("ethers");

export const getTimeStamp = async () => {
  const _provider = new ethers.JsonRpcProvider("https://mainnet.aurora.dev/7adW6WK2WNVmpTRkxYncqhffSdD1GaQKjHPLL2y3zAN");
  let b_number = await _provider.getBlockNumber();
  let b_lock = await _provider.getBlock(b_number);
  return b_lock.timestamp;
}

export const onConnect = async (connected) => {
    const _chainId = await provider.request({ method : "eth_chainId"});
    if (_chainId.toString() !== "0x4e454152" ){
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x4e454152' }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x4e454152',
                  chainName: 'Aurora+',
                  rpcUrls: ['https://mainnet.aurora.dev/7adW6WK2WNVmpTRkxYncqhffSdD1GaQKjHPLL2y3zAN'],
                },
              ],
            });
          } catch (addError) {
            console.log(addError)
          }
        }
      }
    }
    if(!connected) {
      const res = await provider.request({method:'eth_requestAccounts'})
      if(res){
          return ({res : res[0], conn : true});
      }
      else {
        return ({res : "", conn : false});
      }
    }
  }

export const nfts = [
    { 
      id: 1, 
      address: "0x8fb9035a346941766450E82670Edc7EA4BE548Ed", 
      name: 'BRW',
      collection: 'Brazilian Rosewood', 
      image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122018737135038544/92e25f4c-e473-4d00-91e9-55eba4711e35.jpg',
      description: "Brazilian Rosewood, a prized tree species native to Brazil's Atlantic Forest, is endangered due to overexploitation, illegal logging, and habitat loss. Its dense hardwood and exceptional tonal qualities make it ideal for musical instruments. Efforts to protect and restore its populations are crucial for preserving its cultural and ecological significance, as well as supporting industries reliant on its valuable timber. Conservation measures and awareness are essential for the survival of this iconic species.",
      location: "Near Reserva Florestal Adolpho Ducke (Brazil)",
      metadata: "ipfs://bafyreicq5vxhg4fh7t33q4ind3upo62dt7dtr2maa7qo4uc7mdtvbtc76u/metadata.json"
    },
    { 
      id: 2, 
      address: "0x1Cb0C769af1a84c540f87011Ea3776bd721E7cA6", 
      name: 'DB', 
      collection: 'Dragon Blood', 
      image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122022797615562842/1125eb85-59cd-4312-9dc1-069d59165fe4.jpg',
      description: "The Dragon Blood tree, native to the Socotra archipelago in Yemen, is facing endangerment due to habitat destruction and overharvesting of its valuable resin. Its unique umbrella-shaped crown and crimson sap, known as \"dragon's blood,\" have made it a subject of fascination and commercial interest. The resin has been used for centuries in traditional medicine, dyes, and varnishes. Conservation efforts are vital to safeguard the Dragon Blood tree and preserve its ecological importance, cultural significance, and potential medicinal uses. By promoting sustainable practices and raising awareness, we can help protect this extraordinary tree and the delicate ecosystem it inhabits.",
      location: "Socotra Archipelago (Yemen)",
      metadata: "ipfs://bafyreibf4lt5s2ewjfxy3okmgngur7o7u2yimfc3uq35nidkvjb4bdlvju/metadata.json"
    },
    { 
      id: 3,
      address :"0xC9B78D6b77b651c875d4Db3255c2f5A8AB19af62",
      name: 'MP', 
      collection: 'Monkey Puzzle', 
      image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122018729023250442/837c15b3-cec9-4dd0-bab5-75e2b9d781dc.jpg',
      description: "The Monkey Puzzle tree, native to the Andes Mountains, is a striking and endangered conifer. Its spiky branches and dense foliage make it unique. Deforestation and habitat loss have put it at risk. Conservation efforts aim to protect this species, preserving its beauty and vital role in biodiversity.",
      location: "Andes Mountain (South America)",
      metadata: "ipfs://bafyreiasmtkvqj7a5ktc3qmotzkevkf2srkdfucaxemmemolswoxddgabm/metadata.json"   
    },
    { 
      id: 4,
      address :"0x28755f5f26606694F4b3857B89743547AB86f1d2",
      name: 'FKT',
      collection: 'Franklin Tree', 
      image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122024320202448926/e0ce5f27-c560-4d8f-8608-5fa351c86489.jpg',
      description: "The Franklin Tree, named after Benjamin Franklin, is a rare and endangered deciduous tree native to the southeastern United States. It bears beautiful white flowers in spring and boasts a unique leaf shape. Due to habitat loss and overharvesting, the Franklin Tree is now critically endangered in the wild. Conservation initiatives focus on preserving the remaining populations and raising awareness about its ecological importance. Efforts are underway to ensure the survival of this iconic tree for future generations to enjoy.",
      location: "Washington (USA)",
      metadata: "ipfs://bafyreibjwpfcj7z4vdcl4e2jyezf44w6uydlmstgk5cmzam5xvd3ofjeay/metadata.json"   
    },
    { 
      id: 5,
      address :"0xE705E8c366144b2689c37B523b5cA0aBaf95Efaf",
      name: 'CFT',
      collection: 'Coffin Tree', 
      image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122019992003674202/ae6617f9-d4ba-4b31-9a54-2ce10bb8b504.jpg',
      description: "The Coffin Tree, also known as the Tetrameles nudiflora, is a remarkable tree species found in Southeast Asia. It is named for its peculiar resemblance to a wooden coffin when its branches are bare. The Coffin Tree holds cultural and religious significance in some regions, where it is believed to be associated with ancestral spirits. Conservation efforts are crucial to protect this unique tree and its ecological value. By raising awareness and implementing sustainable practices, we can help ensure the survival and preservation of the Coffin Tree for future generations to appreciate its distinct beauty and cultural significance.",
      location: "Taiwan",
      metadata: "ipfs://bafyreibmkqe4jco33zkik7jolemcr27o7warx263jibiuyvxfsm4llbaeq/metadata.json"   
    },
    { 
      id: 6,
      address :"0xFBDD011B2D9862ab6c7E802Cf703aD78C4364346",
      name: 'BFF',
      collection: 'Brodiaea filifolia', 
      image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122019549496233984/1e7d6cdd-dee8-48ae-b7f8-3bd478bd6444.jpg',
      description: "Brodiaea filifolia, also known as Thread-Leaved Brodiaea, is a stunning flowering plant native to California. With its delicate leaves and vibrant purple flowers, it adds beauty to its surroundings. Sadly, it is threatened by habitat loss and urban development, risking its existence. Conservation efforts are vital to protect this species and preserve California's biodiversity. Let's raise awareness and promote habitat conservation to safeguard the Brodiaea filifolia and maintain the ecological balance.",
      location: "California (USA)",
      metadata: "ipfs://bafyreifimhtmqnr5kjtyiagpgrb2kaazfsaqiev5nee6utg7gbafp4a27a/metadata.json"   
    },
  ];