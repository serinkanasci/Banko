import React, { Component } from 'react';
import '../css/Profile.css';
import { connect } from "react-redux";
import IniU from './IniU';
import { update_user, update_user2 } from '../api/UserFunctions';
import { changeCo , changeTitle } from "../actions/index";

const mapStateToProps = state => {
  return {  userp:state.userp };
};

function mapDispatchToProps(dispatch) {
  return {
    changeCo: cont_connexion => dispatch(changeCo(cont_connexion)),
    changeTitle: title_header => dispatch(changeTitle(title_header))
  };
}

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstname:this.props.acc.firstname,
      lastname:this.props.acc.lastname,
      mailadress:this.props.acc.mailadress,
      phonenumber:this.props.userp.phonenumber,
      adress:this.props.acc.adress,
      passworduser:''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    this.setState({essai:true});
    e.preventDefault();
    let user=[];
    if(this.state.passworduser.length===0){
      user = {
        iduser:this.props.user.iduser,
        firstname:this.state.firstname,
        lastname:this.state.lastname,
        mailadress:this.state.mailadress,
        phonenumber:this.state.phonenumber,
        adress:this.state.adress
      }
      update_user2(user).then(res => {  
      });
    }
    else{
      user = {
        iduser:this.props.user.iduser,
        firstname:this.state.firstname,
        lastname:this.state.lastname,
        mailadress:this.state.mailadress,
        phonenumber:this.state.phonenumber,
        adress:this.state.adress,
        passworduser:this.state.passworduser
      }
      update_user(user).then(res => {  
      });
    }
    this.props.changeCo(<IniU/>);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleLogout(event){
    //this.props.history.push("/");
    localStorage.setItem('user',false);
    window.location.href="http://localhost:3000/"
  }

  render() {
    return (
	    <div className="solde">
        <form id="form_profile" onSubmit={this.onSubmit}>
          <input
            id="form_name_reg"
            type="text"
            placeholder="Prénom"
            name="firstname"
            defaultValue={this.state.firstname}
            onChange={this.onChange}
          />
          <br/>
          <input
            id="form_lname_reg"
            type="text"
            placeholder="Nom de famille"
            name="lastname"
            defaultValue={this.state.lastname}
            onChange={this.onChange}
            />
          <br/>
          <input
            id="form_email_reg"
            type="email"
            placeholder="Email"
            name="mailadress"
            defaultValue={this.state.mailadress}
            onChange={this.onChange}
            />
          <br/>
          <input
            id="form_numero_reg"
            type="number"
            placeholder="Numéro de téléphone"
            name="phonenumber"
            defaultValue={this.state.phonenumber}
            onChange={this.onChange}
            />
          <br/>
          <input
            id="form_adresse_reg"
            type="text"
            placeholder="Adresse"
            name="adress"
            defaultValue={this.state.adress}
            onChange={this.onChange}
            />
          <br/>
          <input
            id="form_mdp_reg"
            type="password"
            placeholder="Mot de passe (Si vide, il ne changera pas)"
            name="passworduser"
            defaultValue={this.state.passworduser}
            onChange={this.onChange}
          />
          <br/>
          <div id="this_button">
            <button id="form_buttonp" type="submit"  /*onClick={(event) => this.handleConnexion()}*/>Sauvegarder</button>
          </div>
        </form>
		  </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);