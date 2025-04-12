// ——— Imports via full CDN URLs ———
// import * as THREE        from 'https://unpkg.com/three@0.140.0/build/three.module.js';
import * as THREE from '/three';
import { OrbitControls } from 'https://unpkg.com/three@0.140.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader }    from 'https://unpkg.com/three@0.140.0/examples/jsm/loaders/GLTFLoader.js';

// ——— Scene, Camera, Renderer ———
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 5);
camera.lookAt(0, 1.5, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ——— Orbit Controls ———
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.5, 0);
controls.update();

// ——— Lights ———
scene.add(new THREE.AmbientLight(0xffffff, 1.0));
scene.add(new THREE.DirectionalLight(0xffffff, 0.5));

// ——— Load Ready Player Me Avatar ———
const loader    = new GLTFLoader();
const avatarUrl = 'https://models.readyplayer.me/67f758c7cd11b02f3ea7247f.glb'; // ← paste your glTF URL

loader.load(
  avatarUrl,
  (gltf) => {
    const avatar = gltf.scene;
    avatar.scale.set(1.5, 1.5, 1.5);
    scene.add(avatar);

    // find jaw bone for lip‑sync
    avatar.traverse(obj => {
      if (obj.isBone && /jaw/i.test(obj.name)) window.jawBone = obj;
    });

    console.log('Avatar loaded successfully');
    speakAndLipSync('Hello! Welcome to your AI interview.');
  },
  (prog) => console.log(`Loading: ${(prog.loaded/prog.total*100).toFixed(0)}%`),
  (err)  => console.error('Error loading avatar:', err)
);

// ——— Render Loop ———
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// ——— Handle Resize ———
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ——— Simple TTS + Lip‑Sync ———
function speakAndLipSync(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.onstart = () => { if (window.jawBone) window.jawBone.scale.y = 1.3; };
  utter.onend   = () => { if (window.jawBone) window.jawBone.scale.y = 1.0; };
  speechSynthesis.speak(utter);
}
