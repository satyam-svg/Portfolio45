import React, { useEffect, useRef } from 'react';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AvatarProps {
  animation: string;
  headFollow?: boolean;
  cursorFollow?: boolean;
  wireframe?: boolean;
  [key: string]: any; 
}

export default function Avatar(props: AvatarProps) {
  const { animation } = props;
  const group = useRef<THREE.Group>(null);

  const { nodes, materials } = useGLTF('models/6622ba3cae985a21aa64ad60.glb') as any;

 
  const { animations: typingAnimation } = useFBX('animations/Typing.fbx') as any;
  const { animations: fallingAnimation } = useFBX('animations/Falling.fbx') as any;
  const { animations: standingAnimation } = useFBX('animations/Standing.fbx') as any;

  typingAnimation[0].name = 'Typing';
  fallingAnimation[0].name = 'Falling';
  standingAnimation[0].name = 'Standing';

  // Setup animations
  const { actions } = useAnimations([typingAnimation[0], fallingAnimation[0], standingAnimation[0]], group);

  useFrame((state) => {
    const { mouse, camera } = state;
    if (group.current) {
      if (props.headFollow) {
        const head = group.current.getObjectByName('Head') as THREE.Object3D | null;
        if (head) {
          head.lookAt(camera.position);
        }
      }
      if (props.cursorFollow) {
        const target = new THREE.Vector3(mouse.x, mouse.y, 1);
        const spine = group.current.getObjectByName("Spine2") as THREE.Object3D | null;
        if (spine) {
          spine.lookAt(target);
        }
      }
    }
  });

  useEffect(() => {
    if (actions && actions[animation]) {
      actions[animation]?.reset().fadeIn(0.5).play();
      return () => {
        actions[animation]?.reset().fadeOut(0.5); // Using optional chaining to safely access reset and fadeOut
      };
    }
  }, [animation, actions]);

  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material: any) => {
        if (material) material.wireframe = props.wireframe;
      });
    }
  }, [props.wireframe, materials]);

  return (
    <group {...props} ref={group} dispose={null}>
      <group rotation-x={-Math.PI / 2}>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          frustumCulled={false}
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        >
          <pointLight intensity={1.2} color="yellow" />
        </skinnedMesh>
        <skinnedMesh
          frustumCulled={false}
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        >
          <pointLight intensity={1.2} color="yellow" />
        </skinnedMesh>
        <skinnedMesh
          frustumCulled={false}
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
        <skinnedMesh
          frustumCulled={false}
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload('models/6622ba3cae985a21aa64ad60.glb');
