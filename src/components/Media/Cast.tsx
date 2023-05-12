import { Swiper, SwiperSlide } from 'swiper/react'
import { getCast, castT } from '../../api/getCast'
import { FreeMode } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { useQuery } from 'react-query'
import { useEffect } from 'react'
import { noImgLong } from '../../assets'

interface Props {
    id: string
    media: string
}

const Cast = ({ id, media }: Props) => {
    const {
        data: dataCast,
        refetch: refetchCast,
        isSuccess: isSuccessCast,
        isError,
        isFetchedAfterMount,
    } = useQuery<castT>(['getCast', id], () => getCast(`${id}`, `${media}`))

    useEffect(() => {
        refetchCast()
    }, [])

    const getCharacher = (actor: { character: String; roles: any }) => {
        if (media === 'movie') {
            return `${
                actor.character.includes('/')
                    ? actor.character.split('/')[1].trim()
                    : actor.character
            }`
        } else if (media === 'tv') {
            return `${
                actor.roles[0].character.includes(' /')
                    ? actor.roles[0].character.split(' /')[1].trim()
                    : actor.roles?.[0].character
            }`
        }
    }

    return (
        <div className="w-full h-auto flex-col justify-start text-start mt-6 mb-10">
            <h3 className="poppins text-white text-4xl font-semibold md:mb-7 md:mt-1">
                Top Billed Cast
            </h3>

            {isFetchedAfterMount && dataCast !== undefined && (
                <Swiper
                    spaceBetween={10}
                    className="w-[100wh] mt-6 flex"
                    modules={[FreeMode]}
                    freeMode={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                        },
                        640: {
                            slidesPerView: 4,
                        },
                        1200: {
                            slidesPerView: 7,
                        },
                    }}
                >
                    {dataCast.cast.slice(0, 20).map((actor) => {
                        return (
                            <SwiperSlide
                                key={actor.id}
                                className="flex w-full h-auto cursor-pointer rounded-[10px] flex-col bg-darkLighter poppins text-white"
                            >
                                <img
                                    className="lg:w-[180px] rounded-t-[10px] h-auto"
                                    src={`${
                                        actor.profile_path !== null
                                            ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                                            : noImgLong
                                    }`}
                                    alt="actorPhoto"
                                />
                                <div className="flex flex-col p-3 rounded-[10px] gap-1">
                                    <h3 className="text-lg font-semibold leading-snug">
                                        {actor.name}
                                    </h3>
                                    <h3 className="text-sm ">
                                        {getCharacher(actor)}
                                    </h3>
                                    {media === 'tv' && (
                                        <h3 className="text-sm font-semibold">{`${actor.total_episode_count} episodes`}</h3>
                                    )}
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            )}
        </div>
    )
}

export default Cast
