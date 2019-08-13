import React from "react";
import ReactDOM from "react-dom";

const crazyfeeling = "./music/crazyfeeling.mp3";
const Vaadi_Nee_Vaadi = "./music/Vaadi-Nee-Vaadi.mp3";
const Meesaya_Murukku= "/music/Meesaya-Murukku.mp3" ;
const Adiye_Sakkarakatti= "/music/Adiye-Sakkarakatti.mp3";
const Maattikkichey_Maattikkichey = "/music/Maattikkichey-Maattikkichey.mp3";

function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}

class App extends React.Component {
  state = {
    selectedTrack: null,
    player: "stopped",
    currentTime: null,
    duration: null
  };

  componentDidMount() {
    this.player.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration
      });
    });
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedTrack !== prevState.selectedTrack) {
      let track;
      switch (this.state.selectedTrack) {
        case "crazy feeling":
          track = crazyfeeling;
          break;
        case "Vaadi-Nee-Vaadi":
          track = Vaadi_Nee_Vaadi;
          break;
        case "Meesaya-Murukku":
          track = Meesaya_Murukku;
          break;
        case "Adiye-Sakkarakatti":
          track = Adiye_Sakkarakatti;
          break;
        case "Maattikkichey-Maattikkichey":
          track = Maattikkichey_Maattikkichey;
          break;
        default:
          break;
      }
      if (track) {
        this.player.src = track;
        this.player.play();
        this.setState({ player: "playing", duration: this.player.duration });
      }
    }
    if (this.state.player !== prevState.player) {
      if (this.state.player === "paused") {
        this.player.pause();
      } else if (this.state.player === "stopped") {
        this.player.pause();
        this.player.currentTime = 0;
        this.setState({ selectedTrack: null });
      } else if (
        this.state.player === "playing" &&
        prevState.player === "paused"
      ) {
        this.player.play();
      }
    }
  }

  render() {
    const list = [
      { id: 1, title: "crazy feeling" },
      { id: 2, title: "Vaadi-Nee-Vaadi" },
      { id: 3, title: "Meesaya-Murukku" },
      { id: 4, title: "Adiye-Sakkarakatti" },
      { id: 5, title: "Maattikkichey-Maattikkichey" },
    ].map(item => {
      return (
        <li
          key={item.id}
          onClick={() => this.setState({ selectedTrack: item.title })}
        >
          {item.title}
        </li>
      );
    });

    const currentTime = getTime(this.state.currentTime);
    const duration = getTime(this.state.duration);
    var sectionStyle = {
      width: "1500px",
      height: "700px",
      backgroundImage: "url('./music/music.jpg')",
      backgroundSize:     "cover",
      backgroundRepeat:  "no-repeat" ,
      backgroundPosition: " center center" ,
      color: "white",
      fontSize:"50px"
    };

    return (
      <>
      <div style={ sectionStyle }>
        <h1>My Music Player</h1>
        <ul>{list}</ul>
        <div>
          {this.state.player === "paused" && (
            <button onClick={() => this.setState({ player: "playing" })}>
              Play
            </button>
          )}
          {this.state.player === "playing" && (
            <button onClick={() => this.setState({ player: "paused" })}>
              Pause
            </button>
          )}
          {this.state.player === "playing" || this.state.player === "paused" ? (
            <button onClick={() => this.setState({ player: "stopped" })}>
              Stop
            </button>
          ) : (
            ""
          )}
        </div>
        {this.state.player === "playing" || this.state.player === "paused" ? (
          <div>
            {currentTime} / {duration}
          </div>
        ) : (
          ""
        )}
        <audio ref={ref => (this.player = ref)} />
        </div>
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
