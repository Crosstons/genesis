import React, { useState } from 'react';

function FAQSection() {
  const [selected, setSelected] = useState(null);

  const toggle = i => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  }

  const data = [
    { 
      question: 'What is a Genesis NFT?', 
      answer: 'Genesis NFTs represent a real-world tree in the form of a unique digital asset. Each NFT corresponds to a specific tree planted in a global reforestation project.' 
    },
    { 
      question: 'How does Genesis NFT support reforestation?', 
      answer: 'Every Genesis NFT sold contributes directly to reforestation efforts around the world. By purchasing an NFT, you support the planting and care of a real-world tree.' 
    },
    { 
      question: 'Can I track the growth of my tree?', 
      answer: 'Yes! Each Genesis NFT includes specific information about the tree and its location. As our reforestation partners provide updates, we will update your NFT with the growth and health data.' 
    },
    { 
      question: 'Is my Genesis NFT transferable?', 
      answer: 'Yes, Genesis NFTs are transferable. They can be sold or traded on various NFT marketplaces.' 
    },
    { 
      question: 'How can I prove ownership of my Genesis NFT?', 
      answer: 'Ownership of a Genesis NFT is verified through blockchain technology. Each NFT is connected to a unique address in the blockchain that proves the ownership of the token.' 
    },
    { 
      question: 'What happens if I lose access to my Genesis NFT?', 
      answer: 'As with other digital assets, it’s important to keep your account information secure. If you lose access, recovering your Genesis NFT can be difficult. Always backup your account information in a secure location.' 
    },
    { 
      question: 'Can I gift a Genesis NFT?', 
      answer: 'Yes! Genesis NFTs make great gifts. When you purchase a Genesis NFT as a gift, you’re not only giving a unique digital asset, but also contributing to global reforestation efforts.' 
    },
    // More questions here...
  ];

  return (
    <div className="w-full text-gray-600 body-font bg-background transition-all duration-500 ease-in-out">
      <div className="container px-5 py-24 mx-auto">
        <div className="text-center mb-20">
          <h1 className="sm:text-3xl text-2xl font-semibold title-font text-secondary mb-4 font-pop transition-all duration-500 ease-in-out">Frequently Asked Questions</h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500 font-pop transition-all duration-500 ease-in-out">Here are some common questions about Genesis NFTs and our project.</p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-accent inline-flex transition-all duration-500 ease-in-out"></div>
          </div>
        </div>
        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
          {data.map((item, i) => (
            <div onClick={() => toggle(i)} key={i} className="p-4 sm:w-full w-full">
              <div className="h-full bg-background p-8 rounded transition-all duration-1000  ">
                <h2 className={"text-2xl font-medium title-font mb-4 text-secondary " + (selected === i ? "text-primary" : "")}>
                  {item.question} 
                  <span className="float-right">
                    {selected === i ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </span>
                </h2>
                <p className={"leading-relaxed text-base " + (selected === i ? "" : "hidden")}>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQSection;
