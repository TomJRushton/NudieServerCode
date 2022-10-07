import './../App.css';
import { Button } from 'react-bootstrap'
import React, { useState, useEffect, useRef } from 'react'; 
import SignMessageInput from "./../Blockchain/SignMessage"
import {SendAPIPost} from "./../Blockchain/BackEndAPIs"

export const AddItem = ({handler}) => {
    const inputRef = useRef(null);
    const [img, setImg] = useState();

    const [shopItems, setShopItems] = useState([])
    const [shopLength, setShopLength] = useState()
    const [addItemShown, setAddItemShown] = useState(false);
    const [traitValue, setTraitValue] = useState("Not Set")
    const [layerValue, setLayerValue] = useState("Not Set")

    useEffect(() => {
        RetrieveShopItems();
        spliceURL()
    })
    //https://nudies.s3.us-west-1.amazonaws.com/Traits/Skins/Light+Brown.png

    async function spliceURL(){
        let imgUrlSplice = document.getElementById("addImgUrl").value
        const afterLastSlash = imgUrlSplice.substring(imgUrlSplice.lastIndexOf('/') + 1);
        const removedExt = afterLastSlash.replace(/\.[^/.]+$/, "")
        const finalvalue = removedExt.split('+').join(' ');

        const afterLastSlashWithSlash = imgUrlSplice.substring(imgUrlSplice.lastIndexOf('/'));
        const traitBeforeSlash = imgUrlSplice.replace(afterLastSlashWithSlash, "")
        const finalTrait = traitBeforeSlash.substring(traitBeforeSlash.lastIndexOf('/') + 1);

        setTraitValue(finalvalue)
        setLayerValue(finalTrait)
    }

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
        setShopLength(actualData.shopItems.length)
        //return actualData.shopItems.length    
    }

    function hideBox(){
        handler(current => !current)
    }

    async function submit(){
        let addName = document.getElementById("addName").value;
        let addPrice = document.getElementById("addPrice").value;
        let imageUrl = document.getElementById("addImgUrl").value
        let addQuantity = document.getElementById("addQuantity").value
        let featuredCheckboxStatus = document.getElementById("featuredCheckbox").checked

        console.log(shopLength)
        let addID = (shopLength + 1)

        if(addName.length > 0 && addPrice.length > 0 && traitValue.length > 0 && layerValue.length > 0){
          const JSONString = JSON.stringify({ 
            function: "AddBox",
            itemID: addID,
            name: addName,
            value: traitValue,
            trait_type: layerValue,
            imageUrl: imageUrl,
            price : addPrice,
            quantity: addQuantity,
            featured: featuredCheckboxStatus})
    
          const singedResponse = await SignMessageInput(JSONString)
          SendAPIPost(singedResponse)
          console.log(singedResponse)
        }

    }

    const addPicture = () => {
        // 👇️ open file input box on click of other element
        inputRef.current.click();
    };
    
    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];
        setImg(URL.createObjectURL(fileObj));
        if (!fileObj) {
          return;
        }
        
        console.log('fileObj is', fileObj);

        // 👇️ reset file input
        event.target.value = null;
    
        // 👇️ is now empty
        console.log(event.target.files);
    
        // 👇️ can still access file object here
        console.log(fileObj);
        console.log(fileObj.name);
    };

    function renderImage(){
        setImg(document.getElementById("addImgUrl").value)
    }

  return (
    <div className="controlContainer">
        <h1>Add Item</h1>
        <h2>Item Name:</h2>
        <input placeholder="Add Name" id="addName" className="itemNameInput"></input>

        <h2>Item Picture:</h2>
        <div className='itemContainer'>
            <div className='itemPicture'>
                <img src={img} alt="" />
                {/* <Button onClick={addPicture} className="itemPictureAdd">+</Button>                 */}
            </div>
        </div>
        <input placeholder="Add Image Url" id="addImgUrl" className="itemImgInput"></input>
        <button className='imageButton' onClick={renderImage}>Load</button>
        <h3>Trait Value: {traitValue}</h3>
        <h3>Layer Value: {layerValue}</h3>
        <input
            style={{display: 'none'}}
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
        />

        <h2>Item Price:</h2>
        <input placeholder="Add Price" id="addPrice" type="number" className="itemPriceInput"></input>

        <h2>Item Quantity:</h2>
        <input placeholder="Add Quantity" id="addQuantity" type="number" className="itemPriceInput"></input>

        <div className='featuredContainer'>
            <h2>Featured Item:</h2>
            <input className='featuredCheckbox' type="checkbox" id="featuredCheckbox"></input>
        </div>

        <div className='buttonContainer'>
            <Button onClick={hideBox} className='closeBox'>Close</Button>
            <Button onClick={submit} className='submit'>Save</Button>
        </div>
    </div>
  );
}
