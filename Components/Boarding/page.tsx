import React, { useEffect, useState } from 'react';
import Boarding from '../Projects/page';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { useThree } from '@react-three/fiber';

const Page = () => {
  const { viewport } = useThree();
  const [isMobile, setIsMobile] = useState(false);
  const [officeScaleRatio, setOfficeScaleRatio] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const responsiveRatio = viewport.width / 12;
      setOfficeScaleRatio(Math.max(0.5, Math.min(0.9 * responsiveRatio, 0.9)));
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially to set the values based on the current window size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [viewport.width]);

  return (
    <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />
      <motion.group
        position={[isMobile ? 0 : 1.5, isMobile ? -viewport.height / 6 : 0, 3]}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        rotation={[0, -Math.PI / 4, 0]}
      >
        <Boarding />
      </motion.group>
    </Canvas>
  );
};

export default Page;
