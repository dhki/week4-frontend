import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom';
import MainApp from '../components/Gallery/App/MainApp';
// import Loading from '../components/Gallery/Loading/Loading';
import { Loading } from "../components/ShowcaseThree/Loading";
import '../components/Gallery/style/css/gallery.css';

function Gallery() {
    const navigate = useNavigate();
    const params = useParams();
    // const navigate = useNavigate();
    const id = params.id;
    console.log(id);

    const [ready, setReady] = useState(false)

    const handleBackClick = () => {
        // 100ms 후에 홈으로 리다이렉션합니다.
        setTimeout(() => {
            // navigate('/home');
            window.location.href = '/intro';
        }, 100);
    };

    useEffect(() => {
        const handleLockchange = (e) => {
            setTimeout(() => {
                if (document.pointerLockElement === null) {
                    setReady(false)
                } else {
                    setReady(true)
                }
            }, 0); // 100 밀리초의 지연을 추가합니다.
        }

        document.addEventListener("pointerlockchange", handleLockchange);
        return () => {
            document.removeEventListener("pointerlockchange", handleLockchange)
        }
    })

    return (
        <>
            <div className="inside">
                <MainApp />
                <div className={ready ? "inside" : "overlay"}>
                    <div className={"start"}>Click to Explore</div>
                    {/* <img className={ready ? "" : "controlsL"} src="./assets/Images/ControlsL.png" alt="Move: WASD	Jump: SPACE Run: SHIFT"></img>
                <img className={ready ? "" : "controlsR"} src="./assets/Images/ControlsR.png" alt="Look: MOUSE"></img>
                <img className={ready ? "" : "controlsTR"} src="./assets/Images/ControlsTR.png" alt="Toggle Performance: P Toggle Night Mode: N"></img> */}
                    <button className="relative text-2xl" onClick={handleBackClick}>Back</button>
                </div>
                <div className="dot"
                    style={{ pointerEvents: ready ? "none" : "all" }}
                />
                <Loading />
            </div>
        </>
    )
}

export default Gallery;