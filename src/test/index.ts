import { Context } from "koishi";
import { Position, Xian } from "../user/IUser";
import { CreatePill, Pill } from "../pill/IPill";
import { map, stage } from "../utils/data";
import { positionAreas } from "../utils/method";
import { Monster } from "../monster/IMonster";
import { battler } from "../battle/Ibattle";




export function apply(ctx:Context){


/* 
    //移动测试
    ctx.command('test1 <pMove>', '移动测试').action(async ({ session },pMove:"东" | "西" | "南" | "北") => {
        const { userId, channelId } = session
      const player:Xian=(await ctx.database.get('xian', { id: userId+channelId}))[0]
      const move = new Position(player.position)
      const str=move.move(pMove,player)
      if (!str) return '前方无路，也许是你的修为还不够'
      await ctx.database.upsert('xian',[player])
      const areas=positionAreas(player.position)
      const {up,down,left,right}=areas
      const strArea=(up!==undefined?`北部：${map.find(P=>P.id==up).name}\n`:'')+(down!==undefined?`南部：${map.find(P=>P.id==down).name}\n`:'')+(left!==undefined?`西部：${map.find(P=>P.id==left).name}\n`:'')+(right!==undefined?`东部：${map.find(P=>P.id==right).name}\n`:'')
      await session.send(player.friar.name+str+"\n当前位置:"+map.find(P=>P.coordinates==player.position.x+","+player.position.y).name+"\n"+strArea)

 */




//   await session.send(`寿元:${player.friar.age} 修为:${stage[player.friar.cultivation.stage].stage}${player.friar.cultivation.qi} 悟性:${player.friar.ability.perception} 肉身:${player.friar.ability.flesh} 法力:${player.friar.ability.magic}`)
    // })

    // ctx.command('test2', '测试').action(async ({ session }) => {
    //     const { userId, channelId } = session
    //     const player: Xian = (await ctx.database.get('xian', { id: userId + channelId }))[0]
    //     const monster = new Monster(1,0)
    //     const battle =new battler(player)
    //     const target = new battler(monster)
    //     const string = battle.useSkill(target)
    //     return string
    // })
}