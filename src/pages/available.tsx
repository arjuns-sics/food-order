//page that shows all the available dishes
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

const Available = () => {
    const [data, setData] = useState<Data | null>(null)
    const [caloriesFilter, setCaloriesFilter] = useState<number>(100000)
    useEffect(() => {
        fetch(`https://dummyjson.com/recipes/search?q=&?limit=10`)
            .then(res => res.json())
            .then(data => setData(data))
    }, [])
    console.log(data)

    const filteredData = data?.recipes.filter(recipe => recipe.caloriesPerServing <= caloriesFilter)

    return (
        <div>
            {/* nav */}
            <nav className="flex justify-between items-center py-4">
                <div className="flex items-center">
                    <img src="/assets/logo.svg" alt="logo" className="h-8" />
                    <h1 className="text-2xl font-semibold ml-2">Food Order</h1>
                </div>
                <div>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Login</button>
                </div>
            </nav>

            {/* popular */}
            <section className="popular py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-semibold text-center">Popular Dishes</h2>
                    <p className="text-lg text-center mt-4">Some of the popular dishes around you</p>
                    <div className="flex justify-between items-center mt-4">
                        <div className="calories-filter flex items-center">
                            <span className="text-xl font-semibold">Filter by calories: </span>
                            <select className="ml-2" value={caloriesFilter} onChange={e => setCaloriesFilter(parseInt(e.target.value))}>
                                <option value="100000">All</option>
                                <option value="100">Under 100</option>
                                <option value="200">Under 200</option>
                                <option value="300">Under 300</option>
                                <option value="400">Under 400</option>
                                <option value="500">Under 500</option>
                            </select>
                        </div>
                        <div>
                            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Order Now</button>
                        </div>
                    </div>
                    <div className="popular-list grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        {filteredData?.map(recipe => (
                            <div key={recipe.id} className="popular-item bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src={recipe.image} alt={recipe.name} className="w-full h-64 object-cover" />
                                <div className="popular-item-content p-4">
                                    <h3 className="text-xl font-semibold">{recipe.name}</h3>
                                    <p className="text-gray-500 mt-2"> {recipe.servings} servings</p>
                                    <div className="popular-item-info flex justify-between items-center mt-4">
                                        <span className="text-xl font-semibold">₹{Math.floor(recipe.caloriesPerServing * (recipe.difficulty === "Easy" ? 1 : 2) / recipe.servings)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
            {/* footer */}
            <footer className="py-8">
                <div className="container mx-auto px-4">
                    <div className="footer-inner flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-semibold">Food Order</h1>
                        </div>
                        <div>
                            <ul className="footer-menu flex space-x-4">
                                <li><a href="#">Privacy</a></li>
                                <li><a href="#">Terms</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )

}

export default Available