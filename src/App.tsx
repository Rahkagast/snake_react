import React, { useEffect, useState } from 'react';
import './App.css';



//HUOM, VAIHDETAAN ETTÄ EI VAIHDU CLASSI VAAN VAIHTUU VÄRI, NIIN VOIDAAN VAIHTAA TAKASIN HARMAASEEN VÄRIIN KUN LIIKUTAAN

const App : React.FC = () => {

  interface SquareBlockProps{
    className? : string;
  }
  
  const SquareBlock : React.FC<SquareBlockProps> = ({className}) => {
    return(
      <div className={`block ${className}`}></div>
      );
    };
    
    const Tetris: React.FC = () => {
      const rows : number = 24;
      const columns : number = 60;

      const initialGrid: string[][] = Array.from({ length: rows }, () => Array.from({ length: columns }, () => ''));
//      const initialGrid: string[][] = Array(20).fill([]).map(() => Array(10).fill(0));

      const [board, setBoard] = useState(initialGrid);
      const [target, setTarget] = useState([0,4]);

      
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === " ") {
          // Space key pressed
          const newBoard = [...board];
          newBoard[target[0]][target[1]] = "red";
          setBoard(newBoard);
          console.log("SPACE");
        }
      
        if (event.key === "ArrowRight") {
          // Right arrow key pressed
          // Clone the current board
          const newBoard = [...board];       
          // Set the last red square to green
          newBoard[target[0]][target[1]] = "green";
      
          // Update the target position to the right
          const newTargetColumn = target[1] + 1;
      
          // Check if the new target position is within the board boundaries
          if (newTargetColumn < newBoard[target[0]].length) {
            // Update the target position
            setTarget([target[0], newTargetColumn]);
      
            // Set the new target square to red
            newBoard[target[0]][newTargetColumn] = "red";
      
            // Update the state with the modified board
            setBoard(newBoard);
          }
        }

        if (event.key === "ArrowLeft") {
          // Right arrow key pressed
          // Clone the current board
          const newBoard = [...board];       
          // Set the last red square to green
          newBoard[target[0]][target[1]] = "green";
      
          // Update the target position to the right
          const newTargetColumn = target[1] - 1;
      
          // Check if the new target position is within the board boundaries
          if (newTargetColumn >= 0) {
            // Update the target position
            setTarget([target[0], newTargetColumn]);
      
            // Set the new target square to red
            newBoard[target[0]][newTargetColumn] = "red";
      
            // Update the state with the modified board
            setBoard(newBoard);
          }
        }

        if (event.key === "ArrowDown") {
          // Right arrow key pressed
          // Clone the current board
          const newBoard = [...board];       
          // Set the last red square to green
          newBoard[target[0]][target[1]] = "green";
      
          // Update the target position to the right
          const newTargetRow = target[0] + 1;
      
          // Check if the new target position is within the board boundaries
          if (newTargetRow < newBoard.length) {
            // Update the target position
            setTarget([newTargetRow,target[1]]);
      
            // Set the new target square to red
            newBoard[newTargetRow][target[1]] = "red";
      
            // Update the state with the modified board
            setBoard(newBoard);
          }
        }

        if (event.key === "ArrowUp") {
          // Right arrow key pressed
          // Clone the current board
          const newBoard = [...board];       
          // Set the last red square to green
          newBoard[target[0]][target[1]] = "green";
      
          // Update the target position to the right
          const newTargetRow = target[0] - 1;
      
          // Check if the new target position is within the board boundaries
          if (newTargetRow >= 0) {
            // Update the target position
            setTarget([newTargetRow,target[1]]);
      
            // Set the new target square to red
            newBoard[newTargetRow][target[1]] = "red";
      
            // Update the state with the modified board
            setBoard(newBoard);
          }
        }

      };

      // Renders the Square shaped block : XX
      //                                   XX                                           
      //const square : React.FC<> = () => {

      //}
      

        // Attach key press event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [board]); // Dependency array ensures the event listener is set up only once



      return (
        <div className='board'>
          {board.map((row, rowIndex) => (
            <div className='row' key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <SquareBlock key={columnIndex} className={cell} />
              ))}
            </div>
          ))}
        </div>
      );
    };

  
        
            
            const Top : React.FC = () => {
              return(
                <div className='top'>
          <h1>SNAKE</h1>
    
        </div>
      )
    }
    
  return (
    <>
    <Top/>
    <Tetris/>
    </>
  );
}



export default App;