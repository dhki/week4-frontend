import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGLTF } from '@react-three/drei';

const Picture = ({
  url,
  scale,
  position,  
  rotation,
  metalness,
  roughness

}) => {
    // const { scene } = useLoader(GLTFLoader, url, draco("https://www.gstatic.com/draco/versioned/decoders/1.4.0/"));
    const { scene } = useGLTF(url, 'https://www.gstatic.com/draco/versioned/decoders/1.4.0/');
    scene.traverse( function ( child ) {
      if ( child.isMesh ) {                                     
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.toneMapped = false;
          child.material.metalness = metalness;
          child.material.roughness =roughness;
      }
  });
  
    return (
         <primitive 
            scale={scale} 
            position={position}
            rotation={rotation}
            object={scene}                    
            dispose={null}
          />
    )
  }

  export default Picture;

// import React from 'react';
// import { useLoader } from '@react-three/fiber';
// import { TextureLoader } from 'three'; // TextureLoader를 사용하여 PNG 이미지를 로드합니다.

// const Picture = ({
//   url, // PNG 이미지의 URL
//   scale,
//   position,
//   rotation,
//   metalness,
//   roughness
// }) => {
//   // PNG 이미지를 로드합니다.
//   const texture = useLoader(TextureLoader, url);

//   return (
//     <mesh
//       scale={scale}
//       position={position}
//       rotation={rotation}
//       castShadow // 그림자를 캐스트하는지 여부를 설정합니다.
//       receiveShadow // 그림자를 받는지 여부를 설정합니다.
//     >
//       <planeGeometry args={[1, 1]} /> {/* 평면 지오메트리를 생성합니다. */}
//       <meshBasicMaterial
//         map={texture} // PNG 이미지를 텍스처로 설정합니다.
//         metalness={metalness}
//         roughness={roughness}
//         toneMapped={false}
//       />
//     </mesh>
//   );
// };

// export default Picture;
