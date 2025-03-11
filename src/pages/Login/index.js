import { useState } from "react";
import { loginCustomer } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux-setup/reducers/auth";

const Login = () => {
  const [inputsLogin, setInputLogin] = useState({});
  const [errorLogin, setErrorLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeFormInput = (e) => {
    const { name, value } = e.target;
    return setInputLogin({ ...inputsLogin, [name]: value });
  };
  const clickLogin = (e) => {
    e.preventDefault();
    loginCustomer(inputsLogin)
      .then(({ data }) => {
        dispatch(
          loginSuccess({
            ...data.customer,
            accesstoken: data.accesstoken,
          })
        );
        return navigate("/");
      })
      .catch((error) => {
        if (error.response.data === "email not valid")
          return setErrorLogin("Email không hợp lệ");
        if (error.response.data === "password not valid")
          return setErrorLogin("Password không hợp lệ");
        return console.log(error);
      });
  };

  return (
    <>
      {/*	Login Form	*/}
      <div id="customer">
        {errorLogin && (
          <div className="alert alert-danger text-center">{errorLogin}</div>
        )}
        <h3 className="text-center">Đăng nhập</h3>
        <form method="post">
          <div className="row">
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeFormInput}
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeFormInput}
                placeholder="Mật khẩu (bắt buộc)"
                type="text"
                name="password"
                className="form-control"
                required
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a onClick={clickLogin} href="#">
              <b>Đăng nhập ngay</b>
            </a>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to="/">
              <b>Quay về trang chủ</b>
            </Link>
          </div>
        </div>
      </div>
      {/*	End Login Form	*/}
    </>
  );
};
export default Login;
