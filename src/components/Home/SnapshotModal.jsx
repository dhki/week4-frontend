import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

export default function SnapshotModal({ imageUrl, onClose }) {
    // 'react-spring' 훅을 사용하여 애니메이션 스프링 속성을 정의합니다.
    const springStyle = useSpring({
        from: { transform: 'scale(0.5)', opacity: 0 },
        to: { transform: 'scale(1)', opacity: 1 }
    });

    return (
        <animated.div style={{ ...springStyle, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
            {/* 모달 콘텐츠 */}
            <img src={imageUrl} alt="Selected" style={{ width: '100%', height: 'auto' }} />
            <button onClick={onClose}>Close</button>
        </animated.div>
    );
}