import { useSelector } from "react-redux";

export default function useItem(name, role) {
	const item = useSelector((state) => findItem(state, name, role));

	return item;
}

function findItem(leagues, name, role) {
	let item;

	leagues.some((league) => {
		if (role === "team") {
			item = league.teams.find((team) => team.name === name);

			if (item) {
				return true;
			}

			return false;
		}

		league.teams.some((team) => {
			item = team.players.find((player) => player.name === name);

			if (item) {
				return true;
			} else {
				return false;
			}
		});

		if (item) {
			return true;
		}
		return false;
	});

	return item;
}
