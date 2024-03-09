import { Context } from "koishi";
import { Position, Xian } from "../user/IUser";
import { CreatePill, Pill } from "../pill/IPill";
import { map, stage } from "../utils/data";
import { areaCommand, kbbtn, md, positionAreas } from "../utils/method";
import { Monster } from "../monster/IMonster";
import { battler } from "../battle/Ibattle";
import { Dungeon, Dungeons } from "../dungeon/Idungeon";
import { Map } from "../map/map";
import { mainConfig } from "..";




export function apply(ctx: Context) {


/* 
    //移动测试
    ctx.command('move <pMove>', '移动测试').action(async ({ session }, pMove: "东" | "西" | "南" | "北") => {
        if (!pMove) return '请输入正确的方向'
        const { userId, channelId } = session
        const player: Xian = (await ctx.database.get('xian', { id: userId + channelId }))[0]
        let maps: Map[]
        player.isDungeon ? maps = (await ctx.database.get('dungeons', { id: userId + channelId }))[0].dungeons.map : maps = map
        const move = new Position(player.position)
        const str = await move.move(pMove, player, ctx)
        if (!str) return '前方无路，也许是你的修为还不够'
        await ctx.database.upsert('xian', [player])
        const areas = await positionAreas(ctx, player)
        const { up, down, left, right } = areas
        const x = (player.isDungeon ? player.position.dx : player.position.x)
        const y = (player.isDungeon ? player.position.dy : player.position.y)
        const thisPosition = maps.find(P => P.coordinates == x + "," + y)?.name
        const thisCommand = maps.find(P => P.coordinates == x + "," + y).command.join("\n")
        const strArea = player.friar.name + "  当前位置：" + thisPosition + "\n" + (up !== undefined ? `北部：${maps.find(P => P.id == up).name}\n` : '') + (down !== undefined ? `南部：${maps.find(P => P.id == down).name}\n` : '') + (left !== undefined ? `西部：${maps.find(P => P.id == left).name}\n` : '') + (right !== undefined ? `东部：${maps.find(P => P.id == right).name}\n` : '')

        try {
            const mdStr = strArea.split('\n')
            await session.bot.internal.sendMessage(session.channelId, {
                content: "111",
                msg_type: 2,
                markdown: {
                    custom_template_id: mainConfig.markdownId,
                    params: md(mdStr)
                },
                keyboard: {
                    content: kbbtn(thisCommand.split("\n"), session),
                },
                msg_id: session.messageId,
                timestamp: session.timestamp,
                msg_seq: Math.floor(Math.random() * 1000000),
            })
            return
        } catch (e) {
            return strArea + "可用指令：\n" + thisCommand
        }
    })
 */
/*     ctx.command('toDungeon', '地牢测试')
        .alias('进秘境')
        .alias('出秘境')
        .action(async ({ session }) => {
            const { userId, channelId } = session
            const player: Xian = (await ctx.database.get('xian', { id: userId + channelId }))[0]
            const inMap = new Position(player.position)
            if (!areaCommand('toDungeon', inMap) && !areaCommand('出秘境', inMap) && !areaCommand('进秘境', inMap)) {
                const str = '你当前位置没有秘境入口'
                try {
                    await session.bot.internal.sendMessage(session.channelId, {
                        content: "111",
                        msg_type: 2,
                        markdown: {
                            custom_template_id: mainConfig.markdownId,
                            params: md([str])
                        },
                        keyboard: {
                            content: kbbtn([], session),
                        },
                        msg_id: session.messageId,
                        timestamp: session.timestamp,
                        msg_seq: Math.floor(Math.random() * 1000000),
                    })
                } catch (e) {
                    return str
                }
            }
            let str: string
            let cmd: string[]=[]
            let thisCommand: string
            if (player.isDungeon) {
                str = await inMap.outDungeon(player, ctx)
            } else {
                const createDungeon = await inMap.toDungeon(player, ctx)
                str = player.friar.name + createDungeon[0] as string
                const maps = createDungeon[1] as Map[]
                cmd = maps.find(P => P.coordinates == 0 + "," + 0).command
                const thisPosition = maps.find(P => P.coordinates == 0 + "," + 0).name
                thisCommand = maps.find(P => P.coordinates == 0 + "," + 0).command.join("\n")
                const areas = await positionAreas(ctx, player)
                const { up, down, left, right } = areas
                str += "当前位置：" + thisPosition + "\n" + (up !== undefined ? `北部：${maps.find(P => P.id == up).name}\n` : '') + (down !== undefined ? `南部：${maps.find(P => P.id == down).name}\n` : '') + (left !== undefined ? `西部：${maps.find(P => P.id == left).name}\n` : '') + (right !== undefined ? `东部：${maps.find(P => P.id == right).name}\n` : '')
            }
            try {
                await session.bot.internal.sendMessage(session.channelId, {
                    content: "111",
                    msg_type: 2,
                    markdown: {
                        custom_template_id: mainConfig.markdownId,
                        params: md(str.split("\n"))
                    },
                    keyboard: {
                        content: kbbtn(cmd, session),
                    },
                    msg_id: session.messageId,
                    timestamp: session.timestamp,
                    msg_seq: Math.floor(Math.random() * 1000000),
                })
            } catch (e) {
                console.log(e)
                return str
            }
        })
 */




    //   await session.send(`寿元:${player.friar.age} 修为:${stage[player.friar.cultivation.stage].stage}${player.friar.cultivation.qi} 悟性:${player.friar.ability.perception} 肉身:${player.friar.ability.flesh} 法力:${player.friar.ability.magic}`)


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