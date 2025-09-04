const db = require("../config/database");

// Função para extrair todos os dados necessários para o bingo
const getBingoData = (req, res) => {
  try {
    // Buscar todos os jogadores com suas estatísticas
    const playersQuery = `
      SELECT 
        p.Player as name,
        p.Team as team,
        p.Club as club,
        p.Goals as goals,
        p.Ast as assists,
        p.Minutes_played as minutes,
        p.CrdY as yellow_cards,
        p.CrdR as red_cards,
        p.Shots as shots,
        p.shots_on_target,
        p.fouls_committed as fouls
      FROM player_stats p
      ORDER BY p.Player
    `;

    // Buscar todas as seleções com suas estatísticas
    const teamsQuery = `
      SELECT 
        t.team,
        t.possession,
        t.games,
        t.goals,
        t.assists,
        t.pens_att,
        t.corners,
        t.gk_clean_sheets,
        g.rank,
        g.points,
        g.wins,
        g.losses,
        g.goal_difference,
        g.group_name as group_letter
      FROM team_data t
      LEFT JOIN group_stats g ON t.team = g.team
      ORDER BY t.team
    `;

    // Buscar dados das partidas para fases
    const matchesQuery = `
      SELECT DISTINCT
        m.team_1,
        m.team_2,
        m.round
      FROM match_data m
      WHERE m.round IN ('Final', 'Semi-Final', 'Quarter-final', 'Round of 16')
      ORDER BY m.round, m.team_1
    `;

    const players = db.prepare(playersQuery).all();
    const teams = db.prepare(teamsQuery).all();
    const matches = db.prepare(matchesQuery).all();

    res.json({
      players,
      teams,
      matches,
      success: true,
    });
  } catch (error) {
    console.error("Erro ao buscar dados do bingo:", error);
    res.status(500).json({
      error: "Erro interno do servidor",
      details: error.message,
    });
  }
};

module.exports = {
  getBingoData,
};
