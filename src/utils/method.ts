import { Context, Session, is } from "koishi"
import { Ability, Friar, Position, Xian } from "../user/IUser"
import { identity, map } from "./data"
import { mainConfig } from ".."
import { Map } from "../map/map"


//获取组合id

export const commandI18n = {
    "toDungeon": "秘境",
    "cultivation": "修炼",
    "selfInfo": "信息",
    "move": "移动",
    "flesh": "肉身",
    "magic": "法力",
    "perception": "悟性",
    "遭遇": "遭遇",
    "采集": "采集",
}

export function getPid(session: Session<never, never, Context>): string {
    const { userId, channelId } = session
    const pid = userId + channelId
    return pid
}

//创建新角色
export function createNewPlayer(session: Session<never, never, Context>, name: string,): Xian {

    const id = getPid(session)

    //随机选择一个身份，身份数据，初始10点
    const identityRandom = identity[Math.floor(Math.random() * identity.length)]

    //初始化角色数据，年龄60-120岁，修为0，能力随机
    const friar: Friar = {
        name,
        age: Math.floor(Math.random() * 60 + 60),
        cultivation: {
            stage: 0,
            qi: 0
        },
        identity: identityRandom.id,
        ability: rollAbility(identityRandom.ability)
    }

    //创建玩家对象并返回
    const xian: Xian = {
        id,
        friar,
        lingshi: identityRandom.lingshi,
        position: new Position({ x: 0, y: 0, dx: 0, dy: 0 }),
        isDungeon: false
    }
    return xian
}


//随机生成能力
export function rollAbility({ perception, flesh, magic }): Ability {

    //初始化能力对象
    let ability: Ability = {
        perception: 0,
        flesh: 0,
        magic: 0
    }

    //随机3次1-6点的roll点，最后数值*5，最后得到的是15-90的能力值
    for (let i = 0; i < 3; i++) {
        ability['perception'] += Math.floor(Math.random() * 6) + 1
        ability['flesh'] += Math.floor(Math.random() * 6) + 1
        ability['magic'] += Math.floor(Math.random() * 6) + 1


        if (i === 2) {
            ability['perception'] *= 5
            ability['flesh'] *= 5
            ability['magic'] *= 5
            //最后加上初始化的身份加成
            ability['perception'] += perception
            ability['flesh'] += flesh
            ability['magic'] += magic
        }
    }

    return ability
}

//markdown模板
export function md(content: string[]) {
    //config配置对象转为数组
    const keys = [mainConfig.key1, mainConfig.key2, mainConfig.key3, mainConfig.key4, mainConfig.key5, mainConfig.key6, mainConfig.key7, mainConfig.key8, mainConfig.key9, mainConfig.key10]

    //根据config配置对象，生成markdown数据
    const data = keys.map((key, index) => {
        return {
            key: key,
            values: [content[index]]
        }
    }).filter(item => item.values[0] !== undefined && item.values[0] !== "")//过滤掉undefined的数据

    //返回markdown数据
    return data
}

//按钮
export function button(按钮类型: number, 权限: number, 按钮文字: string, 数据: string, 权限成员: string, id: string, enter = true) {

    return {
        "id": id,
        "render_data": {
            "label": 按钮文字,
            "visited_label": 按钮文字
        },
        "action": {
            "type": 按钮类型,// 0 跳转按钮：http 或 小程序 客户端识别 scheme， 1 回调按钮：回调后台接口, data 传给后台， 2 指令按钮：自动在输入框插入 @bot data
            "permission": {
                "type": 权限,//2为所有人,0为指定成员
                "specify_user_ids": [权限成员]
            },
            "unsupport_tips": "请输入@Bot 1",
            "data": 数据,
            "enter": enter //是否点击发送消息，默认为true
        },
    }
}

export function kbbtn(a: string[], session: Session<never, never, Context>) {
    return {
        "rows": [
            { "buttons": [button(2, 0, a[0] ? a[0] : " ", a[0] ? "/" + a[0] : " ", session.userId, "左上", a[0] ? true : false), button(2, 0, "↑", "/move 北", session.userId, "上"), button(2, 0, a[1] ? a[1] : " ", a[1] ? "/" + a[1] : " ", session.userId, "左上", a[1] ? true : false)] },
            { "buttons": [button(2, 0, "←", "/move 西", session.userId, "左"), button(2, 0, "信息", "/selfInfo", session.userId, "中"), button(2, 0, "→", "/move 东", session.userId, "右")] },
            { "buttons": [button(2, 0, a[2] ? a[2] : " ", a[2] ? "/" + a[2] : " ", session.userId, "左上", a[2] ? true : false), button(2, 0, "↓", "/move 南", session.userId, "下"), button(2, 0, a[3] ? a[3] : " ", a[3] ? "/" + a[3] : " ", session.userId, "左上", a[3] ? true : false)] }
        ]

    }
}


