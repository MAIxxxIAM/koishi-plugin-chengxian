import { Context } from "koishi";
import { areaCommand, getPid } from "../utils/method";
import { Xian } from "../user/IUser";




export function apply(ctx:Context){

    ctx.command('xian', '百炼成仙')
    .subcommand('cultivation', '修炼')
    .alias('修炼')
    .action(async ({ session }) => {
        const { userId, channelId } = session
        const pid = getPid(session)
        const players:Array<Xian> = await ctx.database.get('xian', { id: pid })
        const startTime = new Date()
        if (players.length === 0) {
            await session.execute('register')
            return
        }
        const player = players[0]
        const {position} = player
        if (!areaCommand('修炼',position)||player.status) return `你当前位置没有聚灵阵无法修炼，请回到客栈。\n或者你已经在修炼了`
        player.startTime = startTime
        player.status=true
        await ctx.database.upsert('xian', [player])
        return `你开始了修炼`
    })

}