import { Monster } from "../monster/IMonster"

export interface Map {
    coordinates: string,
    id: number,
    name: string,
    level: number,
    monsters?: {
        max?: number,
        min?:number,
        monsters?:Monster[]
    },
    herbs?:number[],
    ores?:number[],
    command: string[]
}