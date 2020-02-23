import React, { Component } from 'react';
import '../css/App.css';
import Login from '../components/Login';
class App extends Component {

  constructor(props){
    super(props);
    this.state={
      loginPage:[]
    }
  }
  componentDidMount(){
    var loginPage =[];
    loginPage.push(<Login appContext={this} key={"login"} />);
    this.setState({
      loginPage:loginPage
    })
  }

  render() {
    return (
      <div className="App" >
        {this.state.loginPage}
      </div>
    );
  }
}

export default App;