import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const checkNotLogged = (OriginComponent) => {
  const ExtendsComponent = () => {
    const login = useSelector(({ auth }) => auth.login);
    return login.loggedIn ? <OriginComponent /> : <Navigate to={"/"} />;
  };
  return ExtendsComponent;
};

export default checkNotLogged;
