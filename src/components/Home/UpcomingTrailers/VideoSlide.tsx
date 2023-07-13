import { IoPlayCircleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import YouTubeVideo from "../../Media/YouTubeVideo";
import { getVideoList, videoT } from "../../../api/getUpcomingTrailers";

interface Props {
    id: number;
    setToggleVideo: Function;
    videoId: string;
    toggleVideo: boolean;
    setVideoId: Function;
}

const VideoSlide = ({
    id,
    setToggleVideo,
    videoId,
    setVideoId,
    toggleVideo,
}: Props) => {
    const {
        data: dataVideoList,
        refetch: refetchVideoList,
        isSuccess: isSuccessVideoList,
    } = useQuery<videoT>(["getVideoList", id], () => getVideoList(id));

    useEffect(() => {
        refetchVideoList();
    }, []);
    /* Video object state that we get from sorted array of video */
    const [video, setVideo] = useState<videoT["results"][0]>();

    /* Getting first met movie trailer*/
    useEffect(() => {
        if (isSuccessVideoList) {
            setVideo(
                dataVideoList.results.find((obj) => obj.type === "Trailer")
            );
        }
    }, [isSuccessVideoList, dataVideoList]);

    /* To display Video component in parent (UpcomingTrailers) */
    const handleVideoClick = (vidId: string) => {
        setToggleVideo(true);
        setVideoId(vidId);
    };

    return (
        <div>
            {isSuccessVideoList && video !== undefined && (
                <li
                    key={id}
                    className="relative"
                    onClick={() => handleVideoClick(video?.key)}
                >
                    <div className="opacity-60 duration-200 hover:opacity-100 hover:duration-200  cursor-pointer">
                        {/* Thumbnail */}
                        <img
                            src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                            alt="Video Thumbnail"
                            className=""
                        />
                        {/* Play Button */}
                        <IoPlayCircleOutline
                            color="white"
                            size={90}
                            className="absolute top-0 left-0 bottom-0 right-0 m-auto cursor-pointer"
                        />
                    </div>
                </li>
            )}
        </div>
    );
};

export default VideoSlide;
