import { Context } from "koishi";
import { Position, Xian } from "../user/IUser";
import { CreatePill, Pill } from "../pill/IPill";
import { stage } from "../utils/data";




export function apply(ctx:Context){
    // ctx.command('test1 <pMove>', '测试').action(async ({ session },pMove:"东" | "西" | "南" | "北") => {
    //     const { userId, channelId } = session
    //   const player:Xian=(await ctx.database.get('xian', { id: userId+channelId}))[0]
    //   const move = new Position(player.position)
    //   console.log(move)
    //   const str=move.move(pMove,player)
    //   console.log(player.position)
    //   await ctx.database.set('xian', { id: userId+channelId }, { position:player.position})
    //   await session.send(player.friar.name+str+"当前位置:"+player.position.x+","+player.position.y)
    // //   await session.send(`寿元:${player.friar.age} 修为:${stage[player.friar.cultivation.stage].stage}${player.friar.cultivation.qi} 悟性:${player.friar.ability.perception} 肉身:${player.friar.ability.flesh} 法力:${player.friar.ability.magic}`)
    // })

    // ctx.command('test2', '测试').action(async ({ session }) => {
    //     const { userId, channelId } = session
    //     const player:Xian=(await ctx.database.get('xian', { id: userId+channelId}))[0]
    //     const pill:Pill =new Pill(player.pill)
    //     pill.usePill(player)
    //     player.pill=null
    //     await ctx.database.upsert('xian',[ player])
    //     await session.send(`寿元:${player.friar.age} 修为:${stage[player.friar.cultivation.stage].stage}${player.friar.cultivation.qi} 悟性:${player.friar.ability.perception} 肉身:${player.friar.ability.flesh} 法力:${player.friar.ability.magic}`)
    // })
}