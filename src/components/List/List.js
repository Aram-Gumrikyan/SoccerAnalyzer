import { useSelector } from "react-redux";

import DropDown from "./DropDown";
import style from "./List.module.scss";

const List = () => {
	const leagues = useSelector((store) => store);

	const getMiddle = (players, property) => {
		return players.reduce((count, player) => {
			count += player[property];
			return count;
		}, 0);
	};

	return (
		<div className={style.list}>
			{leagues.map((league, index) => {
				const { teams } = league;

				return (
					<DropDown key={index} name={league.name} draggable={false}>
						{teams.map((team, index) => {
							const { players } = team;

							return (
								<DropDown
									key={index}
									role="team"
									name={team.name}
									goals={() => getMiddle(players, "goals")}
									appearances={() => getMiddle(players, "appearances")}
									tackle={() => getMiddle(players, "tackle")}
									draggable={team.draggable}
								>
									{players.map((player, index) => {
										return (
											<DropDown
												key={index}
												role="player"
												name={player.name}
												goals={player.goals}
												appearances={player.appearances}
												tackle={player.tackle}
												draggable={player.draggable}
											/>
										);
									})}
								</DropDown>
							);
						})}
					</DropDown>
				);
			})}
		</div>
	);
};

export default List;
