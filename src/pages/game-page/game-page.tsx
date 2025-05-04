import { GridAnimation } from "../../animations/grid-animation.tsx";
import { CellType } from "../../enums/cell-type.ts";
import { CrossAnimation } from "../../animations/cross-animation.tsx";
import { OvalAnimation } from "../../animations/oval-animation.tsx";
import React, { useEffect, useState } from "react";

type GamePageProps = {
    winCombinations: number[][];
    computerMoveTimeout: number;
    animationTimeout: number;
    gameFieldSize: number;
};

export function GamePage({
    winCombinations,
    computerMoveTimeout,
    animationTimeout,
    gameFieldSize,
}: GamePageProps) {
    const [playerCellType, setPlayerCellType] = useState<CellType>(
        CellType.CROSS,
    );
    const computerCellType =
        playerCellType === CellType.CROSS ? CellType.OVAL : CellType.CROSS;

    const [isAnimationPlaying, setIsAnimationPlaying] =
        useState<boolean>(false);
    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);

    const [gameFieldData, setGameFieldData] = useState<CellType[]>(
        Array(gameFieldSize).fill(CellType.DEFAULT),
    );
    const [winningCombination, setWinningCombination] = useState<number[]>([]);

    useEffect(() => {
        if (!isPlayerTurn && !isAnimationPlaying) {
            const timeoutId = setTimeout(() => {
                computerMove();
            }, computerMoveTimeout);

            return () => clearTimeout(timeoutId);
        }
    }, [isPlayerTurn, isAnimationPlaying]);

    useEffect(() => {
        checkFinishCombinations();
    }, [isPlayerTurn]);

    const computerMove = () => {
        const availableCells = gameFieldData
            .map((cell, index) => (cell === CellType.DEFAULT ? index : null))
            .filter((index) => index !== null);

        if (availableCells.length > 0) {
            const randomIndex = Math.floor(
                Math.random() * availableCells.length,
            );
            const cellToPlay = availableCells[randomIndex];

            const newGameFieldData = [...gameFieldData];
            newGameFieldData[cellToPlay] = computerCellType;
            setGameFieldData(newGameFieldData);

            setIsPlayerTurn(true);
        }
    };

    const checkFinishCombinations = () => {
        checkWinCombinations();
        checkDrawCombinations();
    };

    const checkWinCombinations = () => {
        for (const winCombination of winCombinations) {
            const [firstCellIndex, secondCellIndex, thirdCellIndex] =
                winCombination;

            if (
                gameFieldData[firstCellIndex] === CellType.DEFAULT ||
                gameFieldData[secondCellIndex] === CellType.DEFAULT ||
                gameFieldData[thirdCellIndex] === CellType.DEFAULT
            ) {
                continue;
            }

            if (
                gameFieldData[firstCellIndex] ===
                    gameFieldData[secondCellIndex] &&
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
    };

    const checkDrawCombinations = () => {
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

    const handleRestartClicked = () => {
        setWinningCombination([]);
        setIsPlayerTurn(true);
        setGameFieldData(Array(gameFieldSize).fill(CellType.DEFAULT));
    };

    const handleCellClicked = (cellIndex: number) => {
        if (
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
        <div className="game-page-container">
            <div className="game-page_title">Tic-Tac-Toe!</div>
            <div className="game_page_content">
                <GridAnimation />
                <div className="game_page__grid_container">
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
                                            ? "game_page__win_cell"
                                            : "game_page__other_cell"
                                        : "game_page__cell"
                                }
                            >
                                {element}
                            </div>
                        );
                    })}
                </div>
            </div>
            <button
                className="game_page_restart_button"
                type="button"
                onClick={handleRestartClicked}
            >
                Restart game
            </button>
            <div className="game_page_change_type_block">
                <button
                    className="game_page_change_type_button"
                    type="button"
                    onClick={handleCellTypeChangeClicked}
                >
                    Switch cell type
                </button>
                <div className="game_page_change_type_description">
                    Current cell type: {playerCellType}
                </div>
            </div>
        </div>
    );
}
