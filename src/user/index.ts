
//装备 武器和防具
export interface Equip {
    weapon?: number
    armor?: number
}

export interface PlayerStage {
    stage: number
    qi: number
}

//玩家角色，包括姓名，年龄，修为，能力
export interface Friar {
    name: string
    age: number
    cultivation: PlayerStage
    ability: Ability
    identity: string
}

//玩家角色，包括id，角色信息，装备信息
export interface Xian {
    id: string
    friar: Friar
    equip?: Equip
    lingshi: number
    position?: Position
}

//修炼时刻表，包括id，设置计时器id用于取消计时，修炼结束时间用于重启校正计时器
export interface Cultivation {
    id: string
    startTime?: Date
}

//能力，包括感知，肉身，法力
export interface Ability {
    perception: number
    flesh: number
    magic: number
}

//定义一个坐标类，用于记录玩家位置，以及移动的方法
export class Position {
    x: number
    y: number
    constructor(position: { x: number, y: number }) {
        this.x = position.x
        this.y = position.y
    }

    private right(player: Xian) {
        player.position.x++
    }
    private left(player: Xian) {
        player.position.x--
    }
    private up(player: Xian) {
        player.position.y++
    }
    private down(player: Xian) {
        player.position.y--
    }
    move(direction: '东' | '西' | '南' | '北', player: Xian) {
        const directionMap = {
            '东': () => {
                this.right(player)
                return '向东移动'
            },
            '西': () => {
                this.left(player)
                return '向西移动'
            },
            '南': () => {
                this.down(player)
                return '向南移动'
            },
            '北': () => {
                this.up(player)
                return '向北移动'
            },
        }
        return directionMap[direction]()
    }
}