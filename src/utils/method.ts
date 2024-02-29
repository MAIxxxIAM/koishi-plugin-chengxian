import { Context, Session } from "koishi"
import { Ability, Friar, Xian } from "../user"
import { identity } from "./data"
import { Config } from ".."


//获取组合id
export function getPid(session: Session<never, never, Context>): string {
    const { userId, channelId } = session
    const pid = userId + channelId
    return pid
}

//创建新角色
export function createNewPlayer(session: Session<never, never, Context>, name: string,): Xian {

    const id = getPid(session)

    //随机选择一个身份，身份数据，初始10点
    const identityRandom = identity[Math.floor(Math.random() * 8)]

    //初始化角色数据，年龄60-120岁，修为0，能力随机
    const friar: Friar = {
        name,
        age: Math.floor(Math.random() * 60 + 60),
        cultivation: 0,
        identity: identityRandom.id,
        ability: rollAbility(identityRandom.ability)
    }

    //创建玩家对象并返回
    const xian: Xian = {
        id,
        friar,
        lingshi:identityRandom.lingshi
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
export function md(config:Config, content:string[],session:Session<never, never, Context>){
    //config配置对象转为数组
    const keys = [config.key1,config.key2,config.key3,config.key4,config.key5,config.key6,config.key7,config.key8,config.key9,config.key10]

    //根据config配置对象，生成markdown数据
    const data = keys.map((key, index) => {
        return {
            key: key,
            values: [content[index]]
        }
    }).filter(item => item.values[0] !== undefined)//过滤掉undefined的数据

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