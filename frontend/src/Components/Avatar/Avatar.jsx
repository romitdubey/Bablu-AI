import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useGraph } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

const corresponding = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_AA",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
};

export default function Avatar({ playAudio, script, setIsSpeaking, ...props }) {
  const group = useRef();
  const { scene } = useGLTF('models/avatargirl.glb');
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  const utteranceRef = useRef(null);
  const isSpeakingRef = useRef(false);

  useEffect(() => {
    if (playAudio && script) {
      const synth = window.speechSynthesis;

      const speak = () => {
        const voices = synth.getVoices();
        const hindiVoice = voices.find(
          (voice) =>
            voice.lang.toLowerCase().includes('hi') ||
            voice.name.includes('हिन्दी')
        );

        const utterance = new SpeechSynthesisUtterance(script);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        if (hindiVoice) {
          utterance.voice = hindiVoice;
        }

        utterance.onstart = () => {
          isSpeakingRef.current = true;
          setIsSpeaking?.(true);
        };
        utterance.onend = () => {
          isSpeakingRef.current = false;
          setIsSpeaking?.(false);
        };

        utteranceRef.current = utterance;
        synth.speak(utterance);
      };

      if (synth.getVoices().length === 0) {
        synth.onvoiceschanged = speak;
      } else {
        speak();
      }
    } else {
      speechSynthesis.cancel();
      isSpeakingRef.current = false;
      setIsSpeaking?.(false);
    }
  }, [playAudio, script, setIsSpeaking]);

  // Viseme animation logic
  const lastVisemeTime = useRef(0);
  const currentViseme = useRef(null);
  const visemeDuration = 200;

  useFrame(() => {
    Object.values(corresponding).forEach((viseme) => {
      const index = nodes.Wolf3D_Avatar.morphTargetDictionary[viseme];
      if (index !== undefined) {
        nodes.Wolf3D_Avatar.morphTargetInfluences[index] = 0;
      }
    });

    if (isSpeakingRef.current) {
      const now = performance.now();
      if (now - lastVisemeTime.current > visemeDuration) {
        const visemeKeys = Object.values(corresponding);
        const randomViseme = visemeKeys[Math.floor(Math.random() * visemeKeys.length)];
        currentViseme.current = randomViseme;
        lastVisemeTime.current = now;
      }

      if (currentViseme.current) {
        const index = nodes.Wolf3D_Avatar.morphTargetDictionary[currentViseme.current];
        if (index !== undefined) {
          nodes.Wolf3D_Avatar.morphTargetInfluences[index] = 1;
        }
      }
    } else {
      currentViseme.current = null;
    }
  });

  // Sitting animation
  const { animations: sittingAnimation } = useFBX('animations/Sitting.fbx');
  sittingAnimation[0].name = 'Sitting';
  const { actions } = useAnimations(sittingAnimation, group);

  useEffect(() => {
    actions['Sitting'].reset().play();
  }, [actions]);

  return (
    <group {...props} ref={group} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="Wolf3D_Avatar"
        geometry={nodes.Wolf3D_Avatar.geometry}
        material={materials.Wolf3D_Avatar}
        skeleton={nodes.Wolf3D_Avatar.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Avatar.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Avatar.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload('models/avatargirl.glb');
