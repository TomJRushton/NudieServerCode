import "./../App.css"
import SignMessageInput from "./../Blockchain/SignMessage"
import React, { useState, useEffect, useRef } from 'react'; 
import {EditItem} from "./EditItem"

export const ItemBox = ({ID, itemSKU, trait_type, value, itemName, price, imageUrl, quantity, featured, handler}) =>{

    const [editItemShown, setEditItemShown] = useState(false);

    async function setChosenItem(){
        const JSONString = JSON.stringify({ 
            itemSKU : itemSKU,
            trait_type : trait_type,
            value : value,
            itemName : itemName,
            price : price})

        const singedResponse = await SignMessageInput(JSONString)

    }

    function editBox(){
        setEditItemShown(current => !current);
        console.log(featured)
    }

    return(
        <div className="">
            <div className="itemCardContainer">
                <h1>{ID}</h1>
                <h1>{itemName}</h1>
                <div className="shopItemImageSection">
                    <div className="shopItemCard">
                        <img src={imageUrl}/>
                    </div>
                </div>
                {editItemShown && <EditItem 
                                        ID={ID}
                                        itemSKU={itemSKU}
                                        trait_type={trait_type}
                                        value={value}
                                        itemName={itemName}
                                        price={price}
                                        imageUrl={imageUrl}
                                        quantity={quantity}
                                        featured={featured}
                                        handler={setEditItemShown}/>
                                    }
                <button onClick={editBox} className="editButton">Edit</button>
            </div>
        </div>
    )
}