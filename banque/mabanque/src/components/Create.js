import React, { Component } from 'react';
import '../css/Create.css';
import { connect } from "react-redux";
import { create_account } from '../api/UserFunctions';
import Ini from './Ini';
import { changeAccounts, changeSuiviP, changeTitle, changeSuiviPB} from "../actions/index";

const mapStateToProps = state => {
  return { banker2: state.banker2 };
};

function mapDispatchToProps(dispatch) {
  return {
    changeTitle: title_header => dispatch(changeTitle(title_header)),
    changeSuiviP: suivi_page => dispatch(changeSuiviP(suivi_page)),
    changeSuiviPB: suivi_pageb => dispatch(changeSuiviPB(suivi_pageb)),
    changeAccounts: accounts => dispatch(changeAccounts(accounts))
  };
}

class Create extends Component {
  constructor(props){
    super(props);
    this.state = {
      iduser:this.props.banker2.userid,
      amount:'',
      accountlimit:''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

onSubmit(e) {
    this.setState({essai:true});
    e.preventDefault();
    const account = {
      iduser:this.state.iduser,
      amount:this.state.amount,
      accountlimit:this.state.accountlimit
    }
    create_account(account).then(res => {  
    })
    this.props.changeSuiviPB(<Ini/>);
  }

  handleLogout(event){
    //this.props.history.push("/");
    localStorage.setItem('user',false);
    window.location.href="http://localhost:3000/"
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
	    <div className="create-css">
        <form id="form_create" onSubmit={this.onSubmit}>
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
          <div id="this_button">
            <button id="form_buttonp" type="submit"  /*onClick={(event) => this.handleConnexion()}*/>Sauvegarder</button>
          </div>
        </form>
		  </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Create);