//装备 武器和防具
export interface Equip {
    weapon?: number
    armor?: number
}

export interface playerStage{
    stage:number
    qi:number
}

//玩家角色，包括姓名，年龄，修为，能力
export interface Friar {
    name: string
    age: number
    cultivation: playerStage
    ability: Ability
    identity: string
}

//玩家角色，包括id，角色信息，装备信息
export interface Xian {
    id:string
    friar: Friar
    equip?: Equip
    lingshi: number
    position?:Position
}

//修炼时刻表，包括id，设置计时器id用于取消计时，修炼结束时间用于重启校正计时器
export interface Cultivation {
    id:string
    startTime?: Date
}

//能力，包括感知，肉身，法力
export interface Ability {
    perception:number
    flesh:number
    magic:number
}

//定义一个坐标类，用于记录玩家位置，以及移动的方法
export class Position{
    constructor(public x:number,public y:number){}

    right(){
        this.x++
    }
    left(){
        this.x--
    }
    up(){
        this.y++
    }
    down(){
        this.y--
    }
}