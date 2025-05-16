import React from 'react'
import { Helmet } from 'react-helmet'
import Contact from '../components/Contact'


const ContactPage = () => {
  return (
    <div>
      <Helmet>
        <title>Contact Us | 10X Energy Drink</title>
        <meta name="description" content="Get in touch with the 10X team. We're here to answer your questions, provide support, and help you with any inquiries about our products." />
        <meta name="keywords" content="contact 10X, energy drink support, customer service, product inquiries, 10X help" />
      </Helmet>
      <Contact/>
    </div>
  )
}

export default ContactPage
