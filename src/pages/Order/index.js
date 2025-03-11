const Login = () => {
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
          <div className="cart-item row alert-success">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
              <h4>
                Đơn hàng đã mua vào ngày:{" "}
                <span className="text-secondary">06-05-2024 hồi 12:30:59</span>
              </h4>
              <p>Mã Đơn (MĐ): 614717c9271a0400ee8ec9e8</p>
            </div>
            <div className="cart-price col-lg-2 col-md-2 col-sm-12">
              <b>32.990.000đ</b>
            </div>
            <div className="cart-quantity col-lg-3 col-md-3 col-sm-12">
              <button type="button" className="btn btn-outline-dark mb-1">
                Chi tiết đơn hàng
              </button>
              <button type="button" className="btn btn-success mb-1">
                Đơn đã giao
              </button>
            </div>
          </div>
          <div className="cart-item row alert-success">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
              <h4>
                Đơn hàng đã mua vào ngày:{" "}
                <span className="text-secondary">06-05-2024 hồi 12:30:59</span>
              </h4>
              <p>Mã Đơn (MĐ): 614717c9271a0400ee8ec9e8</p>
            </div>
            <div className="cart-price col-lg-2 col-md-2 col-sm-12">
              <b>32.990.000đ</b>
            </div>
            <div className="cart-quantity col-lg-3 col-md-3 col-sm-12">
              <button type="button" className="btn btn-outline-dark mb-1">
                Chi tiết đơn hàng
              </button>
              <button type="button" className="btn btn-success mb-1">
                Đơn đã giao
              </button>
            </div>
          </div>
          <div className="cart-item row alert-danger">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
              <h4>
                Đơn hàng đã mua vào ngày:{" "}
                <span className="text-secondary">06-05-2024 hồi 12:30:59</span>
              </h4>
              <p>Mã Đơn (MĐ): 614717c9271a0400ee8ec9e8</p>
            </div>
            <div className="cart-price col-lg-2 col-md-2 col-sm-12">
              <b>32.990.000đ</b>
            </div>
            <div className="cart-quantity col-lg-3 col-md-3 col-sm-12">
              <button type="button" className="btn btn-outline-dark mb-1">
                Chi tiết đơn hàng
              </button>
              <button type="button" className="btn btn-danger mb-1">
                Đơn đã huỷ
              </button>
            </div>
          </div>
          <div className="cart-item row alert-success">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
              <h4>
                Đơn hàng đã mua vào ngày:{" "}
                <span className="text-secondary">06-05-2024 hồi 12:30:59</span>
              </h4>
              <p>Mã Đơn (MĐ): 614717c9271a0400ee8ec9e8</p>
            </div>
            <div className="cart-price col-lg-2 col-md-2 col-sm-12">
              <b>32.990.000đ</b>
            </div>
            <div className="cart-quantity col-lg-3 col-md-3 col-sm-12">
              <button type="button" className="btn btn-outline-dark mb-1">
                Chi tiết đơn hàng
              </button>
              <button type="button" className="btn btn-success mb-1">
                Đơn đã giao
              </button>
            </div>
          </div>
          <div className="cart-item row">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
              <h4>
                Đơn hàng đã mua vào ngày:{" "}
                <span className="text-secondary">06-05-2024 hồi 12:30:59</span>
              </h4>
              <p>Mã Đơn (MĐ): 614717c9271a0400ee8ec9e8</p>
            </div>
            <div className="cart-price col-lg-2 col-md-2 col-sm-12">
              <b>32.990.000đ</b>
            </div>
            <div className="cart-quantity col-lg-3 col-md-3 col-sm-12">
              <button type="button" className="btn btn-outline-dark mb-1">
                Chi tiết đơn hàng
              </button>
              <button type="button" className="btn btn-outline-danger mb-1">
                Huỷ đơn
              </button>
              <button type="button" className="btn btn-outline-success mb-1">
                Đơn đang giao
              </button>
            </div>
          </div>
          <div className="cart-item row">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
              <h4>
                Đơn hàng đã mua vào ngày:{" "}
                <span className="text-secondary">06-05-2024 hồi 12:30:59</span>
              </h4>
              <p>Mã Đơn (MĐ): 614717c9271a0400ee8ec9e8</p>
            </div>
            <div className="cart-price col-lg-2 col-md-2 col-sm-12">
              <b>32.990.000đ</b>
            </div>
            <div className="cart-quantity col-lg-3 col-md-3 col-sm-12">
              <button type="button" className="btn btn-outline-dark mb-1">
                Chi tiết đơn hàng
              </button>
              <button type="button" className="btn btn-outline-danger mb-1">
                Huỷ đơn
              </button>
              <button type="button" className="btn btn-outline-success mb-1">
                Đơn đang giao
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
