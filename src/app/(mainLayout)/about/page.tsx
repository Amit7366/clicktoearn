import About from '@/components/Home/About'
import HowItWorks from '@/components/Home/HowItWorks'
import ReferSection from '@/components/Home/ReferSection'
import TestimonialsSection from '@/components/Home/Testimonial'
import PageHeader from '@/components/Shared/PageHeader'
import React from 'react'

const AboutPage = () => {
  return (
    <div className='py-20'>
      <PageHeader header={'About US'}/>
      <About/>
      <ReferSection/>
      <HowItWorks/>
      <TestimonialsSection/>
    </div>
  )
}

export default AboutPage
