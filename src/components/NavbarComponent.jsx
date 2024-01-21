import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
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
        <Nav tabs>
          {categories.map((category) => {
            return (
              <NavItem
                onClick={() => setActiveCategory(category)}
                className="nav-item"
              >
                {/* <NavLink active={category === activeCategory ? true : false}> */}
                <NavLink active={category === activeCategory}>
                  {category.toUpperCase()}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
      </Navbar>
    </>
  );
};
