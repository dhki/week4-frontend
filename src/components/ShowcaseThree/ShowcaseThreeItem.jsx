import React, { useEffect, useRef, useState, Suspense } from "react";
import PictureFrame from "../pictureFrame/PictureFrame";
import MarbleWall from "../marbleWall/MarbleWall";
import { Canvas, useThree } from "@react-three/fiber";
import WhiteWall from "../whiteWall/WhiteWall";
// import Camera from "../camera/Camera";
import { CameraAnimation } from "./CameraAnimation";
import { Loading } from "./Loading";
import { sceneState } from './store';
import { cameraPositions } from "./Positions";

function ShowcaseThreeItem({ _id, imageUrl }) {
    const [cameraPosition, setCameraPosition] = useState(0);

    const imageList = [
        { "id": 1, "url": "image_url_1.jpg" },
        { "id": 2, "url": "image_url_2.jpg" },
        { "id": 3, "url": "image_url_3.jpg" },
    ]
    // check user's width and height
    const [winWidth, setWinWidth] = useState(window.innerWidth);
    const [winHeight, setWinHeight] = useState(window.innerHeight);

    const [moveRight, setMoveRight] = useState(false);
    const [moveLeft, setMoveLeft] = useState(false);

    useEffect(() => {
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

    const frameWidth = 4; // Width of each PictureFrame
    const gapBetweenFrames = 4; // Gap between frames

    // Calculate the total wall length based on the number of images
    // const wallLength = imageList.length * (frameWidth + gapBetweenFrames) * 2;
    const wallLength = 50;

    const handleRightClick = () => {
        const currnetPostion = sceneState.camera.num;
        if (currnetPostion < cameraPositions.length - 1) {
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
            <div style={{ position: 'relative', width: '1200px', height: '800px' }}>
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

                {/* Canvas: Background Wall, Picture Frames */}
                {/* <Canvas camera={{ position: [0, 0, 8], fov: 75, aspect: winWidth / winHeight }}
                    style={{ position: 'absolute', top: 0, left: 0, maxWidth: '100%', maxHeight: '100%' }}
                    noEvents> */}
                <Canvas
                    camera={{
                        position: sceneState.camera.position,
                        fov: 75,
                        aspect: winWidth / winHeight
                    }}
                    dpr={window.devicePixelRatio}
                    shadows
                    onCreated={({ camera }) => camera.lookAt(...sceneState.camera.target)}
                >
                    <Suspense fallback={<Loading />}>
                        <CameraAnimation />

                        {/* <Camera moveRight={moveRight} moveLeft={moveLeft}
                            setMoveLeft={setMoveLeft} setMoveRight={setMoveRight} /> */}

                        <ambientLight intensity={10.0} color={0xffffff} />
                        {/* <directionalLight
                        color={0xffffff} // 흰색 광원
                        intensity={3} // 광원 강도
                        position={[0, 100, 0]} // 상단 중앙에서 위치
                        castShadow // 그림자 생성 활성화
                    /> */}

                        <WhiteWall
                            position={[0, 0, 0]}
                            args={[wallLength, 15, 0.03]} />

                        <WhiteWall
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
                            args={[wallLength, 15, 10]} />

                        <MarbleWall position={[0, -8, 5]}
                            args={[wallLength, 0.03, 100]} />

                        {/* <PictureFrame
                        // image url은 필요한 url을 받아와서 전달해야 합니다
                        image_url={image}
                        position={[0, 0, 0]}
                        size={{ width: 4, height: 3 }} />

                    <PictureFrame
                        // image url은 필요한 url을 받아와서 전달해야 합니다
                        image_url={image}
                        position={[8, 0, 0]}
                        size={{ width: 4, height: 3 }} /> */}

                        {imageList.map((image, index) => (
                            <PictureFrame
                                key={image.id}
                                image_url={imageUrl}
                                position={[(frameWidth + gapBetweenFrames) * index, 0, 0]}
                                size={{ width: frameWidth, height: 3 }}
                            />
                        ))}
                    </Suspense>
                </Canvas>

                {/* {!moveRight && !moveLeft && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                        </div>
                        <button onClick={() => { setMoveLeft(true) }}
                            style={{
                                position: 'absolute', top: '50%', left: 40,
                                width: 40, height: 40, zIndex: 1000
                            }}>
                            Prev
                        </button>
                        <button onClick={() => { setMoveRight(true); console.log('pressed button') }}
                            style={{
                                position: 'absolute', top: '50%', right: 40,
                                width: 40, height: 40, zIndex: 1000
                            }}>
                            Next
                        </button>
                    </>
                )} */}
                {/* {!moveRight && !moveLeft && cameraPosition > 0 && (
                    <button onClick={() => { setMoveLeft(true); setCameraPosition(cameraPosition - 1) }}
                        style={{
                            position: 'absolute', top: '50%', left: 40,
                            width: 40, height: 40, zIndex: 1000
                        }}>
                        Prev
                    </button>
                )}

                {!moveLeft && !moveRight && cameraPosition < (imageList.length - 1) && (
                    <button onClick={() => { setMoveRight(true); setCameraPosition(cameraPosition + 1); console.log('pressed button') }}
                        style={{
                            position: 'absolute', top: '50%', right: 40,
                            width: 40, height: 40, zIndex: 1000
                        }}>
                        Next
                    </button>
                )} */}
                {cameraPosition > 0 && (
                    <button onClick={handleLeftClick}
                        style={{
                            position: 'absolute', top: '50%', left: 40,
                            width: 40, height: 40, zIndex: 1000
                        }}>
                        Prev
                    </button>
                )}

                {cameraPosition < (cameraPositions.length - 1) && (
                    <button onClick={handleRightClick}
                        style={{
                            position: 'absolute', top: '50%', right: 40,
                            width: 40, height: 40, zIndex: 1000
                        }}>
                        Next
                    </button>
                )}

            </div>
        </>
    )
}

export default ShowcaseThreeItem;