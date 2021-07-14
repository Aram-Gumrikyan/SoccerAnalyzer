import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./CompareItem.module.scss";

const CompareItem = ({ name, role }) => {
	const dispatch = useDispatch();
	const item = useSelector((state) => findItem(state));

	useEffect(() => {
		dispatch({ type: "DISABLE_ITEMS", payload: { role } });
	}, [role, dispatch]);

	// function findItem(leagues) {
	// 	let item;

	// 	leagues.some((league) => {
	// 		if (role === "team") {
	// 			item = league.teams.find((team) => team.name === name);

	// 			if (item) {
	// 				return true;
	// 			}

	// 			return false;
	// 		}

	// 		league.teams.some((team) => {
	// 			item = team.players.find((player) => player.name === name);

	// 			if (item) {
	// 				return true;
	// 			}

	// 			return false;
	// 		});

	// 		if (item) {
	// 			return true;
	// 		}

	// 		return false;
	// 	});

	// 	return item;
	// }

	return (
		<div className={style.compareItem}>
			<h1>{item.name}</h1>
		</div>
	);
};

export default CompareItem;
