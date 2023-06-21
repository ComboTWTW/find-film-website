const MoviesShows = () => {
    const header: string = location.pathname.split("/")[1];

    return (
        <div className="w-full flex justify-center">
            <div className="max-w-[1300px] px-4 w-full flex flex-col ">
                <h1 className="first-letter:uppercase poppins font-semibold text-white text-3xl md:text-4xl mt-8">
                    {header.replace("-", " ")}
                </h1>

                <div className="flex flex-col md:flex-row  mt-10  md:gap-10">
                    <div className=" bg-green-800 h-screen md:min-w-[300px]"></div>

                    <div className="w-full mt-5 md:mt-0 flex flex-col">
                        <div className="w-full bg-red-800 h-screen"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoviesShows;
