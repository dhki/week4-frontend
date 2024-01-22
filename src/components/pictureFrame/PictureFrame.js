import { useLoader, extend } from "@react-three/fiber";
import React from "react";
import { TextureLoader } from 'three/src/loaders/TextureLoader'

function PictureFrame({ image_url, position, size }) {
  const picture = new TextureLoader().load(image_url);

  return (
    <group>
      {/* 상단 프레임 */}
      <mesh position={[position[0], position[1] + size.height / 2, position[2]]} rotation={[0, 0, 0]}>
        <boxGeometry args={[size.width + 0.15, 0.15, 0.25]} />
        <meshStandardMaterial color='black' />
      </mesh>

      {/* 하단 프레임 */}
      <mesh position={[position[0], position[1] - size.height / 2, position[2]]} rotation={[0, 0, 0]}>
        <boxGeometry args={[size.width + 0.15, 0.15, 0.25]} />
        <meshStandardMaterial color='black' />
      </mesh>

      {/* 좌측 프레임 */}
      <mesh position={[position[0] - size.width / 2, position[1], position[2]]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.15, size.height, 0.25]} />
        <meshStandardMaterial color='black' />
      </mesh>

      {/* 우측 프레임 */}
      <mesh position={[position[0] + size.width / 2, position[1], position[2]]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.15, size.height, 0.25]} />
        <meshStandardMaterial color='black' />
      </mesh>

      {/* 사진 */}
      <mesh position={[position[0], position[1], position[2]]} rotation={[0, 0, 0]}>
        <planeGeometry args={[size.width - 0.1, size.height - 0.1]} />
        <meshStandardMaterial color='white' />
      </mesh>
      <mesh position={[position[0], position[1], position[2] + 0.01]} rotation={[0, 0, 0]}>
        <planeGeometry args={[size.width - 0.3, size.height - 0.3]} />
        <meshStandardMaterial map={picture} />
      </mesh>
    </group>
  );
}

export default PictureFrame;