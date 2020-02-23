import React, { Component } from 'react';
import '../css/Create.css';
import { connect } from "react-redux";
import { register_banker } from '../api/UserFunctions';
import { changeCoA, changeTitle } from "../actions/index";
import IniA from './IniA';

const mapStateToProps = state => {
  return { title_header: state.title_header };
};

function mapDispatchToProps(dispatch) {
  return {
    changeTitle: title_header => dispatch(changeTitle(title_header)),
    changeCoA: suivi_pagea=> dispatch(changeCoA(suivi_pagea))
  };
}

class CreateA extends Component {
  constructor(props){
    super(props);
    this.state = {
      userid:'',
      firstname:'',
      lastname:'',
      mailadress:'',
      passwordbanker:''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    this.setState({essai:true});
    e.preventDefault();

    const banker = {
      userid:this.state.userid,
      firstname:this.state.firstname,
      lastname:this.state.lastname,
      mailadress: this.state.mailadress,
      passwordbanker: this.state.passwordbanker
    }

    register_banker(banker).then(res => {
      if (res) {
        this.props.changeCoA(<IniA/>);
      }
    })
  }

  handleLogout(event){
    //this.props.history.push("/");
    localStorage.setItem('user',false);
    window.location.href="http://localhost:3000/"
  }

  render() {
    return (
	    <div className="create-css">
        <form id="form_create" onSubmit={this.onSubmit}>
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
          placeholder="Mot de passe"
          name="passwordbanker"
          defaultValue={this.state.passwordbanker}
          onChange={this.onChange}
        />
        <br/>
        <br/>
        <div id="this_button">
          <button id="form_buttonp" type="submit"  /*onClick={(event) => this.handleConnexion()}*/>Sauvegarder</button>
        </div>
        </form>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateA);