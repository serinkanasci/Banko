import React, { Component } from 'react';
import '../css/Alerte.css';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { title_header: state.title_header, alertes:state.alertes };
};

class Alerte extends Component {

  constructor(props){
    super();
  }

  handleLogout(event){
    localStorage.setItem('user',false);
    window.location.href="http://localhost:3000/"
  }

  renderTable(){
    return this.props.alertes.map((alerte,index) => {
      const{idalerte, description, creationdate} = alerte;
      return(
        <p className="txt_op_list"  key={idalerte}>{description+' '+creationdate}</p>
      )
    }); 
  }

  render() {
    return (
	    <div className="solde">
        <div id="cli_op"><p id="txt_op">Messages d'alertes</p> </div>
        <div id="cli_op_list">{this.renderTable()}</div>
		  </div>
    );
  }
}
export default connect(mapStateToProps)(Alerte);