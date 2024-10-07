
import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);



//create StoreContext that store the all data
const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev, [itemId] : 1 }));
        }
        else{
            setCartItems((prev) => ({...prev, [itemId] : prev[itemId]+1 }));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };


    // calculate Total Amount
    const getTotalCartAmount = () =>{
        let totalAmout = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmout += itemInfo.price * cartItems[item];
            }
        }
        return totalAmout;
    }


    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])



    // passing the data
    const contextValue = {
        food_list, 
        cartItems, 
        addToCart, 
        removeFromCart, 
        getTotalCartAmount
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider;