import React from 'react';
import './App.css';

class App extends React.Component{

  render(){
    return (
      <div className="App">
        <div className="header">
          <Header />
        </div>
        <div className="game-on">
          <Game />
        </div>
      </div>
  )
}
}

// Header with title of app
class Header extends React.Component {
  render() {
    return(
      <div className="header">
        <h1>The Billboard Hot 100 GUESSING GAME</h1>
        <h2>Given three songs on the Billboard Hot 100, guess 
          their relative ranking and see where YOU land on the scale 
          from "Way 2 Sexy" ;) to "A-O-K" :/ to "Ain't Shit" :,(</h2>
      </div>
    );
  }
}

// Card class that holds a button with song and artist info on it
// If clicked, calls handleGuess method in Board class 
function Card(props) {
  return (
    <div>
        <button className="card" onClick={props.onClick}>
          {props.song}
        </button>
        <h3>{props.guess} </h3>
        {props.revealRank && <h3> REAL RANK -- {props.rank}</h3>}
    </div>
  );
}

// Submit button that appears once each Card has been clicked at least once
// Triggers handleSubmit button in Board class
function Submit(props) {
  if (!props.show) {
    return null;
  }
  return (
    <button className="submit" onClick={props.onClick}> SUBMIT </button>
  );
}

// Board class that renders Cards (song buttons) and Submit
// holds much of the state
class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cards: Array(3).fill(null),
      submitIsOption: false,
      numCorrect: 0,
      gameOver: false,
    };
  }

// called when a Card (song button) is clicked, updates cards array to track guesses
handleGuess(i) {
  if (!this.state.gameOver) {
    const cards = this.state.cards.slice();
    if (cards[i] !== 1) {
      cards[i] = 1;
      for (var j = 0; j < 3; j++) {
        if (i !== j && cards[j] && cards[j] < 3) {
          cards[j]++;
        }
      }
      var noEmpty = false;
      if (cards[0] && cards[1] && cards[2]) {noEmpty = true;}
      this.setState({cards: cards, submitIsOption: noEmpty})
    }
  }
}

// called when Submit is clicked, evaluates user's guesses
handleSubmit() {
  var count = 0;
  for (var m = 0; m < 3; m++) {
    if (this.state.cards[m] === this.props.answer[m]) { count++; }
  }
  this.setState({ numCorrect: count});
  this.setState({ gameOver: true });
}

  renderCard(i) {
    return ( 
      <Card 
        song={this.props.songsToGuess[i].track} 
        rank={this.props.songsToGuess[i].rank} 
        id={i} 
        guess={this.state.cards[i]}
        onClick={() => this.handleGuess(i)}
        revealRank={this.state.gameOver}
        />
    );
  }

  render() {
    const status = 'Click the songs from last to first to rank them!' + (this.state.submitIsOption ? ' Press submit when you\'re ready to check your answers!' : '');
    return(
      <div>
      <div className="status">{status}</div>
        <div className="options">
          {this.renderCard(0)}
          {this.renderCard(1)}
          {this.renderCard(2)}
          <Submit show={this.state.submitIsOption} numCorrect={this.state.numCorrect} onClick={() => this.handleSubmit()}/>
          {this.state.gameOver &&
            <h3>You got {this.state.numCorrect} right!</h3>
          }
        </div>
      </div>
    );
  }
}

// Game class that renders Board, makes initial API call, selects three songs to pass to Board
// Finds correct ranking of the three given songs
class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      songs:[],
      gameOver: false,
    };
  }
  componentDidMount() {
    fetch("http://localhost:9000/billboardAPI")
      .then(res => res.text())
      .then(res => JSON.parse(res))
      .then(res => this.setState({songs: res}));
  }

  renderBoard() {
    var threeSongs = [];
    for (var i = 0; i < 3; i++) {
      var ind = Math.floor(Math.random()*this.state.songs.length);
      var s = this.state.songs[ind];
      var song = {track: "", rank: -1};
      song.track = s;
      song.rank = ind+1;
      threeSongs.push(song);
    }
    // find correct ranking array to compare to cards
    var rankings = [threeSongs[0].rank, threeSongs[1].rank, threeSongs[2].rank];
    var relativeRank = [];
    if (rankings[0] <= rankings[1] && rankings[0] <= rankings[2]) {
      if (rankings[1] <= rankings[2]) {relativeRank = [1,2,3]}
      else {relativeRank = [1,3,2]};
    } else if (rankings[1] <= rankings[0] && rankings[1] <= rankings[2]) {
      if (rankings[0] <= rankings[2]) {relativeRank = [2,1,3]}
      else {relativeRank = [3,1,2]};
    } else { // rankings[2] is smallest
      if (rankings[0] <= rankings[1]) {relativeRank = [2,3,1]}
      else {relativeRank = [3,2,1]};
    }
    return <Board songsToGuess = {threeSongs} 
                  answer = {relativeRank}
                  />;
  }

  render() {
    return (
      <div className="game">
        {this.renderBoard()}
      </div>
    );
  }
}

export default App;