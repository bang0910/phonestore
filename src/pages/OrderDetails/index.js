import { useEffect, useState } from "react";
import { orderDetail } from "../../services/Api";
import { Link, useParams } from "react-router-dom";
import { formatPrice, getImageProduct } from "../../shared/ultils";
const OrderDetails = () => {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState([]);
  const { id } = useParams();
  console.log("useParams id:", id); // THÊM DÒNG NÀY

  useEffect(() => {
    orderDetail(id)
      .then(({ data }) => {
        setProduct(data.data.items);
        setTotal(data.data);
      })
      .catch((error) => console.log(error));
  }, [id]);
  return (
    <>
      {/*	Order Details	*/}
      <div id="my-cart">
        <div className="row">
          <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
            Thông tin sản phẩm
          </div>
          <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
            Số lượng
          </div>
          <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
        </div>
        <form method="post">
          {product?.map((item, index) => (
            <div key={index} className="cart-item row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                <img src={getImageProduct(item.image)} />
                <h4>{item.name}</h4>
              </div>
              <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                <p>{item.qty}</p>
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>{formatPrice(item.price)}</b>
              </div>
            </div>
          ))}

          <div className="row">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12"></div>
            <div className="cart-total col-lg-2 col-md-2 col-sm-12">
              <b>Tổng cộng:</b>
            </div>
            <div className="cart-price col-lg-3 col-md-3 col-sm-12">
              <b>88.970.000đ</b>
            </div>
          </div>
        </form>
      </div>
      {/*	End Order Details	*/}
      {/*	Customer Info	*/}
      <div id="customer">
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to={"/Order"}>
              <b>Về danh sách đơn hàng</b>
            </Link>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to={"/"}>
              <b>Về trang chủ</b>
            </Link>
          </div>
        </div>
      </div>
      {/*	End Customer Info	*/}
    </>
  );
};
export default OrderDetails;
