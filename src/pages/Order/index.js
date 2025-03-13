import { useEffect, useState } from "react";
import { orderList } from "../../services/Api";
import { useSelector } from "react-redux";
import moment from "moment";
import { formatPrice } from "../../shared/ultils";

const Order = () => {
  //id order
  // const [idOrders, setIdOrders] = useState("");
  //order
  const [orders, setOrders] = useState([]);
  //login
  const login = useSelector(({ auth }) => auth.login);

  useEffect(() => {
    if (!login?.currentCustomer?._id) {
      console.log("Chưa có customerId");
      return;
    }

    const id = login.currentCustomer._id;

    console.log("customerId:", id);

    orderList(id)
      .then(({ data }) => {
        console.log("API trả về:", data);
        setOrders(data.data.docs);
      })
      .catch((error) => {
        console.error("Lỗi lấy đơn hàng:", error);
      });
  }, [login]); // 👈 theo dõi login thay vì chỉ customerId

  return (
    <>
      {/*	Cart	*/}
      <div id="my-cart">
        <div className="row">
          <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
            Đơn hàng của bạn
          </div>
          <div className="cart-nav-item col-lg-5 col-md-5 col-sm-12">
            Tổng tiền
          </div>
        </div>
        <form method="post">
          {orders?.map((item, index) => (
            <div key={index} className="cart-item row alert-success">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                <h4>
                  Đơn hàng đã mua vào ngày:{" "}
                  <span className="text-secondary">
                    {moment(item.createdAt).fromNow()}
                  </span>
                </h4>
                <p>Mã Đơn (MĐ): {item._id}</p>
              </div>
              <div className="cart-price col-lg-2 col-md-2 col-sm-12">
                <b>{formatPrice(item.totalPrice)}đ</b>
              </div>
              <div className="cart-quantity col-lg-3 col-md-3 col-sm-12">
                <button type="button" className="btn btn-outline-dark mb-1">
                  Chi tiết đơn hàng
                </button>
                {item.status === 0 ? (
                  <button type="button" className="btn btn-outline-danger mb-1">
                    Huỷ đơn
                  </button>
                ) : null}
                {item.status === 2 ? (
                  <button type="button" className="btn btn-success mb-1">
                    Đơn đã giao
                  </button>
                ) : null}
                {item.status === 1 ? (
                  <button type="button" className="btn btn-success mb-1">
                    Đơn đang giao
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </form>
        <div className="row">
          <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
            <button
              id="update-cart"
              className="btn btn-success"
              type="button"
              name="sbm"
              to={"/"}
            >
              Quay về trang chủ
            </button>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-12">
            <ul className="pagination mt-4">
              <li className="page-item disabled">
                <span className="page-link">Trang trước</span>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active" aria-current="page">
                <span className="page-link">2</span>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Trang sau
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default Order;
