import React, { Fragment } from 'react'
import BlogSection from '../components/BlogSection'
import CollectionSection from '../components/CollectionSection'
import SampleProducts from '../components/SampleProducts'
import SliderSection from '../components/SliderSection'

const Home = () => {
  return (
    <Fragment>
      <SliderSection />
      <CollectionSection />
      <SampleProducts />
      <BlogSection />
    </Fragment>
  )
}

export default Home