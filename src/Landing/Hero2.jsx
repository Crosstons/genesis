import React, { useState } from 'react';

function Hero2() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Question 1',
      answer: 'Answer 1',
    },
    {
      question: 'Question 2',
      answer: 'Answer 2',
    },
    {
      question: 'Question 3',
      answer: 'Answer 3',
    },
  ];

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl text-text font-pop">FAQ Section</h2>
          <div className="mt-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-secondary py-3 cursor-pointer transition duration-300"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center justify-between">
                  <p className="text-secondary font-bold">{faq.question}</p>
                  <svg
                    className={`w-5 h-5 ${
                      activeIndex === index ? 'transform rotate-180' : ''
                    } transition-transform duration-300`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {activeIndex === index && (
                  <p className="mt-3 text-secondary">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero2;
