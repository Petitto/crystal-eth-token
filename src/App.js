
import React, { useState } from "react";

// core components
// import AdminNavbar from "./components/Navbars/AdminNavbar";
// import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import FixedPlugin from "./components/FixedPlugin/FixedPlugin";
import routes from "./routes.js";

import logo from "./assets/img/CrystalEthLogo.jpeg";
import { BackgroundColorContext } from "./contexts/BackgroundColorContext";

import Moralis from 'moralis';

Moralis.initialize("DQ8U9WF2H28hQrmXxLPo7hs4OGnJGZgcrvlgdjFk");
Moralis.serverURL = 'https://zd6oyblshpkc.Moralis.io:2053/server'

const initialUser = Moralis.User.current();

function App() {
  const [user, setUser] = useState(initialUser);
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );

  const onLogin = async () => {
    const user = await Moralis.authenticate();
    setUser(user);
  };
  const onLogout = () => {
    Moralis.User.logOut();
    setUser(null);
  };

  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };

  if (user) {
    return(
      <BackgroundColorContext.Consumer>
        {({ color, changeColor }) => (
          <React.Fragment>
            <div className="wrapper">
              { <Sidebar
                routes={routes}
                logo={{
                  outterLink: "https://www.creative-tim.com/",
                  text: "Crystal Eth",
                  imgSrc: logo,
                }}
                toggleSidebar={toggleSidebar}
              /> }
              <div className="main-panel" ref={mainPanelRef} data={color}>
                {/* <AdminNavbar
                  brandText={getBrandText(location.pathname)}
                  toggleSidebar={toggleSidebar}
                  sidebarOpened={sidebarOpened}
                /> */}
                {/* <Switch>
                  {getRoutes(routes)}
                  <Redirect from="*" to="/admin/dashboard" />
                </Switch> */}
                {
                  // we don't want the Footer to be rendered on map page
                // location.pathname === "/admin/maps" ? null : <Footer fluid />
                }
              </div>
              <button onClick={onLogout}>Logout</button>;
            </div>
            <FixedPlugin bgColor={color} handleBgClick={changeColor} />
          </React.Fragment>
        )}
    </BackgroundColorContext.Consumer>
    );
  }
  return <button onClick={onLogin}>Login</button>;
}

export default App;
