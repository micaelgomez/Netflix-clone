import "./listItem.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  const getMovie = async () => {
    try {
      const res = await axios.get("/movies/find/" + item, {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDlmMjUxMGU2YzZhMjVkZDVkODJlNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTAzMzU2NywiZXhwIjoxNjQ5NDY1NTY3fQ.3XnVMrlzTYdXdGmzeZh7KFgitIt5IkDuc1uwCXFriyo",
        },
      });
      setMovie(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovie();
  }, [item]);

  return (
    <Link to={"/watch"} state={movie}>
      <div
        className="listitem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt="" />

        {isHovered && (
          <>
            <video src={movie.video} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrowIcon className="icon" />
                <AddIcon className="icon" />
                <ThumbUpOutlinedIcon className="icon" />
                <ThumbDownAltOutlinedIcon className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre} </div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
