import { useState } from "react";
import { useUser } from "./contexts/UserContext";
import { useGame } from "./contexts/GameContext";

function RegisterScreen(){
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [message, setMessage] = useState("");

    const {setToken, setUtilisateur} = useUser();
    const {setAuteurId} = useGame();

    const handleRegister = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/utilisateurs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nom, email, motDePasse }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'inscription");
            }

            const data = await response.json();
            setToken(data.token);
            setUtilisateur(data.utilisateur);
            setAuteurId(data.utilisateur._idUtilisateur);
            setMessage("Inscription réussie !");
        } catch (error) {
            console.error(error);
            setMessage("Erreur lors de l'inscription");
        }
    }
    return (
        <div className="container">
            <h2>Inscription</h2>
            <input
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
            />
            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Mot de passe"
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
            />
            <button onClick={handleRegister}>S'inscrire</button>
            {message && <p>{message}</p>}
        </div>
    );
}
export default RegisterScreen;