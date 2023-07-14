import HeroSwiper from "../components/Home/HeroSwiper";
import PopularPeople from "../components/Home/PopularPeople";
import TrendingTV from "../components/Home/TrendingTV";
import UpcomingTrailers from "../components/Home/UpcomingTrailers/UpcomingTrailers";
import WhatPopular from "../components/Home/WhatPopular";

const Home = () => {
    return (
        <div className="w-full relative flex flex-col items-center">
            <HeroSwiper />
            <div className="max-w-[1300px] px-4 w-full flex flex-col mb-10">
                <WhatPopular />
                <UpcomingTrailers />
                <TrendingTV />
                <PopularPeople />
            </div>
        </div>
    );
};

export default Home;
