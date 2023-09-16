// Arena.js
import React, { useState, useEffect } from 'react';
import arenaData1 from './arena_default.json'; // Import the JSON data
import arenaData2 from './arena_twoTasks.json'; // Import the JSON data

const Arena = ({ onPointSelected, selectedArena }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [cursorX, setCursorX] = useState(null);
  const [cursorY, setCursorY] = useState(null);
  const [isInsideCanvas, setIsInsideCanvas] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isArenaSelected, setIsArenaSelected] = useState(false);

  const handleCanvasClick = (event) => {
    if(isArenaSelected){
      const canvas = document.getElementById('arena-canvas');
      const rect = canvas.getBoundingClientRect();
      const x = (((event.clientX - rect.left) / canvas.width) * (selectedArena.arena.xMax - selectedArena.arena.xMin) + selectedArena.arena.xMin).toFixed(2);
      const y = (selectedArena.arena.yMax - ((event.clientY - rect.top) / canvas.height) * (selectedArena.arena.yMax - selectedArena.arena.yMin)).toFixed(2);
      setSelectedPoint({ x, y });
      onPointSelected({ x, y });
    }
    
  };

  const handleCanvasMouseMove = (event) => {
    if(isArenaSelected){
      const canvas = document.getElementById('arena-canvas');
      const rect = canvas.getBoundingClientRect();
      const x = (((event.clientX - rect.left) / canvas.width) * (selectedArena.arena.xMax - selectedArena.arena.xMin) + selectedArena.arena.xMin).toFixed(2);
      const y = (selectedArena.arena.yMax - ((event.clientY - rect.top) / canvas.height) * (selectedArena.arena.yMax - selectedArena.arena.yMin)).toFixed(2);
      setCursorX(x);
      setCursorY(y);
      setIsInsideCanvas(true);
      setIsHovered(true);
    } 
  };

  const handleCanvasMouseLeave = () => {
    setIsInsideCanvas(false);
    setIsHovered(false);
  };

  useEffect(() => {
    const data = Object.keys(selectedArena).length === 0 ? arenaData1 : selectedArena;
    if(Object.keys(selectedArena).length){
      setIsArenaSelected(true)
    }
    if (data) {
      // Use HTML5 Canvas to draw the arena, walls, and cylinders
      const canvas = document.getElementById('arena-canvas');
      const ctx = canvas.getContext('2d');

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set the background fill color of the arena
      ctx.fillStyle = '#ECECEC';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the arena boundaries
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      // Draw a grid-like view to see the coordinates
      const gridSize = 10;
      ctx.strokeStyle = '#DDDDDD';
      ctx.lineWidth = 1;

      for (let x = data.arena.xMin + gridSize; x < data.arena.xMax; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(((x - data.arena.xMin) / (data.arena.xMax - data.arena.xMin)) * canvas.width, 0);
        ctx.lineTo(((x - data.arena.xMin) / (data.arena.xMax - data.arena.xMin)) * canvas.width, canvas.height);
        ctx.stroke();
      }

      for (let y = data.arena.yMin + gridSize; y < data.arena.yMax; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, ((data.arena.yMax - y) / (data.arena.yMax - data.arena.yMin)) * canvas.height);
        ctx.lineTo(canvas.width, ((data.arena.yMax - y) / (data.arena.yMax - data.arena.yMin)) * canvas.height);
        ctx.stroke();
      }

      // Draw walls
      data.obstacles
        .filter((obstacle) => obstacle.type === 'wall')
        .forEach((wall) => {
          ctx.beginPath();
          ctx.moveTo(
            ((wall.parameters.x - data.arena.xMin) / (data.arena.xMax - data.arena.xMin)) * canvas.width,
            ((data.arena.yMax - wall.parameters.y) / (data.arena.yMax - data.arena.yMin)) * canvas.height
          );
          ctx.lineTo(
            (((wall.parameters.x + wall.parameters.width - data.arena.xMin) / (data.arena.xMax - data.arena.xMin)) * canvas.width),
            ((data.arena.yMax - wall.parameters.y) / (data.arena.yMax - data.arena.yMin)) * canvas.height
          );
          ctx.strokeStyle = wall.parameters.color;
          ctx.lineWidth = 2;
          ctx.stroke();
        });

      // Draw cylinders
      data.obstacles
        .filter((obstacle) => obstacle.type === 'cylinder')
        .forEach((cylinder) => {
          ctx.beginPath();
          ctx.arc(
            ((cylinder.parameters.x - data.arena.xMin) / (data.arena.xMax - data.arena.xMin)) * canvas.width,
            ((data.arena.yMax - cylinder.parameters.y) / (data.arena.yMax - data.arena.yMin)) * canvas.height,
            (cylinder.parameters.radius / (data.arena.xMax - data.arena.xMin)) * canvas.width,
            0,
            2 * Math.PI
          );
          ctx.fillStyle = cylinder.parameters.color;
          ctx.fill();
        });
    }
  }, [selectedArena]);

  return (
    <div className="arena">
      <canvas
        id="arena-canvas"
        width="450"
        height="450"
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        onMouseLeave={handleCanvasMouseLeave}
        style={{
          cursor: isHovered ? 'pointer' : 'default',
          border: isHovered ? '2px solid #333' : 'none',
        }}
      ></canvas>
      {isInsideCanvas && (
        <div className="cursor-coordinates">
          Cursor Coordinates: X = {cursorX}, Y = {cursorY}
        </div>
      )}
    </div>
  );
};

export default Arena;
