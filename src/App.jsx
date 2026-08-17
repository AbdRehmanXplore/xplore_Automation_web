import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import BlogListPage from './pages/BlogListPage'
import BlogPostPage from './pages/BlogPostPage'
import CaseListPage from './pages/CaseListPage'
import CasePostPage from './pages/CasePostPage'
import './App.css'

function HomePage() {
  return (
    <>
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
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/cases" element={<CaseListPage />} />
            <Route path="/cases/:slug" element={<CasePostPage />} />
          </Routes>
          <Footer />
        </div>

      </div>
    </BrowserRouter>
  )
}

export default App
