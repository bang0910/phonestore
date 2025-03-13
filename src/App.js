import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./shared/components/Layout/Header";
import Menu from "./shared/components/Layout/Menu";
import Slider from "./shared/components/Layout/Slider";
import Sidebar from "./shared/components/Layout/Sidebar";
import Footer from "./shared/components/Layout/Footer";
import { store } from "./redux-setup/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux-setup/store";
import routers from "./routers";
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
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
                    {routers.map((item, index) => (
                      <Route
                        key={index}
                        path={item.path}
                        element={<item.element />}
                      />
                    ))}
                  </Routes>
                </div>
                <Sidebar />
              </div>
            </div>
          </div>
          <Footer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};
export default App;
