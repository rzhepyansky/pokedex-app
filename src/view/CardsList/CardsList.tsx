import React, {useEffect, useState} from 'react';
import Service from "@/service/service";
import Card from "@/view/Card/Card";
import classes from '@/view/CardsList/CardsList.module.scss'
import Transport from "@/transport/transport";
import Preloader from "../../../public/preloader.gif"
import Store from "@/store/loadedPokemons";
import {observer} from "mobx-react-lite";
import {Pokemon} from "@/model/model";

const CardsList = observer(() => {

    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {
        if (isLoaded) {
            Service.getPokemons()
                .then(data => {
                    data.forEach((item) => {
                        Store.addPokemon(item)
                    })

                    Transport.offset += 21
                })
                .finally(() => setIsLoaded(false))
        }
    }, [isLoaded])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }

    }, []);

    function scrollHandler (e: UIEvent & {target: Document}) {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setIsLoaded(true)
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.cardsList}>
                {Store.loadedPokemon.map((pokemon: Pokemon) => (
                    <Card pokemon={pokemon} id={pokemon.id} name={pokemon.name} image={pokemon.image}  isCatched={pokemon.isCatched} key={pokemon.id} />
                ))}
            </div>
            {isLoaded ? <img src={Preloader}/> : null}
        </div>
    );
})

export default CardsList;