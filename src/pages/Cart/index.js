import { useDispatch, useSelector } from "react-redux";
import { getImageProduct, formatPrice } from "../../shared/ultils";
import {
  updateItemCart,
  deleteItemCart,
  resetCart,
} from "../../redux-setup/reducers/cart";
import { Link, useNavigate } from "react-router-dom";
import { order } from "../../services/Api";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //cart
  const items = useSelector(({ cart }) => cart.items);
  //login
  const login = useSelector(({ auth }) => auth.login);
  const newItems = items.map((item) => ({
    prd_id: item._id,
    price: item.price,
    qty: item.qty,
  }));
  const clickOrder = (e) => {
    e.preventDefault();
    const { _id, fullName, email, phone, address } = login.currentCustomer;
    order({
      fullName,
      email,
      phone,
      address,
      customer_id: _id,
      items: newItems,
    })
      .then(() => {
        dispatch(resetCart());
        return navigate("/Success");
      })
      .catch((error) => console.log(error));
  };
  // update qty
  const changeQty = (e, id) => {
    const value = Number(e.target.value);
    if (value === 0) {
      const isConfirm = window.confirm("Ban muon xoa san pham khong");
      return isConfirm
        ? dispatch(
            deleteItemCart({
              _id: id,
            })
          )
        : false;
    }
    dispatch(
      updateItemCart({
        _id: id,
        qty: value,
      })
    );
  };
  // delete item
  const clickDelete = (e, id) => {
    e.preventDefault();
    const isConfirm = window.confirm("Ban muon xoa san pham khong");
    return isConfirm
      ? dispatch(
          deleteItemCart({
            _id: id,
          })
        )
      : false;
  };
  const totalPrice = items?.reduce((total, item) => {
    return (total += item?.qty * item?.price);
  }, 0);
  return (
    <>
      {/*	Cart	*/}
      <div id="my-cart">
        <div className="row">
          <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
            Thông tin sản phẩm
          </div>
          <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
            Tùy chọn
          </div>
          <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
        </div>
        <form method="post">
          {items.map((item) => {
            return (
              <div className="cart-item row">
                <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                  <img src={getImageProduct(item?.image)} />
                  <h4>{item?.name}</h4>
                </div>
                <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                  <input
                    onChange={(e) => changeQty(e, item._id)}
                    type="number"
                    id="quantity"
                    className="form-control form-blue quantity"
                    value={item?.qty}
                  />
                </div>
                <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                  <b>{formatPrice(item?.qty * item?.price)}</b>
                  <a onClick={(e) => clickDelete(e, item._id)}>Xóa</a>
                </div>
              </div>
            );
          })}

          <div className="row">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12" />
            <div className="cart-total col-lg-2 col-md-2 col-sm-12">
              <b>Tổng cộng:</b>
            </div>
            <div className="cart-price col-lg-3 col-md-3 col-sm-12">
              <b>{formatPrice(totalPrice)}</b>
            </div>
          </div>
        </form>
      </div>
      {/*	End Cart	*/}
      <div id="customer">
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            {login.loggedIn ? (
              <a onClick={clickOrder} href="#">
                <b>Mua ngay</b>
                <span>Giao hàng tận nơi siêu tốc</span>
              </a>
            ) : (
              <Link to="/Login">
                <b>Đăng nhập</b>
                <span>Đăng nhập để mua hàng</span>
              </Link>
            )}
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="#">
              <b>Trả góp Online</b>
              <span>Vui lòng call (+84) 0988 550 553</span>
            </a>
          </div>
        </div>
      </div>
      {/*	End Customer Info	*/}
    </>
  );
};
export default Cart;
