import { useState, useEffect } from 'react'
import * as Icons from 'lucide-react'
import './App.css'

// Centralized portfolio data config for easy customization
const PORTFOLIO_DATA = {
  name: 'Sangsaptak Das',
  logoName: 'Sangsaptak',
  role: 'B.Tech CSE (AI & ML) Student | Aspiring Software Developer',
  tag: '👋 Welcome to my portfolio',
  bio: 'I build clean, functional, and intelligent software solutions. Passionate about Artificial Intelligence, Machine Learning, and full-stack development, I love turning ideas into real, working products.',
  resumeUrl: '#',
  about: {
    paragraphs: [
      "I'm Sangsaptak Das, a B.Tech Computer Science student specializing in Artificial Intelligence and Machine Learning. I enjoy solving real-world problems through code, and I'm constantly exploring new technologies across web development, AI, and backend systems.",
      "My goal is to become a skilled software developer who builds impactful, user-focused applications while continuing to deepen my knowledge of machine learning and intelligent systems."
    ],
    objective: {
      title: 'Career Objective',
      text: 'To secure a challenging role as a software developer where I can apply my technical skills, contribute to meaningful projects, and grow as a professional in a collaborative, innovation-driven environment.'
    },
    education: {
      degree: 'B.Tech in Computer Science (AI & ML)',
      institution: 'Undergraduate Program',
      details: 'Currently pursuing my undergraduate degree, focusing on core CS fundamentals along with specialized coursework in Artificial Intelligence and Machine Learning.'
    },
    focusAreas: [
      'Software Development',
      'Machine Learning',
      'Web Technologies',
      'Backend Systems'
    ]
  },
  skills: [
    { name: 'Python', iconName: 'Code2' },
    { name: 'Java', iconName: 'Coffee' },
    { name: 'C', iconName: 'Cpu' },
    { name: 'HTML', iconName: 'FileCode' },
    { name: 'CSS', iconName: 'Palette' },
    { name: 'JavaScript', iconName: 'Zap' },
    { name: 'React', iconName: 'Atom' },
    { name: 'Node.js', iconName: 'Server' },
    { name: 'FastAPI', iconName: 'Flame' },
    { name: 'MongoDB', iconName: 'Database' },
    { name: 'MySQL', iconName: 'Columns4' },
    { name: 'Git', iconName: 'GitBranch' },
    { name: 'GitHub', iconName: 'Github' }
  ],
  projects: [
    {
      title: 'AI-Powered Chatbot',
      description: 'An intelligent chatbot built using machine learning techniques to understand and respond to user queries in natural language.',
      tags: ['Python', 'Machine Learning', 'FastAPI'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Full-Stack Task Manager',
      description: 'A responsive task management web app with user authentication, real-time updates, and a clean, intuitive interface.',
      tags: ['React', 'Node.js', 'MongoDB'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Student Result Management System',
      description: 'A database-driven system to manage and analyze student academic records with a secure and structured backend.',
      tags: ['Java', 'MySQL', 'HTML/CSS'],
      github: '#',
      demo: '#'
    }
  ],
  contact: {
    email: 'sangsaptak.das@example.com',
    phone: '+91 98765 43210',
    linkedin: 'linkedin.com/in/sangsaptak-das',
    github: 'github.com/sangsaptak-das'
  }
}

// Helper component to render Lucide icons dynamically from config strings
const DynamicIcon = ({ name, size = 24, className = "" }) => {
  const IconComponent = Icons[name] || Icons.HelpCircle;
  return <IconComponent size={size} className={className} />;
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [toast, setToast] = useState(null);

  // Monitor scroll for styling navbar and highlighting active links
  useEffect(() => {
    const handleScroll = () => {
      // Navbar bg transformation
      setIsScrolled(window.scrollY > 50);

      // Section tracker
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      let currentSection = 'home';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If top of section is within upper half of the viewport
          if (rect.top <= window.innerHeight * 0.3) {
            currentSection = sectionId;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Utility to handle clipboard copy & alert toast
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setToast({ message: `${label} copied to clipboard!`, id: Date.now() });
      setTimeout(() => setToast(null), 3000);
    });
  }

  return (
    <>
      {/* Navigation Bar */}
      <header className={isScrolled ? 'scrolled' : ''}>
        <nav className="navbar">
          <div className="logo">
            {PORTFOLIO_DATA.logoName}<span>.</span>
          </div>
          <ul className="nav-links">
            <li>
              <a 
                href="#home" 
                className={activeSection === 'home' ? 'active' : ''}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={activeSection === 'about' ? 'active' : ''}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                className={activeSection === 'skills' ? 'active' : ''}
              >
                Skills
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                className={activeSection === 'projects' ? 'active' : ''}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={activeSection === 'contact' ? 'active' : ''}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-tag">
            <DynamicIcon name="Sparkles" size={16} />
            <span>{PORTFOLIO_DATA.tag}</span>
          </div>
          <h1>
            Hi, I'm <span className="accent-text">{PORTFOLIO_DATA.name}</span>
          </h1>
          <h2>{PORTFOLIO_DATA.role}</h2>
          <p>{PORTFOLIO_DATA.bio}</p>
          <div className="hero-buttons">
            <a 
              href={PORTFOLIO_DATA.resumeUrl} 
              className="btn btn-primary"
              download
            >
              <DynamicIcon name="Download" size={18} />
              Download Resume
            </a>
            <a href="#contact" className="btn btn-outline">
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">A little more about who I am and what I do</p>

          <div className="about-grid">
            <div className="about-text">
              {PORTFOLIO_DATA.about.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
              
              <div className="about-box">
                <h3>
                  <DynamicIcon name="Target" size={20} />
                  {PORTFOLIO_DATA.about.objective.title}
                </h3>
                <p>{PORTFOLIO_DATA.about.objective.text}</p>
              </div>
            </div>

            <div className="about-info">
              <div className="about-box">
                <h3>
                  <DynamicIcon name="GraduationCap" size={20} />
                  Education
                </h3>
                <p className="edu-degree">{PORTFOLIO_DATA.about.education.degree}</p>
                <div className="edu-meta">{PORTFOLIO_DATA.about.education.institution}</div>
                <p>{PORTFOLIO_DATA.about.education.details}</p>
              </div>

              <div className="about-box">
                <h3>
                  <DynamicIcon name="Briefcase" size={20} />
                  Focus Areas
                </h3>
                <div className="focus-tags">
                  {PORTFOLIO_DATA.about.focusAreas.map((area, idx) => (
                    <span key={idx} className="focus-tag">{area}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <div className="container">
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">Technologies and tools I work with</p>

          <div className="skills-grid">
            {PORTFOLIO_DATA.skills.map((skill, idx) => (
              <div key={idx} className="skill-card">
                <DynamicIcon 
                  name={skill.iconName} 
                  size={32} 
                  className="skill-icon"
                />
                <p>{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <p class="section-subtitle">A few things I've built</p>

          <div className="projects-grid">
            {PORTFOLIO_DATA.projects.map((project, idx) => (
              <div key={idx} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-tags">
                  {project.tags.map((tag, tagIdx) => (
                    <span key={tagIdx}>{tag}</span>
                  ))}
                </div>
                <div className="project-buttons">
                  <a 
                    href={project.github} 
                    className="btn btn-outline btn-small"
                  >
                    <DynamicIcon name="Github" size={16} />
                    GitHub
                  </a>
                  <a 
                    href={project.demo} 
                    className="btn btn-primary btn-small"
                  >
                    <DynamicIcon name="ExternalLink" size={16} />
                    Live Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <h2 class="section-title">Contact Me</h2>
          <p class="section-subtitle">Let's connect and build something great together</p>

          <div className="contact-grid">
            {/* Email Card */}
            <div 
              className="contact-card"
              onClick={() => handleCopy(PORTFOLIO_DATA.contact.email, 'Email')}
            >
              <div className="contact-icon">
                <DynamicIcon name="Mail" size={32} />
              </div>
              <h4>Email</h4>
              <p>{PORTFOLIO_DATA.contact.email}</p>
              <span className="contact-hint">Click to copy</span>
            </div>

            {/* Phone Card */}
            <div 
              className="contact-card"
              onClick={() => handleCopy(PORTFOLIO_DATA.contact.phone, 'Phone number')}
            >
              <div className="contact-icon">
                <DynamicIcon name="Phone" size={32} />
              </div>
              <h4>Phone</h4>
              <p>{PORTFOLIO_DATA.contact.phone}</p>
              <span className="contact-hint">Click to copy</span>
            </div>

            {/* LinkedIn Card */}
            <a 
              href={`https://${PORTFOLIO_DATA.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <div className="contact-icon">
                <DynamicIcon name="Linkedin" size={32} />
              </div>
              <h4>LinkedIn</h4>
              <p>{PORTFOLIO_DATA.contact.linkedin}</p>
              <span className="contact-hint">Visit profile</span>
            </a>

            {/* GitHub Card */}
            <a 
              href={`https://${PORTFOLIO_DATA.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <div className="contact-icon">
                <DynamicIcon name="Github" size={32} />
              </div>
              <h4>GitHub</h4>
              <p>{PORTFOLIO_DATA.contact.github}</p>
              <span className="contact-hint">Visit profile</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} <span>{PORTFOLIO_DATA.name}</span>. All rights reserved.</p>
      </footer>

      {/* Copy notification toast */}
      {toast && (
        <div className="toast" key={toast.id}>
          <DynamicIcon name="Check" size={16} />
          <span>{toast.message}</span>
        </div>
      )}
    </>
  )
}

export default App
