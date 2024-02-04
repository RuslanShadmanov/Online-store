import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Pages = ({ products }) => {
  const [current, setCurrent] = useState(1);
  const itemPerPage = 3;
  const numOfPages = Math.ceil(products.length / itemPerPage);
  const arrayOfPages = [];
  for (let i = 1; i <= numOfPages; i++) {
    arrayOfPages.push(i);
  }
  const start = (current - 1) * itemPerPage;
  const end = start + itemPerPage;

  return (
    <Pagination>
      <PaginationItem>
        <PaginationLink first href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" previous />
      </PaginationItem>
      {arrayOfPages.map((page) => {
        return (
          <Link to={`/page=${page}`}>
            <PaginationItem>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
          </Link>
        );
      })}
      <PaginationItem></PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" next />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" last />
      </PaginationItem>
    </Pagination>
  );
};
