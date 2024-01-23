import React, { useEffect, useRef, useState, Suspense } from "react";
import PictureFrame from "../pictureFrame/PictureFrame";
import PosterFrame from "../pictureFrame/PosterFrame";
import MarbleWall from "../marbleWall/MarbleWall";
import { Canvas, useThree } from "@react-three/fiber";
import WhiteWall from "../whiteWall/WhiteWall";
import { CameraAnimation } from "./CameraAnimation";
import { Loading } from "./Loading";
import { sceneState } from './store';
import { cameraPositions } from "./Positions";
import { Lights } from "./Lights";
import * as THREE from 'three';
import { Sky } from '@react-three/drei';
import SnapshotModal from "../Home/SnapshotModal";

function ShowcaseThreeItem({ _id, imageUrl }) {
    const [cameraPosition, setCameraPosition] = useState(0);
    console.log(imageUrl);

    // 더미 이미지 데이터
    const imageList = [
        { id: 1, url: 'https://via.placeholder.com/150/0000FF/808080?Text=Image1' },
        { id: 2, url: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=Image2' },
        { id: 3, url: 'https://via.placeholder.com/150/FFFF00/000000?Text=Image3' },
        { id: 4, url: 'https://via.placeholder.com/150/000000/FFFFFF?Text=Image4' },
        { id: 5, url: 'https://via.placeholder.com/150/0000FF/808080?Text=Image5' },
        { id: 6, url: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=Image6' },
        { id: 7, url: 'https://via.placeholder.com/150/FFFF00/000000?Text=Image7' },
        { id: 8, url: 'https://via.placeholder.com/150/000000/FFFFFF?Text=Image8' },
    ];

    // check user's width and height
    const [winWidth, setWinWidth] = useState(window.innerWidth);
    const [winHeight, setWinHeight] = useState(window.innerHeight);

    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        setCameraPosition(sceneState.camera.num);
        const resizing = () => {
            setWinWidth(window.innerWidth);
            setWinHeight(window.innerHeight);
        }
        window.addEventListener('resize', resizing);

        resizing();

        return () => {
            window.removeEventListener('resize', resizing);
        }
    }, [])

    useEffect(() => {
        setShowModal(false);
        const timer = setTimeout(() => {
            if (cameraPosition === 0) return;
            setSelectedImage(imageList[cameraPosition - 1].url);
            setShowModal(true); 
        }, 2000); 

        return () => {
            clearTimeout(timer); 
        };
    }, [cameraPosition]);

    const frameWidth = 4; // Width of each PictureFrame
    const gapBetweenFrames = 4; // Gap between frames

    // Calculate the total wall length based on the number of images
    // const wallLength = imageList.length * (frameWidth + gapBetweenFrames * 1.5);
    const wallLength = 500;

    const handleRightClick = () => {
        const currnetPostion = sceneState.camera.num;
        if (currnetPostion < imageList.length) {
            sceneState.camera = cameraPositions[currnetPostion + 1];
        }
        setCameraPosition(cameraPosition + 1);
    };
    const handleLeftClick = () => {
        const currnetPostion = sceneState.camera.num;
        if (currnetPostion > 0) {
            sceneState.camera = cameraPositions[currnetPostion - 1];
        }
        setCameraPosition(cameraPosition - 1);
    };

    return (
        <>
            <div style={{ position: 'relative', width: '1400px', height: '900px' }}>
                {/* <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 999, // Higher z-index than canvas
                        pointerEvents: 'auto', // Allow pointer events on the overlay
                    }}
                    onClick={(e) => {
                        // Handle click on overlay (optional)
                        e.preventDefault();
                        // You can add custom handling here if needed
                    }}
                > */}
                {/* 여기에 오버레이 가능 */}
                {/* </div> */}
                <Canvas
                    camera={{
                        position: sceneState.camera.position,
                        fov: 75,
                        aspect: winWidth / winHeight
                    }}
                    dpr={window.devicePixelRatio}
                    shadows
                    shadowMap={{
                        type: THREE.PCFSoftShadowMap // 부드러운 그림자 활성화
                    }}
                    onCreated={({ camera }) => camera.lookAt(...sceneState.camera.target)}
                >
                    <Suspense fallback={<Loading />}>
                        <CameraAnimation />
                        <Lights />
                        <Sky distance={450} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />


                        {/* <ambientLight intensity={1.0} color={0xffffff} /> */}

                        <WhiteWall
                            position={[8, 0, 0]}
                            args={[wallLength, 10, 0.03]} />

                        {/* <WhiteWall
                            position={[0, 0, 50]}
                            rotation={[0, 0, 0]}
                            args={[wallLength, 15, 10]} />

                        <WhiteWall
                            position={[25, 0, 25]}
                            rotation={[0, Math.PI / 2, 0]}
                            args={[wallLength, 15, 10]} />

                        <WhiteWall
                            position={[-25, 0, 25]}
                            rotation={[0, Math.PI / 2, 0]}
                            args={[wallLength, 15, 10]} /> */}

                        <MarbleWall position={[8, -5.3, 5]}
                            args={[wallLength, 0.03, 100]} />

                        <PosterFrame
                            position={[-8, 0, 0]}
                            size={{ width: 4, height: 4 }}
                            image_url={"http://madcamp.dhki.kr/images/dongha.jpg"}
                        />

                        {imageList.map((image, index) => (
                            <PictureFrame
                                key={image.id}
                                // image_url={imageUrl}
                                image_url={"http://madcamp.dhki.kr/images/dongha.jpg"}
                                position={[(frameWidth + gapBetweenFrames) * index, 0, 0]}
                                size={{ width: frameWidth, height: 3 }}
                            />
                        ))}
                    </Suspense>
                </Canvas>

            </div>
            {cameraPosition > 0 && (
                <button onClick={handleLeftClick}
                    style={{
                        position: 'absolute', top: '50%', left: 60,
                        width: 40, height: 40, zIndex: 1000
                    }}>
                    Prev
                </button>
            )}

            {cameraPosition < (imageList.length) && (
                <button onClick={handleRightClick}
                    style={{
                        position: 'absolute', top: '50%', right: 60,
                        width: 40, height: 40, zIndex: 1000
                    }}>
                    Next
                </button>
            )}
            {showModal && (
                <SnapshotModal imageUrl={selectedImage} onClose={() => setShowModal(false)} />
            )}
        </>
    )
}

export default ShowcaseThreeItem;