import { useEffect, useState } from "react"

// food preview page
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

const FoodPreview = () => {
    const [data, setData] = useState<Recipe | null>(null)
    useEffect(() => {
        fetch('https://dummyjson.com/recipes/1')
            .then(res => res.json())
            .then(data => setData(data))
    }, [])
    return (
        <main className="container mx-auto px-4">
            <div className="hero">
                <div className="hero-inner text-center">
                    <h1 className="text-4xl md:text-6xl font-semibold">{data?.name}</h1>
                    <p className="text-lg mt-4">{data?.servings} servings</p>
                    <div className="hero-cta mt-8">
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Order Now</button>
                    </div>
                </div>
            </div>
            {/* ingredients */}
            {data?.ingredients && data?.ingredients.length > 0 && (
                <section className="ingredients py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-semibold text-center">Ingredients</h2>
                        <p className="text-lg text-center mt-4">All the ingredients for this dish</p>
                        <div className="ingredients-list grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            {data?.ingredients.map(ingredient => (
                                <div key={ingredient} className="ingredients-item bg-white rounded-lg shadow-lg overflow-hidden">
                                    <div className="ingredients-item-content p-4">
                                        <h3 className="text-xl font-semibold">{ingredient}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

        </main>
    )
}

export default FoodPreview;