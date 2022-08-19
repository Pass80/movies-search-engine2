import Api_key from './Api-key';

const autoComplete = (query) => {
    // check of the entered value is empty and if so returns an empty array
    if (!query) {
        return Promise.resolve([]);
    }
    return fetch(
        `https://api.themoviedb.org/3/search/keyword?api_key=${Api_key}&query=${query}`
    )
        .then((response) => response.json())
        .then((data) =>
            data.results.map((item) => ({
                ...item,
                // add a new key to style the entered value in the search field
                styledName: item.name.replace(
                    new RegExp(query, 'gi'),

                    `<span>$&</span>`
                ),
            }))
        );
};

export default autoComplete;
