import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <div>
      <Menu pointing secondary size="massive">
        <Menu.Item
          name={user.username}
          active
          as={Link}
          to="/"
          className="menu"
        />

        <Menu.Menu position="right">
          <Menu.Item name="Logout" onClick={logout} className="menu" />
        </Menu.Menu>
      </Menu>
    </div>
  ) : (
    <div>
      <Menu pointing secondary size="massive">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
          className="menu"
        />

        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
            className="menu"
          />
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="register"
            className="menu"
          />
        </Menu.Menu>
      </Menu>
    </div>
  );

  return menuBar;
}

export default NavBar;
