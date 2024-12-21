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
    type,
}: {
    createCroppedImage: () => Promise<HTMLCanvasElement>;
    type: string;
}) {
    const [userCanvas, setUserCanvas] = useState<HTMLCanvasElement | null>(
        null
    );

    const pillowRef = useRef<THREE.Group>();
    const { scene } = useGLTF(`/3d/pillows/${type}/scene.gltf`);

    useEffect(() => {
        const loadCanvas = async () => {
            const canvas = await createCroppedImage();
            setUserCanvas(canvas);
        };

        loadCanvas();

        return () => {
            if (scene) {
                scene.scale.set(1, 1, 1);
                scene.position.set(0, 0, 0);
            }
        };
    }, [createCroppedImage, scene]);

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

            if (pillowRef.current) {
                scaleModelToSize(pillowRef.current, 5);
            }

            const bbox = new THREE.Box3().setFromObject(scene);
            const center = bbox.getCenter(new THREE.Vector3());
            scene.position.sub(center);

            scene.traverse((node) => {
                const mesh = node as THREE.Mesh;
                if (mesh.isMesh && mesh.material.map) {
                    mesh.material.map.dispose();
                    mesh.material.dispose();
                }
            });
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
    type,
}: {
    createCroppedImage: () => Promise<HTMLCanvasElement>;
    type: string;
}) => {
    return (
        <div>
            <Canvas>
                <ambientLight intensity={1.5} />
                <Suspense fallback={<Loader />}>
                    <Pillow
                        createCroppedImage={createCroppedImage}
                        type={type}
                    />
                </Suspense>
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default PillowViewer;
