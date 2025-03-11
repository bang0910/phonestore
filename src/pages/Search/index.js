import { useEffect, useState } from "react";
import { getProducts } from "../../services/Api";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../shared/components/pagination";
import ProductItem from "../../shared/components/productItem";

const Search = () => {
  const [search, setSearch] = useState([]);
  const limit = 9;
  const [pages, setPages] = useState({
    limit,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page") || 1;
  useEffect(() => {
    getProducts({
      params: {
        name: keyword,
        limit,
        page,
      },
    })
      .then(({ data }) => {
        setSearch(data.data.docs);
        setPages({ ...pages, ...data.data.pages });
      })
      .catch((error) => console.log(error));
  }, [keyword, page]);
  return (
    <div>
      {/*	List Product	*/}
      <div className="products">
        <div id="search-result">
          Kết quả tìm kiếm với sản phẩm{" "}
          <span style={{ textTransform: "uppercase" }}>{keyword}</span>
        </div>
        <div className="product-list card-deck">
          {search?.map((product, index) => (
            <ProductItem key={index} items={product} />
          ))}
        </div>
      </div>
      {/*	End List Product	*/}
      <Pagination pages={pages} />
    </div>
  );
};
export default Search;
