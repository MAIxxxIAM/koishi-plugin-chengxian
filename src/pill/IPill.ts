import { Xian } from "../user/IUser"
import { monsterStage } from "../utils/data"


//创建一个枚举对象，0，1，2，3，4分别代表寿元，修为，悟性，肉身，法力
export enum FrialAdd {
    cultivation,
    perception,
    flesh,
    magic
}

export enum Elements {
    Gold,
    Wood,
    Earth,
    Water,
    Fire,

}

//药物五味
export enum Taste {
    Sour = Elements.Wood,
    Bitter = Elements.Fire,
    Sweet = Elements.Earth,
    Spicy = Elements.Gold,
    Salty = Elements.Water
}

//五行生克关系
enum WuxingRelation {
    SameAsMe = 0,
    ShengsMe = 3,
    IsShengedByMe = 2,
    IsKeedByMe = 1,
    KesMe = 4
}
//创建一个丹药类，包括属性和值
export class CreatePill {
    attribute: FrialAdd
    value: number
    description: string
    name: string

    //构造函数，接受2个枚举值,五行和五味,通过逻辑判断相生相克生成丹药
    constructor(fiveElement: Elements, fiveTaste: Taste) {

        //妖丹五行决定数值范围
        let stage = Math.floor(Math.random() * monsterStage[fiveElement].level[1] - monsterStage[fiveElement].level[0] + 1) + monsterStage[fiveElement].level[0]
        let pillAttribute: number
        let pillWuxing: number
        const attrString = ['修为', '悟性', '肉身', '法力']

        //获得五味和五行的生克关系
        const relation: WuxingRelation = (5 + fiveTaste - fiveElement) % 5

        //根据五行生克关系生成丹药五行
        switch (relation) {
            case 0:
                pillAttribute = fiveElement
                break
            case 1:
                pillAttribute = (fiveElement + 4) % 5
                break
            case 4:
                pillAttribute = (fiveElement + 2) % 5
                break
            case 2:
                pillAttribute = (fiveElement+ 4) % 5
                break
            case 3:
                pillAttribute = (fiveElement + 1) % 5
                break
        }

        //五行入五脏，五脏藏五神，对应4种属性
        switch (pillAttribute) {
            case 0:
                pillWuxing = FrialAdd.flesh
                this.name = '健体丹'
                break
            case 1:
                pillWuxing = FrialAdd.magic
                this.name = '醒神丹'
                break
            case 2:
            case 3:
                pillWuxing = FrialAdd.perception
                this.name = '心意丹'
                break
            case 4:
                pillWuxing = FrialAdd.cultivation
                this.name = '问道丹'
                break
        }
        this.attribute = pillWuxing
        this.value = stage
        this.description = `这是一颗增加${attrString[this.attribute]}的${this.name}，服下增添 ${this.value} ${attrString[this.attribute]}`
    }
}

export class Pill {
    attribute: FrialAdd
    value: number
    description: string
    name: string
    constructor(pill: { attribute: FrialAdd, value: number, description: string,name: string }) {
        this.attribute = pill.attribute
        this.value = pill.value
        this.description = pill.description
        this.name = pill.name
    }


    //使用丹药，接受一个玩家对象
    usePill(player: Xian) {
        switch (this.attribute) {
            case 0:
                player.friar.cultivation.qi += this.value
                break
            case 1:
                player.friar.ability.perception += this.value
                break
            case 2:
                player.friar.ability.flesh += this.value
                break
            case 3:
                player.friar.ability.magic += this.value
                break
        }
    }

}