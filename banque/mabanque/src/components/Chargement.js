import React, { Component } from 'react';
import '../css/Create.css';
import { connect } from "react-redux";
import Banker from './Banker';
import Admin from './Admin';
import { create_account, get_accounts, update_banker } from '../api/UserFunctions';
import { changeStatus, changeAccounts, changeSuiviP, changeTitle, changeStyleD, changeCoA, changeSuiviPB} from "../actions/index";

const mapStateToProps = state => {
  return { banker2: state.banker2 };
};

function mapDispatchToProps(dispatch) {
  return {
    changeTitle: title_header => dispatch(changeTitle(title_header)),
    changeSuiviP: suivi_page => dispatch(changeSuiviP(suivi_page)),
    changeSuiviPB: suivi_pageb => dispatch(changeSuiviPB(suivi_pageb)),
    changeAccounts: accounts => dispatch(changeAccounts(accounts)),
    changeCoA: suivi_pagea=> dispatch(changeCoA(suivi_pagea))
  };
}

class Chargement extends Component {
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
    const accountg = {
            id:this.state.iduser
          }
    get_accounts(accountg).then(res => {
      if (res) {
        localStorage.setItem('resb',JSON.stringify(res));
        this.props.changeAccounts(res);
      }
    });
  }
  handleLogout(event){
    localStorage.setItem('user',false);
    window.location.href="http://localhost:3000/"
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  test(){
    const accountg = {
      id:this.state.iduser
    }
    get_accounts(accountg).then(res => {
      if (res) {
        localStorage.setItem('resb',JSON.stringify(res));
        this.props.changeAccounts(res); 
      }
    });
    if(this.props.admin=="ok"){
      setTimeout(function() { //Start the timer  
        this.props.changeCoA(<Admin/>);
      }.bind(this), 1000);
    }
    else{
      setTimeout(function() { //Start the timer
        this.props.changeSuiviPB(<Banker/>);
      }.bind(this), 1000);
    }
  }
  render() {
    return (
	    <div className="create-css">
        <p id="chargement">Chargement...</p>
        {this.test()}
		  </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chargement);