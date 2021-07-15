import { useState } from "react";
import classNames from "classnames";

import style from "./DropDown.module.scss";

const DropDown = ({ role, draggable, name, children }) => {
	const [childrenVisibiliti, setChildrenVisibiliti] = useState(true);

	const toggleChildrenVisibiliti = () => {
		setChildrenVisibiliti(!childrenVisibiliti);
	};

	const dragStart = (e) => {
		e.dataTransfer.setData("text/plain", [name, role]);
	};

	const childrenClassName = classNames(style.children, {
		[style.childrenClose]: !childrenVisibiliti,
	});

	const buttonClassName = classNames(style.dropDownButton, {
		[style.disabled]: !draggable,
	});

	const dropDownIcon = classNames(style.dropDownButton, style.dropDownIcon);

	return (
		<div className="dropDown">
			<div className={style.name}>
				{children && (
					<button className={dropDownIcon}>
						<i
							className={`fas fa-caret-${childrenVisibiliti ? "down" : "up"}`}
							onClick={toggleChildrenVisibiliti}
						></i>
					</button>
				)}
				<button
					className={buttonClassName}
					draggable={draggable}
					onDragStart={(e) => dragStart(e)}
				>
					{name}
				</button>
			</div>
			<div className={childrenClassName}>{children}</div>
		</div>
	);
};

export default DropDown;
