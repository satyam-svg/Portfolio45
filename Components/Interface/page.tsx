import React  from 'react';
import { motion } from "framer-motion";
import Boarding from '../Boarding/page'
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "../Projects/page";
import { useForm, ValidationError } from '@formspree/react';
import './Interface.css';
import { useState } from "react";
type SectionProps = {
  children: React.ReactNode;
  mobileTop?: boolean;
};
const Section: React.FC<SectionProps>= ({ children, mobileTop }) => {
  const justifyContentStyle = mobileTop ? 'flex-start' : 'center';
  return (
    <motion.section
      className="navbar"
      style={{ justifyContent: justifyContentStyle, display: 'flex' }}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};
type DivProps = {
  children: React.ReactNode;
};
const Div: React.FC<DivProps> = ({ children }) => {
  return (
    <motion.div
      className="project"
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.div>
  );
};
type InterfaceProps = {
  setsection: (section: number) => void;
};
const Interface: React.FC<InterfaceProps> = ({ setsection }) => {
  return (
    <div className="navbar_main">
      <AboutSection setsection={setsection} />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

type AboutSectionProps = {
  setsection: (section: number) => void;
};

const AboutSection: React.FC<AboutSectionProps> = ({ setsection }) => {
  return (
    <Section>
      <h1 className="about-heading">
        Hi, I'm
        <br />
        <span className="owner">Praveen Maurya</span>
      </h1>
      <motion.p
        className="about-text"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        I too am an engineer amidst the bustling
        <br />
        crowd of fellow engineers....
      </motion.p>
      <motion.button
        onClick={() => setsection(3)}
        className="about-button"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        Contact me
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    title: "Threejs / React Three Fiber",
    level: 80,
  },
  {
    title: "React / React Native",
    level: 90,
  },
  {
    title: "Nodejs",
    level: 90,
  },
  {
    title: "Typescript",
    level: 60,
  },
  {
    title: "3D Modeling",
    level: 40,
  },
];

const languages = [
  {
    title: " Hindi",
    level: 100,
  },
  {
    title: " English",
    level: 80,
  },
  {
    title: "Other",
    level: 20,
  },
];

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);
  const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
      <div style={{
            display: 'flex',
            width: '100%',
            height: '100vh', // Full height of the viewport
            gap: '8px', // Gap between items
            alignItems: 'center', // Center items vertically
            justifyContent: 'center', // Center items horizontally
            
        }}>
        <button
         style={{
          transition: 'color 0.3s ease', // Transition effect for color change
          color: isHovered ? 'indigo' : 'inherit',
          fontSize:10 // Change color on hover
      }}
          onClick={previousProject}
        >
          ← Previous
        </button>
        <h2 style={{fontWeight:'bold',fontSize:30}}>Projects</h2>
        <button
          style={{
            transition: 'color 0.3s ease', // Transition effect for color change
            color: isHovered ? 'indigo' : 'inherit',
            fontSize:10 // Change color on hover
        }}
          onClick={nextProject}
        >
          Next →
        </button>
      </div>
    </Section>
  );
};

