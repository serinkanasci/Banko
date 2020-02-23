import React, { Component } from 'react';
import '../css/Create.css';
import { connect } from "react-redux";
import { get_depot, get_transfer, profile_user, get_accounts } from '../api/UserFunctions';
import { changeCo, changeAccountP, changeDepots, changeAdmin, changeTransfers, changeUserP, changeAccountsP, changeSuiviP, changeCoA, changeSuiviPB, changeNHeader} from "../actions/index";
import Choix from './Choix';
import Suivi from '../containers/Suivi';
import Solde from './Solde';

const mapStateToProps = state => {
  return { title_header:state.title_header  };
};

function mapDispatchToProps(dispatch) {
  return {
    changeSuiviP: suivi_page => dispatch(changeSuiviP(suivi_page)),
    changeSuiviPB: suivi_pageb => dispatch(changeSuiviPB(suivi_pageb)),
    changeCoA: suivi_pagea=> dispatch(changeCoA(suivi_pagea)),
    changeCo: suivi_page=> dispatch(changeCo(suivi_page)),
    changeNHeader:nheader => dispatch(changeNHeader(nheader)),
    changeUserP:userp => dispatch(changeUserP(userp)),
    changeAccountsP:accountsp => dispatch(changeAccountsP(accountsp)),
    changeAdmin: admin => dispatch(changeAdmin(admin)),
    changeAccountP:accountp => dispatch(changeAccountP(accountp)),
    changeTransfers: transfers => dispatch(changeTransfers(transfers)),
    changeDepots:depots => dispatch (changeDepots(depots))
  }
}

class IniU extends Component {

  constructor(props){
    super(props);

    this.state = {
      amount:'',
      accountlimit:'',
      resu:''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.test = this.test.bind(this);

  }

onSubmit(e) {
    this.setState({essai:true});
    e.preventDefault();
  }
  handleLogout(event){
    //this.props.history.push("/");
    localStorage.setItem('user',false);
    window.location.href="http://localhost:3000/"
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  test(){
    if(this.props.adm==="sv"){
      setTimeout(function() { //Start the timer
        this.props.changeCo(<Suivi/>);
      }.bind(this), 1000);
    }
    else if(this.props.adm==="sv2"){
      setTimeout(function() { //Start the timer
        localStorage.setItem('accountp',JSON.stringify(this.props.res));
        this.props.changeAccountP(this.props.res);
        this.props.changeCo(<Suivi test="ok" sync={this.props.res}/>);
      }.bind(this), 1000);
    }
    else if(this.props.adm==="sv3"){
      setTimeout(function() { //Start the timer
        get_transfer(this.props.accp.idaccount).then(res => {
          if (res) {
            localStorage.setItem('transfers',JSON.stringify(res));
            this.props.changeTransfers(res);
          }  
        });
        get_depot(this.props.accp.idaccount).then(res => {
          if (res) {
            localStorage.setItem('depots',JSON.stringify(res));
            this.props.changeDepots(res);
          }  
        });
        this.props.changeSuiviP( <Solde/> ); 
      }.bind(this), 1000);
    }
    else{
      setTimeout(function() { //Start the timer
        profile_user().then(res2 => { 
          localStorage.setItem('userp',JSON.stringify(res2));
          this.props.changeUserP(res2);
          const accountg = {
            id:res2.iduser
          }
          const resu = res2;
          this.props.changeNHeader(res2.lastname.toUpperCase()+" "+res2.firstname);
          get_accounts(accountg).then(res3 => {
            if (res3) {
              localStorage.setItem('resp',JSON.stringify(res3));
              this.props.changeAccountsP(res3);
              this.props.changeCo(<Choix mangetesmorts={res3} mangetesgrandsmorts={resu}/>);
            } 
          });
        }); 
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
export default connect(mapStateToProps, mapDispatchToProps)(IniU);