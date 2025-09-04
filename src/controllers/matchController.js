const db = require('../config/database');
// Importa a função de normalização do teamController
const { normalizeTeamName } = require('./teamController');

const mapMatch = (row) => {
  if (!row) return null;
  return {
    id: row.match_no,
    ...row
  };
};

const getAllMatches = async (req, res) => {
  try {
    db.all('SELECT * FROM match_data', [], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json(rows.map(mapMatch));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getMatchById = async (req, res) => {
  try {
    const id = req.params.id;
    db.get('SELECT * FROM match_data WHERE match_no = ?', [id], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ message: 'Partida não encontrada.' });
      }
      res.json(mapMatch(row));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getMatchesByGroup = async (req, res) => {
  try {
    const groupName = req.params.groupName;
    db.all('SELECT * FROM match_data WHERE LOWER("group") = LOWER(?)', [groupName], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      if (!rows || rows.length === 0) {
        return res.status(404).json({ message: 'Nenhuma partida encontrada para este grupo.' });
      }
      res.json(rows.map(mapMatch));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllMatches,
  getMatchById,
  getMatchesByGroup
};
