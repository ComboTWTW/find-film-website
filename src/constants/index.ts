export const navbarLinks = [
    {
        id: "movies",
        title: "Movies",
        path: "",
        subPage: [
            {
                title: "Popular",
                path: "/movie/popular",
            },
            {
                title: "Top Rated",
                path: "/movie/top-rated",
            },
        ],
    },
    {
        id: "tvShows",
        title: "TV Shows",
        path: "",
        subPage: [
            {
                title: "Popular",
                path: "/tv/popular",
            },
            {
                title: "Top Rated",
                path: "/tv/top-rated",
            },
        ],
    },
    {
        id: "people",
        title: "People",
        path: "/people",
    },
    {
        id: "about",
        title: "About",
        path: "/about",
    },
];

export const styles = {
    authInput:
        "bg-transparent rounded-[5px] outline-none text-white poppins px-2 h-14 bg-opacity-30 borderStyle hover:duration-150 focus:bg-darkLighter focus:duration-150 focus:bg-opacity-50",
    filterInput:
        "rounded-[5px] cursor-pointer focus:bg-opacity-75 py-2 px-2 border-white border-solid border-[1px] bg-darkLighter text-white",
};
