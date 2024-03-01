import { Ability } from "../user";
import { monster } from "../utils/data";
import { rollAbility } from "../utils/method";


//定义一个怪物类，传入最高等级和最低等级，随机生成一个怪物
export class Monster{
    ability:Ability
    level:number
    constructor(maxLevel:number,minLevel:number){

        //随机选择一种怪物
        const randomMonster = Math.floor(Math.random() * monster.length)

        //随机生成怪物能力属性和等级
        this.ability =rollAbility(monster[randomMonster].ability)
        
        this.level = Math.floor(Math.random() * (maxLevel - minLevel + 1) + minLevel)
    }

}