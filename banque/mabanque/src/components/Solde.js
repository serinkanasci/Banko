import React, { Component } from 'react';
import '../css/Solde.css';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { title_header: state.title_header, accountp:state.accountp, transfers:state.transfers, depots:state.depots };
};

class Solde extends Component {
  constructor(props){
    super();    
  }
  handleLogout(event){
    localStorage.setItem('user',false);
    window.location.href="http://localhost:3000/"
  }
  renderTable(){
    return this.props.depots.map((depot,index) => {
      const{amount, iddepot, creationdate} = depot;
      return(
        <p className="txt_op_list" key={iddepot}>{'dépôt '+amount+' euros '+creationdate}</p>
      )
    });
  }
  renderTable2(){
    return this.props.transfers.map((transfer,index) => {
      const{idtransfer, receiverid, amount, description} = transfer;
      return(
        <p className="txt_op_list"  key={idtransfer}>{'virement à '+receiverid+' de '+amount+' euros message : '+description}</p>
      )
    });
  }

  render() {
    return (
	    <div className="solde">
        <div id="cli_op"><p id="txt_op">Dernières opérations</p> </div>
        <div id="cli_op_list"> {this.renderTable()}{this.renderTable2()}  </div>
		  	<div id="cli_solde"><p id="txt_solde">Solde : {this.props.accountp.amount}</p> </div>
		</div>
    );
  }
}
export default connect(mapStateToProps)(Solde);