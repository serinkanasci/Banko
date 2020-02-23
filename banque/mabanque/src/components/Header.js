import React, { Component } from 'react';
import '../css/Header.css';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { changeCo, changeTitle} from "../actions/index";
import { profile_user} from '../api/UserFunctions';
import logo_profil from '../img/persona.png';
import logout from '../img/logout.jpg';
import Profile from './Profile';

const mapStateToProps = state => {
  return { title_header: state.title_header, nheader: state.nheader , userp: state.userp};
};

function mapDispatchToProps(dispatch) {
  return {
    changeCo: cont_connexion => dispatch(changeCo(cont_connexion)),
    changeTitle: title_header => dispatch(changeTitle(title_header))
  };
}

class Header extends Component {

  constructor(props){
    super(props);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    
  }

  handleLogout(event){
    localStorage.setItem('user',false);
    window.location.href="http://localhost:3000/"
  }

  handleProfile(event){
    profile_user().then(res2 => { 
      this.props.changeCo(<Profile acc={res2}/>);
      this.props.changeTitle( '' );
    });
  }

  render() {
    return (
	    <div className="header">
		  	<div id="img_proviso"><p id="banko">Banko</p> </div>
		  	<div id="proviso_title">{this.props.title_header}</div>
		  	<p id="proviso_nom"  ><img id="logout" src={logout} onClick={(event) => this.handleLogout(event)} alt="Deconnexion"/><img id="logo_profil" onClick={(event) => this.handleProfile(event)} src={logo_profil} alt="Profil"/>{this.props.nheader}</p>
		  </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));