import style from "./CompareContainer.module.scss";

const CompareContainer = () => {
	const drop = (e) => {
		console.log(e.dataTransfer.getData("text/plain"));
	};

	return (
		<div
			className={style.compareContainer}
			onDragOver={(e) => e.preventDefault()}
			onDrop={(e) => drop(e)}
		></div>
	);
};

export default CompareContainer;
