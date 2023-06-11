import YouTube from "react-youtube";
import { useState, useEffect, useRef } from "react";
import { useEffectOnce, useOnClickOutside } from "usehooks-ts";

interface Props {
    videoId: string;
    setToggleVideo: Function;
}

const YouTubeVideo = ({ videoId, setToggleVideo }: Props) => {
    useEffectOnce(() => {
        console.log(videoId);
    });

    const toggleVideoRef = useRef<any>();
    useOnClickOutside(toggleVideoRef, () => setToggleVideo(false));

    return (
        <div className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={toggleVideoRef} className="">
                <YouTube
                    videoId={videoId}
                    opts={{
                        height: window.innerHeight * 0.8,
                    }}
                />
            </div>
        </div>
    );
};

{
    /*
     ref={toggleVideoRef}


    <YouTube
    videoId={videoId}
    opts={{
        innerHeight: 1080,
        innerWidth: 1920,
    }}
/>; */
}

export default YouTubeVideo;
