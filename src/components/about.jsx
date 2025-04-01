import React from 'react';

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-img grid place-items-center">
        <img src="img/about.jpg" alt="" className="w-full rounded-lg object-contain" />
      </div>
      <div className="about-text p-8 bg-gray-200">
        <span className="text-xl font-bold text-primary uppercase">About Us</span>
        <h2 className="text-3xl font-bold mb-2">The perfect companion</h2>
        <h3 className="text-xl font-medium mb-4">for all the special moments in your life</h3>
        <p className="text-base mb-6">
          Our passion for soft and cuddly plush toys shines through in our carefully curated collection of adorable creatures. We believe that every stuffed toy has a story to tell and can bring joy, comfort, and endless smiles.
        </p>
        <p className="text-base">Thank you for visiting our website and we hope you find the perfect stuffed toy to bring into your life. Happy shopping!</p>
      </div>
    </section>
  );
};

export default About;
