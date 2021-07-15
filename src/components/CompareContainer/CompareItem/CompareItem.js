import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import useItem from "./useItem";
import style from "./CompareItem.module.scss";

const CompareItem = ({ name, role, index }) => {
	const dispatch = useDispatch();

	const secondItemIndex = index === 0 ? 1 : 0;
	const secondCompareItem = useSelector(
		(state) => state.compareItems[secondItemIndex]
	);

	const item = useItem(name, role);
	const secondItem = useItem(secondCompareItem?.name, secondCompareItem?.role);

	const itemStatistics = {
		goals: item.goals,
		appearances: item.appearances,
		tackle: item.tackle,
	};
	const secondItemStatistics = {
		goals: secondItem?.goals,
		appearances: secondItem?.appearances,
		tackle: secondItem?.tackle,
	};

	const itemStatisticsCompareValues = [
		{ name: "goals", state: 0 },
		{ name: "appearances", state: 0 },
		{ name: "tackle", state: 0 },
	];

	function rotateInObjectAndGetMiddleValues(item, object) {
		for (const key of Object.keys(object)) {
			object[key] = getMiddleValues(item, key);
		}
	}

	function getMiddleValues(item, property) {
		const count = item?.players.reduce((count, player) => {
			return (count += player[property]);
		}, 0);
		return count / item?.players.length;
	}

	if (role === "team") {
		rotateInObjectAndGetMiddleValues(item, itemStatistics);
		rotateInObjectAndGetMiddleValues(secondItem, secondItemStatistics);
	}

	function compare(val1, val2) {
		if (val1 > val2) return 1;
		if (val1 < val2) return -1;
		return 0;
	}

	itemStatisticsCompareValues.forEach((compareValue, index) => {
		const { name } = compareValue;
		itemStatisticsCompareValues[index].state = compare(
			itemStatistics[name],
			secondItemStatistics[name]
		);
	});

	const deleateItem = (e) => {
		dispatch({ type: "DELEATE_ITEM", payload: { index } });

		if (!secondItem) {
			dispatch({
				type: "DISABLE_ITEMS",
				payload: { role, draggable: true },
			});
		}
	};

	return (
		<div className={style.compareItem}>
			<div className={style.name}>
				<h1>{name}</h1>
				<button>
					<i
						className="fas fa-minus-circle"
						onClick={(e) => deleateItem(e)}
					></i>
				</button>
			</div>

			{itemStatisticsCompareValues.map((compareValue, index) => {
				const { name, state } = compareValue;
				const stateClassName = classNames({
					[style.great]: state === 1,
					[style.small]: state === -1,
					[style.equal]: state === 0,
				});

				return (
					<h3 key={index} className={style.statistics}>
						{name + ": "}
						<span className={stateClassName}>{itemStatistics[name]}</span>
					</h3>
				);
			})}
		</div>
	);
};

export default CompareItem;
