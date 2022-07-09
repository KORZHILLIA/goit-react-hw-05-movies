import { NavLink } from 'react-router-dom';
import { headerItems } from 'components/Header/headerItems';
import styles from './header.module.css';

const Header = () => {
  function chooseClassName({ isActive }) {
    return isActive ? styles.activeNavLink : styles.navLink;
  }
  const items = headerItems.map(({ id, to, title }) => (
    <li className={styles.navLink} key={id}>
      <NavLink className={chooseClassName} to={to}>
        {title}
      </NavLink>
    </li>
  ));
  return (
    <header>
      <nav>
        <ul className={styles.navList}>{items}</ul>
      </nav>
    </header>
  );
};

export default Header;
