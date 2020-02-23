import React, { Component } from 'react';
import Connexion from '../containers/Connexion';
import { login, register, login_banker, profile_user } from '../api/UserFunctions';
import '../css/Login.css';
import { connect } from "react-redux";
import { changeUserP, changeTitle,} from "../actions/index";
import { withRouter } from 'react-router-dom';

function mapDispatchToProps(dispatch) {
  return {
    changeTitle: title_header => dispatch(changeTitle(title_header)),
    changeUserP:userp => dispatch(changeUserP(userp))
  };
}

const mapStateToProps = state => {
  return { suivi_status: state.suivi_status };
};

class Login extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
      reg_name:'',
      reg_lname:'',
      reg_email:'',
      reg_adr:'',
      reg_phone:'',
      reg_mdp:'',
      reg_mdp2:'',
      email: '',
      password: '',
      ok:0,
      style_forget:{display:"none"},
      style_incorrect:{display:"none"},
      style_incorrect2:{display:"none"},
      style_incorrect3:{display:"none"},
      style_banker:{"backgroundColor":"grey"},
      style_user:{"backgroundColor":"white"},
      inscr:{display:"inline"},
      page:0,
      register:false,
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleForget(){
    this.setState({style_forget:{display:"block"}});
    this.setState({page:true});
  }
  handleDiv(){
    this.setState({style_banker:{"backgroundColor":"white"}});
    this.setState({style_user:{"backgroundColor":"grey"}});
    this.setState({inscr:{"display":"none"}});
    this.setState({page:1});
  }
  handleDiv2(){
    this.setState({style_banker:{"backgroundColor":"grey"}});
    this.setState({style_user:{"backgroundColor":"white"}});
    this.setState({inscr:{"display":"inline"}});
    this.setState({page:0});
  }
  handleIns(){
    this.setState({register:true});
  }
  handlePage(event){
    const target = event.target;
    if (target.id !== 'modal') {
    return ; // child was clicked, ignore onClick
    }
    this.setState({style_forget:{display:"none"}});
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
    this.setState({essai:true});
    e.preventDefault();
    const user = {
      mailadress: this.state.email,
      passworduser: this.state.password,
      ok:this.state.ok
    }
    const banker = {
      mailadress: this.state.email,
      passwordbanker: this.state.password,
      ok:this.state.ok
    }
    const reg = {
      firstname:this.state.reg_name,
      lastname:this.state.reg_lname,
      adress:this.state.reg_adr,
      phonenumber:this.state.reg_phone,
      mailadress: this.state.reg_email,
      passworduser: this.state.reg_mdp
    }
    if(this.state.page === 0){
      if(this.state.register){
        if(this.state.reg_phone.length >= 9 && this.state.reg_phone.length <= 10  &&  (this.state.reg_mdp.localeCompare(this.state.reg_mdp2) === 0 )){
          register(reg).then(res => {
            if (res) {
              window.location.href= 'http://localhost:3000/';
            }
          });
        }
      }
      else{
        login(user).then(res => {
          profile_user().then(res2 => { 
            localStorage.setItem('userp',JSON.stringify(res2));
            this.props.changeUserP(res2);
          });
          if (res) {
            localStorage.setItem('user',true);
            window.location.href= 'http://localhost:3000/users';
          }
          else{
            if(user.ok === 400){
              this.setState({style_incorrect:{display:"block"}});
              this.setState({style_incorrect3:{display:"none"}});
              this.setState({style_incorrect2:{display:"none"}});
            }
            if(user.ok === 401){
              this.setState({style_incorrect2:{display:"block"}});
              this.setState({style_incorrect:{display:"none"}});
              this.setState({style_incorrect3:{display:"none"}});
            }
            if(user.ok === 429){
              this.setState({style_incorrect3:{display:"block"}});
              this.setState({style_incorrect:{display:"none"}});
              this.setState({style_incorrect2:{display:"none"}});
            }
          }
        })
      }
    }
    else{
      login_banker(banker).then(res => {
        if (res) {
          localStorage.setItem('user',true);
          window.location.href= 'http://localhost:3000/banker';
        }
        else{
          if(banker.ok === 400){
            this.setState({style_incorrect:{display:"block"}});
            this.setState({style_incorrect3:{display:"none"}});
            this.setState({style_incorrect2:{display:"none"}});

          }
          if(banker.ok === 401){
            this.setState({style_incorrect2:{display:"block"}});
            this.setState({style_incorrect:{display:"none"}});
            this.setState({style_incorrect3:{display:"none"}});

          }
          if(banker.ok === 429){
            this.setState({style_incorrect3:{display:"block"}});
            this.setState({style_incorrect:{display:"none"}});
            this.setState({style_incorrect2:{display:"none"}});
          }
        }
      });
    }
  }

  updateState() {
    this.setState({ error_msg: true });
  }
  render() {
    if(this.state.register){
      return (
        <div id="page_connexion">
          <div id="design1">
          <p id="banko_title">BANKO</p>
          </div>
          <div id="connexion">
            <div id="formulaire2">
            <div id="titre">
                <h3>Inscription</h3>
              </div>
              <form id="form_connexion" onSubmit={this.onSubmit}>
              <input
                  id="form_name_reg"
                  type="text"
                  placeholder="Prénom"
                  name="reg_name"
                  defaultValue={this.state.reg_name}
                  onChange={this.onChange}
                  />
                <br/>
                <input
                  id="form_lname_reg"
                  type="text"
                  placeholder="Nom de famille"
                  name="reg_lname"
                  defaultValue={this.state.reg_lname}
                  onChange={this.onChange}
                  />
                <br/>
                <input
                  id="form_email_reg"
                  type="email"
                  placeholder="Email"
                  name="reg_email"
                  defaultValue={this.state.reg_email}
                  onChange={this.onChange}
                  />
                <br/>
                <input
                  id="form_numero_reg"
                  type="number"
                  placeholder="Numéro de téléphone"
                  name="reg_phone"
                  defaultValue={this.state.reg_phone}
                  onChange={this.onChange}
                  />
                <br/>
                <input
                  id="form_adresse_reg"
                  type="text"
                  placeholder="Adresse"
                  name="reg_adr"
                  defaultValue={this.state.reg_adr}
                  onChange={this.onChange}
                  />
                <br/>
                <input
                  id="form_mdp_reg"
                  type="password"
                  placeholder="Mot de passe"
                  name="reg_mdp"
                  defaultValue={this.state.reg_mdp}
                  onChange={this.onChange}
                />
                 <br/>
                <input
                  id="form_fmdp_reg"
                  type="password"
                  placeholder="Confirmer mot de passe"
                  name="reg_mdp2"
                  defaultValue={this.state.reg_mdp2}
                  onChange={this.onChange}
                />
                <br/>
                <div id="this_button">
                  <button id="form_button3" style={this.state.inscr}type="submit" onClick={(event) => this.handleIns()}  /*onClick={(event) => this.handleConnexion()}*/>S'inscrire</button>
                  <p id="incorrect" style={this.state.style_incorrect}>Email incorrect</p>
                  <p id="incorrect2" style={this.state.style_incorrect2}>Mot de passe incorrect</p>
                  <p id="incorrect3" style={this.state.style_incorrect3}>Trop de tentatives, veuillez réessayer dans 5 minutes</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
    else{
      return (
        <div id="page_connexion">
          <div id="design1">
          <p id="banko_title">BANKO</p>
        </div>
        <div id="connexion"><div id = "contener" ><div id="banker" style={this.state.style_banker} onClick={(event) => this.handleDiv()}><p id="bankerTitle">Banquier</p></div>
        <div id="user" style={this.state.style_user} onClick={(event) => this.handleDiv2()}><p id="userTitle">Utilisateur</p></div></div>
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
                  <p id="incorrect" style={this.state.style_incorrect}>Email incorrecte</p>
                  <p id="incorrect2" style={this.state.style_incorrect2}>Mot de passe incorrecte</p>
                  <p id="incorrect3" style={this.state.style_incorrect3}>Trop de tentatives, veuillez réessayer dans 5 minutes</p>
                </div>
                <button id="form_button2" style={this.state.inscr} type="submit" onClick={(event) => this.handleIns()}  /*onClick={(event) => this.handleConnexion()}*/>S'inscrire</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));