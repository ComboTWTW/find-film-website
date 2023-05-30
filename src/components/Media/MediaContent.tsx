import { useState, useEffect } from "react";
import MediaContentCarousel from "./MediaContentCarousel";
import { getMediaImages, mediaImagesT } from "../../api/getMediaImages";
import { useQuery } from "react-query";
import { CircularProgress } from "@mui/material";
import { getMediaVideos, mediaVideosT } from "../../api/getMediaVideos";
import MediaContentCarouselVideos from "./MediaContentCarouselVideos";

interface Props {
    id: string;
    media: string;
}

const MediaContent = ({ id, media }: Props) => {
    const mediaList: string[] = ["Backdrops", "Posters", "Videos"];

    const [currentMedia, setCurrentMedia] = useState<string>(mediaList[0]);

    const {
        data: dataImages,
        refetch: refetchImages,
        isSuccess: isSuccessImages,
        isRefetching: isRefetchingImages,
    } = useQuery<mediaImagesT>(["getMovieImages", id, media], () =>
        getMediaImages(`${id}`, `${media}`)
    );

    const {
        data: dataVideo,
        refetch: refetchVideo,
        isSuccess: isSuccessVideo,
        isRefetching: isRefetchingVideo,
    } = useQuery<mediaVideosT>(["getMovieVideos", id, media], () =>
        getMediaVideos(`${id}`, `${media}`)
    );

    useEffect(() => {
        currentMedia !== "Videos" && refetchImages();
        currentMedia === "Videos" && refetchVideo();
    }, [currentMedia]);

    return (
        <div className="w-full flex-col text-start">
            <div className="flex flex-col items-start md:flex-row md:items-center md:gap-10 gap-1">
                <h3 className="poppins text-white text-4xl font-semibold">
                    Media
                </h3>

                <ul className="flex gap-3 md:gap-6">
                    {mediaList.map((item) => {
                        return (
                            <li
                                onClick={() => setCurrentMedia(item)}
                                key={item}
                                className={`poppins text-white text-2xl md:text-3xl cursor-pointer font-semibold ${
                                    item === currentMedia &&
                                    "underline-offset-[5px] underline"
                                }`}
                            >
                                {item}
                            </li>
                        );
                    })}
                </ul>
            </div>
            {/* Images Slider */}
            {isRefetchingImages ? (
                <CircularProgress size={50} className="mt-5" />
            ) : (
                isSuccessImages &&
                currentMedia !== "Videos" && (
                    <MediaContentCarousel
                        dataImages={
                            currentMedia === "Backdrops"
                                ? dataImages.backdrops
                                : dataImages.posters
                        }
                        currentMedia={currentMedia}
                    />
                )
            )}
            {/* Videos Slider */}
            {isRefetchingVideo ? (
                <CircularProgress size={50} className="mt-5" />
            ) : (
                isSuccessVideo &&
                currentMedia === "Videos" &&
                isSuccessVideo && (
                    <MediaContentCarouselVideos dataVideo={dataVideo.results} />
                )
            )}
        </div>
    );
};

export default MediaContent;
