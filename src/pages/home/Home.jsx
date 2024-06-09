import Advertisement from "../../components/Advertisement/Advertisement";
import Banner from "../../components/banner/Banner";
import AllInOne from "../../components/ExtraSection/AllInOne";
import Gallary from "../../components/ExtraSection/Gallary";
import LatestReview from "../../components/LatestReview/LatestReview";


const Home = () => {
    return (
        <div>
            <div className=" mt-6 md:mt-12 lg:mt-28">
            <Banner></Banner>
            </div>
            <div className=" mt-6 md:mt-12 lg:mt-28">
            <Advertisement></Advertisement>
            </div>
            <div className=" mt-6 md:mt-12 lg:mt-28">
            <LatestReview></LatestReview>
            </div>
            
            <div className=" mt-6 md:mt-12 lg:mt-28">
            <Gallary></Gallary>
            </div>
            <div className=" mt-6 md:mt-12 lg:mt-28">
                <h2 className="text-center text-2xl text-violet-400 font-bold italic tracking-[4px] word-spacing-35 mb-12">Gallery of DwellingDeal</h2>
            <AllInOne></AllInOne>
            </div>
            
        </div>
    );
};

export default Home;