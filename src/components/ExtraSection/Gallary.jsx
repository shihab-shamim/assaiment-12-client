import { ParallaxProvider } from 'react-scroll-parallax';

// import Banner from '../banner/Banner';
import { Parallax } from 'react-parallax';
import image from '../../assets/paralaxImage.jpg'
import Description from './Description';
import aggrement from '../../assets/aggrement.jpg'
import { Typewriter } from 'react-simple-typewriter'


const Gallary = () => {
    return (
      <ParallaxProvider>
          <Parallax speed={10}  blur={{ min: -20, max: 50}}
        bgImage={image}
        bgImageAlt="the dog"
        strength={-400}>
            <div>
                <h2 className='text-xl text-center text-white  font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient' >Agreements  <Typewriter
            words={['Your Property','Your House']}
            loop={5}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            // onLoopDone={handleDone}
            // onType={handleType}
          /></h2>
            </div>
      <div className= 'group p-8 lg:p-0 lg:w-[80%] mx-auto h-[500px] items-center justify-center flex mt-12 gap-6' >
        <div className='w-1/2'><img src={aggrement} className='w-full group-hover:scale-105' alt="" /></div>
      <div className='w-1/2'><Description></Description></div>
      </div>
    </Parallax>
      </ParallaxProvider>
    );
};

export default Gallary;
