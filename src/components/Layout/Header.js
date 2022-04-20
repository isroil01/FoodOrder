import React, { Fragment } from "react";
import Meals from '../../image/meals.jpg';
import style from './Header.module.css';
import HeadrerCartButton from "./HeaderCartButton";

const Header = (props) => {
  return <Fragment>
      <header className={style.header}>
          <h1>React Meals</h1>
          <HeadrerCartButton onClick={props.onShow} />
      </header>
      <div className={style['main-image']}>
          <img src={Meals} alt=' A tabel full of delicious food!' />
      </div>
  </Fragment>;
};

export default Header;
