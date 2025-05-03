import React from "react";
import { useEffect, useState } from "react";
import { CellType } from "./cell-type.ts";
import { GridAnimation } from "../../animations/grid-animation.tsx";
import { CrossAnimation } from "../../animations/cross-animation.tsx";
import { OvalAnimation } from "../../animations/oval-animation.tsx";
import { GameAnimation } from "../../animations/game-animation.tsx";

type MainPageProps = {
  winCombinations: number[][];
  computerMoveTimeout: number;
  animationTimeout: number;
  gameFieldSize: number;
};

export default function MainPage({
  winCombinations,
  computerMoveTimeout,
  animationTimeout,
  gameFieldSize,
}: MainPageProps) {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const [playerCellType, setPlayerCellType] = useState<CellType>(
    CellType.CROSS,
  );
  const computerCellType =
    playerCellType === CellType.CROSS ? CellType.OVAL : CellType.CROSS;

  const [isAnimationPlaying, setIsAnimationPlaying] = useState<boolean>(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);

  const [gameFieldData, setGameFieldData] = useState<CellType[]>(
    Array(gameFieldSize).fill(CellType.DEFAULT),
  );
  const [winningCombination, setWinningCombination] = useState<number[]>([]);

  useEffect(() => {
    if (isGameStarted && !isPlayerTurn && !isAnimationPlaying) {
      const timeoutId = setTimeout(() => {
        computerMove();
      }, computerMoveTimeout);

      return () => clearTimeout(timeoutId);
    }
  }, [isPlayerTurn, isGameStarted, isAnimationPlaying]);

  useEffect(() => {
    if (isGameStarted) {
      checkWinCombination();
    }
  }, [isGameStarted, isPlayerTurn]);

  const computerMove = () => {
    const availableCells = gameFieldData
      .map((cell, index) => (cell === CellType.DEFAULT ? index : null))
      .filter((index) => index !== null);

    if (availableCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCells.length);
      const cellToPlay = availableCells[randomIndex];

      const newGameFieldData = [...gameFieldData];
      newGameFieldData[cellToPlay] = computerCellType;
      setGameFieldData(newGameFieldData);

      setIsPlayerTurn(true);
    }
  };

  const checkWinCombination = () => {
    for (const winCombination of winCombinations) {
      const [firstCellIndex, secondCellIndex, thirdCellIndex] = winCombination;

      if (
        gameFieldData[firstCellIndex] === CellType.DEFAULT ||
        gameFieldData[secondCellIndex] === CellType.DEFAULT ||
        gameFieldData[thirdCellIndex] === CellType.DEFAULT
      ) {
        continue;
      }

      if (
        gameFieldData[firstCellIndex] === gameFieldData[secondCellIndex] &&
        gameFieldData[firstCellIndex] === gameFieldData[thirdCellIndex]
      ) {
        setIsAnimationPlaying(true);

        setTimeout(() => {
          setWinningCombination([
            firstCellIndex,
            secondCellIndex,
            thirdCellIndex,
          ]);
        }, animationTimeout / 3);

        setTimeout(
          () => {
            handleRestartClicked();
            setIsAnimationPlaying(false);
          },
          animationTimeout + animationTimeout / 3,
        );
        return;
      }
    }

    if (!gameFieldData.filter((cell) => cell === CellType.DEFAULT).length) {
      setIsAnimationPlaying(true);

      setTimeout(() => {
        setWinningCombination([...Array(9).keys()]);
      }, animationTimeout / 3);

      setTimeout(
        () => {
          handleRestartClicked();
          setIsAnimationPlaying(false);
        },
        animationTimeout + animationTimeout / 3,
      );
    }
  };

  const handleStartClicked = () => {
    setIsGameStarted(true);
  };

  const handleRestartClicked = () => {
    setWinningCombination([]);
    setIsPlayerTurn(true);
    setGameFieldData(Array(gameFieldSize).fill(CellType.DEFAULT));
  };

  const handleCellClicked = (cellIndex: number) => {
    if (
      isGameStarted &&
      isPlayerTurn &&
      !isAnimationPlaying &&
      gameFieldData[cellIndex] === CellType.DEFAULT
    ) {
      const newGameFieldData = [...gameFieldData];
      newGameFieldData[cellIndex] = playerCellType;
      setGameFieldData(newGameFieldData);

      setIsPlayerTurn(false);
    }
  };

  const handleCellTypeChangeClicked = () => {
    setPlayerCellType((prev) =>
      prev === CellType.CROSS ? CellType.OVAL : CellType.CROSS,
    );
    handleRestartClicked();
  };

  return (
    <div className="main_page_container">
      <div className="main_page_title">Tic-Tac-Toe!</div>
      {!isGameStarted && <GameAnimation />}
      {isGameStarted && (
        <div className="game_container">
          <GridAnimation />
          <div className="grid_container">
            {gameFieldData.map((cellType, index) => {
              let element;

              switch (cellType) {
                case CellType.CROSS:
                  element = <CrossAnimation />;
                  break;
                case CellType.OVAL:
                  element = <OvalAnimation />;
                  break;
                default:
                  element = <div></div>;
                  break;
              }

              return (
                <div
                  key={index}
                  onClick={() => handleCellClicked(index)}
                  className={
                    winningCombination.length > 0
                      ? winningCombination.includes(index)
                        ? "win_cell"
                        : "simple_cell"
                      : "game_cell"
                  }
                >
                  {element}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <button
        className="main_page_restart_button"
        type="button"
        onClick={isGameStarted ? handleRestartClicked : handleStartClicked}
      >
        {isGameStarted ? "Restart game" : "Start game"}
      </button>

      {isGameStarted && (
        <div className="main_page_change_type_block">
          <button
            className="main_page_change_type_button"
            type="button"
            onClick={() => handleCellTypeChangeClicked()}
          >
            Switch cell type
          </button>
          <div className="main_page_change_type_description">
            Current cell type: {playerCellType}
          </div>
        </div>
      )}
    </div>
  );
}
