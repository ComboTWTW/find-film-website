const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const query = "first blood";

export const search = (input: string): object => {
    const link = `http://${
        import.meta.env.VITE_PROXY_IP_ADDRESS
    }/search/multi?api_key=${apiKey}&language=en-US&page=1&query=${input}`;

    return fetch(link)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error(error));
};
