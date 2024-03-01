import { Context } from "koishi";
import { getPid } from "../utils/method";
import { Xian } from "../user";




export function apply(ctx:Context){

    ctx.command('xian', '百炼成仙')
    .subcommand('cultivation', '修炼')
    .alias('修炼')
    .action(async ({ session }) => {
        const { userId, channelId } = session
        const pid = getPid(session)
        const players:Array<Xian> = await ctx.database.get('xian', { id: pid })
        if (players.length === 0) {
            await session.execute('register')
            return
        }
        const player = players[0]
    })

}