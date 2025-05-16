import React from 'react';
import { Helmet } from 'react-helmet';

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions | 10X Energy Drink</title>
        <meta name="description" content="Read the terms and conditions for using 10X energy drinks. Important information about purchases, usage, and legal agreements." />
        <meta name="keywords" content="10X terms, energy drink terms, legal terms, purchase conditions, 10X policies" />
      </Helmet>
      {/* FAQ-Hero  Section*/}
      <div className="py-36 px-20 w-full flex faq-hero">
        <div className="title-section w-1/2">
          <h1 className="text-white quantico-bold-italic text-7xl uppercase">Terms and <br></br>Conditions</h1>
        </div>

        <div className="left-content w-1/2">
          <p className="text-white pt-sans-regular text-xl">Terms and conditions for using 10X products</p>
          <div className="buttons flex gap-8 mt-8">
            <div className="learn-more bg-white">
              <button className="quantico-bold-italic text-xl uppercase" type="button">Continue</button>
            </div>
            <div className="contact-us">
              <button className="text-xl pr-8 bg-transparent quantico-bold-italic border border-white text-white font-bold rounded-sm focus:outline-none  hover:shadow-lg shadow-[0px_2px_8px_rgba(255,255,255,0.8)] transition-shadow duration-300 ease-in-out uppercase" type="button">Back</button>
            </div>
          </div>
        </div>
      </div>


      <div className="container mx-auto px-4 py-8 max-w-4xl">

        <Helmet>
          <title>Terms and Conditions | 10X</title>
          <meta name="description" content="Terms and conditions for using 10X products and services" />

        </Helmet>


        <div className="prose prose-lg max-w-none pt-sans-regular">

          <h2 className="text-2xl quantico-bold-italic mt-8 mb-4 uppercase">Online Payments</h2>
          <p className="mb-4 pt-sans-regular">
            This online payment system is provided by 10X. 10X may update these terms from time to time and any changes will be effective immediately on being set out here. Please ensure you are aware of the current terms. The country of domicile for 10X is India.
          </p>

          <h2 className="text-2xl quantico-bold-italic mt-8 mb-4 uppercase">Terms & Conditions</h2>
          <p className="mb-4 pt-sans-regular">
            Please read these terms carefully before using the online payment facility. Using the online payment facility on this website indicates that you accept these terms. If you do not accept these terms do not use this facility.
          </p>

          <p className="mb-4 pt-sans-regular">
            All payments are subject to the following conditions:-
          </p>

          <p className="mb-4 pt-sans-regular">
            The description of services of match making are specific to your need, when you log in with your unique password. Normally payment is required in advance (i.e. before you commence your activity).
          </p>

          <p className="mb-4 pt-sans-regular">
            All Fees quoted are in Indian Rupees. The 10X reserves the right to change the fees at any time.
          </p>

          <ul className="list-disc pl-6 mb-4 pt-sans-regular">
            <li className="mb-2 pt-sans-regular">Your payment will normally reach the 10X account to which you are making a payment within two working days.</li>
            <li className="mb-2 pt-sans-regular">We cannot accept liability for a payment not reaching the correct 10X account due to you quoting an incorrect account number or incorrect personal details. Neither can we accept liability if payment is refused or declined by the credit/debit card supplier for any reason.</li>
            <li className="mb-2 pt-sans-regular">If the card supplier declines payment the 10X is under no obligation to bring this fact to your attention. You should check with your bank/credit/debit card supplier that payment has been deducted from your account.</li>
            <li className="mb-2 pt-sans-regular">In no event will the 10X be liable for any damages whatsoever arising out of the use, inability to use, or the results of use of this site, any websites linked to this site, or the materials or information contained at any or all such sites, whether based on warranty, contract, tort or any other legal theory and whether or not advised of the possibility of such damages.</li>
            <li className="mb-2 pt-sans-regular">Payment gateway Transaction charges are borne by 10X only</li>
          </ul>

          <h2 className="text-2xl quantico-bold-italic mt-8 mb-4 uppercase">Payment Options</h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300 pt-sans-regular">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 quantico-bold-italic">Payment Options</th>
                  <th className="border border-gray-300 px-4 py-2 quantico-bold-italic">Transaction Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 pt-sans-regular">Debit Cards (Visa & Master)</td>
                  <td className="border border-gray-300 px-4 py-2 pt-sans-regular"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 pt-sans-regular">Debit Cards (Rupay)</td>
                  <td className="border border-gray-300 px-4 py-2 pt-sans-regular">NIL</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 pt-sans-regular">UPI</td>
                  <td className="border border-gray-300 px-4 py-2 pt-sans-regular">NIL</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 pt-sans-regular">Wallets</td>
                  <td className="border border-gray-300 px-4 py-2 pt-sans-regular"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 pt-sans-regular">Credit Cards (Master, Visa, Rupay)</td>
                  <td className="border border-gray-300 px-4 py-2 pt-sans-regular"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 pt-sans-regular">Credit Cards (Amex & Diners)</td>
                  <td className="border border-gray-300 px-4 py-2 pt-sans-regular"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 pt-sans-regular">Net Banking</td>
                  <td className="border border-gray-300 px-4 py-2 pt-sans-regular"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 pt-sans-regular">UPI– Credit Card, Debit Cards, wallets</td>
                  <td className="border border-gray-300 px-4 py-2 pt-sans-regular">As per respective category rates</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl quantico-bold-italic mt-8 mb-4 uppercase">Contact Us</h2>
          <p className="mb-4 pt-sans-regular">
            If you have any questions about these Terms, please contact us at <span className="font-bold">support@10xdrink.com</span>.
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
