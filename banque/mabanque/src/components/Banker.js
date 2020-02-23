import React, { Component } from 'react';
import '../css/Banker.css';
import { connect } from "react-redux";
import { changeSuiviPB, changeTitle, changeNHeader, changeUser, changeAccounts} from "../actions/index";
import Detail from './Detail';
import Create from './Create';
import { get_account } from '../api/UserFunctions';


const mapStateToProps = state => {
  return { title_header: state.title_header, banker2:state.banker2, accountsb:state.accountsb, userb:state.userb, nheader:state.nheader };
};

function mapDispatchToProps(dispatch) {
  return {
    changeTitle: title_header => dispatch(changeTitle(title_header)),
    changeSuiviPB: suivi_pageb => dispatch(changeSuiviPB(suivi_pageb)),
    changeNHeader:nheader => dispatch(changeNHeader(nheader)),
    changeAccountsP:accounts => dispatch(changeAccounts(accounts)),
    changeUser:user => dispatch(changeUser(user))
  };
}
class Banker extends Component {
  constructor(props){
    super(props);
    this.handleDetail = this.handleDetail.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleDetail(event,id){
    //this.props.history.push("/");

    get_account(id).then(res => {
      if (res) {
        this.props.changeSuiviPB(<Detail acc={res}/>);
        localStorage.setItem('account',JSON.stringify(res));
      }
    });
  }

  handleCreate(event){
    this.props.changeSuiviPB(<Create/>);
  }

  renderTable(){
    if(typeof this.props.accs === 'undefined'){
      return this.props.accountsb.map((account,index) => {
        const{idaccount} = account
        return(
          <div id="cli_list" onClick={(event) => this.handleDetail(event,idaccount)} key={idaccount}><p key={idaccount} id="txt_list">Compte numéro {idaccount}</p> </div>
        )
      })
    }
    else{
      return this.props.accs.map((account,index) => {
        const{idaccount} = account
        return(
          <div id="cli_list" onClick={(event) => this.handleDetail(event,idaccount)} key={idaccount}><p key={idaccount} id="txt_list">Compte numéro {idaccount}</p> </div>
        )
      })
    }
  }

  render() {
    return (
	    <div className="banker">
        <div id="cli_acc"><p id="txt_acc">Liste des comptes de {this.props.userb.lastname.toUpperCase()+" "+this.props.userb.firstname}</p> </div>
        {this.renderTable()}
        <div id="cli_acc_cre" onClick={(event) => this.handleCreate(event)}>Ajouter un compte</div>    
		  </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Banker);