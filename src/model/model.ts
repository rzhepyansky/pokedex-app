export interface Pokemon {
    id: number,
    name: string,
    image: string,
    isCatched: boolean,
    ability: string,
    catchTime?: string,
    catchDate?: string,
}

export interface PokemonResponse {
    name: string,
    url: string
}

export interface PokemonListResponse {
    results: PokemonResponse[]
}

export interface classService {
    getPokemons: () => Promise<Pokemon[]>,
    catchPokemon: (pokemon: Pokemon) => void,
    translateDate: () => string,
    translateTime: () => string,
}

export interface classTransport {
    fetchLimit: number,
    offset: number,
    getPokemonsList: () => Promise<PokemonListResponse>,
}

export interface classStore {
    loadedPokemon: Pokemon[],
    caughtPokemon: Pokemon[],
    addPokemon: (pokemon: Pokemon) => void,
    catchPokemon: (pokemon: Pokemon) => void,
    getPokemonFromLocalStorage: (pokemon: Pokemon) => void
}





