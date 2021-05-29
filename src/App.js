
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
import { Web3 } from "moralis/lib/browser/Parse";
import { EthereumEvents } from "moralis/lib/browser/MoralisWeb3";

Moralis.initialize("DQ8U9WF2H28hQrmXxLPo7hs4OGnJGZgcrvlgdjFk");
Moralis.serverURL = 'https://zd6oyblshpkc.Moralis.io:2053/server'

const initialUser = Moralis.User.current();
const contractAddress = '0x908e54F21c907AA493F81DB694e3eF6316454681';

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

  const depositERC = async () => {
    let amount = document.getElementById("user-deposit").value;
    alert(amount);
    window.web3 = await Moralis.Web3.enable();
    let contractInstance = new Web3.eth.Contract(window.abi, contractAddress)
    contractInstance.methods.deposit({value: amount, from: EthereumEvents.selectedAddress})
    .on('receipt', function(receipt){
      console.log(receipt);
    });
  }

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
                <button onClick={onLogout}>Logout</button>;
                <input type='number' id='user-deposit'></input>
                <button onClick={depositERC}>Enter Deposit</button>
              </div>
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
