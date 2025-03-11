import { useEffect, useState } from "react";
import { getProducts } from "../../services/Api";
import { Link } from "react-router-dom";
import ProductItem from "../../shared/components/productItem";

const Home = () => {
  const [featureProduct, setFeatureProduct] = useState([]);
  const [latestProduct, setLastestProduct] = useState([]);
  useEffect(() => {
    getProducts({
      params: {
        limit: 6,
        is_featured: true,
      },
    })
      .then(({ data }) => setFeatureProduct(data.data.docs))
      .catch((error) => console.log(error));

    getProducts({
      params: {
        limit: 6,
      },
    })
      .then(({ data }) => setLastestProduct(data.data.docs))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div>
        <div className="products">
          <h3>Sản phẩm nổi bật</h3>
          <div className="product-list card-deck">
            {featureProduct?.map((items) => {
              return <ProductItem key={items?._id} items={items} />;
            })}
          </div>
        </div>
        <div className="products">
          <h3>Sản phẩm mới</h3>
          <div className="product-list card-deck">
            {latestProduct?.map((items) => {
              return <ProductItem key={items?._id} items={items} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
