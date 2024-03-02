import { Ability } from "../user";
import { monster, monsterStage } from "../utils/data";
import { rollAbility } from "../utils/method";


//定义一个怪物类，传入最高等级和最低等级，随机生成一个怪物
export class Monster{
    name:string
    ability:Ability
    level:number
    constructor(maxLevel:number,minLevel:number){
        const animals = [
            '虎', '龙', '鹿', '狐', '狼', '熊', '鹤', '鸠', '鹰', '鸡',
            '鸭', '鹅', '鹿', '猿', '猴', '猪', '牛', '马', '羊', '鸽'
          ]

        //随机选择一种怪物
        const randomMonster = Math.floor(Math.random() * monster.length)



        //随机生成怪物能力属性和等级
        this.ability =rollAbility(monster[randomMonster].ability)
        
        //根据level范围生成随即等级
        this.level = Math.floor(Math.random() * (maxLevel - minLevel + 1) + minLevel)

        //根据等级确定颜色
        const color = (monsterStage.filter(stage=>{stage.level.includes(this.level)}))[0].name

        //根据动物，颜色，类型，生成怪物名字
        this.name = color + animals[Math.floor(Math.random() * animals.length)] + monster[randomMonster].name
    }

}