import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import Search from "./pages/Search";
import Success from "./pages/Success";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Header from "./shared/components/Layout/Header";
import Menu from "./shared/components/Layout/Menu";
import Slider from "./shared/components/Layout/Slider";
import Sidebar from "./shared/components/Layout/Sidebar";
import Footer from "./shared/components/Layout/Footer";
import store from "./redux-setup/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux-setup/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <>
            <Header />
            <div id="body">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <Menu />
                  </div>
                </div>
                <div class="row">
                  <div id="main" class="col-lg-8 col-md-12 col-sm-12">
                    <Slider />

                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/Category/:id" element={<Category />} />
                      <Route
                        path="/ProductDetails/:id"
                        element={<ProductDetails />}
                      />
                      <Route path="/Search" element={<Search />} />
                      <Route path="/Success" element={<Success />} />
                      <Route path="/Cart" element={<Cart />} />
                      <Route path="/Login" element={<Login />} />
                      <Route path="/Register" element={<Register />} />
                      <Route path="/*" element={<NotFound />} />
                    </Routes>
                  </div>

                  <Sidebar />
                </div>
              </div>
            </div>
            <Footer />
          </>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};
export default App;
