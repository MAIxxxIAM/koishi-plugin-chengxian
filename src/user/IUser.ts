import { Context, is } from "koishi"
import { Item } from "../item/Iitem"
import { Pill } from "../pill/IPill"
import { SkillEquip } from "../skill/Skill"
import { map } from "../utils/data"
import { Dungeon, Dungeons } from "../dungeon/Idungeon"

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
    age?: number
    cultivation: PlayerStage
    ability: Ability
    identity: string | number
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
    status?: boolean
    isDungeon: boolean
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
    dx: number
    dy: number
    constructor(position: { x: number, y: number, dx: number, dy: number }) {
        this.x = position.x
        this.y = position.y
        this.dx = position.dx
        this.dy = position.dy
    }

    private right(player: Xian, isDungeon: boolean) {
        !isDungeon ? player.position.x++ : player.position.dx++
    }
    private left(player: Xian, isDungeon: boolean) {
        !isDungeon ? player.position.x-- : player.position.dx--
    }
    private up(player: Xian, isDungeon: boolean) {
        !isDungeon ? player.position.y++ : player.position.dy++
    }
    private down(player: Xian, isDungeon: boolean) {
        !isDungeon ? player.position.y-- : player.position.dy--
    }
    async move(direction: '东' | '西' | '南' | '北', player: Xian, ctx: Context) {
        const isDungeon = player.isDungeon
        const maps = isDungeon ? (await ctx.database.get('dungeons', { id: player.id }))[0].dungeons.map : map
        if (isDungeon) {

        }
        const directionMap = {
            '东': () => {
                this.right(player, isDungeon)
                if (maps.find(P => P.coordinates == (isDungeon ? player.position.dx : player.position.x) + ',' + (isDungeon ? player.position.dy : player.position.y)) === undefined || maps.find(P => P.coordinates == (isDungeon ? player.position.dx : player.position.x) + ',' + (isDungeon ? player.position.dy : player.position.y)).level > player.friar.cultivation.stage) {
                    this.left(player, isDungeon)
                    return false
                }
                return '向东移动'
            },
            '西': () => {
                this.left(player, isDungeon)
                if (maps.find(P => P.coordinates == (isDungeon ? player.position.dx : player.position.x) + ',' + (isDungeon ? player.position.dy : player.position.y)) === undefined || maps.find(P => P.coordinates == (isDungeon ? player.position.dx : player.position.x) + ',' + (isDungeon ? player.position.dy : player.position.y)).level > player.friar.cultivation.stage) {
                    this.right(player, isDungeon)
                    return false
                }
                return '向西移动'
            },
            '南': () => {
                this.down(player, isDungeon)
                if (maps.find(P => P.coordinates == (isDungeon ? player.position.dx : player.position.x) + ',' + (isDungeon ? player.position.dy : player.position.y)) === undefined || maps.find(P => P.coordinates == (isDungeon ? player.position.dx : player.position.x) + ',' + (isDungeon ? player.position.dy : player.position.y)).level > player.friar.cultivation.stage) {
                    this.up(player, isDungeon)
                    return false
                }
                return '向南移动'
            },
            '北': () => {
                this.up(player, isDungeon)
                if (maps.find(P => P.coordinates == (isDungeon ? player.position.dx : player.position.x) + ',' + (isDungeon ? player.position.dy : player.position.y)) === undefined || maps.find(P => P.coordinates == (isDungeon ? player.position.dx : player.position.x) + ',' + (isDungeon ? player.position.dy : player.position.y)).level > player.friar.cultivation.stage) {
                    this.down(player, isDungeon)
                    return false
                }
                return '向北移动'
            },
        }
        return directionMap[direction]()
    }
    async toDungeon(player: Xian, ctx: Context) {
        const inMap = new Position(player.position)
        let dungeon: Dungeon
        player.position.dx = 0
        player.position.dy = 0
        player.isDungeon = true
        const dungeonArray: Dungeons[] = (await ctx.database.get('dungeons', { id: player.id }))
        dungeon = dungeonArray.length == 0 ? new Dungeon(inMap) : dungeonArray[0].dungeons
        await ctx.database.upsert('xian', [player])
        await ctx.database.upsert('dungeons', [{
            id: player.id,
            dungeons: dungeon
        }])
        return [`进入了秘境\n`, dungeon.map]
    }
    async outDungeon(player: Xian, ctx: Context) {
        player.position.dx = 0
        player.position.dy = 0
        player.isDungeon = false
        await ctx.database.upsert('xian', [player])
        await ctx.database.remove('dungeons', { id: player.id })
        return `你离开了秘境`
    }
}

export class FrialBage {
    items?: Item[]
    pills?: Pill[]
    constructor(bag: { items: Item[], pills: Pill[] }) {
        this.items = bag.items
        this.pills = bag.pills
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