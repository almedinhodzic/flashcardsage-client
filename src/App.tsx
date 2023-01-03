import React, { useEffect, useState } from "react";
import "./App.css";

interface Deck {
  title: string;
  _id: string;
}

function App() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [title, setTitle] = useState("");

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:5000/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    setTitle("");
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/decks");
      setDecks(await response.json());
    })();
  }, []);

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>{deck.title}</li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          id="deck-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <h1>{title}</h1>
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
