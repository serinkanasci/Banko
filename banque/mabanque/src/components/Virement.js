import React, { Component } from 'react';
import '../css/Virement.css';
import { connect } from "react-redux";
import { transfer, update_account, get_account } from '../api/UserFunctions';
import IniU from './IniU';
import { changeTransfers, changeCo, changeAdmin, changeUserP, changeAccountsP, changeSuiviP, changeTitle, changeCoA, changeSuiviPB, changeNHeader} from "../actions/index";


function mapDispatchToProps(dispatch) {
  return {
    changeTitle: title_header => dispatch(changeTitle(title_header)),
    changeSuiviP: suivi_page => dispatch(changeSuiviP(suivi_page)),
    changeSuiviPB: suivi_pageb => dispatch(changeSuiviPB(suivi_pageb)),
    changeCoA: suivi_pagea=> dispatch(changeCoA(suivi_pagea)),
    changeCo: suivi_page=> dispatch(changeCo(suivi_page)),
    changeNHeader:nheader => dispatch(changeNHeader(nheader)),
    changeUserP:userp => dispatch(changeUserP(userp)),
    changeAccountsP:accountsp => dispatch(changeAccountsP(accountsp)),
    changeAdmin: admin => dispatch(changeAdmin(admin)),
    changeTransfers: transfers => dispatch(changeTransfers(transfers))
  }
}

const mapStateToProps = state => {
  return { title_header: state.title_header, accountp:state.accountp };
};

class Virement extends Component {
  constructor(props){
    super(props);
    this.state = {
      amount:'',
      receiverid:'',
      description:''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


 onSubmit(e) {
    this.setState({essai:true});
    e.preventDefault();
    const transfers = {
      senderid:this.props.accountp.idaccount,
      receiverid:this.state.receiverid,
      amount:this.state.amount,
      description:this.state.description
    }
    let montant = parseInt(this.props.accountp.amount)- parseInt(this.state.amount);
    if(montant >= parseInt(this.props.accountp.accountlimit) && (parseInt(this.state.amount) >=0)){
      get_account(this.state.receiverid).then(res => {
        if (res) {
          let montant = parseInt(res.amount)+ parseInt(this.state.amount);
          const account = {
            idaccount:res.idaccount,
            amount:montant
          }
          update_account(account).then(res => {  
          });
        } 
        transfer(transfers).then(res => {  
        });
        const account2 = {
          idaccount:this.props.accountp.idaccount,
          amount:montant
        }
        update_account(account2).then(res => {  
          this.props.changeCo(<IniU adm='sv2' res={res}/>);
        })
      });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleLogout(event){
    localStorage.setItem('user',false);
    window.location.href="http://localhost:3000/"
  }

  render() {
    return (
	    <div className="virement">
        <form id="form_virement" onSubmit={this.onSubmit}>
          <input
            id="form_montant_v"
            type="number"
            placeholder="Montant du virement"
            name="amount"
            defaultValue={this.state.amount}
            onChange={this.onChange}
          />
          <br/>
          <input
            id="form_dest_v"
            type="number"
            placeholder="ID du compte de destination"
            name="receiverid"
            defaultValue={this.state.receiverid}
            onChange={this.onChange}
          />
          <br/>
          <input
            id="form_com_v"
            type="text"
            placeholder="Message"
            name="description"
            defaultValue={this.state.description}
            onChange={this.onChange}
          />
          <br/>
          <br/>
          <div id="depot_button">
            <button id="form_buttonv" type="submit" /*onClick={(event) => this.handleIns()}*/  /*onClick={(event) => this.handleConnexion()}*/>Déposer</button>
          </div>
        </form>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Virement);