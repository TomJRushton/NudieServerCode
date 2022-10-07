import './../App.css';
import { Button } from 'react-bootstrap'
import React, { useState, useEffect, useRef } from 'react'; 
import SignMessageInput from "./../Blockchain/SignMessage"
import {SendAPIPost} from "./../Blockchain/BackEndAPIs"
import {SendProposalAPIPost} from "./../Blockchain/BackEndAPIs"

export const EditProposal = ({ID, title, body, startTime, endTime, answer1, answer2, answer3, answer4, answer5, handler}) => {
  const inputRef = useRef(null);
  const [traitValue, setTraitValue] = useState("Not Set")
  const [layerValue, setLayerValue] = useState("Not Set")

  function hideBox(){
    handler(current => !current)
  }

  const [endDate, setEndDate] = useState()
  var dateString = ""

  useEffect(() => {
      let date = new Date(endTime*1000);
      dateString = date.toString()
      console.log(endDate)
      setEndDate(dateString)
  })

  async function submit(){
    let title = document.getElementById("addTitle").value;
    let body = document.getElementById("addBody").value;
    let answer1 = document.getElementById("addAnswer1").value;
    let answer2 = document.getElementById("addAnswer2").value;
    let answer3 = ""
    let answer4 = ""
    let answer5 = ""

    const unixEndTime = await getNewUnixEndTime()

    try {
        answer3 = document.getElementById("addAnswer3").value
        answer4 = document.getElementById("addAnswer4").value
        answer5 = document.getElementById("addAnswer5").value            
    } catch (error) {
        console.log(error)
    }

    if(title.length > 0 && body.length > 0 && answer1.length > 0 && answer2.length > 0){
      const JSONString = JSON.stringify({ 
        function: "EditProposal",
        itemID: ID,
        title: title,
        body: body,
        startTime: startTime,
        endTime: unixEndTime,
        answer1: answer1,
        answer2: answer2,
        answer3: answer3,
        answer4: answer4,
        answer5: answer5})

      const singedResponse = await SignMessageInput(JSONString)
      SendProposalAPIPost(singedResponse)
      console.log(singedResponse)
    }
  }

  async function getNewUnixEndTime(){
    let days = document.getElementById("addDays").value;
    let hours = document.getElementById("addHours").value;
    let daysUnix = days * 86400
    let hoursUnix = hours * 3600
    let endUnixTime = 0;

    if(days < 1 || hours < 1){
      endUnixTime = endTime
    }else{
      endUnixTime = startTime + daysUnix + hoursUnix
    }

    return endUnixTime
}

  async function deleteBox(){
    const JSONString = JSON.stringify({ 
        function: "DeleteProposal",
        itemID: ID,
        title : title})

    const singedResponse = await SignMessageInput(JSONString)
    SendProposalAPIPost(singedResponse)
    console.log(singedResponse)

}

  return (
    <div>
      <div className="proposalControlContainer">
          <h2>Proposal Title:</h2>
          <h3>{title}</h3>
          <input placeholder="New Name" id='addTitle' className="proposalNameInput"></input>

          <h2>Proposal Body:</h2>
          <textarea rows="14" cols="80" id="addBody" className="textInput" defaultValue={body}>
          </textarea>

          <h2>Proposal Voting Length:</h2>
          <h3>{endDate}</h3>
          <div className="dateTimeContainer">
              <h2>Days:</h2>
              <input placeholder="Days" id="addDays"  type="number" className="dateTimeInput"></input>
              <h2>Hours:</h2>
              <input placeholder="Hours" id="addHours" type="number" className="dateTimeInput"></input>
          </div>

          <h2>Proposal Answers:</h2>
            <input placeholder={answer1} id="addAnswer1" className="proposalAnswerInput"></input>
            <input placeholder={answer2} id="addAnswer2" className="proposalAnswerInput"></input>
            <input placeholder={answer3} id="addAnswer3" className="proposalAnswerInput"></input>
            <input placeholder={answer4} id="addAnswer4" className="proposalAnswerInput"></input>
            <input placeholder={answer5} id="addAnswer5" className="proposalAnswerInput"></input>

          <div className='buttonContainer'>
              <Button onClick={hideBox} className='closeBox'>Close</Button>
              <Button onClick={deleteBox} className='closeBox'>Delete</Button>
              <Button onClick={submit} className='submit'>Save</Button>
          </div>
      </div>
      <div className="proposalControlContainer-small-screen">
        <div className='editProposalLeft'>
          <h2>Proposal Title:</h2>
          <h3>{title}</h3>
          <input placeholder="New Name" id='addTitle' className="proposalNameInput"></input>

          <h2>Proposal Body:</h2>
          <textarea rows="14" cols="80" id="addBody" className="textInput" defaultValue={body} maxLength="6500">
          </textarea>
        </div>
        <div className='editProposalright'>
          <h2>Proposal Voting Length:</h2>
          <h3>{endDate}</h3>
          <div className="dateTimeContainer">
              <h2>Days:</h2>
              <input placeholder="Days" id="addDays"  type="number" className="dateTimeInput"></input>
              <h2>Hours:</h2>
              <input placeholder="Hours" id="addHours" type="number" className="dateTimeInput"></input>
          </div>
        
        
          <h2>Proposal Answers:</h2>
            <input placeholder={answer1} id="addAnswer1" className="proposalAnswerInput"></input>
            <input placeholder={answer2} id="addAnswer2" className="proposalAnswerInput"></input>
            <input placeholder={answer3} id="addAnswer3" className="proposalAnswerInput"></input>
            <input placeholder={answer4} id="addAnswer4" className="proposalAnswerInput"></input>
            <input placeholder={answer5} id="addAnswer5" className="proposalAnswerInput"></input>

          <div className='buttonContainer'>
              <Button onClick={hideBox} className='closeBox'>Close</Button>
              <Button onClick={deleteBox} className='closeBox'>Delete</Button>
              <Button onClick={submit} className='submit'>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
