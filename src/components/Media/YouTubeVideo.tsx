import YouTube from "react-youtube";
import { useState, useEffect, useRef } from "react";
import { useEffectOnce, useOnClickOutside } from "usehooks-ts";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
interface Props {
    videoId: string;
    setToggleVideo: Function;
}

const YouTubeVideo = ({ videoId, setToggleVideo }: Props) => {
    const toggleVideoRef = useRef<any>();
    useOnClickOutside(toggleVideoRef, () => setToggleVideo(false));

    return (
        <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
                ref={toggleVideoRef}
                className="w-[100%] md:w-[75%] md:max-w-[1300px]"
            >
                <LiteYouTubeEmbed id={videoId} title="Video" />
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
