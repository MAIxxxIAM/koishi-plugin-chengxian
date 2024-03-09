import { Context, Dict, Schema } from 'koishi'

import * as test from './test'

import * as cultivation from './cultivation'

//model文件中定义了数据库表
import { Model } from './model'

//method文件中写所有的方法
import { button, createNewPlayer, getPid, md } from './utils/method'

//user文件定义玩家角色的数据结构
import { Xian } from './user/IUser'

//data文件导入了一些静态数据,json或者图片等
import { identity } from './utils/data'

export const name = 'chengxian'

export const inject = {
  require: ['database']
}

export interface Config {
  markdownId: string
  key1: string
  key2: string
  key3: string
  key4: string
  key5: string
  key6: string
  key7: string
  key8: string
  key9: string
  key10: string
}
export let mainConfig: Config

export const Config: Schema<Schemastery.ObjectS<{}>, {} & Dict> = Schema.intersect([
  Schema.object({
    QQ官方使用MD: Schema.boolean().default(false),
  }).description('Markdown设置,需要server.temp服务'),
  Schema.union([
    Schema.object({
      QQ官方使用MD: Schema.const(true).required(),
      markdownId: Schema.string(),
      key1: Schema.string(),
      key2: Schema.string(),
      key3: Schema.string(),
      key4: Schema.string(),
      key5: Schema.string(),
      key6: Schema.string(),
      key7: Schema.string(),
      key8: Schema.string(),
      key9: Schema.string(),
      key10: Schema.string(),
    }),
    Schema.object({}),
  ]),
])

export function apply(ctx: Context, config: Config) {

  mainConfig = config

  // 为 koishi 添加新的数据库表
  Model(ctx)

  ctx.plugin(cultivation)
  ctx.plugin(test)

  ctx.command('xian', '百炼成仙')
    .subcommand('register <name:string>', '注册一个角色')
    .alias('注册')
    .action(async ({ session }, name) => {

      //验证名字是否符合规范:2-6个汉字
      const regex = /^[\u4e00-\u9fa5]{2,6}$/
      if (!regex.test(name)) {
        //尝试发送qq-markdown消息
        try {
          await session.bot.internal.sendMessage(session.channelId, {
            content: "111",
            msg_type: 2,
            keyboard: {
              content: {
                "rows": [
                  { "buttons": [button(2, 2, '输入一个2-6个汉字的名字进行注册', "/注册", session.userId, "注册", false)] },
                ]
              },
            },
            msg_id: session.messageId,
            timestamp: session.timestamp,
            msg_seq: Math.floor(Math.random() * 1000000),
          })
          return
        } catch (e) {
          return '输入一个2-6个汉字的名字进行注册'
        }
      }

      //获取组合id
      const id = getPid(session)

      //查询是否注册过
      const xian: Array<Xian> = await ctx.database.get('xian', { id })

      if (xian.length > 0) return '你已经注册过了'

      //创建新角色
      const player: Xian = createNewPlayer(session, name)

      //写入数据库
      await ctx.database.create('xian', player)
      const content = `你的角色名字是${name}\n你重生在一个修仙世界\n成为了一名${identity[player.friar.identity].name}\n${identity[player.friar.identity].description}\n带着${player.lingshi}灵石踏上了修仙之路\n初始能力：\n悟性：${player.friar.ability.perception}\n肉身：${player.friar.ability.flesh}\n法力：${player.friar.ability.magic}\rtips:身份只影响加成属性，实际面板由ROLL点+身份加成`

      //尝试发送md消息，失败则发送普通消息
      try {
        //文本切割
        const mdContent: string[] = (content.split('\n'))

        //md消息第一行@用户
        mdContent[0] = `\r#\t<@${session.userId}>` + mdContent[0]
        mdContent[mdContent.length-1] =`法力：${player.friar.ability.magic}\r\r>\ttips:身份只影响加成属性，实际面板由ROLL点+身份加成`

        /*
        qq内部接口参数是（群号，数据）
        数据方法接受3个参数，第一个是配置项，第二个是文本内容，第三个是session参数
        文本内容是一个数组，并且不能有\n等换行符号，最多10个元素
        */
        await session.bot.internal.sendMessage(session.channelId,
          {
            content: "222",
            msg_type: 2,
            markdown: {
              custom_template_id: config.markdownId,
              params: md(mdContent)
            },
            msg_id: session.messageId,
            timestamp: session.timestamp,
            msg_seq: Math.floor(Math.random() * 1000000),
          })

      } catch {

        return session.platform=='qq'?"\u200b\n":''+`${content.replace('\r', '\n')}`

      }

    })
}
