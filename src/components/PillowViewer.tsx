import React, { useRef, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const FilledTexture = (image: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Unable to get canvas context');
    }
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);

    return new THREE.CanvasTexture(canvas);
};

function Pillow({ userImageURL }: { userImageURL: string }) {
    const pillowRef = useRef<THREE.Group>();

    const { scene } = useGLTF('/3d/pillow3/scene.gltf');

    const userTexture = useLoader(THREE.TextureLoader, userImageURL);

    useEffect(() => {
        const image = userTexture.image;
        const textureWithWhiteBackground = FilledTexture(image);

        scene.traverse((node) => {
            if ((node as THREE.Mesh).isMesh)
                (node as THREE.Mesh).material.map = textureWithWhiteBackground;
        });

        const bbox = new THREE.Box3().setFromObject(scene);
        const center = bbox.getCenter(new THREE.Vector3());
        scene.position.sub(center);
    }, [scene, userTexture]);

    return (
        <primitive
            ref={pillowRef}
            rotation={[Math.PI / 2, 0, 0]}
            object={scene}
        />
    );
}

const PillowViewer = ({ userImageURL }: { userImageURL: string }) => {
    return (
        <Canvas className="w-full h-full">
            <ambientLight intensity={1.5} />

            <Pillow userImageURL={userImageURL} />

            <OrbitControls />
        </Canvas>
    );
};

export default PillowViewer;
