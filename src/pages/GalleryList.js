import React, { useEffect, useRef, useState } from "react";
import PictureFrame from "../components/pictureFrame/PictureFrame";
import MarbleWall from "../components/marbleWall/MarbleWall";
import { Canvas } from "@react-three/fiber";
import WhiteWall from "../components/whiteWall/WhiteWall";

function GalleryList(){
    // check user's width and height
    const [winWidth, setWinWidth] = useState(window.innerWidth);
    const [winHeight, setWinHeight] = useState(window.innerHeight);

    useEffect(() => {
        const resizing = () => {
            setWinWidth(winWidth);
            setWinHeight(winHeight);
        }
        window.addEventListener('resize', resizing);

        resizing();

        return () => {
            window.removeEventListener('resize', resizing);
        }
    }, [])


    return(
        <>
        <div style={{position: 'relative', width:'100vw', height:'100vh'}}>
            
            {/* Canvas: Background Wall, Picture Frames */}
            <Canvas camera={{position: [0, 0, 5], fov: 75, aspect: winWidth / winHeight}}
            style={{position: 'absolute', top: 0, left: 0, maxWidth: '100%', maxHeight: '100%'}}>
                <ambientLight intensity={2.0}/>

                <WhiteWall
                position={[0, 0, -0.06]}
                args={[16, 10, 0.03]}/>

                <MarbleWall position={[0, -5, 5]}
                args={[16, 0.03, 10]}/>
                
                <PictureFrame
                // image url은 필요한 url을 받아와서 전달해야 합니다
                image_url='https://blog.dhki.kr/static/img/main/intro-card.jpg'
                position={[0, 0, 0]}
                size = {{width: 4, height: 3}}/>

                {/* <PictureFrame 
                // image url은 필요한 url을 받아와서 전달해야 합니다
                image_url='https://blog.dhki.kr/static/img/main/intro-card.jpg'
                position={[8, 0, 0]}
                size = {{width: 4, height: 3}}/> */}
            </Canvas>

            {/* Previous, Next button */}
            <button style={{position: 'absolute', top: winHeight / 2 - 50, left: 40,
            width: 100, height: 100}}>
                Prev
            </button>

            <button style={{position: 'absolute', top: winHeight / 2 - 50, left: winWidth - 140,
            width: 100, height: 100}}>
                Next
            </button>
        </div>
        </>
    )
}

export default GalleryList;