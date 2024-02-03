import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";

import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const NavbarComponent = ({
  setActiveCategory,
  categories,
  cart,

  activeCategory,
}) => {
  const { pathname } = useLocation();
  useEffect(() => {
    const category =
      pathname === "/" ? "ALL" : pathname.slice(1).replace("-", " ");

    setActiveCategory(category);
  }, []);
  const total = cart
    .reduce((acc, el) => {
      return (acc += el.quantity * el.price);
    }, 0)
    .toFixed(2);
  const numOfCartItems = cart.reduce((acc, el) => {
    return (acc += el.quantity);
  }, 0);
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
        <Link to="/cart" className="link-to-cart">
          <div className="cart-wrapper-1"></div>
          <AiOutlineShoppingCart
            style={{ fill: "white", fontSize: "25px" }}
            className="cart"
            onClick={() => setActiveCategory("")}
          />
          <span className="cart-number">{numOfCartItems}</span>
          <span className="cart-total">${total}</span>
        </Link>
      </Navbar>
    </>
  );
};
