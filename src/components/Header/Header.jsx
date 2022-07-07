import { NavLink } from 'react-router-dom';
import { headerItems } from 'database/headerItems';

const Header = () => {
  const items = headerItems.map(({ id, to, title }) => (
    <li key={id}>
      <NavLink to={to}>{title}</NavLink>
    </li>
  ));
  return <header>{items}</header>;
};

export default Header;
