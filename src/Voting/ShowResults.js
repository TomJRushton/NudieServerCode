import './../App.css';
import { Button } from 'react-bootstrap'
import React, { useState, useEffect, useRef } from 'react'; 

export const ShowResults = ({ID, title, answer1, answer2, answer3, answer4, answer5, votes, handler}) => {
    const [showResult3, setShowResult3] = useState("none");
    const [showResult4, setShowResult4] = useState("none");
    const [showResult5, setShowResult5] = useState("none");
    const [vote1, setVote1] = useState(0);
    const [vote2, setVote2] = useState(0);
    const [vote3, setVote3] = useState(0);
    const [vote4, setVote4] = useState(0);
    const [vote5, setVote5] = useState(0);

    function hideBox(){
        handler(current => !current)
    }

    useEffect(() => {
        setVote1(votes[ID - 1].votes[0].count)
        setVote2(votes[ID - 1].votes[1].count)   

        if(votes[ID - 1].votes[2].vote.length > 0){
            setShowResult3("flex")
            console.log("vote 3:" + votes[ID - 1].votes[2].count)
            setVote3(votes[ID - 1].votes[2].count)
        }
        if(votes[ID - 1].votes[3].vote.length > 0){
            setShowResult4("flex")
            setVote4(votes[ID - 1].votes[3].count)
        }
        if(votes[ID - 1].votes[4].vote.length > 0){
            setShowResult5("flex")
            setVote5(votes[ID - 1].votes[4].count)
        }
    }, [])

  return (
    <div className="proposalResultContainer">
        <h2>Proposal Title:</h2>
        <h3>{title}</h3>

        <h2>Proposal Results:</h2>
        <div className='resultsContainer'>
            <h2>{answer1}</h2>
            <h3>{vote1} Votes</h3>
        </div>
        <div className='resultsContainer'>
            <h2>{answer2}</h2>
            <h3>{vote2} Votes</h3>
        </div>
        <div className='resultsContainer' style={{display : showResult3}}>
            <h2>{answer3}</h2>
            <h3>{vote3} Votes</h3>
        </div>
        <div className='resultsContainer' style={{display : showResult4}}>
            <h2>{answer4}</h2>
            <h3>{vote4} Votes</h3>
        </div>
        <div className='resultsContainer' style={{display : showResult5}}>
            <h2>{answer5}</h2>
            <h3>{vote5} Votes</h3>
        </div>


        <div className='buttonContainer'>
            <Button onClick={hideBox} className='closeResultBox'>Close</Button>
        </div>
    </div>
  );
}
