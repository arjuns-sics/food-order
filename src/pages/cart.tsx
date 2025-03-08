// cart page. shows the cart items with their prices and total
import { useEffect, useState } from "react"
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

const Cart = () => {
    const [data, setData] = useState<Data | null>(null)
    const [counts, setCounts] = useState<{ [key: number]: number }>({})

    useEffect(() => {
        fetch('https://dummyjson.com/recipes?limit=3')
            .then(res => res.json())
            .then(data => {
                setData(data)
                const initialCounts = data.recipes.reduce((acc: { [key: number]: number }, recipe: Recipe) => {
                    acc[recipe.id] = 1
                    return acc
                }, {})
                setCounts(initialCounts)
            })
    }, [])

    const handleIncrement = (id: number) => {
        setCounts(prevCounts => ({
            ...prevCounts,
            [id]: prevCounts[id] + 1
        }))
    }

    const handleDecrement = (id: number) => {
        setCounts(prevCounts => ({
            ...prevCounts,
            [id]: Math.max(prevCounts[id] - 1, 1)
        }))
    }

    const total = data?.recipes.reduce((acc, recipe) => acc + Math.floor(recipe.caloriesPerServing / recipe.servings) * counts[recipe.id], 0) || 0
    const tax = Math.floor(total * 0.1)
    const totalWithTax = total + tax

    return (
        <div>
            {/* cart */}
            <section className="cart py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-semibold text-center">Your Cart</h2>
                    <p className="text-lg text-center mt-4">Your cart items</p>
                    <div className="cart-list grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        {data?.recipes.map(recipe => (
                            <div key={recipe.id} className="cart-item bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src={recipe.image} alt={recipe.name} className="w-full h-64 object-cover" />
                                <div className="cart-item-content p-4">
                                    <h3 className="text-xl font-semibold">{recipe.name}</h3>
                                    <p className="text-gray-500 mt-2">{recipe.servings} servings</p>
                                    <div className="cart-item-controls flex items-center mt-4">
                                        <button onClick={() => handleDecrement(recipe.id)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg">-</button>
                                        <span className="mx-4">{counts[recipe.id]}</span>
                                        <button onClick={() => handleIncrement(recipe.id)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg">+</button>
                                    </div>
                                    <div className="cart-item-info flex justify-between items-center mt-4">
                                        <span className="text-xl font-semibold">₹{Math.floor(recipe.caloriesPerServing / recipe.servings) * counts[recipe.id]}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-total bg-white rounded-lg shadow-lg overflow-hidden p-4 mt-8">
                        <h3 className="text-4xl font-semibold">Total</h3>
                        <p className="text-lg mt-2">Total: ₹{total}</p>
                        <p className="text-lg mt-2">Tax (10%): ₹{tax}</p>
                        <p className="text-lg mt-2">Delivery: Free</p>
                        <p className="text-lg mt-2">Total with tax: ₹{totalWithTax}</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Cart