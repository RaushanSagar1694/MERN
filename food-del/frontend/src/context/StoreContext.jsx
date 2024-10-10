import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";



export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    const url = "http://localhost:400"; // Corrected URL format
    const [token, setToken] = useState(""); // Fixed typo from cosnt to const

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


    useEffect(() => {
        console.log(localStorage.getItem("token"));
        
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
        }
    },[])

    // useEffect(() => {
    //     console.log(cartItems);
    // }, [cartItems]);

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
