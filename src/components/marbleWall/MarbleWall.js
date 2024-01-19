import React, { useEffect, useRef, useState } from "react";
import { useThree, useLoader, extend } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import texture from './marble_texture.png';
import { LinearMipmapLinearFilter, NearestFilter } from "three";

extend({OrbitControls})

function MarbleWall(props){
    const { size, camera, gl } = useThree();
    const cameraRef = useRef(null);
    const MarbleTexture = new TextureLoader().load(texture);
    
    return(
        <>
        <orbitControls ref={cameraRef} args={[camera, gl.domElement]}
        enableDamping
        dampingFactor={0.25}
        rotateSpeed={0.5}
        />
        <group>
            <mesh position={[props.position[0], props.position[1], -0.05]} rotation={[0, 0, 0]}>
                <boxGeometry attach="geometry" args={[props.args[0], props.args[1], 0.1]}/>
                <meshStandardMaterial attach="material" color='black'/>
            </mesh>

            <mesh position={props.position} rotation={[0, 0, 0]}>
                <boxGeometry attach="geometry" args={props.args}/>
                <meshStandardMaterial attach="material" map={MarbleTexture}/>
            </mesh>
        </group>
        </>
    )
}

export default MarbleWall;