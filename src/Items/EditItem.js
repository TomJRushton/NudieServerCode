import './../App.css';
import { Button } from 'react-bootstrap'
import React, { useState, useEffect, useRef } from 'react'; 
import SignMessageInput from "./../Blockchain/SignMessage"
import {SendAPIPost} from "./../Blockchain/BackEndAPIs"

export const EditItem = ({ID, itemSKU, trait_type, value, itemName, price, imageUrl, quantity, featured, handler}) => {
  const inputRef = useRef(null);
  const [editImg, setEditImg] = useState(imageUrl);
  const [traitValue, setTraitValue] = useState("Not Set")
  const [layerValue, setLayerValue] = useState("Not Set")
  const [featuredChecked, setFeaturedChecked] = useState(false)

  function hideBox(){
    handler(current => !current)
  }

  useEffect(() => {
    spliceURL()
  })

  useEffect(() => {
    if(featured == "true"){
      setFeaturedChecked(true)
    }else{
      setFeaturedChecked(false)
    }
  }, [])

  async function submit(){
    let newName = document.getElementById("newName").value;
    let newPrice = document.getElementById("newPrice").value;
    let imageUrl = document.getElementById("addImgUrl").value
    let newQuantity = document.getElementById("newQuantity").value
    let featuredCheckboxStatus = document.getElementById("featuredCheckbox").checked

    if(newName.length > 0 && newPrice.length > 0){
      const JSONString = JSON.stringify({ 
        function: "EditBoxID",
        itemID: ID,
        name: newName,
        value: traitValue,
        trait_type: layerValue,
        imageUrl: imageUrl,
        price : newPrice,
        quantity : newQuantity,
        featured: featuredCheckboxStatus})

      const singedResponse = await SignMessageInput(JSONString)
      SendAPIPost(singedResponse)
      console.log(singedResponse)
    }
  }

  function renderImage(){
    setEditImg(document.getElementById("addImgUrl").value)
  } 

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

  const addPicture = () => {
    inputRef.current.click();
  };

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    setEditImg(URL.createObjectURL(fileObj));
    if (!fileObj) {
      return;
    }
  };

async function deleteBox(){
  const JSONString = JSON.stringify({ 
      function: "DeleteBoxID",
      itemID : ID})

  const singedResponse = await SignMessageInput(JSONString)
  SendAPIPost(singedResponse)
  console.log(singedResponse)

}

async function changeCheckbox(){
  if(featuredChecked == false){
    setFeaturedChecked(true)
  }
  if(featuredChecked == true){
    setFeaturedChecked(false)
  }
}


  return (
    <div className="EditControlContainer">
        <h1>Edit Item</h1>
        <h2>Item Name:</h2>
        <h3>{itemName}</h3>
        <input placeholder="New Name" id='newName' className="itemNameInput"></input>

        <h2>Item Picture:</h2>
        <div className='itemContainer'>
          <div className='itemPicture'>
            <img src={editImg} alt="" />
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
        <h3>{price}</h3>
        <input type="number" id='newPrice' placeholder="New Price" className="itemPriceInput"></input>

        <h2>Item Quantity:</h2>
        <h3>{quantity}</h3>
        <input placeholder="Add Quantity" id="newQuantity" type="number" className="itemPriceInput"></input>

        <div className='featuredContainer'>
            <h2>Featured Item:</h2>
            <input className='featuredCheckbox' type="checkbox" id="featuredCheckbox" checked={featuredChecked} onChange={changeCheckbox}></input>
        </div>

        <div className='buttonContainer'>
            <Button onClick={hideBox} className='closeBox'>Close</Button>
            <Button onClick={deleteBox} className='closeBox'>Delete</Button>
            <Button onClick={submit} className='submit'>Save</Button>
        </div>
    </div>
  );
}
