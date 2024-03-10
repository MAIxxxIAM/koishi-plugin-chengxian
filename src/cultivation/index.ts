import { Context } from "koishi";
import { areaCommand, createNewPlayer, getNowPosition, getPid, getQi, sendMarkdornMessage } from "../utils/method";
import { Xian } from "../user/IUser";
import { identity } from "../utils/data";




export function apply(ctx: Context) {

    ctx.before("command/execute", async ({ session, command }) => {
        const players = await ctx.database.get('xian', { id: session.userId + session.channelId })
        if (players.length === 0&& command.parent?.name == "xian" && command.name !=="register") {
            if (command.parent?.name == "xian" && command.name !== "resgister") {
                await session.execute("register")
            }
            return
        }
        const player = players[0]
        if (command.name !== "selfInfo") {
            if (player?.status && command.parent?.name == "xian" && command.name !== "cultivation") {
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
                const { qi, spendLingshi, age } = getQi(culTime, player)
                player.status = false
                await ctx.database.upsert('xian', [player])
                if (player.friar.age <= 0) {
                    await session.execute('remake')
                    return
                }
                return `你停止了修炼，获得了${qi}点修为，花费了${spendLingshi}灵石，已过${age}载光阴`

            }
            if (!areaCommand(isCommand, player, ctx) || player.status) return `你当前位置没有聚灵阵无法修炼，请回到客栈。\n或者你已经在修炼了`
            player.startTime = startTime
            player.status = true
            await ctx.database.upsert('xian', [player])
            return `你开始了修炼`
        })

    ctx.command('xian', '百炼成仙').subcommand('remake', '重修').action(async ({ session }) => {
        const pid = getPid(session)
        const players: Array<Xian> = await ctx.database.get('xian', { id: pid })
        const player = players[0]
        if (player.status || player.friar.age > 0) return `你当前无法转世重修`
        const newPlayer = createNewPlayer(session, player.friar.name)
        player.friar = newPlayer.friar
        player.position = newPlayer.position
        const content = `你寿元已尽.转世重修成为了一名${identity[player.friar.identity].name}\n${identity[player.friar.identity].description}踏上了修仙之路\n初始能力：\n悟性：${player.friar.ability.perception}\n肉身：${player.friar.ability.flesh}\n法力：${player.friar.ability.magic}\rtips:身份只影响加成属性，实际面板由ROLL点+身份加成`
        await ctx.database.upsert('xian', [player])
        try {
            const mdContent: string[] = (content.split('\n'))

            //md消息第一行@用户
            mdContent[0] = `\r#\t<@${session.userId}>` + mdContent[0]
            mdContent[mdContent.length - 1] = `法力：${player.friar.ability.magic}\r\r>\t当前位置：客栈\rtips:身份只影响加成属性，实际面板由ROLL点+身份加成`

            const { strArea, thisCommand } = await getNowPosition(ctx, player)
            await sendMarkdornMessage(session, mdContent.join('\n') + `\t\t\r> ${strArea}`, thisCommand)
        } catch {
            return session.platform == 'qq' ? "\u200b\n" : '' + `${content.replace('\r', '\n')}`
        }
        return
    })

}