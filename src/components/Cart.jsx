import {
  ListGroup,
  ListGroupItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
export const Cart = ({ cart }) => {
  const numberOfListItems = [];
  for (let i = 0; i <= 10; i++) {
    numberOfListItems.push(i);
  }
  return (
    <div className="cart-wrapper">
      <h2>Cart</h2>
      <ListGroup>
        {cart.map(({ title, price, image }) => {
          return (
            <ListGroupItem>
              <img src={image} height={50} />
              <p>{title}</p>
              <p>${price}</p>
              <UncontrolledDropdown>
                <DropdownToggle caret color="dark">
                  1 item
                </DropdownToggle>
                <DropdownMenu dark>
                  <DropdownItem>
                    {numberOfListItems.map((num) => {
                      return <DropdownItem>{num} items</DropdownItem>;
                    })}
                  </DropdownItem>
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
