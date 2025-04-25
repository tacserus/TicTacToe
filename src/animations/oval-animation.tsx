import oval from '../assets/oval.json';
import Lottie from "react-lottie";

const OvalAnimation = () => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: oval,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
    };

    return (
        <div className="grid_animation">
            <Lottie
                options={defaultOptions}
                height={60}
                width={60}
                speed={0.5}
            />
        </div>
    );
};

export default OvalAnimation;
