import './App.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Body } from './components/Body';

const socialMedia = [
  { 
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/deep-lad-prav09/",
    icon: "fa-brands fa-linkedin-in"
  },
  { 
    name: "Github",
    link: "https://github.com/laddeep",
    icon: "fa-brands fa-github-alt"},
  { 
    name: "Instagram",
    link: "https://instagram.com/",
    icon: "fa-brands fa-instagram"
  },
  { 
    name: "WhatsApp",
    link: "https://wa.me/9638221183",
    icon: "fa-brands fa-whatsapp"
  }
];

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Body>
          <img 
            className="profile-img"
            src="images/profile-img.jpeg" 
            alt="Profile of Deep Lad" 
            height="250px" 
          />
          <h1>Hi, I am Deep!</h1>
          <p>
            Hello everyone! I am Deep Lad, a Computer Engineer by education and a developer by profession. Solely into learning something about everything. My interest are way more rooted in creativity. Even my leisure time is dedicated to creative stuffs.
          </p>
          <p>
            And now, here I am  at Axelor Technologies on the journey of nurturing my interests and hoping to fulfil company's goals. 
          </p>
      </Body>
      <Footer media={socialMedia}/>
    </div>
  );
}

export default App;
