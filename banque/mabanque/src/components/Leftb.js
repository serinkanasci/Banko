import React, { Component } from 'react';
import '../css/Leftb.css';
import { connect } from "react-redux";
import { changeStatus, changeSuiviP, changeTitle, changeStyleD, changeStyleC} from "../actions/index";
import Solde from './Solde';
import Depot from './Depot';
import Virement from './Virement';
import Alerte from './Alerte';



const mapStateToProps = state => {
  return { suivi_status: state.suivi_status, style_d: state.style_d, style_c: state.style_c };
};

function mapDispatchToProps(dispatch) {
  return {
    changeTitle: title_header => dispatch(changeTitle(title_header)),
    changeSuiviP: suivi_page => dispatch(changeSuiviP(suivi_page))
  };
}

class Leftb extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
    this.handleS = this.handleS.bind(this);
    this.handleD = this.handleD.bind(this);
    this.handleV = this.handleV.bind(this);
    this.handleA = this.handleA.bind(this);    
  }
  handleS(event){
  	this.props.changeTitle( 'Solde' );
  	this.props.changeSuiviP( <Solde  key={"solde"} /> );
  }
  handleD(event){
  	this.props.changeTitle( 'Dépôt' );
  	this.props.changeSuiviP( <Depot  key={"depot"} /> );
  }
  handleV(event){
    this.props.changeTitle( 'Virement' );
    this.props.changeSuiviP( <Virement  key={"virement"} /> );
  }
  handleA(event){
    this.props.changeTitle( 'Alerte' );
    this.props.changeSuiviP( <Alerte  key={"alerte"} /> );
  }
  render() {
    return (
      <div id="leftb">
        <p id="solde_p"  onClick={(event) => this.handleS(event)}>Solde</p>
        <p id="depot_p"  onClick={(event) => this.handleD(event)}>Dépôt</p>
        <p id="virement_p"  onClick={(event) => this.handleV(event)}>Virement</p>
        <p id="alerte_p"  onClick={(event) => this.handleA(event)}>Alerte</p>
      </div>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Leftb);