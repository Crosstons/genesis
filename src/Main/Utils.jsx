const provider = window.ethereum;

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
  ];