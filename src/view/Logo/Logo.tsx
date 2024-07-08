import React from 'react';
import logo from '../../../public/logo.png'

const Logo = () => {
    return (
        <div style={{textAlign: 'center', marginBottom: '20px'}}>
            <img src={logo} alt="Logotype"/>
        </div>
    );
};

export default Logo;