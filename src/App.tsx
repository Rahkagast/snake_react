import React, { useEffect, useState } from 'react';
import './App.css';



const App : React.FC = () => {

  interface SquareBlockProps{
    className? : string;
  }
  
  const SquareBlock : React.FC<SquareBlockProps> = ({className}) => {
    return(
      <div className={`block ${className}`}></div>
      );
    };
    
    
    const Snake: React.FC = () => {
      const rows : number = 24;
      const columns : number = 52;
      const startPosition : number[] = [12,30];
      const initialGrid: string[][] = Array.from({ length: rows }, () => Array.from({ length: columns }, () => 'block'));

      const [board, setBoard] = useState(initialGrid);
      const [currentPosition, setCurrentPosition] = useState(startPosition);           
      const [snakeDirection, setSnakeDirection] = useState("right");
      const [points, setPoints] = useState(0);
      const [snakeBody, setSnakeBody] = useState([startPosition]);

      
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === " ") {
          spawnApple();
        }
      
        if (event.key === "ArrowRight" && snakeDirection !== "left" && snakeDirection !== "right" ) {
          setSnakeDirection("right");
        }

        if (event.key === "ArrowLeft" && snakeDirection !== "left" && snakeDirection !== "right") {
          setSnakeDirection("left");
        }

        if (event.key === "ArrowDown" && snakeDirection !== "up" && snakeDirection !== "down") {
          setSnakeDirection("down");
        }

        if (event.key === "ArrowUp" && snakeDirection !== "up" && snakeDirection !== "down") {
          setSnakeDirection("up");
      }
    };

    // Spawns apple into random position
    const spawnApple = () =>{
      const randomPoint : number[] = [Math.floor(Math.random()*rows), Math.floor(Math.random()*columns)];
      const newBoard = [...board];
      newBoard[randomPoint[0]][randomPoint[1]] = "apple";
      setBoard(newBoard);
    };

    const checkSnakeHead = (currentPosition: number[], direction : string) => {
      isDirectionOutOfBound(currentPosition,direction);
      switch(direction){
        case "up": 
          return !(currentPosition[0] - 1 >= 0);
        case "down": 
          return !(currentPosition[0] + 1 < rows);
        case "left": 
          return !(currentPosition[1] - 1 >= 0);
        case "right":
          return !(currentPosition[1] + 1 < columns);
      }
    }

    //
    const addPoint = (board : string[][], target1: number, target2: number ) =>{
      if(target1 >= 0 && target1 < rows && target2 >= 0 && target2 < columns ){
      //if(target1 >= 0 && target1 < rows && target2 >= 0 && target2 < columns ){
        if(board[target1][target2] === "apple"){
          setPoints(points + 1);
          spawnApple();
        }else if(board[target1][target2] === "snake"){
          gameOver();
        }   
      }else{
        gameOver();
      }
    }
    



    //adds the heads position to the list of snakeBody and pops the tail out if grow is false
    const moveSnakeBody = (position: number[], grow: boolean) =>{
      const newSnakeBody = [...snakeBody];
      newSnakeBody.unshift(position);
      if(!grow){
        if(newSnakeBody.length > 1){ 
          const tail = newSnakeBody.pop();
          if (tail?.length == 2){
            board[tail[0]][tail[1]] = "block";
          }
        }
      }
      setSnakeBody(newSnakeBody);
    }
    
    const gameOver = () => {
      console.log("GAME OVER!");
      //restartGame();
    }


    //Checks if the next position of head is out of bounds and returns boolean.
    const isDirectionOutOfBound = (currentPosition: number[], direction : string) =>{
      switch(direction){
        case "up": 
          return !(currentPosition[0] - 1 >= 0);
        case "down": 
          return !(currentPosition[0] + 1 < rows);
        case "left": 
          return !(currentPosition[1] - 1 >= 0);
        case "right":
          return !(currentPosition[1] + 1 < columns);
      }
    }



    const moveSnake = () => {
      if (isDirectionOutOfBound(currentPosition, snakeDirection)) {
        gameOver();
        return;
      }
    
      const newBoard = [...board];
      let newTargetRow = currentPosition[0];
      let newTargetColumn = currentPosition[1];
    
      switch (snakeDirection) {
        case "right":
          newTargetColumn += 1;
          break;
        case "left":
          newTargetColumn -= 1;
          break;
        case "up":
          newTargetRow -= 1;
          break;
        case "down":
          newTargetRow += 1;
          break;
        default:
          break;
      }
    
      addPoint(newBoard, newTargetRow, newTargetColumn);
    
      if (board[newTargetRow][newTargetColumn] === "apple") {
        moveSnakeBody(currentPosition, true);
      } else {
        moveSnakeBody(currentPosition, false);
      }
    
      newBoard[currentPosition[0]][currentPosition[1]] = "snake";
        
        setCurrentPosition([newTargetRow, newTargetColumn]);
        newBoard[newTargetRow][newTargetColumn] = "snakeHead";
        setBoard(newBoard);
    };

      //restarts the game
      // const restartGame = () => {
      //   setBoard(initialGrid);
      //   setCurrentPosition(startPosition);
      //   setSnakeDirection("right");
      //   setPoints(0);
      //   setSnakeBody([startPosition]);
      //   spawnApple(); 
      // };

      
      
      
      useEffect(() => {
        const timer = setInterval(moveSnake, 80); // Run every 1 second
        
        // Cleanup function to clear the timer when component unmounts
        return () => clearInterval(timer);
      }, [board,currentPosition,snakeDirection]);
      
      
      useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        // Cleanup function to remove event listener when component unmounts
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }, [board]); // Dependency array ensures the event listener is set up only once
      
      //we spawn one apple when the game starts
      useEffect( () => {
        spawnApple();
      },[]);
      
      
      return (
        <div className='board'>
          <h3>POINTS : {points}</h3>
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
    <Snake/>
    </>
  );
}



export default App;