const db = require('../config/database');
// Importa a função de normalização do teamController
const { normalizeTeamName } = require('./teamController');

const mapGroup = (row) => {
  if (!row) return null;
  return {
    name: row.group,
    ...row
  };
};

// Retorna todos os grupos e suas estatísticas
const getAllGroups = async (req, res) => {
  try {
    db.all('SELECT * FROM group_stats', [], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json(rows.map(mapGroup));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getGroupByName = async (req, res) => {
  try {
    const groupName = req.params.groupName;
    db.all('SELECT * FROM group_stats WHERE LOWER("group") = LOWER(?)', [groupName], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      if (!rows || rows.length === 0) {
        return res.status(404).json({ message: 'Grupo não encontrado.' });
      }
      res.json(rows.map(mapGroup));
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllGroups,
  getGroupByName
};
