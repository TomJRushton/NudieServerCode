import './App.css';
import { Button } from 'react-bootstrap'
import {AddItem} from "./Items/AddItem"
import {EditItem} from "./Items/EditItem"
import {AddProposal} from "./Voting/AddProposal"
import {EditProposal} from "./Voting/EditProposal"
import {ItemBox} from "./Items/ItemBox"
import {ItemArray} from "./Items/ItemArray"
import {VotingItemBox} from "./Voting/VotingItemBox"
import {VotingItemArray} from "./Voting/VotingItemArray"
import {Minter} from "./minter/Minter"
import React, { useState, useEffect, useRef } from 'react'; 


function App() {

const [shopItems, setShopItems] = useState([])
const [proposalItems, setProposalItems] = useState([])
const [addItemShown, setAddItemShown] = useState(false);
const [addProposalItemShown, setAddProposalItemShown] = useState(false);
const [showShop, setShowShop] = useState("block")
const [showVoting, setShowVoting] = useState("none")

var shopItemArray = []

useEffect(() => {
    RetrieveShopItems()
}, [])

useEffect(() => {
    RetrieveProposalItems() 
}, [])

const RetrieveShopItems = async () => {
    var shopConfig = "https://nudies.s3.us-west-1.amazonaws.com/Shop/Config.json"

    try {
        fetch(shopConfig)
        .then((response) => response.json())
        .then((actualData) => loadShopItems(actualData))
        .catch((err) => {
            console.log(err.message);
        });

    } catch (err) {
        console.log(err)
    }
}

const loadShopItems = (actualData) =>{
    if(actualData.length != null){
        for(var i = 0; i < actualData.length; i++){
            shopItemArray.push(
                {
                    "ID": actualData[i].ID,
                    "itemSKU" : actualData[i].itemSKU,
                    "featured" : actualData[i].featured,
                    "trait_type": actualData[i].trait_type,
                    "value": actualData[i].value,
                    "name": actualData[i].name,
                    "imageUrl" : actualData[i].imageUrl,
                    "price" : actualData[i].price,
                    "quantity" : actualData[i].quantity                 
                }
            )         
        }      
    }
    setShopItems(shopItemArray)            
}

const RetrieveProposalItems = async () => {
    var shopConfig = "https://nudies.s3.us-west-1.amazonaws.com/Proposals/Config.json"

    try {
        fetch(shopConfig)
        .then((response) => response.json())
        .then((data) => loadProposalItems(data))
        .catch((err) => {
            console.log(err.message);
        });

    } catch (err) {
        console.log(err)
    }
}

const loadProposalItems = (data) =>{
    var proposalItemArray = []
    console.log(data.length)
    if(data.length != null){
        for(var i = 0; i < data.length; i++){
            proposalItemArray.push(
                {
                    "ID": data[i].ID,
                    "title" : data[i].title,
                    "body" : data[i].body,
                    "startTime": data[i].startTime,
                    "endTime": data[i].endTime,
                    "answer1": data[i].answers.answer1,
                    "answer2" : data[i].answers.answer2,  
                    "answer3": data[i].answers.answer3,
                    "answer4" : data[i].answers.answer4,   
                    "answer5": data[i].answers.answer5
                }
            )         
        }      
    }
    setProposalItems(proposalItemArray)            
}

// const loadShopItems = (actualData) =>{
//     console.log(actualData)
//     if(actualData.shopItems.length != null){
//         for(var i = 0; i < actualData.shopItems.length; i++){
//             shopItemArray.push(
//                 {
//                     "ID": actualData.shopItems[i].ID,
//                     "itemSKU" : actualData.shopItems[i].itemSKU,
//                     "position" : actualData.shopItems[i].position,
//                     "trait_type": actualData.shopItems[i].trait_type,
//                     "value": actualData.shopItems[i].value,
//                     "name": actualData.shopItems[i].name,
//                     "imageUrl" : actualData.shopItems[i].imageUrl,
//                     "price" : actualData.shopItems[i].price,
//                     "quantity" : actualData.shopItems[i].quantity                 
//                 }
//             )         
//         }      
//     }
//     setShopItems(shopItemArray)            
// }


const renderAddItem = event =>{
    setAddItemShown(current => !current);

    //   return(
    //       <AddItem/>
    //   )
}

const renderAddProposalItem = event =>{
    setAddProposalItemShown(current => !current);
}

function showShopControls(){
    setShowShop("block")
    setShowVoting("none")
}

function showVotingControls(){
    setShowShop("none")
    setShowVoting("block")
}

return (
    <div className="App">
        <div className='shopContainerContainer' style={{display:showShop}}>
            <Minter/>
             <div className='ShopContainer'>
             <h1>Currently Disabled</h1>
                {/*<ItemArray shopItemArray={shopItems}/>
                {addItemShown && <AddItem handler={setAddItemShown}/>}*/}
            </div> 
        </div>
        <div className='votingContainer' style={{display:showVoting}}>
            <Minter/>
            <div className='ShopContainer'>
                <VotingItemArray proposalItemArray={proposalItems}/>
                {addProposalItemShown && <AddProposal handler={setAddProposalItemShown}/>}       
            </div>
        </div>        
        <button onClick={renderAddItem} className="AddButton" disabled={true}>Add Shop Item</button>
        <button onClick={showShopControls} className="AddButton">Show Shop Controls</button>
        <button onClick={showVotingControls} className="AddButton">Show Voting Controls</button>
        <button onClick={renderAddProposalItem} className="AddButton">Add Proposal Item</button>
    </div>
);
}

export default App;
