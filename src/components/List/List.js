import { useSelector } from "react-redux";

import DropDown from "./DropDown";
import style from "./List.module.scss";

const List = () => {
	const leagues = useSelector((store) => store);

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
									name={team.name}
									draggable={team.draggable}
								>
									{players.map((player, index) => {
										return (
											<DropDown
												key={index}
												name={player.name}
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
