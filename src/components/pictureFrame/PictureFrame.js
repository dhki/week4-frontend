import React from "react";
import * as THREE from 'three';

function PictureFrame(props){
    const position = props.position;
    const {picture_width, picture_height} = props.size;

    return (
        <group>
          {/* 상단 프레임 */}
          <mesh position={[position[0], position[1] + picture_height / 2, position[2]]} rotation={[0, 0, 0]}>
            <boxGeometry args={[picture_width + 0.1, 0.1, 0.06]} />
            <meshStandardMaterial color={new THREE.Color('black')}/>
          </mesh>
    
          {/* 하단 프레임 */}
          <mesh position={[position[0], position[1] - picture_height / 2, position[2]]} rotation={[0, 0, 0]}>
            <boxGeometry args={[picture_width + 0.1, 0.1, 0.06]} />
            <meshStandardMaterial color={new THREE.Color('black')}/>
          </mesh>
    
          {/* 좌측 프레임 */}
          <mesh position={[position[0] - picture_width / 2, position[1], position[2]]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.1, picture_height, 0.06]} />
            <meshStandardMaterial color={new THREE.Color('black')}/>
          </mesh>
    
          {/* 우측 프레임 */}
          <mesh position={[position[0] + picture_width / 2, position[1], position[2]]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.1, picture_height, 0.06]} />
            <meshStandardMaterial color={new THREE.Color('black')}/>
          </mesh>
        </group>
    );
}

export default PictureFrame;