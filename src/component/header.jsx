import logo from "../assets/images/logo.svg"
import "../assets/header.css"

function Header ({count}){

    return(
        <>
            <div className="header">
                <img className="logo" src={logo} alt="logo" />
                <div className="score"> 
                    <p className="s-blue-txt">SCORE</p>
                    <span className="score-num">{count}</span>
                </div>
            </div>
        </>
    )
}

export default Header