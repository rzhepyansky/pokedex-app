import React from 'react';
import error from '../../../../public/404.png'
import classes from './NotFoundPage.module.scss'
import {Link} from "react-router-dom";

const NotFoundPage = () => {

    return (
        <div className={classes.wrapper}>
            <img src={error} alt=""/>
            <div className={classes.text}>
                <div className={classes.error}>404</div>
                <div className={classes.message}>Page not found</div>
                <Link to={'/'}>Go home</Link>
            </div>

        </div>
    );
};

export default NotFoundPage;