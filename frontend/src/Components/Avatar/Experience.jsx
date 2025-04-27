import { Environment, OrbitControls, useGLTF, useTexture } from "@react-three/drei";

import { Canvas, useThree } from "@react-three/fiber";
import Avatar from "./Avatar";

export const Experience = (props) => {
let  setSpeaking  = props.setSpeaking;
let script  = props.script;
let  playAudio  = props.playAudio;
// console.log("experience", playAudio)
  function Chair(props) {
    const { scene } = useGLTF('/models/office_chair.glb'); // Adjust path to your model
    return <primitive object={scene} {...props} />;
  }


  function BackgroundPlane() {

    const texture = useTexture("textures/avatarBg.jpeg"); // load image
    const viewport = useThree((state) => state.viewport); // set width of image according to viewport
    return (
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    )
  }
  return (
    <>
      <Canvas className="avatar-container" shadows camera={{ position: [0, 0, 7], fov: 50 }}>
        
        <BackgroundPlane />
        {/* <OrbitControls /> */}
        <Environment preset="sunset" />
        <group>
          <Avatar playAudio = {playAudio} script = {script} setSpeaking ={setSpeaking} position={[0, -1.6, 3]} scale={2} />

          <group scale={[1, 1.5, 1]} position={[0, 0.2, 0]}>
            
            <Chair position={[0, -1.3, 3]} scale={[1.8, 1.8, 2]} />
          </group>
          {/* Ground plane */}
          <mesh scale={5} rotation={-Math.PI * 0.5}>
            <planeGeometry />
            <meshStandardMaterial color="white" />
          </mesh>
        </group>

      </Canvas >
    </>
  );
};
