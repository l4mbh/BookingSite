import React from "react";
import { Pagination as Pagin } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ max, url }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const maxPage = Math.ceil(max / 8);

  return (
    <nav className="d-flex justify-content-end">
      <Pagin>
        <div className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <a href={`${url}${page - 1}`} className="page-link">
            Prev
          </a>
        </div>
        {[...Array(maxPage)].map((link, index) => (
          <div className="page-item">
            <a
              href={`${url}${index + 1}`}
              className={`page-link ${index !== page - 1 ? "" : "active"}`}
            >
              {index + 1}
            </a>
          </div>
        ))}
        <div className={`page-item ${page === maxPage ? "disabled" : ""}`}>
          <a href={`${url}${page + 1}`} className="page-link">
            Next
          </a>
        </div>
      </Pagin>
    </nav>
  );
};

export default Pagination;
