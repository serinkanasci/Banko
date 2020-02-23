import React, { Component } from 'react';
import '../css/Detail.css';
import { connect } from "react-redux";
import { update_banker, delete_banker} from '../api/UserFunctions';
import { changeCoA, changeTitle } from "../actions/index";
import IniA from './IniA';

const mapStateToProps = state => {
  return { title_header: state.title_header, account: state.account };
};

function mapDispatchToProps(dispatch) {
  return {
    changeTitle: title_header => dispatch(changeTitle(title_header)),
    changeCoA: suivi_pagea=> dispatch(changeCoA(suivi_pagea))
  };
}

class DetailA extends Component {
  constructor(props){
    super(props);
    this.state = {
      userid:this.props.acc.userid,
      firstname:this.props.acc.firstname,
      lastname:this.props.acc.lastname,
      mailadress:this.props.acc.mailadress,
      passwordbanker:''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

onSubmit(e) {
    this.setState({essai:true});
    e.preventDefault();
    let banker=[];
    if(this.state.passwordbanker.length===0){
      banker = {
        bankerid:this.props.acc.bankerid,
        userid:this.state.userid,
        firstname:this.state.firstname,
        lastname:this.state.lastname,
        mailadress:this.state.mailadress
      }
    }
    else{
      banker = {
        bankerid:this.props.acc.bankerid,
        userid:this.state.userid,
        firstname:this.state.firstname,
        lastname:this.state.lastname,
        mailadress:this.state.mailadress,
        passwordbanker:this.state.passwordbanker
      }
    }
    update_banker(banker).then(res => {  
    })
    this.props.changeCoA(<IniA/>);
  }

  handleLogout(event){
    //this.props.history.push("/");
    localStorage.setItem('user',false);
    window.location.href="http://localhost:3000/"

  }


  handleSuppr(event){
    const banker = {
      bankerid:this.props.acc.bankerid
    }
    delete_banker(banker).then(res => {  
    })
    this.props.changeCoA(<IniA/>);
  }

  render() {
    return (
	    <div className="detail">
        <form id="form_profile" onSubmit={this.onSubmit}>
          <input
            id="form_numero_reg"
            type="number"
            placeholder="Numéro client"
            name="userid"
            defaultValue={this.state.userid}
            onChange={this.onChange}
          />
          <br/>
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
            id="form_mdp_reg"
            type="password"
            placeholder="Mot de passe (Si vide, il ne changera pas)"
            name="passwordbanker"
            defaultValue={this.state.passwordbanker}
            onChange={this.onChange}
          />
          <br/>
          <br/>
          <div id="this_button_d">
            <button id="form_buttonp" type="submit"  /*onClick={(event) => this.handleConnexion()}*/>Sauvegarder</button>
            <button id="form_buttonp"  onClick={(event) => this.handleSuppr()}>Supprimer</button>
          </div>
        </form>
		  </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailA);