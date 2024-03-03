import { Elements, Taste } from "../pill/IPill"

export interface Item{
    name: string
    quantity: number
}

export interface DemonCore extends Item {
    monsterStage: Elements    
}

export interface SpiritGrass extends Item {
    id:number
    level: number
    Taste:Taste
}

export interface Mine extends Item {
    id:number
    level: number
    sharp:0|1|2|3|4|5
}