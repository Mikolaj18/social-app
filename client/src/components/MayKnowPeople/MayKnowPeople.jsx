import Spinner from "../Spinner/Spinner.jsx";
import Friend from "../Friend/Friend.jsx";
import {useQuery} from "@tanstack/react-query";
import {getRandomUsers} from "../../db/user/getRandomUsers.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "./mayKnowPeople.scss";

const MayKnowPeople = () => {

    const {isLoading, error, data} = useQuery({
        queryKey: ["randomUsers"],
        queryFn: () => getRandomUsers(),
    });

    const settings = {
        showArrows: true,
        infiniteLoop: true,
        showIndicators: false,
        centerMode: true,
        centerSlidePercentage: 100,
        emulateTouch: true,
        showStatus: false,
        showThumbs: false,
    };

    return (
        <>
            {isLoading ? <Spinner/> : error ? "Something went wrong" :
                <div className="mayKnow">
                    <h2 className="header">People you may know:</h2>
                        <Carousel {...settings}>
                            {data.map(f => (
                                <Friend item={f} isRequest={false} isSender={false} key={f._id}/>
                            ))}
                        </Carousel>
                </div>
            }
        </>
    );
}

export default MayKnowPeople;