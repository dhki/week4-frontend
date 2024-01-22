import React, { useEffect, useRef, useState } from "react";
import PictureFrame from "../pictureFrame/PictureFrame";
import MarbleWall from "../marbleWall/MarbleWall";
import { Canvas, useThree } from "@react-three/fiber";
import WhiteWall from "../whiteWall/WhiteWall";
import Camera from "../camera/Camera";

function ShowcaseThreeItem({ _id, image }) {
    const imageList = [
        { "id": 1, "url": "image_url_1.jpg" },
        { "id": 2, "url": "image_url_2.jpg" },
        { "id": 3, "url": "image_url_3.jpg" },
        { "id": 4, "url": "image_url_4.jpg" },
        { "id": 1, "url": "image_url_1.jpg" },
        { "id": 2, "url": "image_url_2.jpg" },
        { "id": 3, "url": "image_url_3.jpg" },
        { "id": 4, "url": "image_url_4.jpg" },
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
    const wallLength = imageList.length * (frameWidth + gapBetweenFrames) * 2;

    return (
        <>
            <div style={{ position: 'relative', width: '1200px', height: '800px' }}>

                {/* Canvas: Background Wall, Picture Frames */}
                <Canvas camera={{ position: [0, 0, 5], fov: 75, aspect: winWidth / winHeight }}
                    style={{ position: 'absolute', top: 0, left: 0, maxWidth: '100%', maxHeight: '100%' }}>

                    <Camera moveRight={moveRight} moveLeft={moveLeft}
                        setMoveLeft={setMoveLeft} setMoveRight={setMoveRight} />

                    <ambientLight intensity={2.0} />

                    <WhiteWall
                        position={[0, 0, -0.06]}
                        args={[wallLength, 10, 0.03]} />

                    <MarbleWall position={[0, -5, 5]}
                        args={[wallLength, 0.03, 10]} />

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
                            image_url={image.url}
                            position={[(frameWidth + gapBetweenFrames) * index, 0, 0]}
                            size={{ width: frameWidth, height: 3 }}
                        />
                    ))}
                </Canvas>

                {!moveRight && !moveLeft && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                        </div>
                        <button onClick={() => { setMoveLeft(true) }}
                            style={{
                                position: 'absolute', top: '50%', left: 40,
                                width: 40, height: 40
                            }}>
                            Prev
                        </button>
                        <button onClick={() => { setMoveRight(true); console.log('pressed button') }}
                            style={{
                                position: 'absolute', top: '50%', right: 40,
                                width: 40, height: 40
                            }}>
                            Next
                        </button>
                    </>
                )}

            </div>
        </>
    )
}

export default ShowcaseThreeItem;