import {ItemBox} from "./ItemBox"
import {AddItem} from "./AddItem"


export const ItemArray = ({shopItemArray}) =>{

    return(
        <div className="shopRow">
            {shopItemArray.map(function(items, index){
                return (<ItemBox 
                            key={index}
                            ID={items.ID}
                            itemSKU={items.itemSKU}
                            trait_type={items.trait_type}
                            value={items.value}
                            itemName={items.name}
                            price={items.price}
                            imageUrl={items.imageUrl}
                            quantity={items.quantity}
                            featured={items.featured}
                        />)
                })}
        </div>
    )
}