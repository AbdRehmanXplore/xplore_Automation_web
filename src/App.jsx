import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Narrative from './components/Narrative/Narrative'
import Work from './components/Work/Work'
import Capabilities from './components/Capabilities/Capabilities'
import Testimonial from './components/Testimonial/Testimonial'
import Pricing from './components/Pricing/Pricing'
import Contact from './components/Contact/Contact'
import CTA from './components/CTA/CTA'
import Footer from './components/Footer/Footer'
import Dither from './components/Dither'
import './App.css'

function App() {
  return (
    <div className="app-container">
      {/* Dither Background - Full screen, receives pointer events */}
      <div className="dither-background">
        <Dither
          waveColor={[0, 0.09803921568627451, 0.8392156862745098]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.2}
          colorNum={5}
          pixelSize={2}
          waveAmplitude={0.3}
          waveFrequency={2.5}
          waveSpeed={0.1}
        />
      </div>

      {/* Content layer - pointer events pass through to Dither */}
      <div className="content-layer">
        <Header />
        <main>
          <Hero />
          <Narrative />
          <Work />
          <Capabilities />
          <Testimonial />
          <Pricing />
          <Contact />
          <CTA />
        </main>
        <Footer />
      </div>

    </div>
  )
}

export default App
