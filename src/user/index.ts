//装备 武器和防具
export interface Equip {
    weapon?: number
    armor?: number
}

//玩家角色，包括姓名，年龄，修为，能力
export interface Friar {
    name: string
    age: number
    cultivation: number
    ability: Ability
    identity: string
}

//玩家角色，包括id，角色信息，装备信息
export interface Xian {
    id:string
    friar: Friar
    equip?: Equip
    lingshi: number
}

//修炼时刻表，包括id，设置计时器id用于取消计时，修炼结束时间用于重启校正计时器
export interface Cultivation {
    id:string
    setTimeId?: number
    overTime?: Date
}

//能力，包括感知，肉身，法力
export interface Ability {
    perception:number
    flesh:number
    magic:number
}