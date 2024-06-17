import React, { useEffect, useRef } from "react";
import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import * as THREE from "three";

// Define the type for a project
interface ProjectType {
  title: string;
  url: string;
  image: string;
  description: string;
}

// Define the type for the props that the Project component will receive
interface ProjectProps {
  project: ProjectType;
  highlighted: boolean;
}

// List of projects
export const projects: ProjectType[] = [
  {
    title: "Wawatmos",
    url: "https://r3f-wawatmos-final.vercel.app/",
    image: "texture/pillow.jpg",
    description: "Recreating the Atmos Awwwards website with React Three Fiber",
  },
  {
    title: "Portfolio Baking",
    url: "https://www.youtube.com/watch?v=YkHqpqJgLKw",
    image: "texture/pillow.jpg",
    description: "Learn how to bake a 3D model with Blender and use it in r3f",
  },
  {
    title: "3D Avatar",
    url: "https://www.youtube.com/watch?v=pGMKIyALcK0",
    image: "texture/pillow.jpg",
    description: "Learn how to use ReadyPlayerMe to create a 3D avatar",
  },
  {
    title: "Kanagame",
    url: "https://www.youtube.com/watch?v=zwNF1-lsia8",
    image: "texture/pillow.jpg",  
    description: "Use React Three Fiber to create a 3D game",
  },
  {
    title: "Loader",
    url: "https://www.youtube.com/watch?v=L12wIvuZTOY",
    image: "texture/pillow.jpg",
    description: "Create a loading screen for your r3f projects",
  },
];

// Project component
const Project: React.FC<ProjectProps> = ({ project, highlighted }) => {
  const background = useRef<THREE.Mesh>(null);
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    if (background.current) {
      const material = background.current.material;
      if (Array.isArray(material)) {
        material.forEach((mat) => {
          mat.opacity = bgOpacity.get();
        });
      } else {
        (material as THREE.Material).opacity = bgOpacity.get();
      }
    }
  });

  return (
    <group>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2]}
        url={project.image}
        toneMapped={false}
        position={[0, 0.3, 0]} 
      />
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

// Atom for managing the current project
export const currentProjectAtom = atom(Math.floor(projects.length / 2));

// Projects component
export const Projects: React.FC = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={`project_${index}`}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};

export default Projects;
