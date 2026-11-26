import { useAuth } from "../contexts/AuthProvider";
import { Link, useNavigate } from "react-router";
import "./Auth.css";

export default function Signin() {
    const { signin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const username = (form.elements.namedItem("username") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;
        const success = await signin({ username, password, email });

        if (success) {
            navigate("/login");
        }
    }
    return (
        <div className="container auth-page">
            <div className="auth-card">
                <h1 className="auth-card__title">INSCRIPTION</h1>
                <form onSubmit={handleSubmit}>
                    <label className="form-label w-100 mb-3">
                        Nom d'utilisateur
                        <input name='username' type='text' className="form-control mt-1" required />
                    </label>
                    <label className="form-label w-100 mb-3">
                        Email
                        <input name='email' type='email' className="form-control mt-1" required />
                    </label>
                    <label className="form-label w-100 mb-4">
                        Mot de passe
                        <input type='password' name='password' className="form-control mt-1" required />
                    </label>
                    <button type="submit" className="btn btn-success w-100">S'inscrire</button>
                </form>
                <p className="auth-card__switch">
                    Déjà un compte ? <Link to="/login">Se connecter</Link>
                </p>
            </div>
        </div>
    )
}
