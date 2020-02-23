import React, { Component } from 'react';
import '../css/Detail.css';
import { connect } from "react-redux";
import {  update_account , delete_account, alerte} from '../api/UserFunctions';
import Ini from './Ini';
import { changeSuiviPB, changeTitle } from "../actions/index";


function mapDispatchToProps(dispatch) {
  return {
    changeTitle: title_header => dispatch(changeTitle(title_header)),
    changeSuiviPB: suivi_pageb => dispatch(changeSuiviPB(suivi_pageb))

  };
}

const mapStateToProps = state => {
  return { title_header: state.title_header, account:state.account, banker2: state.banker2 };
};



class Detail extends Component {

  constructor(props){
    super(props);


    this.state = {
      iduser:this.props.acc.iduser,
      amount:this.props.acc.amount,
      accountlimit:this.props.acc.accountlimit,
      description:''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSuppr = this.handleSuppr.bind(this);
    this.handleAlerte = this.handleAlerte.bind(this);

    
  }

  onSubmit(e) {
    this.setState({essai:true});
    e.preventDefault();

    const account = {
      idaccount:this.props.acc.idaccount,
      amount:this.state.amount,
      accountlimit:this.state.accountlimit
    }

    update_account(account).then(res => {  
    })
    this.props.changeSuiviPB(<Ini/>);

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleLogout(event){
    //this.props.history.push("/");
    localStorage.setItem('user',false);
    window.location.href="http://localhost:3000/"
  }

  handleSuppr(event){
    const account = {
      idaccount:this.props.acc.idaccount
    }
    delete_account(account).then(res => {  
    })
    this.props.changeSuiviPB(<Ini/>);
  }


  handleAlerte(event){
    const alertes = {
      iduser:this.props.acc.iduser,
      description:this.state.description+" , votre conseiller : "+this.props.banker2.lastname.toUpperCase()+" "+this.props.banker2.firstname
    }
    alerte(alertes).then(res => {
      if (res) {
        window.location.href= 'http://localhost:3000/banker';
      }
    });
  }

  render() {
    return (
	    <div className="detail">
        <form id="form_profile" onSubmit={this.onSubmit}>
          <input
            id="form_lname_reg"
            type="number"
            placeholder="Montant"
            name="amount"
            defaultValue={this.state.amount}
            onChange={this.onChange}
          />
          <br/>
          <input
            id="form_email_reg"
            type="number"
            placeholder="Limite"
            name="accountlimit"
            defaultValue={this.state.accountlimit}
            onChange={this.onChange}
          />
          <br/>
          <br/>
          <div id="this_button_d">
            <button id="form_buttonp" type="submit"  /*onClick={(event) => this.handleConnexion()}*/>Sauvegarder</button>
            <button id="form_buttonp"  onClick={(event) => this.handleSuppr()}>Supprimer</button>
          </div>
        </form>
        <input
            id="form_descr_reg"
            type="text"
            placeholder="Message d'alerte"
            name="description"
            defaultValue={this.state.description}
            onChange={this.onChange}
        />
        <br/>
        <button id="form_buttona"  onClick={(event) => this.handleAlerte()}>Alerte</button>
		  </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);