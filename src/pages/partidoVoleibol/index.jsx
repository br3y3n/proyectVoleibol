import './style.css'
import Timer from "../../components/Timer/Timer";
import ControlButtons from "../../components/ControlButtons/ControlButtons";
import {usePuntosSets} from '../../hooks/usePuntosSets'
import React, { useState,useEffect } from "react";

export default function PartidoVoleibol() {
  
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  const {
    equipo1Puntos,
    equipo2Puntos,
    setsJugados,
    ganadorSets,
    aumentarPuntos,
    decrementarPuntos,
    obtenerGanadorSet,
    obtenerGanadorPartido
  } = usePuntosSets();

  const equipo1ClickHandler = () => aumentarPuntos("Equipo 1");
  const equipo2ClickHandler = () => aumentarPuntos("Equipo 2");
  const EquipoGanadro= ()=> obtenerGanadorPartido();
  
  useEffect(() => {
    let interval = null;
  
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);
  
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };
  
  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };
  
  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <>
     <h1>Sets Jugados: {setsJugados}</h1>
    <h1 className='equipoG'>{EquipoGanadro()}</h1>
    <article className='content_principal'>
      <section className='equipo'>
        <h1>NOOBIES </h1>
        <img src="src/assets/equipo1.png" alt="" width={150} />
        <p className='puntos'>{equipo1Puntos}</p>
        <button className='contadorL boton' onClick={equipo1ClickHandler}>+1</button>
        <button className='contadorR boton' onClick={decrementarPuntos.bind(null, "Equipo 1")}>-1</button>
      </section>
      <div className='divTiempo'>
      <h1 className='tiempo'>Tiempo</h1>
      <Timer time={time}/>
      </div>
      <section className='equipo equipo2'>
        <h1 className='textE'>PANTHERS</h1>
        <img src="src/assets/equipo2.png" alt="" width={150} />
        <p className='puntos'>{equipo2Puntos}</p>
        <button className='contadorL boton' onClick={equipo2ClickHandler}>+1</button>
        <button className='contadorR boton' onClick={decrementarPuntos.bind(null, "Equipo 2")}>-1</button>
        <ControlButtons
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
      />
      </section>
    </article>
    <h1>Sets Ganados</h1>
    <table>
          <thead>
            <tr>
              <th></th>
              <th>SET 1</th>
              <th>SET 2</th>
              <th>SET 3</th>
              <th>SET 4</th>
              <th>SET 5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NOOBIES</td>
              <td>{obtenerGanadorSet(0, "Equipo 1")}</td>
              <td>{obtenerGanadorSet(1, "Equipo 1")}</td>
              <td>{obtenerGanadorSet(2, "Equipo 1")}</td>
              <td>{obtenerGanadorSet(3, "Equipo 1")}</td>
              <td>{obtenerGanadorSet(4, "Equipo 1")}</td>
            </tr>
            <tr>
              <td>PANTHERS</td>
              <td>{obtenerGanadorSet(0, "Equipo 2")}</td>
              <td>{obtenerGanadorSet(1, "Equipo 2")}</td>
              <td>{obtenerGanadorSet(2, "Equipo 2")}</td>
              <td>{obtenerGanadorSet(3, "Equipo 2")}</td>
              <td>{obtenerGanadorSet(4, "Equipo 2")}</td>
            </tr>
          </tbody>
        </table>
    </>
  )
}
