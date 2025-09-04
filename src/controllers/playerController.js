const db = require('../config/database');
// Importa a função de normalização do teamController
const { normalizeTeamName } = require('./teamController');

const mapPlayer = (row) => {
  if (!row) return null;
  return {
    name: row.Player,
    ...row
  };
};

const getTopScorer = async (req, res) => {
  try {
    db.get('SELECT * FROM player_stats ORDER BY Gls DESC LIMIT 1', [], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ message: 'Artilheiro não encontrado.' });
      }
      res.json(mapPlayer(row));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getPlayerByName = async (req, res) => {
  try {
    const playerName = req.params.playerName;
    db.get('SELECT * FROM player_stats WHERE LOWER(Player) = LOWER(?)', [playerName], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ message: 'Jogador não encontrado.' });
      }
      res.json(mapPlayer(row));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getPlayersByTeam = async (req, res) => {
  try {
    const teamName = req.params.teamName.trim();
    console.log('teamName recebido:', teamName); // LOG para debug
    db.all('SELECT * FROM player_stats WHERE LOWER(TRIM(Team)) = LOWER(TRIM(?))', [teamName], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      if (!rows || rows.length === 0) {
        return res.status(404).json({ message: 'Nenhum jogador encontrado para este time.' });
      }
      res.json(rows.map(mapPlayer));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getPlayersByClub = async (req, res) => {
  try {
    const clubName = req.params.clubName;
    db.all('SELECT * FROM player_stats WHERE LOWER(Club) = LOWER(?)', [clubName], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      if (!rows || rows.length === 0) {
        return res.status(404).json({ message: 'Nenhum jogador encontrado para este clube.' });
      }
      res.json(rows.map(mapPlayer));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getAllPlayers = async (req, res) => {
  try {
    db.all('SELECT * FROM player_stats', [], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json(rows.map(mapPlayer));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTopScorer,
  getPlayerByName,
  getPlayersByTeam,
  getPlayersByClub,
  getAllPlayers
};
