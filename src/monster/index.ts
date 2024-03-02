import { Elements } from "../pill";
import { Ability } from "../user";
import { monster, monsterStage } from "../utils/data";
import { rollAbility } from "../utils/method";


//定义一个怪物类，传入最高等级和最低等级，随机生成一个怪物
export class Monster{
    name:string
    ability:Ability
    level:number
    type:number
    element:Elements
    constructor(maxLevel:number,minLevel:number){
        const animals = [
            '虎', '龙', '鹿', '狐', '狼', '熊', '鹤', '鸠', '鹰', '鼠',
            '鼍', '兕', '鹿', '猿', '猴', '猪', '牛', '马', '羊', '狨'
          ]

        //随机选择一种怪物
        const randomMonster = Math.floor(Math.random() * monster.length)

          this.type = randomMonster

        //随机生成怪物能力属性和等级
        this.ability =rollAbility(monster[randomMonster].ability)
        
        //根据level范围生成随即等级
        this.level = Math.floor(Math.random() * (maxLevel - minLevel + 1) + minLevel)

        //根据等级确定颜色
          const {name,Ele} = (monsterStage.filter(stage=>{stage.level.includes(this.level)}))[0]
          const color = name
          this.element = Ele

        //根据动物，颜色，类型，生成怪物名字
        this.name = color + animals[Math.floor(Math.random() * animals.length)] + monster[randomMonster].name
    }

}