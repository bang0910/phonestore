import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const checkLogged = (OriginComponent) => {
  const ExtendsComponent = () => {
    const login = useSelector(({ auth }) => auth.login);
    return login.loggedIn ? <Navigate to={"/"} /> : <OriginComponent />;
  };
  return ExtendsComponent;
};
export default checkLogged;
