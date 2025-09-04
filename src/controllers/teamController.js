const db = require('../config/database');

const mapTeam = (row) => {
  if (!row) return null;
  return {
    name: row.team,
    ...row
  };
};

const removeDiacritics = (str) => str.normalize('NFD').replace(/\p{Diacritic}/gu, '');

function normalizeTeamName(teamName) {
  if (!teamName) return teamName;
  return removeDiacritics(teamName.trim().replace(/\s+/g, ' '));
}

const getAllTeams = async (req, res) => {
  try {
    db.all('SELECT * FROM team_data', [], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json(rows.map(mapTeam));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getTeamByName = async (req, res) => {
  try {
    let teamName = normalizeTeamName(req.params.teamName);
    db.get('SELECT * FROM team_data WHERE LOWER(team) = LOWER(?)', [teamName], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ message: 'Time não encontrado.' });
      }
      res.json(mapTeam(row));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getChampionTeam = async (req, res) => {
  try {
    db.get('SELECT * FROM team_data WHERE champion = 1', [], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ message: 'Time campeão não encontrado.' });
      }
      res.json(mapTeam(row));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getSecondPlaceTeam = async (req, res) => {
  try {
    db.get('SELECT * FROM team_data WHERE second_place = 1', [], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ message: 'Time segundo colocado não encontrado.' });
      }
      res.json(mapTeam(row));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getThirdPlaceTeam = async (req, res) => {
  try {
    db.get('SELECT * FROM team_data WHERE third_place = 1', [], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ message: 'Time terceiro colocado não encontrado.' });
      }
      res.json(mapTeam(row));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getTeamsWithMostGoals = async (req, res) => {
  try {
    db.all('SELECT * FROM team_data ORDER BY goals DESC LIMIT 5', [], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json(rows.map(mapTeam));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getTeamsWithMostFoulsSuffered = async (req, res) => {
  try {
    db.all('SELECT * FROM team_data ORDER BY fouled DESC LIMIT 5', [], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json(rows.map(mapTeam));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllTeams,
  getTeamByName,
  getChampionTeam,
  getSecondPlaceTeam,
  getThirdPlaceTeam,
  getTeamsWithMostGoals,
  getTeamsWithMostFoulsSuffered,
  normalizeTeamName 
};
