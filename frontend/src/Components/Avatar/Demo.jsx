// import { Canvas, useThree } from "@react-three/fiber";
// import { OrbitControls, useTexture } from "@react-three/drei";
// import { Environment } from "@react-three/drei";
// import { Avatar } from "./Avatar";

// // hooks can't be applied on main function in three js
// function BackgroundPlane() {
//   const texture = useTexture("textures/AI_Background.jpg"); // load image
//   const viewport = useThree((state) => state.viewport); // set width of image according to viewport
//   return (
//     <mesh>
//       <planeGeometry args={[viewport.width, viewport.height]} />
//       <meshBasicMaterial map={texture} />
//     </mesh>
//   )
// }
// function Demo() {


//   return (
//     <div className="avatar-container ">

//       <Canvas className="posit" shadows camera={{ position: [0, 0, 7], fov: 50 }}>
//         <color attach="background" args={["#ececec"]} />
//         <Avatar position={[0, -3, 5]} scale={2} />
//         <Environment preset="sunset" />
//         <OrbitControls />
//         <BackgroundPlane/>
//       </Canvas>
//     </div>
//   );
// }

// export default Demo;
