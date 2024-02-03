import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { useLocation, Link } from "react-router-dom";
export const BreadCrumbs = ({ products }) => {
  const { pathname } = useLocation();
  let product = null;
  const pathParts = ["HOME", ...pathname.split("/")].filter((item) => item);
  const isLastElementString = isNaN(Number(pathParts.at(-1)));
  if (!isLastElementString) {
    product = products.find(
      (product) => product.id === Number(pathParts.at(-1))
    );
  }
  return (
    <Breadcrumb listTag="div">
      {pathParts.map((item, index) => {
        const isLast = index === pathParts.length - 1;
        const itemModified = item.replace("-", " ").toUpperCase();

        if (!isLast) {
          return (
            <BreadcrumbItem>
              <Link to={item === "HOME" ? "/" : `/${item}`}>
                {itemModified}
              </Link>
            </BreadcrumbItem>
          );
        } else {
          return (
            <BreadcrumbItem active>
              {product ? `${product.title.slice(0, 30)}...` : itemModified}
            </BreadcrumbItem>
          );
        }
      })}
    </Breadcrumb>
  );
};
