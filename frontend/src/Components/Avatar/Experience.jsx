import { Environment, OrbitControls, useTexture } from "@react-three/drei";
// import { Avatar } from "./Avatar";
import { Canvas, useThree } from "@react-three/fiber";
import { AvatarEdit } from "./AvatarEdit";

export const Experience = () => {
  function BackgroundPlane() {

    const texture = useTexture("textures/AI_Background.jpg"); // load image
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
        {/* <color attach="background" args={["#ececec"]} /> */}
            <BackgroundPlane/>
        {/* <OrbitControls /> */}
        <Environment preset="sunset" />
        <group>
          
          
          {/* <Avatar position={[0, -1.4, 3]} scale={2} /> */}
          
          
          <AvatarEdit position={[0, -1.4, 3]} scale={2} />
          {/* for chair box */}
          <mesh scale={[1.5, 1.1, 0.8]} position-y={-1} position-z={3}>
            <boxGeometry />
            <meshStandardMaterial color={'#FFA55D'} />
          </mesh>
          <mesh scale={5} rotation={-Math.PI * 0.5}>
            <planeGeometry />
            <meshStandardMaterial color="white" />
          </mesh>
        </group>
      </Canvas >
    </>
  );
};
