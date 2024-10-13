import React, { useState } from 'react';

const MenuItem = ({ icon, label }) => (
    <span>
        <img src={icon} alt={label} />
        {label}
    </span>
);

export function MainMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className='menu' onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}>
            <div className="main-content">
                {['ICON - Search', 'Group 46', 'Group 56', 'Group 54', 'Group 53', 'Group 47'].map((icon, index) => (
                    <MenuItem key={index} icon={`/images/icons/${icon}.png`} label="" />
                ))}
            </div>

            <div className={`main-menu ${isOpen ? 'open' : 'close'}`}>
                <div className='user-info'>
                    <img src="/images/user.png" alt="User" />
                    <span>Daniel</span>
                </div>

                <div className='menu-content'>
                    {[
                        { icon: 'ICON - Search', label: 'Search' },
                        { icon: 'Group 46', label: 'Home' },
                        { icon: 'Group 56', label: 'TV Shows' },
                        { icon: 'Group 54', label: 'Movies' },
                        { icon: 'Group 53', label: 'Genre' },
                        { icon: 'Group 47', label: 'Watch Later' }
                    ].map((item, index) => (
                        <MenuItem key={index} icon={`/images/icons/${item.icon}.png`} label={item.label} />
                    ))}
                </div>

                <div className='menu-footer'>
                    <p>Language</p>
                    <p>Get Help</p>
                    <p>Exit</p>
                </div>
            </div>
        </div>
    );
}
