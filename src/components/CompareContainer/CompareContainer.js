import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { useEffect, useState } from "react";

import CompareItem from "./CompareItem";
import style from "./CompareContainer.module.scss";

const CompareContainer = () => {
	const dispatch = useDispatch();
	const compareItems = useSelector((state) => state.compareItems);

	const [dragEnter, setDragEnter] = useState(false);

	const containerClassName = classNames(style.compareContainer, {
		[style.dragEnter]: dragEnter,
	});

	useEffect(() => {
		document.addEventListener("dragend", (e) => {
			setDragEnter(false);
		});
	}, []);

	const drop = (e) => {
		const [name, role] = e.dataTransfer.getData("text/plain").split(",");

		if (!role) {
			return;
		}

		dispatch({ type: "DISABLE_ITEMS", payload: { role, draggable: false } });
		dispatch({ type: "ADD_COMPARE_ITEM", payload: { name, role } });
	};

	return (
		<div
			className={containerClassName}
			onDragOver={(e) => e.preventDefault()}
			onDrop={(e) => drop(e)}
			onDragEnter={(e) => setDragEnter(true)}
		>
			{compareItems.map((item, index) => {
				const { name, role } = item;
				return (
					<CompareItem name={name} role={role} index={index} key={index} />
				);
			})}
		</div>
	);
};

export default CompareContainer;
