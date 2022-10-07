import {SendProposalAPIPost} from "./../Blockchain/BackEndAPIs"
import './../App.css';
import { Button } from 'react-bootstrap'
import React, { useState, useEffect, useRef } from 'react'; 
import SignMessageInput from "./../Blockchain/SignMessage"
import {SendAPIPost} from "./../Blockchain/BackEndAPIs"

export const AddProposal = ({handler}) => {
    const inputRef = useRef(null);
    const [img, setImg] = useState();

    const [shopItems, setShopItems] = useState([])
    const [shopLength, setShopLength] = useState()
    const [addItemShown, setAddItemShown] = useState(false);
    const [traitValue, setTraitValue] = useState("Not Set")
    const [layerValue, setLayerValue] = useState("Not Set")


    function hideBox(){
        handler(current => !current)
    }

    function refreshPage() {
        window.location.reload(false);
    }

    async function submit(){
        let title = document.getElementById("addTitle").value;
        let body = document.getElementById("addBody").value;
        let answer1 = document.getElementById("addAnswer1").value;
        let answer2 = document.getElementById("addAnswer2").value;
        let answer3 = ""
        let answer4 = ""
        let answer5 = ""

        const unixEndTime = await getUnixEndTime()
        const unixStartTime = Math.floor(Date.now() / 1000);

        try {
            answer3 = document.getElementById("addAnswer3").value
            answer4 = document.getElementById("addAnswer4").value
            answer5 = document.getElementById("addAnswer5").value            
        } catch (error) {
            console.log(error)
        }


        if(title.length > 0 && body.length > 0 && answer1.length > 0 && answer2.length > 0){
          const JSONString = JSON.stringify({ 
            function: "AddProposal",
            title: title,
            body: body,
            startTime: unixStartTime,
            endTime: unixEndTime,
            answer1: answer1,
            answer2: answer2,
            answer3: answer3,
            answer4: answer4,
            answer5: answer5})
    
            console.log("sending request")
          const singedResponse = await SignMessageInput(JSONString)
          const responseStatus = await SendProposalAPIPost(singedResponse)
            
          if(responseStatus == 200){
            refreshPage()
          }

          if(responseStatus == 500){
            const secondResponseStatus = await SendAPIPost(singedResponse)  

            if(secondResponseStatus == 500){    
                console.log("Request Failed")
            }
            if(secondResponseStatus == 200){
                refreshPage()
            }
          }     
        }

    }

    async function getUnixEndTime(){
        let days = document.getElementById("addDays").value;
        let hours = document.getElementById("addHours").value;
        let daysUnix = days * 86400
        let hoursUnix = hours * 3600
        let currentUnixTime = Math.floor(Date.now() / 1000);
        let endUnixTime = currentUnixTime + daysUnix + hoursUnix

        return endUnixTime
    }

  return (
    <div>
        <div className="proposalControlContainer">
            <h1>Add Proposal</h1>
            <h2>Proposal Title:</h2>
            <input placeholder="Add Title" id="addTitle" className="proposalNameInput"></input>

            <h2>Proposal Body:</h2>
            <textarea placeholder="Add Body" rows="16" cols="80" id="addBody" className="textInput">
            </textarea>
                {/* <input placeholder="Add Proposal Body" id="addProposal" className="proposalInput"></input> */}

            <h2>Proposal Voting Length:</h2>
            <div className="dateTimeContainer">
                <h2>Days:</h2>
                <input placeholder="Days" id="addDays"  type="number" className="dateTimeInput"></input>
                <h2>Hours:</h2>
                <input placeholder="Hours" id="addHours" type="number" className="dateTimeInput"></input>
            </div>
            <h2>Add Answers:</h2>
                <input placeholder="Add Answer 1" id="addAnswer1" className="proposalAnswerInput"></input>
                <input placeholder="Add Answer 2" id="addAnswer2" className="proposalAnswerInput"></input>
                <input placeholder="Add Answer 3" id="addAnswer3" className="proposalAnswerInput"></input>
                <input placeholder="Add Answer 4" id="addAnswer4" className="proposalAnswerInput"></input>           
                <input placeholder="Add Answer 5" id="addAnswer5" className="proposalAnswerInput"></input>

            <div className='buttonContainer'>
                <Button onClick={hideBox} className='closeBox'>Close</Button>
                <Button onClick={submit} className='submit'>Save</Button>
            </div>
        </div>
        <div className="proposalControlContainer-small-screen">
            <div className="editProposalLeft">
                <h1>Add Proposal</h1>
                <h2>Proposal Title:</h2>
                <input placeholder="Add Title" id="addTitle" className="proposalNameInput"></input>

                <h2>Proposal Body:</h2>
                <textarea placeholder="Add Body - Max 6500 Characters" rows="16" cols="80" id="addBody" className="textInput" maxLength="6500">
                </textarea>
                    {/* <input placeholder="Add Proposal Body" id="addProposal" className="proposalInput"></input> */}
            </div>
            <div className="editProposalright">
                <h2>Proposal Voting Length:</h2>
                <div className="dateTimeContainer">
                    <h2>Days:</h2>
                    <input placeholder="Days" id="addDays"  type="number" className="dateTimeInput"></input>
                    <h2>Hours:</h2>
                    <input placeholder="Hours" id="addHours" type="number" className="dateTimeInput"></input>
                </div>
                <h2>Add Answers:</h2>
                    <input placeholder="Add Answer 1" id="addAnswer1" className="proposalAnswerInput"></input>
                    <input placeholder="Add Answer 2" id="addAnswer2" className="proposalAnswerInput"></input>
                    <input placeholder="Add Answer 3" id="addAnswer3" className="proposalAnswerInput"></input>
                    <input placeholder="Add Answer 4" id="addAnswer4" className="proposalAnswerInput"></input>           
                    <input placeholder="Add Answer 5" id="addAnswer5" className="proposalAnswerInput"></input>

                <div className='buttonContainer'>
                    <Button onClick={hideBox} className='closeBox'>Close</Button>
                    <Button onClick={submit} className='submit'>Save</Button>
                </div>
            </div>
        </div>
    </div>
  );
}

