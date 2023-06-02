import React, { useState, useEffect } from "react";
import { FaRegClock } from "react-icons/fa";
import { TbShovel, TbRefresh } from "react-icons/tb";

import '../styles/Modal.css';

function Modal({ time, hiddenCells, restartGame }) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setTimeout(() => {setRender(true)}, 1000);
  }, []);

  return (
    <div className="modal" style={{opacity: render ? 1 : 0}}>
      <div id="gameOverImage">
        <div className="stats">
          <FaRegClock className="icon"/>{time}<br/>
          <TbShovel className="icon"/>{hiddenCells}
        </div>
      </div>
      <div className="try-again" onClick={restartGame}>
        <TbRefresh className="again"/>Try Again
      </div>
    </div>
  );
}

export default Modal;