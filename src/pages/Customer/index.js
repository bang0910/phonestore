import { useState } from "react";
import { Link } from "react-router-dom";
import { updateCustomer } from "../../services/Api";
import { useDispatch, useSelector } from "react-redux";
import { updateSuccess } from "../../redux-setup/reducers/auth";
const Customer = () => {
  const login = useSelector(({ auth }) => auth.login);
  const { fullName, email, phone, address } = login.currentCustomer;
  const id = login?.currentCustomer._id;
  const [inputForm, setInputForm] = useState({
    fullName,
    email,
    phone,
    address,
  });
  const dispatch = useDispatch();
  const [alertUpdate, setAlertUpdate] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState(false);
  const changeInputCustomer = (e) => {
    const { name, value } = e.target;
    return setInputForm({ ...inputForm, [name]: value });
  };
  const clickUpdate = (e) => {
    e.preventDefault();
    updateCustomer(id, inputForm)
      .then(({ data }) => {
        setAlertUpdate(true);
        setStatusUpdate(true);
        return dispatch(updateSuccess(inputForm));
      })
      .catch((error) => {
        if (error.response.data === "phone exists") {
          setAlertUpdate(" Số điện thoại đã tồn tại!");
          setStatusUpdate(false);
        }
        return console.log(error);
      });
  };
  return (
    <>
      {/*	Register Form	*/}
      <div id="customer">
        {alertUpdate && !statusUpdate && (
          <div className="alert alert-danger text-center">
            Số điện thoại đã tồn tại!
          </div>
        )}
        {alertUpdate && statusUpdate && (
          <div className="alert alert-success text-center">
            Cập nhật thông tin thành công!
          </div>
        )}

        <h3 className="text-center">Thông tin tài khoản</h3>
        <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputCustomer}
                placeholder="Họ và tên (bắt buộc)"
                type="text"
                name="fullName"
                value={inputForm.fullName}
                className="form-control"
                required
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputCustomer}
                disabled
                placeholder="Mật khẩu (bắt buộc)"
                type="password"
                name="password"
                className="form-control"
                required
              />
            </div>
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputCustomer}
                disabled
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                value={email}
                required
              />
            </div>
            <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputCustomer}
                placeholder="Số điện thoại (bắt buộc)"
                type="text"
                name="phone"
                className="form-control"
                value={inputForm.phone}
                required
              />
            </div>
            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
              <input
                onChange={changeInputCustomer}
                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                type="text"
                name="address"
                className="form-control"
                value={inputForm.address}
                required
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a onClick={clickUpdate} href="#">
              <b>Cập nhật ngay</b>
            </a>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to={"/"}>
              <b>Quay về trang chủ</b>
            </Link>
          </div>
        </div>
      </div>
      {/*	End Register Form	*/}
    </>
  );
};
export default Customer;
