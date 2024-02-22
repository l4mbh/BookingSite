import React from 'react';
import classes from './HeaderContent.module.scss';

const HeaderContent = ({text}) => {
  return (
    <div className={classes.headerContent}>
        <p className={classes.headerContent_text}>{text}</p>
    </div>
  )
}

export default HeaderContent