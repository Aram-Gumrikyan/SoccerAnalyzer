import { useSelector } from "react-redux";

import DropDown from "./DropDown";
import style from "./List.module.scss";

const List = () => {
	const leagues = useSelector((store) => store.leagues);

	return (
		<div className={style.list}>
			{leagues.map((league, index) => {
				const { teams, name } = league;

				return (
					<DropDown key={index} name={name} draggable={false}>
						{teams.map((team, index) => {
							const { players, name, draggable } = team;

							return (
								<DropDown
									key={index}
									role="team"
									name={name}
									draggable={draggable}
								>
									{players.map((player, index) => {
										const { name, draggable } = player;

										return (
											<DropDown
												key={index}
												role="player"
												name={name}
												draggable={draggable}
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
