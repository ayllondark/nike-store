
import './App.css'
import { Cart, FlexContent, Footer, Header, NavBar, Sales, Stories } from './components'
import {heroapi, popularsales, toprateslaes, highlight, sneaker, story, footerAPI} from './data/data';


function App() {

  return (
    <>
      <NavBar />
      <Cart />
      <main className='flex flex-col gap-16 relative'>
        <Header heroapi={heroapi} />
        <Sales endpoint={popularsales} ifExists />
        <FlexContent endpoint={highlight} ifExists />
        <Sales endpoint={toprateslaes} />
        <FlexContent endpoint={sneaker} />
        <Stories story={story} />
        <Footer footerAPI={footerAPI} />
      </main> 
    </>
  )
}

export default App
