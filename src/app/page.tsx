"use client"
import { Canvas } from "@react-three/fiber";
import Experience from "../../Components/Experience/page";
import { Scroll, ScrollControls } from "@react-three/drei";
import Interface from '../../Components/Interface/page'
import Menu from '../../Components/Menu/page'
import { useState } from "react";
import {ScrollManager} from '../../Components/ScrollSection/page'
import { MotionConfig } from "framer-motion";
import { framerMotionConfig } from "./config";
import { Cursor } from "../../Components/Cursor/page";
import Loading from '../../Components/Loading/page'
export default function Home() {
  const [section,setsection]=useState(0)
  const [menuOpened, setMenuOpened] = useState(false);
  const [started, setStarted] = useState(false);
  return (
    <>
    <Loading started={started} setStarted={setStarted}/>
    <MotionConfig transition={{
      ...framerMotionConfig
    }}>
     <Canvas shadows camera={{ position: [0, 3, 10], fov: 42}}>
      <color attach="background" args={["#FAD6A5"]} />
      <ScrollControls pages={4} damping={0.1}>
        <ScrollManager section={section} onSectionChange={setsection}/>
        <Scroll>
      <Experience section={section} menuOpened={menuOpened}/>
      
      </Scroll>
      <Scroll html>
     <Interface setsection={setsection}/>
      </Scroll>
      </ScrollControls>
    </Canvas>
    <Menu menuOpened={menuOpened}
          setMenuOpened={setMenuOpened} onSectionChange={setsection}/>
          <Cursor/>
          </MotionConfig>
    </>
  );
}
