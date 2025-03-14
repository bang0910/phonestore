import { Link, useSearchParams } from "react-router-dom";

const Pagination = ({ pages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const formatUrl = (page) => {
    return `/Search?keyword=${searchParams.get("keyword")}&page=${page}`;
  };
  const { total, limit, currentPage, next, prev, hasNext, hasPrev } = pages;
  const totalPages = Math.ceil(total / limit);
  const renderPagesHTML = (delta = 1) => {
    const pages = [];
    const left = currentPage - delta;
    const right = currentPage + delta;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        (i >= left && i <= right)
      ) {
        pages.push(i);
      } else if (i === left - 1 || i === right + 1) {
        pages.push("...");
      }
    }
    return pages;
  };
  return (
    <div id="pagination">
      <ul className="pagination">
        {hasPrev && (
          <li className="page-item">
            <Link className="page-link" to={formatUrl(prev)}>
              Trang trước
            </Link>
          </li>
        )}
        {renderPagesHTML().map((page, index) => (
          <li
            key={index}
            className={`page-item ${page === currentPage ? "active" : ""}`}
          >
            {" "}
            {page === "..." ? (
              <span className="page-link">...</span>
            ) : (
              <Link className="page-link" to={formatUrl(page)}>
                {page}
              </Link>
            )}
          </li>
        ))}
        {hasNext && (
          <li className="page-item">
            <Link className="page-link" to={formatUrl(next)}>
              Trang sau
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};
export default Pagination;
