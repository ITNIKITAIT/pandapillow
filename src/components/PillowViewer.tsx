import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, useProgress, Html } from '@react-three/drei';
import * as THREE from 'three';
import { getCroppedImage } from '@/app/configure/design/actions';
import { useQuery } from '@tanstack/react-query';

const scaleModelToSize = (model: THREE.Object3D, targetSize: number) => {
    const bbox = new THREE.Box3().setFromObject(model);
    const modelSize = bbox.getSize(new THREE.Vector3());
    const scaleFactor =
        targetSize / Math.max(modelSize.x, modelSize.y, modelSize.z);

    model.scale.set(scaleFactor, scaleFactor, scaleFactor);
};

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
    const { scene } = useGLTF('/3d/pillow9/scene.gltf');
    const userTexture = useLoader(THREE.TextureLoader, userImageURL);

    useEffect(() => {
        if (pillowRef.current) {
            scaleModelToSize(pillowRef.current, 5);
        }
    }, [scene]);

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

function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="flex flex-col items-center justify-center gap-2 w-full">
                <p className="text-nowrap w-fit">Generating your pillow...</p>
                <span>{Math.round(progress)}%</span>
            </div>
        </Html>
    );
}

const PillowViewer = ({ userImageURL }: { userImageURL: string }) => {
    const { data: croppedImage } = useQuery({
        queryKey: ['croppedImage'],
        queryFn: () => getCroppedImage(userImageURL),
    });

    return (
        <div>
            <Canvas>
                <ambientLight intensity={1.5} />
                <Suspense fallback={<Loader />}>
                    {croppedImage?.croppedImageUrl && (
                        <Pillow userImageURL={croppedImage?.croppedImageUrl} />
                    )}
                </Suspense>
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default PillowViewer;
