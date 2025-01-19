import React, { useEffect, Fragment } from 'react';
import '../../css/main.css';
import meliodas from '../../images/meliodas.png'
import gowther from '../../images/gowther.png'
import escanor from '../../images/escanor.png'
import ban from '../../images/ban.png'
import merlin from '../../images/merlin.png'
import king from '../../images/king.png'
import hawk from '../../images/hawk.jpg'
import diane from '../../images/diane.png'
import elizabeth from '../../images/elizabeth.png'
import PropTypes from 'prop-types';

const DefaultComponent = props => {
  return (
    <Fragment>
    <div className="home-title">The Seven Deadly Sins</div>
    <img className="home-char" src={meliodas}></img>
    <img className="home-char" src={gowther}></img>
    <img className="home-char" src={escanor}></img>
    <img className="home-char" src={ban}></img>
    <img className="home-char" src={merlin}></img>
    <img className="home-char" src={king}></img>
    <img className="home-char" src={hawk}></img>
    <img className="home-char" src={diane}></img>
    <img className="home-char" src={elizabeth}></img>
    </Fragment>
  );
};

DefaultComponent.propTypes = {
};

DefaultComponent.defaultProps = {};
export default DefaultComponent;
