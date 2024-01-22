import React from "react";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Color } from "three";
import texture from './white_paper.avif';

function WhiteWall(props){
    const WhitePaperTexture = new TextureLoader().load(texture);
    
    return(
        <>
        <mesh position={props.position} rotation={props.rotation} castShadow receiveShadow>
            <boxGeometry attach="geometry" args={props.args}/>
            <meshStandardMaterial attach="material" map={WhitePaperTexture}/>
        </mesh>
        </>
    )
}

export default WhiteWall;