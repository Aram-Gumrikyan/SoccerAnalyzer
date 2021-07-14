import { useEffect, useState } from "react";

import CompareItem from "./CompareItem";
import style from "./CompareContainer.module.scss";

const CompareContainer = () => {
	const [compareItems, setCompareItems] = useState([]);

	const drop = (e) => {
		const [name, role, goals, appearances, tackle] = e.dataTransfer
			.getData("text/plain")
			.split(",");
		// const item = <CompareItem name={name} role={role} key={Math.random()} />;

		const itemCreater = (goalsCompare, appearancesCompare, tackleCompare) => {
			return (
				<CompareItem
					name={name}
					role={role}
					key={Math.random()}
					goals={{ count: goals, compare: goalsCompare }}
					appearances={{ count: appearances, compare: appearancesCompare }}
					tackle={{ count: tackle, compare: tackleCompare }}
				/>
			);
		};

		if (compareItems.length === 0) {
			const item = itemCreater(0, 0, 0);

			setCompareItems((state) => [item]);
			return;
		}
		if (compareItems.length === 1) {
			const goalsCompare = compare(compareItems[0].props.goals.count, goals);
			const appearancesCompare = compare(
				compareItems[0].props.appearances.count,
				appearances
			);
			const tackleCompare = compare(compareItems[0].props.tackle.count, tackle);

			const item = itemCreater(goalsCompare, appearancesCompare, tackleCompare);

			setCompareItems((state) => [...state, item]);
			return;
		}

		const goalsCompare = compare(compareItems[1].props.goals.count, goals);
		const appearancesCompare = compare(
			compareItems[1].props.appearances.count,
			appearances
		);
		const tackleCompare = compare(compareItems[1].props.tackle.count, tackle);

		const item = itemCreater(goalsCompare, appearancesCompare, tackleCompare);

		setCompareItems((state) => [state[1], item]);
	};

	function compare(val1, val2) {
		if (val1 > val2) return 1;
		if (val1 < val2) return -1;
		return 0;
	}

	return (
		<div
			className={style.compareContainer}
			onDragOver={(e) => e.preventDefault()}
			onDrop={(e) => drop(e)}
		>
			{compareItems.map((item, index) => {
				return item;
			})}
		</div>
	);
};

export default CompareContainer;
