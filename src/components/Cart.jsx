import {
  ListGroup,
  ListGroupItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
export const Cart = ({ cart, changeQuantity }) => {
  const numberOfListItems = [];
  for (let i = 1; i <= 10; i++) {
    numberOfListItems.push(i);
  }
  return (
    <div className="cart-wrapper">
      <h2>Cart</h2>
      <ListGroup>
        {cart.map(({ title, price, image, quantity, id }) => {
          return (
            <ListGroupItem>
              <img src={image} height={50} />
              <p>{title}</p>
              <p>${price}</p>
              <UncontrolledDropdown>
                <DropdownToggle caret color="dark">
                  {quantity}
                  {quantity === 1 ? " item" : " items"}
                </DropdownToggle>
                <DropdownMenu dark>
                  {numberOfListItems.map((num) => {
                    return (
                      <DropdownItem onClick={() => changeQuantity(id, num)}>
                        {num}
                        {num === 1 ? " item" : " items"}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
              <Button color="danger" size="sm">
                Delete
              </Button>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
};
