import './App.css';
import { Fragment } from 'react';
import Header from './components/Header/Header';
import SliderSection from './components/SliderSection';
import CollectionSection from './components/CollectionSection';

function App() {
  return (
    <Fragment>
      <Header />
      <SliderSection />
      <CollectionSection />
    </Fragment>
  );
}

export default App;
