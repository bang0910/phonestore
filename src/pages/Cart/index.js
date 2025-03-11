import { useDispatch, useSelector } from "react-redux";
import { getImageProduct, formatPrice } from "../../shared/ultils";
import {
  updateItemCart,
  deleteItemCart,
  resetCart,
} from "../../redux-setup/reducers/cart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postOrder } from "../../services/Api";
const Cart = () => {
  const [inputsCustomer, setInputCustomer] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(({ cart }) => cart.items);
  const newItems = items.map((item) => ({
    prd_id: item._id,
    price: item.price,
    qty: item.qty,
  }));
  const changeInputsCustomer = (e) => {
    const { name, value } = e.target;
    return setInputCustomer({ ...inputsCustomer, [name]: value });
  };
  const clickOrder = (e) => {
    e.preventDefault();
    postOrder({
      ...inputsCustomer,
      customer_id: "61471808271a0400ee8f27c9",
      items: newItems,
    })
      .then(() => {
        dispatch(resetCart());
        return navigate("/Success");
      })
      .catch((error) => console.log(error));
  };

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
                  <b>{formatPrice(item?.qty * item?.price)}đ</b>
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
              <b>88.970.000đ</b>
            </div>
          </div>
        </form>
      </div>
      {/*	End Cart	*/}
      <div id="customer">
        <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
              <input
                onChange={changeInputsCustomer}
                placeholder="Họ và tên (bắt buộc)"
                type="text"
                name="fullName"
                className="form-control"
                required
              />
            </div>
            <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
              <input
                onChange={changeInputsCustomer}
                placeholder="Số điện thoại (bắt buộc)"
                type="text"
                name="phone"
                className="form-control"
                required
              />
            </div>
            <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
              <input
                onChange={changeInputsCustomer}
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
              />
            </div>
            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
              <input
                onChange={changeInputsCustomer}
                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                type="text"
                name="address"
                className="form-control"
                required
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a onClick={clickOrder} href="#">
              <b>Mua ngay</b>
              <span>Giao hàng tận nơi siêu tốc</span>
            </a>
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
