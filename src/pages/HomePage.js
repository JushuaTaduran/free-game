import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// components
import { Game } from "../component/Game";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState([]);

  useEffect(() => {
    const handleGameList = () => {
      const options = {
        method: "GET",
        url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
        headers: {
          "X-RapidAPI-Key":
            "b0b5a1a45dmsh6fef2056aea44efp1c6880jsna6ad8a544da5",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      };
      axios
        .request(options)
        .then((response) => {
          setGames(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    handleGameList();
  }, []);

  return (
    <div className="home">
      <input
        type="text"
        placeholder="Search games..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {games
        .filter((game) => {
          if (search === "") {
            return true;
          } else if (game.title.toLowerCase().includes(search.toLowerCase())) {
            return true;
          }
          return false;
        })
        .map((game, index) => {
          return (
            <Link key={index} to={`/game/${game.id}`}>
              {game.title}
            </Link>
          );
        })}
      {games.slice(0, 10).map((game, index) => {
        return <Game key={index} game={game} />;
      })}
    </div>
  );
};

export default HomePage;
