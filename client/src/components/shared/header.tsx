import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/state/store';
import { change } from '@/state/theme/themeSlice';

const Header = () => {
    const theme = useSelector((state: RootState) => state.theme);
    const dispatch = useDispatch();
    return (
        <header>
            <button onClick={() => dispatch(change({ color: 'dark', edges: 'soft' }))}></button>
            {theme.color} - {theme.edges}
        </header>
    )
}

export default Header