import React from 'react'
import { Camera, Moon, MoonIcon, Sun, SunDim } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import { actions } from '../../state/userPreferences/userPreferences';

const Header = () => {
    const userPreferences = useSelector((state: RootState) => state.theme);
    const dispatch = useDispatch();

    const changeTheme = () => dispatch(actions.toggleTheme())

    return (
        <header className='header'>
            <button className={`themeButton`} onClick={changeTheme}>
                {userPreferences.theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
        </header>
    )
}

export default Header