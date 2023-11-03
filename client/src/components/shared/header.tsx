import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Camera, Moon, MoonIcon, Sun, SunDim, X, MenuIcon } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import { actions } from '../../state/userPreferences/userPreferences';
import { Tooltip } from 'react-tooltip';

const Header = () => {
  const userPreferences = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const changeTheme = () => dispatch(actions.toggleTheme());
  const menuModalRef = React.useRef();

  return (
    <>
      <header className='wide-screen-menu'>
        <nav>
          <ul>
            <li>
              <NavLink
                to='/resumes'
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                resumes
              </NavLink>
            </li>
            <li>
              <button
                className={`themeButton`}
                onClick={changeTheme}
                data-tooltip-id='theme-color'
                data-tooltip-content='Change Theme'
              >
                {userPreferences.theme === 'dark' ? (
                  <Moon size={18} />
                ) : (
                  <Sun size={18} />
                )}
              </button>
              <Tooltip id='theme-color' />
            </li>
          </ul>
        </nav>
      </header>
      <button
        data-header-modal-show
        onClick={() => {
          menuModalRef.current?.showModal();
        }}
      >
        <MenuIcon size={30} />
      </button>
      <dialog
        ref={menuModalRef}
        data-header-modal
        className='small-screen-menu'
      >
        <button
          data-header-modal-close
          onClick={() => {
            menuModalRef.current?.close();
          }}
        >
          <X />
        </button>
        <nav>
          <ul>
            <li>
              <NavLink
                to='/resumes'
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                resumes
              </NavLink>
            </li>
            <li>
              <button className={`themeButton`} onClick={changeTheme}>
                {userPreferences.theme === 'dark' ? (
                  <Moon size={18} />
                ) : (
                  <Sun size={18} />
                )}
              </button>
            </li>
          </ul>
        </nav>
      </dialog>
    </>
  );
};

export default Header;
