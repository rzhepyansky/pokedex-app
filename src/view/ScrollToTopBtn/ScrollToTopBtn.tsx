import React from 'react';
import Arrow from '../../../public/arrow_up.png'
import classes from './ScrollToTopBtn.module.scss'

const ScrollToTopBtn = () => {
    return (
        <button className={classes.btn} onClick={() => window.scrollTo(0, 0)}>
            <img src={Arrow} alt=""/>
        </button>
    );
};

export default ScrollToTopBtn;