export function getQi(culTime: number, player: Xian) {

    //获取玩家悟性
    const perception = player.friar.ability.perception

    //获取身份加成
    const x: number = identity[player.friar.identity].ability.perception

    //通过时间差计算修炼获得的经验
    let qi = Math.floor(culTime / 1000 * perception / ((200 - x * 6)*2))

    //通过时间差计算修炼花费的灵石.一颗灵石折算10点气
    let spendLingshi = Math.ceil((qi / 10) < 1 ? 1 : (qi / 10))

    if (spendLingshi > player.lingshi) {
        spendLingshi = player.lingshi
        qi = spendLingshi * 10
    }
    player.lingshi -= spendLingshi
    player.friar.cultivation.qi += qi

    return {
        qi,
        spendLingshi
    }
}

export async function positionAreas(ctx: Context, player: Xian) {

    //获取玩家坐标
    let { x, y, dx, dy } = player.position
    const isDungeon = player.isDungeon
    isDungeon ? (x = dx, y = dy) : null
    const maps = isDungeon ? (await ctx.database.get('dungeons', { id: player.id }))[0].dungeons.map : map
    //获取玩家周围的坐标
    const up = maps.find(P => P.coordinates == `${x},${y + 1}`)
    const down = maps.find(P => P.coordinates == `${x},${y - 1}`)
    const left = maps.find(P => P.coordinates == `${x - 1},${y}`)
    const right = maps.find(P => P.coordinates == `${x + 1},${y}`)

    //返回周围坐标，有设施则返回设施id，没有则返回undefined
    return {
        up: up ? up.id : undefined,
        down: down ? down.id : undefined,
        left: left ? left.id : undefined,
        right: right ? right.id : undefined
    }
}

//
export async function areaCommand(cmd: string, player:Xian,ctx): Promise<boolean> {
    let maps: Map[]
    //判断是否在副本
    player.isDungeon ? maps = (await ctx.database.get('dungeons', { id:player.id }))[0].dungeons.map : maps = map
    const { x, y ,dx,dy} =  player.position
    const ix = ( player.isDungeon ? dx : x)
    const iy = ( player.isDungeon ? dy : y)
    return maps.find(P => P.coordinates == `${ix},${iy}`)?.command.includes(cmd)
}

export async function getNowPosition(ctx: Context, player: Xian) {

    //定义所在大地图
    let maps: Map[]

    //判断是否在副本
    player.isDungeon ? maps = (await ctx.database.get('dungeons', { id:player.id }))[0].dungeons.map : maps = map
    const areas = await positionAreas(ctx, player)
    const { up, down, left, right } = areas
    const x = (player.isDungeon ? player.position.dx : player.position.x)
    const y = (player.isDungeon ? player.position.dy : player.position.y)
    const thisPosition = maps.find(P => P.coordinates == x + "," + y)?.name
    const Command: string[] = maps.find(P => P.coordinates == x + "," + y)?.command
    const i18nCommand: string[] = Command?.map(P => commandI18n[P])
    const thisCommand = i18nCommand.join('\n')
    const strArea = player.friar.name + "  当前位置：" + thisPosition + "\r\r " + (up !== undefined ? `>北部：${maps.find(P => P.id == up).name}\r` : '') + (down !== undefined ? `>南部：${maps.find(P => P.id == down).name}\r` : '') + (left !== undefined ? `>西部：${maps.find(P => P.id == left).name}\r` : '') + (right !== undefined ? `>东部：${maps.find(P => P.id == right).name}\r` : '')
    return { strArea, thisCommand }

}

export async function sendMarkdornMessage(session: Session<never, never, Context>, strArea: string, thisCommand: string) {
    const mdStr = strArea.split('\n')
    const mdCommand = thisCommand.split("\n")
    await session.bot.internal.sendMessage(session.channelId, {
        content: "111",
        msg_type: 2,
        markdown: {
            custom_template_id: mainConfig.markdownId,
            params: md(mdStr)
        },
        keyboard: {
            content: kbbtn(mdCommand, session),
        },
        msg_id: session.messageId,
        timestamp: session.timestamp,
        msg_seq: Math.floor(Math.random() * 1000000),
    })
}

