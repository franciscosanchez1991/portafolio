import { Link } from 'react-router-dom'

function App() {
  const handleDownloadCV = async () => {
    try {
      const response = await fetch('/CV-ingeniero_informatica.pdf');
      
      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Verify content type
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/pdf')) {
        throw new Error('Invalid content type! Expected PDF.');
      }

      // Check file size (5MB limit)
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength) > 5 * 1024 * 1024) {
        throw new Error('File too large!');
      }

      const blob = await response.blob();
      
      // Verify blob type
      if (blob.type !== 'application/pdf') {
        throw new Error('Invalid file type!');
      }

      // Create secure URL
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Francisco-Sanchez-CV.pdf');
      
      // Clean up after download
      link.onclick = () => {
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          link.remove();
        }, 150);
      };

      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Could not download CV. Please try again.');
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">FS</div>
          <ul className="nav-links">
            <li><Link to="/" className="active">Home</Link></li>
            <li><Link to="/game">Interactive Demo</Link></li>
            <li><button onClick={handleDownloadCV} className="download-link">Download CV</button></li>
          </ul>
        </div>
      </nav>

      <main className="container">
        <section className="hero">
          <div className="profile-section">
            <div className="profile-image">
              <img src="/images/myphoto.png" alt="Francisco Sánchez" />
            </div>
            <div className="profile-info">
              <h1>Francisco Sánchez</h1>
              <h2>Computer Engineer</h2>
              <p className="tagline">Back End Developer | Game Developer</p>
              <div className="social-links">
                <a href="https://github.com/franciscosanchez1991" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/francisco-sánchez-41b21624b" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="about">
          <h2>About Me</h2>
          <p>
            I'm a proactive person with great interpersonal skills, eager to learn, and motivated to acquire more knowledge 
            so that every day I can be more useful to the team as a graduate. I'm looking for a dynamic and challenging job 
            to continue pursuing my career.
          </p>
        </section>

        <section className="skills">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Languages</h3>
              <ul>
                <li>Java</li>
                <li>JavaScript</li>
                <li>Python</li>
                <li>SQL</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Technologies</h3>
              <ul>
                <li>Spring Boot</li>
                <li>React Native (including Expo)</li>
                <li>AWS</li>
                <li>Django</li>
                <li>Node.js</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="projects">
          <h2>Featured Project</h2>
          <div className="project-card">
            <h3>Interactive Portfolio Game</h3>
            <p>Experience my skills through an interactive game environment.</p>
            <Link to="/game" className="cta-button">
              Try it out <i className="fas fa-gamepad"></i>
            </Link>
          </div>
        </section>

        <section className="contact">
          <h2>Get In Touch</h2>
          <div className="contact-info">
            <p><i className="fas fa-envelope"></i> francisco.anto.sancver@gmail.com</p>
            <p><i className="fas fa-location-dot"></i> Chile</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App