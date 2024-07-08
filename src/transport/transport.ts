import {classTransport, Pokemon, PokemonListResponse} from "@/model/model";

class Transport implements classTransport {

    readonly fetchLimit: number = 21
    offset: number = 0

    // Метод по получению списка покемонов с базового запроса
    async getPokemonsList(): Promise<PokemonListResponse> {
        return await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.fetchLimit}&offset=${this.offset}`)
            .then(res => res.json())
            .then(json => json as PokemonListResponse);
    }

}

export default new Transport;