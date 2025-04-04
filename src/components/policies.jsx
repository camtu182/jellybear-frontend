import React from 'react';

const Policies = () => {
  return (
    <section className="work" id="work">
      <div className="block bg-gray-100 text-center w-full h-auto justify-items-center py-10">
        <span className="text-4xl bg-gray-100 font-extrabold ">SHOPPING POLICIES</span>
      </div>

      <div className='flex bg-gray-100 justify-center pb-5'>
        <div className="lg:w-[70vw] md:w-[80vw] work-container container grid grid-cols-1 lg:grid-cols-3  md:grid-cols-3 gap-5 bg-gray-100">
          <div className="work-box flex flex-col items-center text-center lg:p-8 md:p-3 bg-blue-50 rounded-lg shadow-lg hover:shadow-2xl duration-100">
            <i className="ri-medal-line text-blue-500 text-2xl p-3 rounded-full bg-gray-600"></i>
            <h3 className="work-title text-xl font-medium mb-2">Returning</h3>
            <p className="work-description text-base justify-self-auto">Customers can return or exchange their stuffed toys within 7 days of purchase, as long as they are in new and unused condition.</p>
          </div>

          <div className="work-box flex flex-col items-center text-center lg:p-8 md:p-3 bg-blue-50 rounded-lg shadow-lg hover:shadow-2xl duration-200">
            <i className="ri-bank-card-line text-blue-500 text-2xl p-3 rounded-full bg-gray-600"></i>
            <h3 className="work-title text-xl font-medium mb-2">Shipping</h3>
            <p className="work-description text-base">We offer free shipping on orders over 200.000 VND within the Ho Chi Minh City.</p>
          </div>

          <div className="work-box flex flex-col items-center text-center lg:p-8 md:p-3 bg-blue-50 rounded-lg shadow-lg hover:shadow-2xl duration-200">
            <i className="ri-riding-line text-blue-500 text-2xl p-3 rounded-full bg-gray-600"></i>
            <h3 className="work-title text-xl font-medium mb-2">Privacy</h3>
            <p className="work-description text-base">All information is securely stored and only used for processing orders and communication with customers.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Policies;
