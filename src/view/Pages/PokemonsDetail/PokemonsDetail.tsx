import React, {useEffect, useState} from 'react';
import {NavigateFunction, useLocation, useNavigate, useParams} from "react-router-dom";
import {Pokemon} from "@/model/model";
import classes from "./PokemonsDetail.module.scss"
import Arrow from "../../../../public/arrow.png";
import Store from "@/store/loadedPokemons";


const PokemonsDetail = () => {
    const { pokemon } = useParams();
    const [currentPokemon, setCurrentPokemon] = useState(null);
    const [loading, setLoading] = useState(false);

    let isCatched: boolean = false
    let catchTime: string = ''

    let catchDate: string = ''
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(res => res.json())
            .then(data => setCurrentPokemon(data))
            .catch(err => navigate('/notfound'))
            .finally(() => setLoading(true))
    }, []);

    if (loading) {
        if (Store.caughtPokemon.findIndex((item: Pokemon) => item.id === currentPokemon.id) !== -1) {isCatched = true}
        if (isCatched) {
            catchTime = Store.caughtPokemon.find((item: Pokemon) => item.id === currentPokemon.id).catchTime
            catchDate = Store.caughtPokemon.find((item: Pokemon) => item.id === currentPokemon.id).catchDate
        }
    }

    function goBack (): void {
        navigate(-1)
    }
    const createName = () => currentPokemon.species.name[0].toUpperCase() + currentPokemon.species.name.slice(1)
    const createId = (number: number): string => {
        let numsArray: string[] = number.toString().split('');

        while (numsArray.length !== 4) {
            numsArray.unshift('0')
        }

        return numsArray.join('');
    }


    function render () {
        return (
            <>
                <div className={classes.image}>
                    <img src={currentPokemon.sprites.other["official-artwork"].front_default} alt=""/>
                </div>
                <div className={classes.description}>
                    <h2 className={classes.description__name}>{createName()}</h2>
                    <h3 className={classes.description__id}>#{createId(currentPokemon.id)}</h3>
                    <div><span>Ability:</span> {currentPokemon.abilities[0].ability.name}</div>
                    <div>
                        <span>Status:</span> {isCatched ? 'caught' : 'not caught yet'}
                    </div>
                    <div><span>{isCatched ? 'Date of capture: ' : ''}</span>{isCatched ? `${catchDate}` : ''}</div>
                    <div><span>{isCatched ? 'Time of capture: ' : ''}</span>{isCatched ? `${catchTime}` : ''}</div>
                </div>
            </>
        )
    }

    return (
        <div className={classes.pokemonDetails}>

            <button onClick={goBack} className={classes.btnBack}>
                <img src={Arrow} alt=""/>
                Go back
            </button>

            {loading ? render() : ''}
        </div>
    );
};

export default PokemonsDetail;