import React, { useState, useMemo } from "react";
export const usePuntosSets = () => {
    // Definición de variables de estado
    const [equipo1Puntos, setEquipo1Puntos] = useState(0);
    const [equipo2Puntos, setEquipo2Puntos] = useState(0);
    const [setsJugados, setSetsJugados] = useState(0);
    const [ganadorSets, setGanadorSets] = useState([]);
  
    const puntajeLimite = useMemo(() => 25, []);
    const diferenciaMinima = useMemo(() => 2, []);
  
    const aumentarPuntos = (equipo) => {
      const nuevoPuntaje = equipo === "Equipo 1" ? equipo1Puntos + 1 : equipo2Puntos + 1;
    
      if (equipo1Puntos === 24 &&equipo2Puntos===24) {
        // Empate: seguir hasta que haya una diferencia de 2 puntos
        if (Math.abs(equipo1Puntos - equipo2Puntos) === 2) {
          setGanadorSets([...ganadorSets, equipo]);
          setSetsJugados(setsJugados + 1);
          reiniciarPuntos();
        } else {
          // No hay ganador aún, actualiza los puntos
          setEquipo1Puntos(equipo === "Equipo 1" ? nuevoPuntaje : equipo1Puntos);
          setEquipo2Puntos(equipo === "Equipo 2" ? nuevoPuntaje : equipo2Puntos);
        }
      } else {
        // No hay empate, verifica si se cumple la condición normal
        if (nuevoPuntaje >= puntajeLimite && nuevoPuntaje - (equipo === "Equipo 1" ? equipo2Puntos : equipo1Puntos) >= diferenciaMinima) {
          setGanadorSets([...ganadorSets, equipo]);
          setSetsJugados(setsJugados + 1);
          reiniciarPuntos();
        } else {
          // No hay ganador aún, actualiza los puntos
          setEquipo1Puntos(equipo === "Equipo 1" ? nuevoPuntaje : equipo1Puntos);
          setEquipo2Puntos(equipo === "Equipo 2" ? nuevoPuntaje : equipo2Puntos);
        }
      }
    };
    
  
    const decrementarPuntos = (equipo) => {
      const nuevoPuntaje = Math.max(equipo === "Equipo 1" ? equipo1Puntos - 1 : equipo2Puntos - 1, 0);
      setEquipo1Puntos(equipo === "Equipo 1" ? nuevoPuntaje : equipo1Puntos);
      setEquipo2Puntos(equipo === "Equipo 2" ? nuevoPuntaje : equipo2Puntos);
    };
  

    const reiniciarPuntos = () => {
      setEquipo1Puntos(0);
      setEquipo2Puntos(0);
    };
    const obtenerGanadorSet = (indice, equipo) => {
      if (!ganadorSets[indice]) {
        return "";
      } else if (ganadorSets[indice] === equipo) {
        return "⭐";
      } else {
        return "";
      }
    };  
    const obtenerGanadorPartido= ()=>{
     const equipo1 = ganadorSets.filter((ganador1)=> ganador1==='Equipo 1')
     const equipo2= ganadorSets.filter((ganador2)=> ganador2==='Equipo 2')
    if(equipo1.length==3){
      return "Ganador Del Partido Noobies 🏆"
    }else if(equipo2.length===3){
      return "Ganador Del Partido Panthers 🏆"
    }
    }
    
    return {
      equipo1Puntos,
      equipo2Puntos,
      setsJugados,
      ganadorSets,
      aumentarPuntos,
      decrementarPuntos,
      reiniciarPuntos,
      obtenerGanadorSet,
      obtenerGanadorPartido
    };
  };