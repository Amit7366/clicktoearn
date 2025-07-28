import Pricing from '@/components/Home/Pricing'
import ReferSection from '@/components/Home/ReferSection'
import TestimonialsSection from '@/components/Home/Testimonial'
import PageHeader from '@/components/Shared/PageHeader'
import React from 'react'

const OurPlan = () => {
  return (
    <div className='py-20'>
      <PageHeader header={'Our Plan'}/>
      <Pricing/>
      <ReferSection/>
      <TestimonialsSection/>
    </div>
  )
}

export default OurPlan
