import React from 'react';
import img from '../Landing/img.png'
function Dashboard() {
  return (
    <section class="text-primary body-font bg-background">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap w-full mb-20">
      <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
        <h1 class="sm:text-3xl text-2xl font-semibold title-font mb-2 text-primary">Dashboard</h1>
        <div class="h-1 w-20 bg-accent rounded"></div>
      </div>
      <p class="lg:w-1/2 w-full leading-relaxed text-primary">Explore our curated selection of unique and exclusive NFTs. Embrace the future of art, invest in creativity, and secure your spot in the digital renaissance.</p>
    </div>
    <div class="flex flex-wrap -m-4">
      <div class="xl:w-1/4 md:w-1/2 p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
        <div class="bg-background p-6 rounded-lg">
          <img class="h-40 rounded w-full object-cover object-center mb-6" src={img} alt="NFT content"/>
          <h3 class="tracking-widest text-accent text-xs font-medium title-font">ARTIST NAME</h3>
          <h2 class="text-lg text-primary font-medium title-font mb-4">Artwork Title</h2>
          <p class="leading-relaxed text-base">Brief description of the artwork or the artist's concept behind the artwork.</p>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}

export default Dashboard;
