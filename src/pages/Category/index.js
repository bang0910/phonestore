import { useEffect, useState } from "react";
import { getCategory, getProductsByCategory } from "../../services/Api";
import { useParams, useSearchParams } from "react-router-dom";
import ProductItem from "../../shared/components/productItem";

const Category = () => {
  const [total, setTotal] = useState([]);
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  // const [pages, setPages] = useState(null);
  // const [searchParams] = useSearchParams();
  // const currentPage = parseInt(searchParams.get("page")) || 1;

  const { id } = useParams();
  useEffect(() => {
    getProductsByCategory(id, {})
      .then(({ data }) => {
        setProducts(data.data.docs);
        // setPages(data.data.pages);
        setTotal(data.data.pages.total);
      })
      .catch((error) => console.log(error));
    getCategory(id, {})
      .then(({ data }) => setCategory(data.data.name))
      .catch((error) => console.log(error));
  }, [id]);
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
    </div>
  );
};
export default Category;
