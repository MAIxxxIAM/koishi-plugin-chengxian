import { Context } from "koishi";
import { Xian } from "../user";
import { CreatePill, Pill } from "../pill";




export function apply(ctx:Context){
    // ctx.command('test1', '测试').action(async ({ session }) => {
    //     const { userId, channelId } = session
    //   const player:Xian=(await ctx.database.get('xian', { id: userId+channelId}))[0]
    //   const pill = new CreatePill(0, 3)
    //   console.log(pill)
    //   await ctx.database.set('xian', { id: userId+channelId }, { pill: pill })
    //   await session.send(pill.description)
    //   await session.send(`寿元:${player.friar.age} 修为:${player.friar.cultivation} 悟性:${player.friar.ability.perception} 肉身:${player.friar.ability.flesh} 法力:${player.friar.ability.magic}`)
    // })

    // ctx.command('test2', '测试').action(async ({ session }) => {
    //     const { userId, channelId } = session
    //     const player:Xian=(await ctx.database.get('xian', { id: userId+channelId}))[0]
    //     const pill:Pill =new Pill(player.pill)
    //     pill.usePill(player)
    //     player.pill=null
    //     await ctx.database.upsert('xian',[ player])
    //     await session.send(`寿元:${player.friar.age} 修为:${player.friar.cultivation} 悟性:${player.friar.ability.perception} 肉身:${player.friar.ability.flesh} 法力:${player.friar.ability.magic}`)
    // })

}