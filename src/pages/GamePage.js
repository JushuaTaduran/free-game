import { useState, useEffect } from "react";
import axios from "axios";

// router
import { useParams } from "react-router-dom";

export const GamePage = () => {
  const { gameId } = useParams();

  const [game, setGame] = useState([]);

  useEffect(() => {
    const handleGameList = () => {
      const options = {
        method: "GET",
        url: "https://free-to-play-games-database.p.rapidapi.com/api/game?result=10",
        params: { id: gameId },
        headers: {
          "X-RapidAPI-Key":
            "b0b5a1a45dmsh6fef2056aea44efp1c6880jsna6ad8a544da5",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      };
      axios
        .request(options)
        .then((response) => {
          setGame(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    handleGameList();
  }, [gameId]);

  return (
    <div className="game-page">
      <img src={game.thumbnail} alt="" />
      <h1>{game.title}</h1>
      <p>{game.description}</p>
    </div>
  );
};

export default GamePage;
