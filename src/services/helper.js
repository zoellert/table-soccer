import { TEAM1_FRONT_PLAYER, TEAM1_REAR_PLAYER, TEAM2_FRONT_PLAYER, TEAM2_REAR_PLAYER, REAR_PLAYER, FRONT_PLAYER } from '../constants';
import Player from '../entities/Player';
import GameCollection from '../collections/GameCollection';
let getState;

export const setGetState = (_getState) => {
  getState = _getState;
};

// Players
export const getPlayerByName = name => getState().players.filter(p => p.name === name)[0];

export const getWinnerLoserPlayersByGame = game => [
  game.winners.filter(player => player.position === REAR_PLAYER)[0],
  game.winners.filter(player => player.position === FRONT_PLAYER)[0],
  game.losers.filter(player => player.position === FRONT_PLAYER)[0],
  game.losers.filter(player => player.position === REAR_PLAYER)[0]
];

export const getGames = () => new GameCollection(getState().games);

export const getPlayers = () => getState().players;

export const getScoreByGame = game => [
  game.winners[0].score + game.winners[1].score,
  game.losers[0].score + game.losers[1].score
];

export const getTempScoreByGame = (game, index) => {
  const subTimeline = game.scoreTimeline.slice(0, index + 1);

  return subTimeline.reduce((score, scorer) => {
    if (scorer.position === TEAM1_FRONT_PLAYER || scorer.position === TEAM1_REAR_PLAYER) {
      score[0]++;
    } else {
      score[1]++;
    }

    return score;
  }, [0, 0]);
};

// newGame
export const getPlayerByPosition = position => getPlayerByName(getState().newGame[position]);

export const getPlayerById = id => {
  console.log(id);
  return getState().players.filter(p => p.id === id)[0];
};

// Timeline
export const getScoreByPosition = pos => getState().newGame.scoreTimeline.filter(e => e.position === pos).length;

export const applyFnForPositions = (fn) => [
  fn(TEAM1_REAR_PLAYER),
  fn(TEAM1_FRONT_PLAYER),
  fn(TEAM2_FRONT_PLAYER),
  fn(TEAM2_REAR_PLAYER)
];

export const isTeam1Goal = goalScorer => goalScorer.position === TEAM1_FRONT_PLAYER || goalScorer.position === TEAM1_REAR_PLAYER;

export const isOffensive = goalScorer => goalScorer.position === TEAM1_FRONT_PLAYER || goalScorer.position === TEAM2_FRONT_PLAYER;

export const getPlayersOfGame = game => game.winners.concat(game.losers);

export const getGamesByPlayerId = id => new GameCollection(getState().games.filter(game => getPlayersOfGame(game).filter(player => player.id === id).length > 0), id);

export const getWinsByPlayerId = id => new GameCollection(getState().games.filter(game => game.winners.filter(player => player.id === id).length > 0), id);

export const getLossesByPlayerId = id => new GameCollection(getState().games.filter(game => game.losers.filter(player => player.id === id).length > 0), id);
