import React from "react";
import Moralis from 'moralis';

Moralis.initialize("DQ8U9WF2H28hQrmXxLPo7hs4OGnJGZgcrvlgdjFk");
Moralis.serverURL = 'https://zd6oyblshpkc.Moralis.io:2053/server'

const initialUser = Moralis.User.current();

class MetaMaskLogin extends React.Component {

  constructor(props) {
   super(props);
   this.state = {user: initialUser};
   this.onLogin = this.onLogin.bind(this);
   this.onLogout = this.onLogout.bind(this);
  }

  async onLogin() {
    var authUser = await Moralis.authenticate();
    this.setState({user: authUser});
  }

  onLogout() {
    Moralis.User.logOut();
    this.setState({user: null});
  }

  render () {
    if (this.state.user) {
      return <button onClick={this.onLogout}>Logout</button>;
    }
    
    return <button onClick={this.onLogin}>Login</button>;
  }

}

export default MetaMaskLogin;
