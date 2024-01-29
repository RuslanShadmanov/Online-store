import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";

import { Link } from "react-router-dom";

export const NavbarComponent = ({
  setActiveCategory,
  categories,

  activeCategory,
}) => {
  return (
    <>
      <Navbar className="my-2" color="dark" dark>
        <NavbarBrand href="/">
          <img
            alt="logo"
            src="https://i0.wp.com/www.dafontfree.co/wp-content/uploads/2021/11/Amazon-Logo-Font-1-scaled.jpg?resize=2560%2C1578"
            style={{
              height: 40,
              width: 70,
            }}
          />
        </NavbarBrand>
        <Nav tabs className="link-wrapper">
          {categories.map((category) => {
            return (
              <Link
                to={
                  category === "ALL" ? "/" : `/${category.replaceAll(" ", "-")}`
                }
              >
                <NavItem
                  onClick={() => setActiveCategory(category)}
                  className="nav-item"
                >
                  {/* <NavLink active={category === activeCategory ? true : false}> */}
                  <NavLink active={category === activeCategory}>
                    {category.toUpperCase()}
                  </NavLink>
                </NavItem>
              </Link>
            );
          })}
        </Nav>
        <Link to="/favorites">
          <MdFavorite
            style={{ color: "white", fontSize: "25px" }}
            onClick={() => setActiveCategory("")}
          />
        </Link>
        <Link to="/cart">
          <AiOutlineShoppingCart
            style={{ fill: "white", fontSize: "25px" }}
            className="cart"
            onClick={() => setActiveCategory("")}
          />
        </Link>
      </Navbar>
    </>
  );
};
