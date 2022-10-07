import "./../App.css"
import SignMessageInput from "../Blockchain/SignMessage"
import React, { useState, useEffect, useRef } from 'react'; 
import {EditProposal} from "./EditProposal"
import {ShowResults} from "./ShowResults"

export const VotingItemBox = ({ID, title, body, startTime, endTime, answer1, answer2, answer3, answer4, answer5, handler}) =>{

    const [editItemShown, setEditItemShown] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [votes, setVotes] = useState([]);

    var votesArray = []

    useEffect(() => {
        RetrieveVotes()
    }, [])
    
    const RetrieveVotes = async () => {
        var votesJson = "https://nudies.s3.us-west-1.amazonaws.com/Proposals/Votes.json"
    
        try {
            fetch(votesJson)
            .then((response) => response.json())
            .then((actualData) => loadVotes(actualData))
            .catch((err) => {
                console.log(err.message);
            });
    
        } catch (err) {
            console.log(err)
        }
    }
    
    const loadVotes = (actualData) =>{
        if(actualData.length != null){
            for(var i = 0; i < actualData.length; i++){
                votesArray.push(
                    {
                        "ID": actualData[i].ID,
                        "title" : actualData[i].itemSKU,
                        "votes" : actualData[i].votes            
                    }
                )         
            }      
        }
        setVotes(votesArray)  
    }

    function editBox(){
        setEditItemShown(current => !current);
    }

    function showResultsBox(){
        setShowResults(current => !current);
    }

    return(
        <div className="">
            <div className="proposalCardContainer">
                <h1>ID: {ID} <br></br>Title: {title}</h1>
                <div className="proposalItemBodySection">
                    <pre>{body}</pre>
                </div>
                {editItemShown && <EditProposal 
                                        ID={ID}
                                        title={title}
                                        body={body}
                                        startTime={startTime}
                                        endTime={endTime}
                                        answer1={answer1}
                                        answer2={answer2}
                                        answer3={answer3}
                                        answer4={answer4}
                                        answer5={answer5}
                                        handler={setEditItemShown}/>
                                    }
                {showResults && <ShowResults 
                                        ID={ID}
                                        title={title}
                                        answer1={answer1}
                                        answer2={answer2}
                                        answer3={answer3}
                                        answer4={answer4}
                                        answer5={answer5}
                                        votes={votes}
                                        handler={setShowResults}/>
                                    }
                <div className="buttonBox">
                    <button onClick={showResultsBox} className="resultsButton">Show Results</button>
                    <button onClick={editBox} className="editButton">Edit</button>
                </div>
            </div>
        </div>
    )
}