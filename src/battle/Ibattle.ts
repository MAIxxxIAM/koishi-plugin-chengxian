import { Monster } from "../monster/IMonster"
import { Sects, Skill } from "../skill/Skill"
import { Ability, PlayerStage, Xian } from "../user/IUser"
import { buffs,} from "../utils/data"
import { commandI18n } from "../utils/method"


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
    identity: string | number
    sects:Sects
    buff?: Buff[]
    skillEquip?: Array<Skill>

    //传入一个玩家对象，生成对战者类型
    constructor(player: Xian | Monster) {
        this.id = player.id
        this.name = player.friar.name
        this.cultivation = player.friar.cultivation
        this.ability = player.friar.ability
        this.identity = player.friar.identity
        this.sects = player.friar.sects
        let skillA: Skill[] = []
        //如果玩家有装备技能，将技能id实例化
        if (player.skillEquip) {

            for (let i = 0; i < 4; i++) {
                skillA[i] = player.friar.sects[Number(player.skillEquip[i])]
            }
            this.skillEquip = skillA
        } else {
            for (let i = 0; i < 4; i++) {
                skillA[i] = player.friar.sects[0]
            }
            this.skillEquip = skillA.sort((a, b) => a.priority - b.priority)
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
        this.ability[aBuff.ability] += aBuff.value
        return `${this.name}出现了${aBuff.name},${aBuff.value > 0 ? '增加了' : '失去了'}${Math.abs(aBuff.value)}点${commandI18n[aBuff.ability]}，持续${aBuff.duration}回合`
    }

    //每回合更新buff，将buff的持续时间减一，如果为0则删除
    updateBuff() {
        if (!this.buff) {
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
        this.updateBuff()
        this.skillEquip.forEach(S => {
            if (S?.round > 0) { S.round-- }
        })
        let battleStr: string = ''
        let buffStr: string = ''
        let readySkill = this.skillEquip.find(S => S?.round == 0)
        if (!readySkill) {
            readySkill = this.sects.skills[0]
        }
        switch (readySkill.target) {
            case 'self':
                buffStr = this.addBuff(readySkill.buffId)
                battleStr = `${this.name}使用了${readySkill.name},${buffStr}`
                break
            case 'enemy':
                let damage: number = 0
                /* 
                伤害计算,并且计算伤害效果
                */
                const damageStr = `${this.name}使用了${readySkill.name},对${target.name}造成了${damage}点伤害`
                buffStr = target.addBuff(readySkill.buffId)
                battleStr = `${damageStr}，${buffStr}`

        }
        this.skillEquip.forEach(S => {
            if (S?.id == readySkill.id) {
                S.round = S.cd
            }
        })
        return battleStr
    }
}