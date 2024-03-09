import { Context } from "koishi"
import { Position, Xian } from "../user/IUser"
import { map } from "../utils/data"
import { areaCommand, getNowPosition, kbbtn, md, positionAreas, sendMarkdornMessage } from "../utils/method"
import { Map } from "../map/map"
import { Monster } from "../monster/IMonster"
import { battler } from "../battle/Ibattle"




export function apply(ctx: Context) {



    //移动测试
    ctx.command('xian')
        .subcommand('move <pMove>', '移动测试')
        .alias('移动')
        .action(async ({ session }, pMove: "东" | "西" | "南" | "北") => {
            if (!pMove) return '请输入正确的方向'

            //获取玩家id,读取数据库
            const { userId, channelId } = session
            const players: Xian[] = (await ctx.database.get('xian', { id: userId + channelId }))
            if (players.length === 0) { await session.execute("register"); return }
            const player = players[0]

            //实例化玩家坐标
            const move = new Position(player.position)

            //获取移动提示
            const str = await move.move(pMove, player, ctx)
            if (!str) return '前方无路，也许是你的修为还不够'

            //同步数据库玩家坐标
            await ctx.database.upsert('xian', [player])

            //获取玩家周围坐标和地图可用指令
            const { strArea, thisCommand } = await getNowPosition(ctx, player)

            //尝试发送markdorn消息
            try {
                await sendMarkdornMessage(session, strArea, thisCommand)
                return
            } catch (e) {
                return strArea + "可用指令：\n" + thisCommand
            }
        })

    ctx.command('xian')
        .subcommand('toDungeon', '地牢测试')
        .alias('秘境')
        .alias('出秘境')
        .action(async ({ session, command }) => {
            const isCommand = command.name
            const { userId, channelId } = session
            const player: Xian = (await ctx.database.get('xian', { id: userId + channelId }))[0]
            const inMap = new Position(player.position)

            let str: string
            let cmd: string = ""

            if (!areaCommand(isCommand, player, ctx)) {
                const str = '你当前位置没有秘境入口'
                try {
                    await sendMarkdornMessage(session, str, "")
                } catch (e) {
                    return str
                }
            }
            if (player.isDungeon) {
                str = await inMap.outDungeon(player, ctx)
                const { strArea, thisCommand } = await getNowPosition(ctx, player)
                str = str + "\n" + strArea
                cmd = thisCommand
            } else {
                const createDungeon = await inMap.toDungeon(player, ctx)
                str = player.friar.name + createDungeon[0] as string
                const { strArea, thisCommand } = await getNowPosition(ctx, player)
                str = strArea
                cmd = thisCommand
            }


            try {
                await sendMarkdornMessage(session, str, cmd)
            } catch (e) {
                console.log(e)
                return str + "可用指令：\n" + cmd
            }


        })





    //   await session.send(`寿元:${player.friar.age} 修为:${stage[player.friar.cultivation.stage].stage}${player.friar.cultivation.qi} 悟性:${player.friar.ability.perception} 肉身:${player.friar.ability.flesh} 法力:${player.friar.ability.magic}`)


    ctx.command('test2', '测试').action(async ({ session }) => {
        const { userId, channelId } = session
        const player: Xian = (await ctx.database.get('xian', { id: userId + channelId }))[0]
        const monster = new Monster(1, 0)
        const battle = new battler(player)
        const target = new battler(monster)
        const string = battle.useSkill(target)
        return string
    })
}