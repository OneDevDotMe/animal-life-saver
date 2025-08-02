import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createContextHook from "@nkzw/create-context-hook";
import { Product } from "@/types";

export const [CartProvider, useCart] = createContextHook(() => {
  const [cart, setCart] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  
  useEffect(() => {
    // Load cart from AsyncStorage
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem("cart");
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
          calculateTotal(parsedCart);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };
    
    loadCart();
  }, []);
  
  useEffect(() => {
    // Save cart to AsyncStorage whenever it changes
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem("cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Error saving cart:", error);
      }
    };
    
    saveCart();
  }, [cart]);
  
  const calculateTotal = (cartItems: Product[]) => {
    const total = cartItems.reduce((sum, item) => {
      const price = item.sale_price || item.price;
      return sum + price;
    }, 0);
    setTotalAmount(total);
  };
  
  const addToCart = (product: Product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };
  
  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const product = cart.find(item => item.id === productId);
    if (!product) return;
    
    const updatedCart = cart.filter(item => item.id !== productId);
    for (let i = 0; i < quantity; i++) {
      updatedCart.push(product);
    }
    
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };
  
  const clearCart = () => {
    setCart([]);
    setTotalAmount(0);
  };
  
  const getCartItemCount = (productId: string) => {
    return cart.filter(item => item.id === productId).length;
  };
  
  return {
    cart,
    totalAmount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
  };
});