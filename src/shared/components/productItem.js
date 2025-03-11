import React from "react";
import { formatPrice, getImageProduct } from "../ultils";
import { Link } from "react-router-dom";

const ProductItem = ({ items }) => {
  return (
    <div className="product-item card text-center">
      <Link to={`/ProductDetails/${items?._id}`}>
        <img src={getImageProduct(items?.image)} alt="img" />
      </Link>
      <h4>
        <Link to={`/ProductDetails/${items?._id}`}>{items?.name}</Link>
      </h4>
      <p>
        Giá Bán: <span>{formatPrice(items?.price)}</span>
      </p>
    </div>
  );
};
export default ProductItem;
