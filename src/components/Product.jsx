import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import { MdFavorite } from "react-icons/md";
export const Product = ({
  id,
  title,
  price,
  description,
  image,
  category,
  toggleFavorites,
  favorites,
}) => {
  const isFavorite = favorites.some((product) => product.id === id);

  return (
    <Card
      style={{
        width: "18rem",
      }}
      className="product-card"
    >
      <img alt="Sample" src={image} />
      <MdFavorite
        className="favorite-icon"
        onClick={() => toggleFavorites(id)}
        style={{ fill: isFavorite ? "red" : "lightgray" }}
      />
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Price: ${price}
        </CardSubtitle>
        <CardText>{description.slice(0, 100)}...</CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  );
};
