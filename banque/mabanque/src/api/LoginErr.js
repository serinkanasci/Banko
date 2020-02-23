import React, { Component } from 'react';
import Forget from '../components/Forget';
import Connexion from '../containers/Connexion';
import logo from '../img/logo_cfi.png';
import { login } from './UserFunctions';
import '../css/Login.css';

class LoginErr extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error_mdp:false,
      error_mdp2:0,
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleForget(){
    var uploadScreen=[];
    uploadScreen.push(<Forget appContext={this.props.appContext} key="forget"/>)
    this.props.appContext.setState({loginPage:uploadScreen})
  }

  handleConnexion(){
    var uploadScreen=[];
    uploadScreen.push(<Connexion appContext={this.props.appContext} key="connexion"/>)
    this.props.appContext.setState({loginPage:uploadScreen})
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({error_mdp2:this.state.error_mdp2+1});
    const user = {
      email: this.state.email,
      password: this.state.password
    }

    login(user).then(res => {
      if (res) {
        var uploadScreen=[];
        uploadScreen.push(<Connexion appContext={this.props.appContext} key="connexion"/>);
        this.props.appContext.setState({loginPage:uploadScreen});
      }
      else{
        this.setState({error_mdp:true});
      }
    })
  }

  updateState() {
        this.setState({ error_msg: true });
    }


  render() {
    return (
      <div id="page_connexion">
        <div id="design1">
          <div id="decor">
            <div><img id="logo_cfi" src={logo} alt="logo de CFI"/></div>
            <h2>SUIVI DE COMMANDE</h2>
          </div>
        </div>
        <div id="connexion">
          <div id="formulaire">
            <div id="titre">
              <h3>Identifiant</h3>
            </div>
            <form id="form_connexion" onSubmit={this.onSubmit}>
              <input
                id="form_email"
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                />
              <br/>
              <input
                id="form_mdp"
                type="password"
                placeholder="Mot de passe"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              <br/>
              <div id="this_button">
                <button id="form_button" type="submit"  /*onClick={(event) => this.handleConnexion()}*/>Se connecter</button>
                <p id="link_mdp"onClick={(event) => this.handleForget()}>Mot de passe oublié</p>
                <p id="incorrect">OK OK OK </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginErr;