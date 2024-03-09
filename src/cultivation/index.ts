import { Context } from "koishi";
import { areaCommand, getPid, getQi } from "../utils/method";
import { Xian } from "../user/IUser";




export function apply(ctx: Context) {

    ctx.before("command/execute", async ({ session, command }) => {
        const players = await ctx.database.get('xian', { id: session.userId + session.channelId })
        if (players.length === 0) {
            if (command.parent?.name == "xian" && command.name !== "resgister") {
                await session.execute("register")
            }
            return
        }
        const player = players[0]
        if (command.name !== "selfInfo") {
            if (player.status && command.parent?.name == "xian" && command.name !== "cultivation") {
                await session.execute("cultivation")
                return
            }
        }
    })

    ctx.command('xian', '百炼成仙')
        .subcommand('cultivation', '修炼')
        .alias('修炼')
        .action(async ({ session, command }) => {
            const isCommand = command.name
            const pid = getPid(session)
            const players: Array<Xian> = await ctx.database.get('xian', { id: pid })
            const startTime = new Date()
            if (players.length === 0) {
                await session.execute('register')
                return
            }
            const player = players[0]
            if (player.status) {
                const now = new Date()
                const culTime = now.getTime() - player.startTime.getTime()
                const { qi, spendLingshi } = getQi(culTime, player)
                player.status = false
                await ctx.database.upsert('xian', [player])
                return `你停止了修炼，获得了${qi}点修为，花费了${spendLingshi}灵石`
            }
            const { position } = player
            if (!areaCommand(isCommand, player, ctx) || player.status) return `你当前位置没有聚灵阵无法修炼，请回到客栈。\n或者你已经在修炼了`
            player.startTime = startTime
            player.status = true
            await ctx.database.upsert('xian', [player])
            return `你开始了修炼`
        })

}