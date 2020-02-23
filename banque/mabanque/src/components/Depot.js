import React, { Component } from 'react';
import '../css/Depot.css';
import { connect } from "react-redux";
import IniU from './IniU';
import { depot, update_account } from '../api/UserFunctions';
import { changeCo, changeAdmin, changeDepots, changeUserP, changeAccountsP, changeSuiviP, changeTitle, changeCoA, changeSuiviPB, changeNHeader} from "../actions/index";

const mapStateToProps = state => {
  return { title_header: state.title_header, accountp: state.accountp };
};

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
    changeDepots: depots => dispatch(changeDepots(depots))
  }
}

class Depot extends Component {
  constructor(props){
    super(props);
     this.state = {
      amount:''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
  }


 onSubmit(e) {
    this.setState({essai:true});
    e.preventDefault();

    const depots = {
      destination:this.props.accountp.idaccount,
      amount:this.state.amount,
      description:''
    }
    let montant = parseInt(this.props.accountp.amount)+ parseInt(this.state.amount);
    const account = {
      idaccount:this.props.accountp.idaccount,
      amount:montant
    }
    depot(depots).then(res => {  
    });
    update_account(account).then(res => {  
      //consol e.log("update : "+this.props.acc.idaccount+" "+this.state.amount+" "+this.state.accountlimit);
      this.props.changeCo(<IniU adm='sv2' res={res}/>);
    })
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
	    <div className="depot">
            <form id="form_depot" onSubmit={this.onSubmit}>
              <input
                  id="form_montant_d"
                  type="number"
                  placeholder="Montant du dépôt"
                  name="amount"
                  defaultValue={this.state.amount}
                  onChange={this.onChange}
                  />
                <br/>
               
                <br/>
                <div id="depot_button">
                  <button id="form_buttond" type="submit" /*onClick={(event) => this.handleIns()}*/  /*onClick={(event) => this.handleConnexion()}*/>Déposer</button>
                </div>
            </form>
      </div>

      );
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Depot);