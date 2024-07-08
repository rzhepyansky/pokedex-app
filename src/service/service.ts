import Transport from "@/transport/transport";
import {Pokemon, classService, PokemonListResponse, PokemonResponse} from "@/model/model";
import Store from "@/store/loadedPokemons";


class Service implements classService{

    // Метод по получению массива объектов с необходимой информацией о каждом покемоне
    getPokemons(): Promise<Pokemon[]> {
        return Transport.getPokemonsList()
            .then(async (list: PokemonListResponse) => {
                let pokemons: Pokemon[] = []

                for (let item of list.results) {
                    let response = await fetch(item.url).then(res => res.json())
                    let pokemon: Pokemon = {
                        name: response.name,
                        id: response.id,
                        image: response.sprites.other["official-artwork"].front_default,
                        isCatched: false,
                        ability: response.abilities[0].ability.name
                    }
                    pokemons.push(pokemon)
                }
                return pokemons
            })

    }

    // Метод поимки покемонов
    catchPokemon(pokemon: Pokemon): void {
        pokemon.isCatched = true
        if (pokemon.isCatched && Store.caughtPokemon.indexOf(pokemon) === -1) {
            pokemon.catchTime = this.translateTime()
            pokemon.catchDate = this.translateDate()
            Store.catchPokemon(pokemon)
            Store.caughtPokemon.sort((a: Pokemon, b: Pokemon) => a.id - b.id)
            localStorage.setItem(pokemon.name, JSON.stringify(pokemon))
        }


    }

    translateDate (): string {
        let date: Date = new Date
        let day: string = date.getDate().toString()
        let month: string = (date.getMonth() + 1).toString()
        function formatDate (date: string): string {
            return date.length < 2 ? '0' + date : date
        }
        return `${formatDate(day)}-${formatDate(month)}-${date.getFullYear()}`
    }

    translateTime (): string {
        let date: Date = new Date
        let hours: string = date.getHours().toString()
        let minutes: string = date.getMinutes().toString()
        let seconds: string = date.getSeconds().toString()
        function formatTime(time: string): string {
            return time.length < 2 ? '0' + time : time
        }
        return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
    }

}

export default new Service;