import {VotingItemBox} from "./VotingItemBox"
import {AddProposal} from "./AddProposal"
import React, { useState, useEffect, useRef } from 'react'; 

export const VotingItemArray = ({proposalItemArray}) =>{

    //console.log(proposalItemArray)

    return(
        <div className="shopRow">
            {proposalItemArray.map(function(items, index){
                return (<VotingItemBox 
                            key={index}
                            ID={items.ID}
                            title={items.title}
                            body={items.body}
                            startTime={items.startTime}
                            endTime={items.endTime}
                            answer1={items.answer1}
                            answer2={items.answer2}
                            answer3={items.answer3}
                            answer4={items.answer4}
                            answer5={items.answer5}
                        />)
                })}
        </div>
    )
}