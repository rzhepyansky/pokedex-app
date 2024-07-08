import React, {useEffect, useState} from 'react';
import classes from './Card.module.scss';
import openedPokeball from '@/../public/openedPokeball.png'
import closedPokeball from '@/../public/closedPokeball.png'
import {Pokemon} from "@/model/model";
import Service from "@/service/service"
import {NavigateFunction, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Store from "@/store/loadedPokemons";


type CardProps = {
    pokemon: Pokemon,
    name: string,
    image: string,
    id: number,
    isCatched: boolean
}

const Card = observer((props: CardProps) => {

    const createId = (number: number): string => {
        let numsArray: string[] = number.toString().split('');

        while (numsArray.length !== 4) {
            numsArray.unshift('0')
        }

        return numsArray.join('');
    }

    const createName = (name: string): string => {
        name = props.name[0].toUpperCase() + props.name.slice(1)
        if (name.length > 10) {
            return name.slice(0, 10) + '...'
        } else return name
    }

    const [catched, setCatched] = useState(false)
    let history: NavigateFunction = useNavigate()

    useEffect(() => {
        Store.caughtPokemon.forEach((item) => {
            if (item.name === props.name) {
                setCatched(true)
            }
        })
    }, [Store.caughtPokemon]);



    const viewInfoAboutPokemons = (pokemon: Pokemon): void => {
        history(`/${pokemon.name}`)
    }

    return (
        <div className={classes.cardItem}>
            <img src={props.image} alt=""/>
            <div style={{textAlign: 'left'}} className={classes.cardInfo}>
                <h2 onClick={() => viewInfoAboutPokemons(props.pokemon)} className={classes.title}>{createName(props.name)}</h2>
                <h3>#{createId(props.id)}</h3>
            </div>
            <button
                className={classes.catchButton}
                onClick={() => {
                    if (!catched) {
                        Service.catchPokemon(props.pokemon)
                        setCatched(true)
                    }
                }}>
                {catched ? <img src={closedPokeball} alt=""/> : <img src={openedPokeball} alt=""/>}
            </button>
        </div>
    );
})

export default Card;