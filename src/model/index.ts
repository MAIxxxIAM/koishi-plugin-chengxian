import { Context } from "koishi"
import { Xian } from "../user/IUser"

// 为 koishi 添加新的数据库表
declare module 'koishi' {
    interface Tables {
      xian: Xian //玩家数据表
    }
  }

export function Model(ctx: Context) {
    
  ctx.model.extend('xian', {
    id: 'string',
    friar: 'json',
    equip: 'json',
    lingshi: 'unsigned',
    position: 'json',
    startTime: 'timestamp',
    skillEquip: 'list',
    status: 'boolean'
  }, {
    primary: 'id'
  })

}