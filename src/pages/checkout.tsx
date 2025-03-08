// checkout page. It shows the user's cart items and allows them to checkout.
import { useEffect, useState } from "react"
import { Link } from "react-router"

interface Data {
    recipes: Recipe[]
    total: number
    skip: number
    limit: number
}

interface Recipe {
    id: number
    name: string
    ingredients: string[]
    instructions: string[]
    prepTimeMinutes: number
    cookTimeMinutes: number
    servings: number
    difficulty: string
    cuisine: string
    caloriesPerServing: number
    tags: string[]
    userId: number
    image: string
    rating: number
    reviewCount: number
    mealType: string[]
}

interface CartItem {
    image: string | undefined
    id: number
    name: string
    servings: number
    calories: number
}

const Checkout = () => {
    const [data, setData] = useState<Data | null>(null)
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [total, setTotal] = useState<number>(0)
    const [tax, setTax] = useState<number>(0)
    const [totalWithTax, setTotalWithTax] = useState<number>(0)

    useEffect(() => {
        fetch('https://dummyjson.com/recipes?limit=3')
            .then(res => res.json())
            .then(data => {
                setData(data)
                const initialCartItems = data.recipes.reduce((acc: CartItem[], recipe: Recipe) => {
                    acc.push({
                        id: recipe.id,
                        name: recipe.name,
                        servings: recipe.servings,
                        calories: Math.floor(recipe.caloriesPerServing / recipe.servings),
                        image: recipe.image
                    })
                    return acc
                }, [])
                setCartItems(initialCartItems)
            })
    }, [])

    const handleDecrement = (id: number) => {
        setCartItems(prevCartItems => {
            const index = prevCartItems.findIndex(item => item.id === id)
            if (index === -1) {
                return prevCartItems
            }
            const newCartItems = [...prevCartItems]
            newCartItems[index].servings -= 1
            return newCartItems
        })
    }

    const handleIncrement = (id: number) => {
        setCartItems(prevCartItems => {
            const index = prevCartItems.findIndex(item => item.id === id)
            if (index === -1) {
                return prevCartItems
            }
            const newCartItems = [...prevCartItems]
            newCartItems[index].servings += 1
            return newCartItems
        })
    }

    const handleCheckout = () => {
        // calculate total
        const total = cartItems.reduce((acc, item) => acc + item.calories * item.servings, 0)
        const tax = Math.floor(total * 0.1)
        const totalWithTax = total + tax
        console.log(total, tax, totalWithTax)
    }

    return (
        <div className="container mx-auto px-4">
            <div className="hero">
                <div className="hero-inner text-center">
                    <h1 className="text-4xl md:text-6xl font-semibold">Checkout</h1>
                    <p className="text-lg mt-4">Checkout your order</p>
                    <div className="cart-list grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        {data?.recipes.map(recipe => (
                            <div key={recipe.id} className="cart-item bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src={recipe.image} alt={recipe.name} className="w-full h-64 object-cover" />
                                <div className="cart-item-content p-4">
                                    <h3 className="text-xl font-semibold">{recipe.name}</h3>
                                    <p className="text-gray-500 mt-2">{recipe.servings} servings</p>
                                    <div className="cart-item-controls flex items-center mt-4">
                                        <button onClick={() => handleDecrement(recipe.id)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg">-</button>
                                        <span className="mx-4">{cartItems.find(item => item.id === recipe.id)?.servings}</span>
                                        <button onClick={() => handleIncrement(recipe.id)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg">+</button>
                                    </div>
                                    <div className="cart-item-info flex justify-between items-center mt-4">
                                        <span className="text-xl font-semibold">₹{Math.floor(recipe.caloriesPerServing / recipe.servings) * (cartItems.find(item => item.id === recipe.id)?.servings ?? 0)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="checkout-total bg-white rounded-lg shadow-lg overflow-hidden p-4 mt-8">
                        <h3 className="text-4xl font-semibold">Total</h3>
                        <p className="text-lg mt-2">Total: ₹{total}</p>
                        <p className="text-lg mt-2">Tax (10%): ₹{tax}</p>
                        <p className="text-lg mt-2">Delivery: Free</p>
                        <p className="text-lg mt-2">Total with tax: ₹{totalWithTax}</p>
                    </div>
                    <div className="checkout-cta mt-8">
                        <button onClick={handleCheckout} className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Checkout</button>
                    </div>
                </div>
                <div className="hero-inner text-center">
                    <h1 className="text-4xl md:text-6xl font-semibold">Order Summary</h1>
                    <p className="text-lg mt-4">Order summary</p>
                    <div className="cart-list grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
                                <div className="cart-item-content p-4">
                                    <h3 className="text-xl font-semibold">{item.name}</h3>
                                    <p className="text-gray-500 mt-2">{item.servings} servings</p>
                                    <div className="cart-item-controls flex items-center mt-4">
                                        <button onClick={() => handleDecrement(item.id)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg">-</button>
                                        <span className="mx-4">{item.servings}</span>
                                        <button onClick={() => handleIncrement(item.id)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg">+</button>
                                    </div>
                                    <div className="cart-item-info flex justify-between items-center mt-4">
                                        <span className="text-xl font-semibold">₹{Math.floor(item.calories * item.servings)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="checkout-total bg-white rounded-lg shadow-lg overflow-hidden p-4 mt-8">
                        <h3 className="text-4xl font-semibold">Total</h3>
                        <p className="text-lg mt-2">Total: ₹{total}</p>
                        <p className="text-lg mt-2">Tax (10%): ₹{tax}</p>
                        <p className="text-lg mt-2">Delivery: Free</p>
                        <p className="text-lg mt-2">Total with tax: ₹{totalWithTax}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout