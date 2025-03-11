//page that shows all the available dishes
import { useEffect, useState } from "react"
import type { Menu } from "../../models/menu"

const Available = () => {
    const [data, setData] = useState<Menu[] | null>(null)
    const [caloriesFilter, setCaloriesFilter] = useState<number>(100000)
    const [searchQuery, setSearchQuery] = useState<string>("")
    useEffect(() => {
        fetch(`/api/menu`)
            .then(res => res.json())
            .then(data => setData(data))
    }, [searchQuery])
    console.log(data)

    const debouncedSetSearchQuery = debounce(setSearchQuery, 500);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSetSearchQuery(e.target.value);
    }

    return (
        <div>
            {/* search bar */}
            <section className="search-bar py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-semibold text-center">Search for food</h2>
                    <p className="text-lg text-center mt-4">Enter a name of a dish you are looking for</p>
                    <div className="search-bar-form flex justify-center items-center mt-4">
                        <input type="text" onChange={handleSearch} className="px-4 py-2 rounded-lg" placeholder="Search" />
                    </div>
                </div>
            </section>
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
                        {data?.map(recipe => (
                            <div key={recipe.id} className="popular-item bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src={recipe.image} alt={recipe.name} className="w-full h-64 object-cover" />
                                <div className="popular-item-content p-4">
                                    <h3 className="text-xl font-semibold">{recipe.name}</h3>
                                    <p className="text-gray-500 mt-2"> {recipe.description}</p>
                                    <div className="popular-item-info flex justify-between items-center mt-4">
                                        <span className="text-xl font-semibold">₹{Math.round(recipe.price * 100)/10}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </div>
    )

}

const debounce = (fn: Function, delay: number) => {
    let timer: any;
    return (...args: any[]) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

export default Available