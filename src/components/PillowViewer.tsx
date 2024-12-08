import React, { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useProgress, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Loader2 } from 'lucide-react';

const scaleModelToSize = (model: THREE.Object3D, targetSize: number) => {
    const bbox = new THREE.Box3().setFromObject(model);
    const modelSize = bbox.getSize(new THREE.Vector3());
    const scaleFactor =
        targetSize / Math.max(modelSize.x, modelSize.y, modelSize.z);

    model.scale.set(scaleFactor, scaleFactor, scaleFactor);
};

function Pillow({
    createCroppedImage,
}: {
    createCroppedImage: () => Promise<HTMLCanvasElement>;
}) {
    const [userCanvas, setUserCanvas] = useState<HTMLCanvasElement | null>(
        null
    );

    const pillowRef = useRef<THREE.Group>();
    const { scene } = useGLTF('/3d/pillow3/scene.gltf');

    useEffect(() => {
        const loadCanvas = async () => {
            const canvas = await createCroppedImage();
            setUserCanvas(canvas);
        };

        loadCanvas();
    }, [createCroppedImage]);

    useEffect(() => {
        if (userCanvas && scene) {
            const canvasTexture = new THREE.CanvasTexture(userCanvas);
            scene.traverse((node) => {
                const mesh = node as THREE.Mesh;
                if (mesh.isMesh) {
                    mesh.material.map = canvasTexture;
                    mesh.material.needsUpdate = true;
                }
            });

            const bbox = new THREE.Box3().setFromObject(scene);
            const center = bbox.getCenter(new THREE.Vector3());
            scene.position.sub(center);

            if (pillowRef.current) {
                scaleModelToSize(pillowRef.current, 5);
            }
        }
    }, [scene, userCanvas]);

    if (!userCanvas) {
        return (
            <Html center>
                <Loader2 className="h-10 w-10 text-purple-600 animate-spin" />
            </Html>
        );
    }

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

const PillowViewer = ({
    createCroppedImage,
}: {
    createCroppedImage: () => Promise<HTMLCanvasElement>;
}) => {
    return (
        <div>
            <Canvas>
                <ambientLight intensity={1.5} />
                <Suspense fallback={<Loader />}>
                    <Pillow createCroppedImage={createCroppedImage} />
                </Suspense>
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default PillowViewer;
