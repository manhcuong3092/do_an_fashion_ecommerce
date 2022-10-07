import './App.css';
import { Fragment } from 'react';
import Header from './components/Header/Header';
import SliderSection from './components/SliderSection';
import CollectionSection from './components/CollectionSection';
import SampleProducts from './components/SampleProducts';

function App() {
  return (
    <Fragment>
      <Header />
      <SliderSection />
      <CollectionSection />
      <SampleProducts />
    </Fragment>
  );
}

export default App;
