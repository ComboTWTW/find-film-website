const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getPopular = () => {
    const link = `http://${
        import.meta.env.VITE_PROXY_IP_ADDRESS
    }/movie/popular?api_key=${apiKey}`;

    return fetch(link)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};
