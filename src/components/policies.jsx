import React from 'react';

const Policies = () => {
  return (
    <section className="work" id="work">
      <div className="heading py-5 container flex justify-center items-center bg-blue-200">
        <span className="text-4xl font-extrabold ">SHOPPING POLICIES</span>
      </div>

      <div className='flex bg-blue-200 justify-center pb-5'>
        <div className="w-[70vw] work-container container grid grid-cols-1 md:grid-cols-3 gap-5 bg-blue-200">
          <div className="work-box flex flex-col items-center text-center p-8 bg-gray-100 rounded-lg shadow-lg hover:shadow-2xl duration-100">
            <i className="ri-medal-line text-blue-500 text-2xl p-3 rounded-full bg-gray-300"></i>
            <h3 className="work-title text-xl font-medium mb-2">Returning</h3>
            <p className="work-description text-base">Customers can return or exchange their stuffed toys within 7 days of purchase, as long as they are in new and unused condition.</p>
          </div>

          <div className="work-box flex flex-col items-center text-center p-8 bg-gray-100 rounded-lg shadow-lg hover:shadow-2xl duration-200">
            <i className="ri-bank-card-line text-blue-500 text-2xl p-3 rounded-full bg-gray-300"></i>
            <h3 className="work-title text-xl font-medium mb-2">Shipping</h3>
            <p className="work-description text-base">We offer free shipping on orders over 200.000 VND within the Ho Chi Minh City.</p>
          </div>

          <div className="work-box flex flex-col items-center text-center p-8 bg-gray-100 rounded-lg shadow-lg hover:shadow-2xl duration-200">
            <i className="ri-riding-line text-blue-500 text-2xl p-3 rounded-full bg-gray-300"></i>
            <h3 className="work-title text-xl font-medium mb-2">Privacy</h3>
            <p className="work-description text-base">All information is securely stored and only used for processing orders and communication with customers.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Policies;
