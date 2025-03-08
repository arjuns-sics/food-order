// profile page. just use placeholder data for now. It shows the user's name and address for delivery.
import { useEffect, useState } from "react"
import { Link } from "react-router"

const Profile = () => {
    return (
        <div className="container mx-auto px-4">
            <div className="hero flex items-center justify-center">
                <div className="hero-inner">
                    <img src="https://i.pravatar.cc/150?img=11" alt="profile picture" className="rounded-full h-24 w-24 mr-4" />
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl md:text-6xl font-semibold">Profile</h1>
                        <p className="text-lg mt-4">Your profile</p>
                        <p className="text-lg mt-4">Name: John Doe</p>
                        <p className="text-lg mt-4">Address: 123 Main St, Anytown, USA</p>
                        <div className="flex justify-between mt-4">
                            <Link to="/available" className="btn">Go back</Link>
                            <Link to="/cart" className="bg-yellow-500 text-white px-4 py-2 rounded-lg">View Cart</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile