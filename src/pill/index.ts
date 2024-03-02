import { Xian } from "../user"
import { monsterStage } from "../utils/data"


//创建一个枚举对象，0，1，2，3，4分别代表寿元，修为，悟性，肉身，法力
export enum FrialAdd {
    age,
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

export enum Taste {
    Sour = Elements.Wood,
    Bitter = Elements.Fire,
    Sweet = Elements.Earth,
    Spicy = Elements.Gold,
    Salty = Elements.Water
}

//创建一个丹药类，包括属性和值
export class CreatePill {
    attribute: FrialAdd
    value: number
    description: string

    //构造函数，接受2个枚举值,五行和五味,通过逻辑判断相生相克生成丹药
    constructor(fiveElement: Elements, fiveTaste: Taste) {
        let stage = Math.floor(Math.random() * monsterStage[fiveElement].level[1] - monsterStage[fiveElement].level[0] + 1) + monsterStage[fiveElement].level[0]
        const attrString = ['寿元', '修为', '悟性', '肉身', '法力']
        this.attribute = (fiveElement + fiveTaste) * stage % 5
        this.value = stage
        this.description = `这是一颗增加${attrString[this.attribute]}的丹药，服下增添 ${this.value} ${attrString[this.attribute]}`
    }
}

export class Pill {
    attribute: FrialAdd
    value: number
    description: string
    constructor(public pill:{attribute: FrialAdd,value: number,description: string}) {
        this.attribute = pill.attribute
        this.value = pill.value
        this.description = pill.description
    }


    //使用丹药，接受一个玩家对象
    usePill(player: Xian) {
        switch (this.attribute) {
            case 0:
                player.friar.age += this.value
                break
            case 1:
                player.friar.cultivation.qi += this.value
                break
            case 2:
                player.friar.ability.perception += this.value
                break
            case 3:
                player.friar.ability.flesh += this.value
                break
            case 4:
                player.friar.ability.magic += this.value
                break
        }
    }

}