const SkillsSection: React.FC = () => {
  return (
    <Section>
      <motion.div whileInView="visible" style={{ marginBottom: '10rem', marginLeft: '2rem' }}>
        <h2 style={{ fontSize: '2rem', color: 'white', fontWeight: 'bold', marginTop: '1rem' }}>Skills</h2>
        <div className="skill_content">
          {skills.map((skill, index) => (
            <div key={index}>
              <motion.h3
                style={{ fontSize: '1rem', fontWeight: 'bold', color: 'white' }}
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 1 + index * 0.2,
                }}
              >
                {skill.title}
              </motion.h3>
              <div style={{ height: '0.5rem', width: '100%', backgroundColor: '#edf2f7', borderRadius: '9999px', marginTop: '0.5rem' }}>
                <motion.div
                  style={{ width: `${skill.level}%`, height: '100%', backgroundColor: '#4f46e5', borderRadius: '9999px', color: 'white' }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  whileInView={{
                    scaleX: 1,
                  }}
                  transition={{
                    duration: 1,
                    delay: 1 + index * 0.2,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '1rem', color: 'white' }}>Languages</h2>
          <div style={{ marginTop: '0.5rem' }}>
            {languages.map((lng, index) => (
              <div className="w-64" key={index}>
                <motion.h3
                  style={{ fontSize: '1rem', fontWeight: 'bold', color: 'white' }}
                  initial={{
                    opacity: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1,
                    delay: 1 + index * 0.2,
                  }}
                >
                  {lng.title}
                </motion.h3>
                <div style={{ height: '0.5rem', width: '100%', backgroundColor: '#edf2f7', borderRadius: '9999px', marginTop: '0.5rem' }}>
                  <motion.div
                    style={{ width: `${lng.level}%`, height: '100%', backgroundColor: '#f5e74e', borderRadius: '9999px' }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    whileInView={{
                      scaleX: 1,
                    }}
                    transition={{
                      duration: 1,
                      delay: 1 + index * 0.2,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

const ContactSection: React.FC = () => {
  const [state, handleSubmit] = useForm("xayrgvjw");
  return (
    <Section>
      <h2 style={{ fontSize: '2rem', fontWeight: '700', marginTop: '2rem' }}>Contact me</h2>
      <div
        style={{
          marginTop: '1rem',
          padding: '2rem',
          borderRadius: '0.375rem',
          backgroundColor: 'white',
          width: '20rem',
          maxWidth: '80%',
        }}
      >
        {state.succeeded ?(
           <p style={{color:'green',display:'flex',justifyContent:'center',alignContent:'center'}}>Thanks for Messaging Me!!</p>
        ):(
          <form onSubmit={handleSubmit}>
          <label
            htmlFor="name"
            style={{
              fontWeight: '500',
              color: '#1f2937',
              display: 'block',
              marginBottom: '0.25rem',
            }}
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            style={{
              display: 'block',
              width: '100%',
              borderRadius: '0.375rem',
              color: '#1f2937',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              border: '1px inset',
              borderColor: '#d1d5db',
              padding: '0.75rem',
              outline: 'none',
              transition: 'box-shadow 0.2s, border-color 0.2s',
            }}
            placeholder="Name"
            onFocus={(e) => {
              e.target.style.boxShadow = '0 0 0 2px rgba(79, 70, 229, 0.5) inset';
              e.target.style.borderColor = '#6366f1';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
              e.target.style.borderColor = '#d1d5db';
            }}
          />
          <label
            htmlFor="email"
            style={{
              fontWeight: '500',
              color: '#1f2937',
              display: 'block',
              marginBottom: '0.25rem',
              marginTop: '2rem',
            }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            style={{
              display: 'block',
              width: '100%',
              borderRadius: '0.375rem',
              color: '#1f2937',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              border: '1px inset',
              borderColor: '#d1d5db',
              padding: '0.75rem',
              outline: 'none',
              transition: 'box-shadow 0.2s, border-color 0.2s',
            }}
            placeholder="Email"
            onFocus={(e) => {
              e.target.style.boxShadow = '0 0 0 2px rgba(79, 70, 229, 0.5) inset';
              e.target.style.borderColor = '#6366f1';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
              e.target.style.borderColor = '#d1d5db';
            }}
          />
          <ValidationError
              className="mt-1 text-red-500"
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          <label
            htmlFor="message"
            style={{
              fontWeight: '500',
              color: '#1f2937',
              display: 'block',
              marginBottom: '0.25rem',
              marginTop: '2rem',
            }}
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            style={{
              height: '5rem',
              display: 'block',
              width: '100%',
              borderRadius: '0.375rem',
              color: '#1f2937',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              border: '1px inset',
              borderColor: '#d1d5db',
              padding: '0.75rem',
              outline: 'none',
              transition: 'box-shadow 0.2s, border-color 0.2s',
            }}
            placeholder="Message Me"
            onFocus={(e) => {
              e.target.style.boxShadow = '0 0 0 2px rgba(79, 70, 229, 0.5) inset';
              e.target.style.borderColor = '#6366f1';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
              e.target.style.borderColor = '#d1d5db';
            }}
          />
           <ValidationError
              className="mt-1 text-red-500"
              errors={state.errors}
            />
          <button
            style={{
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              paddingBottom: '0.5rem',
              paddingLeft: '2rem',
              paddingRight: '2rem',
              borderRadius: '0.5rem',
              fontWeight: '700',
              fontSize: '1rem',
              marginTop: '2rem',
            }}
            disabled={state.submitting}
          >
            Submit
          </button>
        </form>
        )}
        
      </div>
    </Section>
  );
};



export default Interface;
