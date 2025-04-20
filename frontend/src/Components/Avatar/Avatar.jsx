import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function Avatar(props) {
  const { scene } = useGLTF("frontend\public\models\avatar.glb"); // path to your 3D model

  return <primitive object={scene} {...props} />;
}
