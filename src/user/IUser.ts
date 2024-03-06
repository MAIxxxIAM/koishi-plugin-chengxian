import { Item } from "../item/Iitem"
import { Pill } from "../pill/IPill"
import { SkillEquip } from "../skill/Skill"
import { map } from "../utils/data"

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
    startTime?: Date
    skillEquip?: SkillEquip
    status?:boolean
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
                if (map.find(P=>P.coordinates==player.position.x + ',' + player.position.y) === undefined||map.find(P=>P.coordinates==player.position.x + ',' + player.position.y).level>player.friar.cultivation.stage) {
                    this.left(player)
                    return false
                }
                return '向东移动'
            },
            '西': () => {
                this.left(player)
                if (map.find(P=>P.coordinates==player.position.x + ',' + player.position.y) === undefined||map.find(P=>P.coordinates==player.position.x + ',' + player.position.y).level>player.friar.cultivation.stage) {
                    this.right(player)
                    return false
                }
                return '向西移动'
            },
            '南': () => {
                this.down(player)
                if (map.find(P=>P.coordinates==player.position.x + ',' + player.position.y) === undefined||map.find(P=>P.coordinates==player.position.x + ',' + player.position.y).level>player.friar.cultivation.stage) {
                    this.up(player)
                    return false
                }
                return '向南移动'
            },
            '北': () => {
                this.up(player)
                if (map.find(P=>P.coordinates==player.position.x + ',' + player.position.y) === undefined||map.find(P=>P.coordinates==player.position.x + ',' + player.position.y).level>player.friar.cultivation.stage) {
                    this.down(player)
                    return false
                }
                return '向北移动'
            },
        }
        return directionMap[direction]()
    }
}

export class FrialBage {
    items?:Item[]
    pills?:Pill[]
    constructor (bag:{items:Item[],pills:Pill[]}){
        this.items=bag.items
        this.pills=bag.pills
    }

    addItem(item: Item | Pill) {
        if (item instanceof Pill) {
            this.pills?.push(item);
        } else {
            this.items?.push(item);
        }
    }
    removeItem(item: Item | Pill) {
        if (item instanceof Pill) {
            this.pills?.splice(this.pills.indexOf(item), 1);
        } else {
            this.items?.splice(this.items.indexOf(item), 1);
        }
    }

}