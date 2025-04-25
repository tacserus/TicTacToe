import {useEffect, useState} from "react";
import {CellType} from "./cell-type.ts";
import {GridAnimation} from "../../animations/grid-animation.tsx";
import CrossAnimation from "../../animations/cross-animation.tsx";
import OvalAnimation from "../../animations/oval-animation.tsx";
import {winCombinations} from "./win-combinations.ts";
import {FirstTurn} from "./first-turn.ts";

export default function MainPage() {
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const [playerCellType, setPlayerCellType] = useState<CellType>(CellType.CROSS);
    const computerCellType = playerCellType === CellType.CROSS ? CellType.OVAL : CellType.CROSS;

    const gameFieldSize = 9;
    const [gameFieldData, setGameFieldData] = useState<CellType[]>(Array(gameFieldSize).fill(CellType.DEFAULT));

    const [firstTurn, setFirstTurn] = useState<FirstTurn>(FirstTurn.RANDOM)

    const getInitialPlayerTurn = (turn: FirstTurn): boolean => {
        switch (turn) {
            case FirstTurn.COMPUTER:
                return false;
            case FirstTurn.PLAYER:
                return true;
            default:
                return Math.random() < 0.5;
        }
    };

    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(getInitialPlayerTurn(firstTurn));

    useEffect(() => {
        if (!isPlayerTurn && isGameStarted) {
            const timeoutId = setTimeout(() => {
                computerMove();
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [isPlayerTurn, isGameStarted]);

    const onStartClicked = () => {
        setIsGameStarted(true);
    };

    const onRestartClicked = () => {
        const initialTurn = getInitialPlayerTurn(firstTurn);
        setIsPlayerTurn(initialTurn);
        setGameFieldData(Array(gameFieldSize).fill(CellType.DEFAULT));
    };

    const checkWinCombination = (newGameFieldData) => {
        for (const winCombination of winCombinations) {
            const [a, b, c] = winCombination;

            if (newGameFieldData[a] === CellType.DEFAULT || newGameFieldData[b] === CellType.DEFAULT || newGameFieldData[c] === CellType.DEFAULT) {
                continue;
            }

            if (newGameFieldData[a] === newGameFieldData[b] && newGameFieldData[a] === newGameFieldData[c]) {
                console.log(isPlayerTurn ? "player won" : "computer won");
                onRestartClicked();
                break;
            }
        }
    };

    const generateFieldUI = () => {
        return (
            <div className="grid_container">
                {gameFieldData.map((cellType, index) => {
                    let element;

                    switch (cellType) {
                        case CellType.CROSS:
                            element = <CrossAnimation/>;
                            break;
                        case CellType.OVAL:
                            element = <OvalAnimation/>;
                            break;
                        default:
                            element = <div></div>;
                            break;
                    }

                    return (
                        <div key={index} onClick={() => onCellClicked(index)}>
                            {element}
                        </div>
                    );
                })}
            </div>
        );
    };

    const onCellClicked = (cellIndex: number) => {
        if (isGameStarted && isPlayerTurn && gameFieldData[cellIndex] === CellType.DEFAULT) {
            const newGameFieldData = [...gameFieldData];
            newGameFieldData[cellIndex] = playerCellType;
            setGameFieldData(newGameFieldData);
            checkWinCombination(newGameFieldData);

            setIsPlayerTurn(false)
        }
    };

    const computerMove = () => {
        const availableCells = gameFieldData.map((cell, index) => cell === CellType.DEFAULT ? index : null).filter(index => index !== null);

        if (availableCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableCells.length);
            const cellToPlay = availableCells[randomIndex];

            const newGameFieldData = [...gameFieldData];
            newGameFieldData[cellToPlay] = computerCellType;
            setGameFieldData(newGameFieldData);

            checkWinCombination(newGameFieldData);
            setIsPlayerTurn(true);
        }
    };

    const onCellTypeChangeClicked = () => {
        setPlayerCellType(prev => (prev === CellType.CROSS ? CellType.OVAL : CellType.CROSS));
        onRestartClicked();
    };

    const onFirstTurnChangeClicked = () => {
        switch (firstTurn) {
            case FirstTurn.COMPUTER:
                setFirstTurn(FirstTurn.RANDOM);
                break;
            case FirstTurn.PLAYER:
                setFirstTurn(FirstTurn.COMPUTER);
                break;
            case FirstTurn.RANDOM:
                setFirstTurn(FirstTurn.PLAYER);
                break;
        }
    };

    return (
        <div className="main_page_container">
            {isGameStarted && (
                <div className="game_container">
                    <GridAnimation/>
                    {generateFieldUI()}
                </div>
            )}
            <button type="button" onClick={isGameStarted ? onRestartClicked : onStartClicked}>
                {isGameStarted ? "Restart game" : "Start game"}
            </button>

            {isGameStarted && (
                <div>
                    <button type="button" onClick={() => {
                        onCellTypeChangeClicked()
                        onRestartClicked();
                    }}>
                        Switch cell type
                    </button>
                    <div>
                        Current cell type: {playerCellType}
                    </div>
                </div>
            )}
            {isGameStarted && (
                <div>
                    <button type="button" onClick={() => {
                        onFirstTurnChangeClicked()
                        onRestartClicked();
                    }}>
                        Switch first turn
                    </button>
                    <div>
                        Current first turn: {firstTurn}
                    </div>
                </div>
            )}
        </div>
    );
}
