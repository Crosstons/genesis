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
    { id: 1, name: 'NFT 1', collection: 'Collection 1', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122018737135038544/92e25f4c-e473-4d00-91e9-55eba4711e35.jpg', number: '#1' },
    { id: 2, name: 'NFT 2', collection: 'Dragon Blood', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122022797615562842/1125eb85-59cd-4312-9dc1-069d59165fe4.jpg', number: '#2' },
    { id: 9, name: 'NFT 2', collection: 'Collection 2', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122018729023250442/837c15b3-cec9-4dd0-bab5-75e2b9d781dc.jpg', number: '#9' },
    { id: 3, name: 'NFT 3', collection: 'Collection 3', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122019164945662012/7153e52c-618e-463d-aa96-95bc5021671a.jpg', number: '#3' },
    { id: 4, name: 'NFT 4', collection: 'Collection 4', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122019175074897940/01dfa54c-21d0-4d23-a18b-2acdd438618e.jpg', number: '#4' },
    { id: 5, name: 'NFT 1', collection: 'Collection 1', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122019549496233984/1e7d6cdd-dee8-48ae-b7f8-3bd478bd6444.jpg', number: '#5' },
    { id: 6, name: 'NFT 2', collection: 'Collection 2', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122019992003674202/ae6617f9-d4ba-4b31-9a54-2ce10bb8b504.jpg', number: '#6' },
    { id: 7, name: 'NFT 3', collection: 'Collection 3', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122019999947685960/ed6cf5d1-744e-45d8-bd82-1de701f9b4fe.jpg', number: '#7' },
    { id: 8, name: 'NFT 1', collection: 'Collection 1', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122022213156085840/d87450c1-8ade-4f73-9ece-042fa02717d2.jpg', number: '#8' },
    { id: 10, name: 'NFT 3', collection: 'Collection 3', image: 'https://cdn.discordapp.com/attachments/1063991835871154277/1122024320202448926/e0ce5f27-c560-4d8f-8608-5fa351c86489.jpg', number: '#10' },
  ];