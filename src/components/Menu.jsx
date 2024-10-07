import {NavLink} from "react-router-dom";

export default function Menu() {
  const getClassName = isActive => {
    return isActive ? `menu__item menu__item-active` : 'menu__item'
  };

  return (
    <nav className="menu">
      <NavLink
        className={({isActive}) => getClassName(isActive)}
        to="/"
      >Список услуг</NavLink>
    </nav>
  );
}