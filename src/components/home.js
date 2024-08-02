import React,{useRef} from 'react'
import { Link } from 'react-router-dom'
import image1 from './farm.jpg';
import { About } from './about';
import { Contact } from './contact';

export const Home = () => {
  const aboutRef=useRef(null);
  const contactRef=useRef(null);
  const HomeRef=useRef(null);
  const scrollToAbout = () => {
    console.log("Scrolling to abt Us");
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    console.log("Scrolling to Contact Us");
    contactRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToHome = () => {
    console.log("Scrolling to Home");
    HomeRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <header >
        <nav>
          <h1 style={{ color: "whitesmoke", fontWeight: "bold", fontFamily: "serif", fontSize: "40px" }}>Farm Smart</h1>
          <div className="navigation">
            <button className="nav-button" onClick={scrollToHome}>Home</button>
            <button className="nav-button" onClick={scrollToAbout}>About </button>
            <button className="nav-button" onClick={scrollToContact}>Contact </button>
          </div>
          <Link to='/login' style={{ color: "white", textDecoration: "none" }}><h4>Signin→</h4></Link>
        </nav>
      </header>
      <div id='first' style={{ maxWidth: "100%", height: "850px", color: "whitesmoke" }} ref={HomeRef}>
        <div className='welcome-container'>
          <h1 style={{ fontFamily: "initial" }}>Welcome to our FarmConnect!</h1>
          <br></br>
          <h4>Freshness you can trust, quality you can taste.</h4>
          <h5>Experience the freshest produce straight from local farms to your table. Join us in supporting sustainable agriculture and building a healthier community with every purchase</h5>
          <br></br>
          <br></br>
          <br></br>
          <Link to='/login' style={{ textDecoration: 'none', fontSize: "20px" }}><button className='get' style={{backgroundColor:"green"}}>Get Started →</button></Link>
        </div>
        <div className='image-container'>
          <img src={image1} className='image1'></img>
        </div>
      </div>
      <div id="second"  ref={aboutRef} style={{ maxWidth: "100%", height: "auto", color: "whitesmoke" }}>
        <About />
      </div>
      <div id="third"  ref={contactRef} style={{ maxWidth: "100%", height: "auto", color: "whitesmoke" }}>
        <Contact />
      </div>

    </>

  )
}
