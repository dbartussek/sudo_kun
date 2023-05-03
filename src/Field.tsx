import {useState} from "react";
import './Field.css';
import Cell from "./Cell";
import {emptyState} from "./game";

export default function Field() {
    const [data] = useState(emptyState());

    return (
        <table className="field">
            <tbody>
            {data.board.map((row, y) =>
                <tr key={y}>{row.map((cell, x) =>
                    <Cell key={`${x}-${y}`} x={x} y={y} value={cell}></Cell>)
                }</tr>
            )}
            </tbody>
        </table>
    );
}
