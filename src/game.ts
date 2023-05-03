
export enum AnnotationPosition {
    Center = 'center',
    Border = 'border',
}

export interface AnnotationValue {
    position: AnnotationPosition;
    values: Set<string>;
}

export interface Predefined {
    predefined: string;
}

export function isPredefined(v: any): v is Predefined {
    return Object.hasOwn(v, 'predefined') && typeof v.predefined === 'string';
}

export type CellValue = string | Predefined | AnnotationValue;

export default interface GameState {
    board: Array<Array<CellValue>>;
}

export function emptyState(): GameState {
    return {
        board: Array.apply(null, Array(9)).map(() => Array.apply(null, Array(9)).map(() => '')),
    }
}
