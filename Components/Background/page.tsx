import { Sphere, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const Page: React.FC = () => {
  const material = useRef<THREE.MeshBasicMaterial>(null!);
  const color = useRef<{ color: string }>({
    color: "#A7C7E7",
  });
  const data = useScroll() as any; // Change the type to any

  const tl = useRef<gsap.core.Timeline | null>(null);

  useFrame(() => {
    if (tl.current) {
      tl.current.progress(data.scroll.current);
    }
    if (material.current) {
      material.current.color = new THREE.Color(color.current.color);
    }
  });

  useEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(color.current, {
      color: "#212121",
    });
    tl.current.to(color.current, {
      color: "#7a7ca5",
    });
    tl.current.to(color.current, {
      color: "#FAD6A5",
    });
  }, []);

  return (
    <group>
      <Sphere scale={[30, 30, 30]}>
        <meshBasicMaterial
          ref={material as React.MutableRefObject<THREE.MeshBasicMaterial>}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>
    </group>
  );
}

export default Page;
