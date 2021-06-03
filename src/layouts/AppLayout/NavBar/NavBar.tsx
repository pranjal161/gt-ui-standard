import React from 'react';
import image from '_sb_mock_images/Layout_NavBar.png'

export interface NavBarProps {

    /**
     * prios1
     */
    props1?: any
}

const NavBar: React.FC<NavBarProps> = () => (
    <div>
        <img src={image} alt={'mock'}/>
    </div>
)

export default NavBar;
