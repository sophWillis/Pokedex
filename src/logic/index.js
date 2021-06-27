const logic = {
    getPokemonByName(pokemon) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(res => {
            if (res.status == 404) {
                throw Error("Not found");
            }
            return res.json();
        }).catch(res => {
            throw Error(res);
        })
    },
};

export default logic;
