import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { stories } from "./DummyStories";
import "./HomeComponents.css";

const StoriesContainer = () => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 3,
        // responsive: [
        //     {
        //         breakpoint: 1050,
        //         settings: {
        //             slidesToShow: 5,
        //             slidesToScroll: 3
        //         }
        //     },
        //     {
        //         breakpoint: 400,
        //         settings: {
        //             slidesToShow: 4,
        //             slidesToScroll: 2
        //         }
        //     }
        // ]
    };

    return (
        <>
            <Slider {...settings} className="w-full bg-white pt-2.5 pb-1 px-2.5 flex overflow-hidden" style={{ zIndex: 1 }}>

                {stories.map((s, i) => (
                    <div className="flex flex-col text-center justify-center items-center p-2 cursor-pointer" key={i}>
                        <div className="ml-1 mb-1 w-16 p-[1px] h-16 rounded-full border-2 border-red-500">
                            <img loading="lazy" className="rounded-full h-full w-full border border-gray-300 object-cover" src={s.image} draggable="false" alt="story" />
                        </div>
                        <span className="text-xs ellipsis">{s.title}</span>
                    </div>
                ))}

            </Slider>
        </>

    )
}

export default StoriesContainer