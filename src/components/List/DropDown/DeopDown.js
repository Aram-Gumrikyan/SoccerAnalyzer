import { useState } from "react";
import classNames from "classnames";

import style from "./DropDown.module.scss";

const DropDown = ({ draggable, name, children }) => {
	const [childrenVisibiliti, setChildrenVisibiliti] = useState(true);

	const toggleChildrenVisibiliti = () => {
		setChildrenVisibiliti(!childrenVisibiliti);
	};

	const dragStart = (e) => {
		e.dataTransfer.setData("text/plain", name);
	};

	const childrenClassName = classNames(style.children, {
		[style.childrenClose]: !childrenVisibiliti,
	});

	return (
		<div className="dropDown">
			<div className={style.name}>
				{children && (
					<button onClick={toggleChildrenVisibiliti}>
						<i
							className={`fas fa-caret-${childrenVisibiliti ? "down" : "up"}`}
						></i>
					</button>
				)}
				<button
					className={style.dropDownButton}
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
