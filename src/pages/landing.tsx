import { useEffect, useState } from "react";

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

// food order landing page
const Landing = () => {
    const [data, setData] = useState<Data | null>(null);
    useEffect(() => {
        fetch('https://dummyjson.com/recipes?limit=10')
            .then(res => res.json())
            .then(data => setData(data))
    }, []);
    return (
        <>
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
            {/* hero */}
            <header className="hero">
                <div className="container mx-auto px-4">
                    <div className="hero-inner text-center">
                        <h1 className="text-4xl md:text-6xl font-semibold">Good Food is Good Mood</h1>
                        <p className="text-lg mt-4">Enjoy your meal with no stress</p>
                        <div className="hero-cta mt-8">
                            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Order Now</button>
                        </div>
                    </div>
                </div>
            </header>
            {/* popular */}
            <section className="popular py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-semibold text-center">Popular Dishes</h2>
                    <p className="text-lg text-center mt-4">Some of the popular dishes around you</p>
                    <div className="popular-list grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        {data?.recipes.map(recipe => (
                            <div key={recipe.id} className="popular-item bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src={recipe.image} alt={recipe.name} className="w-full h-64 object-cover" />
                                <div className="popular-item-content p-4">
                                    <h3 className="text-xl font-semibold">{recipe.name}</h3>
                                    <p className="text-gray-500 mt-2"> {recipe.servings} servings</p>
                                    <div className="popular-item-info flex justify-between items-center mt-4">
                                        <span className="text-xl font-semibold">${Math.floor(recipe.caloriesPerServing / recipe.servings)}</span>
                                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Order Now</button>
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
        </>
    );
}

export default Landing;