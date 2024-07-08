import React, {useEffect, useState} from 'react';
import Logo from "@/view/Logo/Logo";
import classes from "./App.module.scss"
import {Routes, Route, NavLink} from 'react-router-dom';

import Homepage from "@/view/Pages/Homepage/Homepage";
import CaughtPokemons from "@/view/Pages/CaughtPokemons/CaughtPokemons";
import NotFoundPage from "@/view/Pages/NotFoundPage/NotFoundPage";
import PokemonsDetail from "@/view/Pages/PokemonsDetail/PokemonsDetail";
import ScrollToTopBtn from "@/view/ScrollToTopBtn/ScrollToTopBtn";
import LoadedPokemons from "@/store/loadedPokemons";

const App = () => {

    type ActiveState = {
        isActive: boolean
    }

    const setActive = ({isActive}: ActiveState): {color: string} | {} => isActive ? {color: '#ef5350'} : {}
    const [neededBtn, setNeededBtn] = useState(false);

    useEffect(() => {
        for (let i = 0; i < localStorage.length; i++) {
            let item = JSON.parse(localStorage.getItem(localStorage.key(i)))
            LoadedPokemons.getPokemonFromLocalStorage(item)
        }
    }, []);

    document.addEventListener("scroll", () => scrollY > 252 ? setNeededBtn(true) : setNeededBtn(false));
    function insertBtn() {
        if (neededBtn) {
            return <ScrollToTopBtn/>
        } else return null
    }



    return (
        <div className={classes.App}>
            <header className={classes.header}>
                <NavLink to="/" style={setActive}>Homepage</NavLink>
                <NavLink style={setActive} to="/caught-pokemons">Caught pokemon</NavLink>
            </header>
            {insertBtn()}
            <Logo/>
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/caught-pokemons' element={<CaughtPokemons />} />
                <Route path='/:pokemon' element={<PokemonsDetail />}/>
                <Route path='/notfound' element={<NotFoundPage />} />
            </Routes>
        </div>
    );
};

export default App;