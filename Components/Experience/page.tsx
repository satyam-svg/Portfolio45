import { useEffect, useRef, useState } from "react";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, useScroll, ScrollControlsState } from "@react-three/drei";
import { motion } from 'framer-motion-3d';
import { useThree, useFrame } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import Office from "../Office/page";
import Avatar from "../Avtar/page";
import Background from '../Background/page';
import * as THREE from "three";
import Project from '../Projects/page'

interface HomeProps {
  menuOpened: boolean;
  section:number;
}
interface CustomScrollControlsState extends ScrollControlsState {
  scroll: { current: number };
}

const Home: React.FC<HomeProps> = ({ menuOpened }) => {
  const { viewport } = useThree();
  const cameraPositionX = useMotionValue(0);
  const cameraLookAtX = useMotionValue(0);
  const [section, setSection] = useState(0);
  const [characterAnimation, setCharacterAnimation] = useState('Typing');

  useEffect(() => {
    setCharacterAnimation("Falling");
    setTimeout(() => {
      setCharacterAnimation(section === 0 ? "Typing" : "Standing");
    }, 600);
  }, [section]);

  const data = useScroll() as CustomScrollControlsState;

  const isMobile = window.innerWidth < 768;
  const responsiveRatio = viewport.width / 12;
  const officeScaleRatio = Math.max(0.5, Math.min(0.9 * responsiveRatio, 0.9));

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0);
    animate(cameraLookAtX, menuOpened ? 5 : 0);
  }, [menuOpened]);

  const characterContainerAboutRef = useRef<THREE.Group>(null);
  const characterGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    const curSection = Math.floor(data.scroll.current * data.pages);
    if (curSection !== section) {
      setSection(curSection);
    }
    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);

    if (characterContainerAboutRef.current && characterGroup.current) {
      if (section === 0) {
        characterContainerAboutRef.current.getWorldPosition(characterGroup.current.position);
      }
    }
  });

  return (
    <>
      <Background />
      <motion.group
        ref={characterGroup as any}
        rotation={[-Math.PI, 0.877, Math.PI]}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        animate={"" + section}
        transition={{ duration: 0.6 }}
        variants={{
          0: {
            scaleX: officeScaleRatio,
            scaleY: officeScaleRatio,
            scaleZ: officeScaleRatio,
          },
          1: {
            y: -viewport.height + 2.5,
            x: 0,
            z: 7,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          },
          2: {
            x: -2,
            y: -viewport.height * 2 + 0.5,
            z: 0,
            rotateX: 0,
            rotateY: Math.PI / 2,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          },
          3: {
            y: -viewport.height * 3 + 1,
            x: 0.3,
            z: 7,
            rotateX: 0,
            rotateY: -Math.PI / 4,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          },
        }}
      >
        <Avatar animation={characterAnimation} />
      </motion.group>
      <ambientLight intensity={1} />
      <motion.group
        position={[isMobile ? 0 : 1.5, isMobile ? -viewport.height / 6 : 0, 3]}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        rotation-y={-Math.PI / 4}
        animate={{ y: section === 0 ? 0 : -1 }}
      >
        <Office  />
        <group
          ref={characterContainerAboutRef}
          name="Empty"
          position={[0.9, 0.7, -0.3]}
          rotation={[-Math.PI, 0.092, -Math.PI]}
          scale={[1.4, 1.4, 1.4]}
        />
      </motion.group>
      <motion.group
        position={[0, -1.5, -10]}
        animate={{
          z: section === 1 ? 0 : -10,
          y: section === 1 ? -viewport.height : -1.5,
        }}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[1, -3, -15]} scale={[2, 2, 2]}>
            <sphereGeometry />
            <MeshDistortMaterial opacity={0.8} transparent distort={0.4} speed={4} color={"red"} />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[3, 3, 3]} position={[3, 1, -18]}>
            <sphereGeometry />
            <MeshDistortMaterial opacity={0.8} transparent distort={1} speed={5} color="yellow" />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[1.4, 1.4, 1.4]} position={[-3, -1, -11]}>
            <boxGeometry />
            <MeshWobbleMaterial opacity={0.8} transparent factor={1} speed={5} color={"blue"} />
          </mesh>
        </Float>
      </motion.group>
      <Project/>
    </>
  );
};

export default Home;
