
export interface Map {
    coordinates: string,
    id: number,
    name: string,
    level: number,
    monsters?: {
        max: number,
        min:number
    },
    herbs?:number[],
    ores?:number[],
    command: string[]
}