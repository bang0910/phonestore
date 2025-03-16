import { useEffect, useState } from "react";
import { getCategory, getProductsByCategory } from "../../services/Api";
import { useParams, useSearchParams } from "react-router-dom";
import ProductItem from "../../shared/components/productItem";

const Category = () => {
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { id } = useParams();
  const limit = 9;

  useEffect(() => {
    getProductsByCategory(id, {
      params: {
        limit,
        page,
      },
    })
      .then(({ data }) => {
        setProducts(data.data.docs);
        setPages(data.data.pages);
        setTotal(data.data.pages.total);
      })
      .catch((error) => console.log(error));
    getCategory(id, {})
      .then(({ data }) => setCategory(data.data.name))
      .catch((error) => console.log(error));
  }, [id, page]);
  const totalPages = pages.totalPages || Math.ceil(total / limit);
  const next = () => {
    if (page < totalPages) {
      setSearchParams({ page: page + 1 });
    }
  };
  const previous = () => {
    if (page > 1) {
      setSearchParams({ page: page - 1 });
    }
  };

  return (
    <div>
      {/*	List Product	*/}
      <div className="products">
        <h3>
          {category} (hiện có {total} sản phẩm)
        </h3>
        <div className="product-list card-deck">
          {products?.map((product, index) => {
            return <ProductItem key={index} items={product} />;
          })}
        </div>
      </div>
      {/*	End List Product	*/}
      {/* <Pagination pages={pages} /> */}
      <div className="double-button">
        <button
          onClick={previous}
          disabled={page <= 1}
          type="button"
          className="one1 d-block btn btn-primary"
        >
          Prev
        </button>
        <button
          onClick={next}
          disabled={page >= totalPages}
          type="button"
          className="one1 d-block btn btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default Category;
