import React, { Component } from 'react';
import '../css/Choix.css';
import { connect } from "react-redux";
import { changeCo, changeTitle, changeUser, changeAccounts, changeAccountP, changeNHeader, changeAlertes, changeDepots, changeTransfers} from "../actions/index";
import { get_depot, get_transfer, get_alerte, get_account } from '../api/UserFunctions';
import IniU from './IniU';

const mapStateToProps = state => {
  return { title_header: state.title_header, accountsp:state.accountsp, userp:state.userp};
};

function mapDispatchToProps(dispatch) {
  return {
    changeCo: cont_connexion => dispatch(changeCo(cont_connexion)),
    changeTitle: title_header => dispatch(changeTitle(title_header)),
    changeUser:user => dispatch(changeUser(user)),
    changeAccounts:accounts => dispatch(changeAccounts(accounts)),
    changeNHeader:nheader => dispatch(changeNHeader(nheader)),
    changeAccountP:accountp => dispatch(changeAccountP(accountp)),
    changeAlertes:alertes => dispatch(changeAlertes(alertes)),
    changeTransfers:transfers => dispatch(changeTransfers(transfers)),
    changeDepots:depots => dispatch(changeDepots(depots))
  };
}

class Choix extends Component {
  constructor(props){
    super();
  }

  handleLogout(event){
    localStorage.setItem('user',false);
    window.location.href="http://localhost:3000/"
  }

  handleChoix(event, id){
    this.props.changeCo( <IniU  key={"suivi"} adm='sv'/> );
    this.props.changeTitle( 'Solde');
    get_account(id).then(res => {
      if (res) {
        localStorage.setItem('accountp',JSON.stringify(res));
        this.props.changeAccountP(res);
      }
    });
    get_transfer(id).then(res => {
      if (res) {
        localStorage.setItem('transfers',JSON.stringify(res));
        this.props.changeTransfers(res);
      }
    });

    get_depot(id).then(res => {
      if (res) {
        localStorage.setItem('depots',JSON.stringify(res));
        this.props.changeDepots(res);
      }
    });

    get_alerte(this.props.mangetesgrandsmorts.iduser).then(res => {
      if (res) {
        localStorage.setItem('alertes',JSON.stringify(res));
        this.props.changeAlertes(res);
      }
    });
  }

  renderTable(){
    return this.props.mangetesmorts.map((account,index) => {
      const{idaccount} = account
      return(
        <div id="cli_list" onClick={(event) => this.handleChoix(event,idaccount)} key={idaccount}><p key={idaccount} id="txt_list">Compte numéro {idaccount}</p> </div>
      )
    });
  }
  render() {
    return (
	    <div className="choix">
        <div id="cli_acc"><p id="txt_acc">Veuillez choisir un compte pour continuer</p> </div>
		  	{this.renderTable()}
	  	</div>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Choix);