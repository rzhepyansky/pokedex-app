import {makeAutoObservable} from "mobx";
import {classStore, Pokemon} from "@/model/model";

class Store implements classStore {
    loadedPokemon: Pokemon[] = [];
    caughtPokemon: Pokemon[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    addPokemon(pokemon: Pokemon) {
        this.loadedPokemon.push(pokemon)
    }

    catchPokemon(pokemon: Pokemon) {
        this.loadedPokemon[pokemon.id - 1].isCatched = true
        this.caughtPokemon.push(pokemon)
    }

    getPokemonFromLocalStorage(pokemon: Pokemon) {
        this.caughtPokemon.push(pokemon)
        this.caughtPokemon.sort((a: Pokemon, b: Pokemon) => a.id - b.id)
        const index: number = this.loadedPokemon.findIndex((item: Pokemon) => item.id === pokemon.id)
        if (index !== -1) {
            this.loadedPokemon[index].isCatched = true
        }
    }
}

export default new Store()