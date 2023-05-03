import './Cell.css';
import {CSSProperties, useState} from "react";
import {AnnotationPosition, CellValue, isPredefined} from "./game";

function BorderValues({values}: { values: Set<string> }) {
    const indices = Array.apply(null, Array(3)).map((_, y) => Array.apply(null, Array(3)).map((_, x) => x + y * 3 + 1));

    return (<table className="border-values">
        <tbody>
        {indices.map((row, y) => <tr key={y}>{
            row.map(cell => <td key={cell}>
                <div className="border-values-content">{
                    values.has(cell.toString()) ? cell : ''
                }</div>
            </td>)
        }</tr>)}
        </tbody>
    </table>);
}


export default function Cell({x, y, value}: { x: number, y: number, value: CellValue }) {
    const [color, setColor] = useState('white');

    function computeStyle(x: number, y: number): CSSProperties {
        function computeSingle(index: number): string {
            const BORDER_THICC = '3px solid black';
            const BORDER_THINN = '1px solid black';

            if (index % 3 === 0) {
                return BORDER_THICC;
            } else {
                return BORDER_THINN;
            }
        }

        return {
            borderTop: computeSingle(y),
            borderBottom: computeSingle(y + 1),
            borderLeft: computeSingle(x),
            borderRight: computeSingle(x + 1),
            background: color,
        }
    }

    let renderedValue: any;
    let predefinedCell = false;
    if (typeof value === 'string') {
        renderedValue = <div className="cell-number">{
            value
        }</div>;
    } else if (isPredefined(value)) {
        renderedValue = <div className="cell-number cell-predefined">{
            value.predefined
        }</div>;
        predefinedCell = true;
    } else if (value.position === AnnotationPosition.Center) {
        const values = Array.from(value.values);
        values.sort();
        renderedValue = values.join(' ');
    } else {
        renderedValue = <BorderValues values={value.values}></BorderValues>
    }

    return <td
        className="cell"
        onClick={() => {
            if (predefinedCell) {
                return;
            }
            setColor('green');
        }}
        onContextMenu={e => {
            e.preventDefault();
            if (predefinedCell) {
                return;
            }
            setColor('blue');
        }}
        style={computeStyle(x, y)}
    >
        {renderedValue}
    </td>
}
