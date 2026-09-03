import Header from "./header";
import paper from "../assets/images/icon-paper.svg"
import scissor from "../assets/images/icon-scissors.svg"
import rock from "../assets/images/icon-rock.svg"
import "../assets/Game.css"
import triangle from "../assets/images/bg-triangle.svg"
import closeSvg from "../assets/images/icon-close.svg"
import theRules from "../assets/images/image-rules.svg"
import { useState } from "react";

const obj = {
    "paper": ["paper" , paper],
    "scissor": ["scissor", scissor],
    "rock": ["rock", rock]
}

function Game () {
    const [playerChoice, setPlayerChoice] = useState(null);
    const [houseChoice, setHouseChoice] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [count , setCount] = useState(0)
    const [result, setResult] = useState("")
    

    

    function handleChoice(choice){
        const choices = ["paper" , "rock" , "scissor"]
        const house = choices[Math.floor(Math.random() * choices.length)]
        

    if(choice === house){
        setResult("DRAW") 
        setCount(prev => prev + 1)
    }
    else if(choice === "scissor" && house === "rock"  ||
            choice === "paper" && house === "scissor" ||
            choice === "rock" && house === "paper" ){
        setResult("YOU LOST")
        setCount(prev => prev - 1)
    }
    else{
        setResult("YOU WON")
        setCount(prev => prev + 3)
    }
     
    
    setIsSelected(true)
    setPlayerChoice(choice);
    setHouseChoice(house)
    }

    function playAgain() {
        setPlayerChoice(null);
        setHouseChoice(null);
        setIsSelected(false);
    }

    return(
        <>
            <Header count={count} />
            
            {isSelected? 
            <Result
                playAgain={playAgain}
                playerChoice={playerChoice}
                houseChoice={houseChoice}
                result={result}/> : 
            <Selection handleChoice={handleChoice} />}

           <Rules />   
        </>
    )
}

function Selection ({handleChoice}) {

    return(
        <>
            <div className="select">
                <img className="triangle" src={triangle} />
                <button onClick={() => handleChoice("paper")} className="circle c-select paper p1">     <img className="hands" src={paper} alt="paper" /></button>
                <button onClick={() => handleChoice("scissor")} className="circle c-select scissor s2"> <img className="hands" src={scissor} alt="scissor" /></button>
                <button onClick={() => handleChoice("rock")} className="circle c-select rock r3">       <img className="hands" src={rock} alt="rock" /></button>
            </div>
        </>
    )
}

function Result ({playerChoice , houseChoice, playAgain, result}) {
    let cssPly;
    let cssHos;

    if (result === "YOU LOST") {
        cssPly = "";
        cssHos = "winner";
    }
    else if (result === "YOU WON") {
        cssPly = "winner";
        cssHos = "";
    }
    else {
        cssPly = "";
        cssHos = "";
    }   
    return(
        <>
           <div className="result">
                <p className="txt txt-ply">YOU PICKED</p>
                <p className="txt txt-hus">THE HOUSE PICKED</p>
                {/* circle Player */}
                <div className={`c-ply c-res circle ${obj[playerChoice][0]} ${cssPly}`}> <img className="hands" src={obj[playerChoice][1]} /> </div>

                {/* menu */}
                <div className="menu"> <Menu  playAgain={playAgain} result={result} match={[playerChoice,houseChoice]} /></div>    

                {/* circle House */}  
                <div className={`c-hus c-res circle ${obj[houseChoice][0]} ${cssHos}`}> <img className="hands" src={obj[houseChoice][1]} /> </div>
            </div>
        </>
    )
}

function Menu ({playAgain, result}){

    return(
        <div>
            <h2 className="result-txt">{result}</h2>
            <button onClick={playAgain} className="play">PLAY AGAIN</button>
        </div>
    )
}

function Rules(){
    const [showRule, setShowRule] = useState(false);

    function handleShowRule(){
        setShowRule(showRule => !showRule)
    }

    return(
        <>
            <button onClick={handleShowRule} className="btn rules-btn">RULES</button>
            {showRule?
                <div className="pop-up">
                    <div className="flex-spbt">
                    <h2>RULES</h2>
                    <button className="btn" onClick={handleShowRule}><img src={closeSvg} alt="close" /></button>
                    </div>

                    <img src={theRules} alt="the-rules" />
                </div>
                :
                <></>
            }
        </>
    )
}
export default Game