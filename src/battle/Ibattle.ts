import { Monster } from "../monster/IMonster"
import { Skill } from "../skill/Skill"
import { Ability, PlayerStage, Xian } from "../user/IUser"
import { buffs, skills } from "../utils/data"


//定义一个buff接口，包括名字，持续时间，效果
export interface Buff {
    name: string
    duration: number
    effect: Partial<Ability>
}


//定义一个战斗者类，包括id，名字，修为，能力，身份，buff，技能
export class battler {
    id: string
    name: string
    cultivation: PlayerStage
    ability: Ability
    identity: string|number
    buff?: Buff[]
    skillEquip?: Array<Skill>

    //传入一个玩家对象，生成对战者类型
    constructor(player: Xian|Monster) {
        this.id = player.id
        this.name = player.friar.name
        this.cultivation = player.friar.cultivation
        this.ability = player.friar.ability
        this.identity = player.friar.identity

        //如果玩家有装备技能，将技能id实例化
        if (player.skillEquip) {
            let skillA: Skill[] = []
            for (let i = 0; i < 4; i++) {
                skillA[i] = skills[player.skillEquip[i]]
            }
            this.skillEquip = skillA
        }
    }
    //创建一个添加buff方法，传入buffid，将buff实例化
    addBuff(buffId: number) {
        if (!this.buff) {
            this.buff = []
        }
        const aBuff = buffs.find(B => B.id == buffId)
        if (aBuff) {
            const buff: Buff = {
                name: aBuff.name,
                duration: aBuff.duration,
                effect: {}
            }
            buff.effect[aBuff.ability] = aBuff.value
            this.buff.push(buff)
        }
    }

    //每回合更新buff，将buff的持续时间减一，如果为0则删除
    updateBuff() {
        if (!this.buff){
            return
        }
        this.buff.forEach(B => {
            B.duration = B.duration - 1
            if (B.duration == 0) {
                this.buff.splice(this.buff.indexOf(B), 1)
            }
        })
    }

    //对目标使用技能
    useSkill(target: battler) {

    }

}