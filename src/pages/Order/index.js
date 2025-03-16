import { useEffect, useState } from "react";
import { cancelOrder, orderList } from "../../services/Api";
import { useSelector } from "react-redux";
import moment from "moment";
import { formatPrice } from "../../shared/ultils";
import { useNavigate, useSearchParams } from "react-router-dom";

const Order = () => {
  //order
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  //totalorder
  const [totalOrders, setTotalOrders] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  //login
  const login = useSelector(({ auth }) => auth.login);
  const token = useSelector(
    (state) => state.auth.login.currentCustomer.accessToken
  );
  //page
  const page = Number(searchParams.get("page")) || 1;
  const limit = 2;

  useEffect(() => {
    orderList(login.currentCustomer._id, token, {
      params: {
        limit,
        page,
      },
    })
      .then(({ data }) => {
        setOrders(data.data.docs);
        setTotalOrders(data.data.pages.total);
      })
      .catch((error) => {});
  }, [orderId, page]);
  const clickCancelOrder = (id) => {
    cancelOrder(id)
      .then(() => setOrderId(id))
      .catch((error) => console.log(error));
  };
  const totalPages = Math.ceil(totalOrders / limit);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage });
    }
  };

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
          {orders?.map((item, index) => {
            let alert = "";
            if (item.status === 0) alert = "alert-danger";
            else if (item.status === 2) alert = "alert-success";
            return (
              <div key={index} className={`cart-item row ${alert}`}>
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
                  <b>{formatPrice(item.totalPrice)}</b>
                </div>
                <div className="cart-quantity col-lg-3 col-md-3 col-sm-12">
                  <button
                    onClick={() => navigate(`/OrderDetail/${item._id}`)}
                    type="button"
                    className="btn btn-outline-dark mb-1"
                  >
                    Chi tiết đơn hàng
                  </button>
                  {item.status === 1 ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-outline-success mb-1"
                      >
                        Đơn đang giao
                      </button>
                      <button
                        onClick={() => clickCancelOrder(item._id)}
                        type="button"
                        className="btn btn-outline-danger mb-1"
                      >
                        Huỷ đơn
                      </button>
                    </>
                  ) : null}
                  {item.status === 2 ? (
                    <button type="button" className="btn btn-success mb-1">
                      Đơn đã giao
                    </button>
                  ) : null}
                  {item.status === 0 ? (
                    <button type="button" className="btn btn-danger mb-1">
                      Đơn đã hủy
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </form>
        <div className="row">
          <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
            <button
              id="update-cart"
              className="btn btn-success"
              type="button"
              name="sbm"
              onClick={() => navigate("/")}
            >
              Quay về trang chủ
            </button>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-12">
            <ul className="pagination mt-4 justify-content-end">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page - 1)}
                >
                  Trang trước
                </button>
              </li>

              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <li
                    key={pageNum}
                    className={`page-item ${pageNum === page ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  </li>
                );
              })}

              <li
                className={`page-item ${page === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page + 1)}
                >
                  Trang sau
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default Order;
