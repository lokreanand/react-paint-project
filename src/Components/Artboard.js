import React, { useContext } from 'react'
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import AppContext from './AppContext';
import Menu from "./Menu";

const Artboard = () => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(5);
    const [lineColor, setLineColor] = useState("black");
    const [lineOpacity, setLineOpacity] = useState(0.1);
    const context=useContext(AppContext)
    const navigate=useNavigate()
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalAlpha = lineOpacity;
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctxRef.current = ctx;
    }, [lineColor, lineOpacity, lineWidth]);
    
    const startDrawing = (e) => {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(
        e.nativeEvent.offsetX, 
        e.nativeEvent.offsetY
      );
      setIsDrawing(true);
    };
    
    const endDrawing = () => {
      ctxRef.current.closePath();
      setIsDrawing(false);
    };
    
    const draw = (e) => {
      if (!isDrawing) {
        return;
      }
      ctxRef.current.lineTo(
        e.nativeEvent.offsetX, 
        e.nativeEvent.offsetY
      );
        
      ctxRef.current.stroke();
    };
    const logOut=() =>{
        context.setName(null)
        context.setEmail(null)
        navigate("/")
    }
  return (
    <div className='paint-area'>
        <h1>Paint App</h1>
        <button onClick={logOut}>Logout</button>
      <div className="draw-area">
        <Menu
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          setLineOpacity={setLineOpacity}
        />
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={`1280px`}
          height={`720px`}
        />
      </div>
    </div>
  )
}

export default Artboard