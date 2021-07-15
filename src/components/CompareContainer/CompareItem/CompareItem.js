import { useSelector } from "react-redux";
import classNames from "classnames";

import useItem from "./useItem";
import style from "./CompareItem.module.scss";

const CompareItem = ({ name, role, index }) => {
    const secondItemIndex = index === 0 ? 1 : 0;
    const secondCompareItem = useSelector((state) => state.compareItems[secondItemIndex]);

    const item = useItem(name, role);
    const secondItem = useItem(secondCompareItem?.name, secondCompareItem?.role);

    const itemStatistics = { goals: item.goals, appearances: item.appearances, tackle: item.tackle };
    const secondItemStatistics = {
        goals: secondItem?.goals,
        appearances: secondItem?.appearances,
        tackle: secondItem?.tackle,
    };

    const itemStatisticsCompareVlues = [
        { name: "goals", state: 0 },
        { name: "appearances", state: 0 },
        { name: "tackle", state: 0 },
    ];

    function roteateInObjectAndGetMiddleValues(item, object) {
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
        roteateInObjectAndGetMiddleValues(item, itemStatistics);
        roteateInObjectAndGetMiddleValues(secondItem, secondItemStatistics);
    }

    function compare(val1, val2) {
        if (val1 > val2) return 1;
        if (val1 < val2) return -1;
        return 0;
    }

    itemStatisticsCompareVlues.forEach((compareValue, index) => {
        const { name } = compareValue;
        itemStatisticsCompareVlues[index].state = compare(itemStatistics[name], secondItemStatistics[name]);
    });

    return (
        <div className={style.compareItem}>
            <h1>{name}</h1>
            {itemStatisticsCompareVlues.map((compareValue, index) => {
                const { name, state } = compareValue;
                const stateClassName = classNames({
                    [style.great]: state === 1,
                    [style.small]: state === -1,
                    [style.equal]: state === 0,
                });

                return (
                    <h3>
                        {name + ": "}
                        <span className={stateClassName}>{itemStatistics[name]}</span>
                    </h3>
                );
            })}
        </div>
    );
};

export default CompareItem;
