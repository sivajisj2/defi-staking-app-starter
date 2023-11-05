import React,{Component} from "react";
import bank from "../assets/bank.jpg"


class Navbar extends Component{

  
    render(){
        return(
            <nav className="navbar navbar-dark fixed-top shadow p-0" style={{ background: "black", height: "50px" }}>
            <a className="navbar-brand col-12 col-sm-3 col-md-2 mr-0" style={{ color: "white" }} href="">
                <img width={45} className="mx-1" height={35} src={bank} alt="bank-logo" />&nbsp; &nbsp;
                DAPP Yield Stacking (Decentralized Bank)
            </a>
            <ul className="navbar-nav ml-auto">
                <li className="text-nowrap nav-item d-sm-block">
                    <small style={{ color: "white" }}>
                        ACCOUNT NUMBER: {this.props.account}
                    </small>
                </li>
            </ul>
        </nav>
        
        )
    }
}
export default Navbar;