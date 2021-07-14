import _ from "lodash";

import leagues from "./initialState";

function leaguesReducer(state = leagues, action) {
	switch (action.type) {
		case "DISABLE_ITEMS": {
			const leagues = _.cloneDeep(state);

			leagues.forEach((league) => {
				league.teams.forEach((team) => {
					if (action.payload.role === "player") {
						team.draggable = false;
						return;
					}

					team.players.forEach((player) => {
						player.draggable = false;
					});
				});
			});

			return leagues;
		}
		default: {
			return state;
		}
	}
}
export default leaguesReducer;
