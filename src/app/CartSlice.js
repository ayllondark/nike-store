import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const initialState = {
    cartState: false,
    //cartItems: []
    cartItems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    cartTotalAmount: 0,
    cartTotalQantity: 0
}

const CartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {
        setOpenCart: (state, action) => {
            state.cartState = action.payload.cartState;
        },
        setCloseCart: (state, action) => {
            state.cartState = action.payload.cartState;
        },
        setAddItemToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id) // Buscamos los Ids de los articulos existentes y lo comparamos con los Ids de los articulos a querer insetar
            if(itemIndex >=0){
                state.cartItems[itemIndex].cartQuantity += 1
                toast.success(`Item QTY Increased`)
            } else {
                const temp = {...action.payload, cartQuantity: 1} // Primero hacemos una copia de nuestros productos y luego definimos la cantidad 
                //state.cartItems.push(action.payload)
                state.cartItems.push(temp)
                toast.success(`${action.payload.title} added to Cart`)
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItems))
        },
        setRemoveItemFromCart: (state, action) => {
            const removeItem = state.cartItems.filter((item)=> item.id !== action.payload.id)
            state.cartItems = removeItem
            localStorage.setItem("cart", JSON.stringify(state.cartItems))
            toast.success(`${action.payload.title} Removed From Cart`)
        },

        setIncreaseItemQTY: (state, action)=> {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id) // Buscamos los Ids de los articulos existentes y lo comparamos con los Ids de los articulos a querer insetar
            if(itemIndex >=0){
                state.cartItems[itemIndex].cartQuantity += 1
                toast.success(`Item QTY Increased`)
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItems))
        },

        setDecreaseItemQTY: (state, action)=> {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id) // Buscamos los Ids de los articulos existentes y lo comparamos con los Ids de los articulos a querer insetar
            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -= 1
                toast.success(`Item QTY Decreased`)
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItems))
        },

        setClearCartItems: (state, action)=> {
            state.cartItems = []
            toast.success(`Cart Cleared`)
            localStorage.setItem("cart", JSON.stringify(state.cartItems))
        },

        setGetTotals: (state, action)=> {
            let { totalAmount, totalQTY } = state.cartItems.reduce((cartTotal, cartItem)=> {
                const {price, cartQuantity} = cartItem
                const totalprice = price * cartQuantity
                cartTotal.totalAmount +=totalprice
                cartTotal.totalQTY += cartQuantity
                return cartTotal
            }, {
                totalAmount: 0,
                totalQTY: 0,
            })
            state.cartTotalAmount = totalAmount
            state.cartTotalQantity = totalQTY
        }
    }
});

export const {setOpenCart, setCloseCart, setAddItemToCart, setRemoveItemFromCart, setIncreaseItemQTY, setDecreaseItemQTY, setClearCartItems, setGetTotals} = CartSlice.actions;
export const selectCartState = (state) => state.cart.cartState  //state.CART es de nuestro name:"cart" de arriba
export const selectCartItems = (state) => state.cart.cartItems
export const selectTotalAmount = (state) => state.cart.cartTotalAmount
export const selectTotalQTY = (state) => state.cart.cartTotalQantity
export default CartSlice.reducer;