import { useState } from "react";
import { registerUser } from "../services/authAPI";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser({
        name,
        email,
        password,
      });

      localStorage.setItem("token", response.token);
      alert("Registration successful!");
    } catch (e) {
      console.log(e);
      alert("Registration Failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          name="name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          value={email}
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          value={password}
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
            Register
        </button>
      </form>
    </div>
  );
}
