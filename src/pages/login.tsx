//login page
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")

    useEffect(() => {
        if (email === "" || password === "") {
            setError("Please fill all the fields")
        } else {
            setError("")
        }
    }, [email, password])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (email === "" || password === "") {
            setError("Please fill all the fields")
        } else {
            setError("")
            navigate("/available")
        }
    }

    return (
        <div className="container mx-auto px-4">
            <div className="hero">
                <div className="hero-inner text-center">
                    <h1 className="text-4xl md:text-6xl font-semibold">Login</h1>
                    <p className="text-lg mt-4">Login to your account</p>
                    <form onSubmit={handleSubmit} className="login-form mt-8">
                        <div className="form-control">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-lg" placeholder="Enter your email" />
                        </div>
                        <div className="form-control mt-4">
                            <label htmlFor="password">Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg" placeholder="Enter your password" />
                        </div>
                        <div className="form-control mt-4">
                            <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Login</button>
                        </div>
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </form>
                    <div className="login-cta mt-8">
                        <Link to={"/register"} className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login