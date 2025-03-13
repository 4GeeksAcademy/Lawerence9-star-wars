import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    
    // Estado para almacenar el usuario
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Estados para los campos del formulario
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    // Actualizar los estados solo si el usuario cambia
    useEffect(() => {
        if (user) {
            setFirstName(user.first_name || "");
            setLastName(user.last_name || "");
            setEmail(user.email || "");
        }
    }, [user]); // Se ejecuta solo si `user` cambia

    const handleSubmitEdit = (event) => {
        event.preventDefault();
        if (!user || !user.id) {
            console.log("User ID is missing");
            return;
        }
    
        const updatedUser = { 
            first_name: firstName, 
            last_name: lastName, 
            email: email 
        };

        actions.updateProfile(updatedUser);
    };

    if (!user) return null; // Evita renderizado innecesario

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Profile</h2>
            <form className="card p-4 shadow" onSubmit={handleSubmitEdit}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button className="btn btn-primary w-100 py-2 p-4" type="submit">Save changes</button>
            </form>
        </div>
    );
};
