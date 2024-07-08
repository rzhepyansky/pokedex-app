import React from 'react';
import Card from "@/view/Card/Card";
import classes from './CaughtPokemons.module.scss'
import Store from "@/store/loadedPokemons";
import {observer} from "mobx-react-lite";
import {Pokemon} from "@/model/model";

const CaughtPokemons = observer(() => {

    return (
        <div className={classes.cardsList}>
            {Store.caughtPokemon.length === 0 ? <h2 style={{color: '#fbfbfb'}}>You haven't caught any Pokemon yet</h2> : ''}
            {Store.caughtPokemon.map((pokemon: Pokemon) => (
                <Card pokemon={pokemon} name={pokemon.name} image={pokemon.image} id={pokemon.id} isCatched={pokemon.isCatched} key={pokemon.id}/>
            ))}
        </div>
    );
})

export default CaughtPokemons;