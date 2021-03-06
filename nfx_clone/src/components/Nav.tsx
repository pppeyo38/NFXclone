import React, { useEffect, useState } from 'react';
import "../stylesheets/Nav.scss";

type Props = {
	className?: string;
};

export const Nav = (props: Props) => {
	const [show, setShow] = useState(false);

	// スクロールが一定値に達したらstateを更新
	useEffect(() => {
		const handleShow = () => {
			if (window.scrollY > 100) {
				setShow(true);
			} else {
				setShow(false);
			}
		};

		window.addEventListener("scroll", handleShow);
		return () => {
			window.removeEventListener("scroll", handleShow);
		};
	}, []);

	return (
		// クラス名がスクロール値によって変わる表記
		<div className={`Nav ${show && "Nav-black"}`}>
			<img
				className='Nav-logo'
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
				alt="Netflix Logo"
			/>
			<img
				className="Nav-avater"
				src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
				alt="Avater"
			/>
		</div>
	);
};