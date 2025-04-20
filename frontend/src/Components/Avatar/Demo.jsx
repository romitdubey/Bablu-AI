import React from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Avatar from './Avatar';

// App.jsx or AvatarScene.jsx

const Demo = () => {
    return (
        <div>
            <Canvas camera={{ position: [0, 2, 5] }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls />
                <Avatar />
            </Canvas>
        </div>
    )
}

export default Demo
