import React from 'react';

function MintingNFT() {
  return (
    <section className="text-text bg-background h-screen">
      <div className="container px-5 py-24 mx-auto ">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <h1 className="text-text text-3xl title-font font-medium ">Animated Night Hill Illustrations</h1>
            <h2 className="text-sm title-font text-dark-bg tracking-widest mb-4">BRAND NAME</h2>
            <p className="leading-relaxed mb-4">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam inxigo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean.</p>
            <div className="flex border-t border-secondary py-2">
              <span className="text-dark-bg">Color</span>
              <span className="ml-auto text-text">Blue</span>
            </div>
            <div className="flex border-t border-secondary py-2">
              <span className="text-dark-bg">Size</span>
              <span className="ml-auto text-text">Medium</span>
            </div>
            <div className="flex border-t border-b mb-6 border-secondary py-2">
              <span className="text-dark-bg">Quantity</span>
              <span className="ml-auto text-text">4</span>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-text">$58.00</span>
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
