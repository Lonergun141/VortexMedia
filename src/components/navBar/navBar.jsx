import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../features/authSlice';
import whiteLogo from '../../assets/images/whiteLogo.png';
import hamburgerMenuIcon from '../../assets/images/hamburgerMenu.png';
import searchIcon from '../../assets/images/searchIcon.png';
import Styles from './navBar.module.css';

import { fetchSearchedNews } from '../../features/newsSlice';

const NavigationBar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        localStorage.removeItem('accessToken'); 
        navigate('/VortexMedia/');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
    dispatch(reset());
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const category = 'general';
      const accessToken = localStorage.getItem('accessToken'); 
      dispatch(fetchSearchedNews({ query: searchTerm, category, accessToken }));
      navigate(`/VortexMedia/NewsPage?query=${searchTerm}`);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <nav className={Styles.topnav}>
      <div className={Styles.logoMenu}>
        <img src={whiteLogo} alt="Vortex Media Logo" />
        <img src={hamburgerMenuIcon} alt="Menu" onClick={toggleMenu} />
      </div>

      {isMenuOpen && (
        <div className={`${Styles.dropdownMenu} ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/VortexMedia/SavedNewsList">Saved News</Link>
          {user && <Link to="/VortexMedia/Profile">Profile</Link>}
          <button className={`${Styles.logoutButton}`} onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      )}

      <div className={Styles.navLinks}>
        {user && (
          <>
            <Link to="/VortexMedia/World">WORLD</Link>
            <Link to="/VortexMedia/Politics">TECHNOLOGY</Link>
            <Link to="/VortexMedia/Sports">SPORTS</Link>
            <Link to="/VortexMedia/Business">BUSINESS</Link>
            <Link to="/VortexMedia/Entertainment">ENTERTAINMENT</Link>
          </>
        )}
      </div>

      <form className={Styles.searchBar} onSubmit={handleSearchSubmit}>
        <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit">
          <img src={searchIcon} alt="Search" />
        </button>
      </form>
    </nav>
  );
};

export default NavigationBar;
