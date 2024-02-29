import { Context } from "koishi"
import { Cultivation, Xian } from "../user"

// 为 koishi 添加新的数据库表
declare module 'koishi' {
    interface Tables {
      xian: Xian //玩家数据表
      cultivation: Cultivation //修炼时刻表
    }
  }

export function Model(ctx: Context) {
    
  ctx.model.extend('xian', {
    id: 'string',
    friar: 'json',
    equip: 'json',
    lingshi: 'unsigned'
  }, {
    primary: 'id'
  })
  ctx.model.extend('cultivation', {
    id: 'string',
    setTimeId: 'unsigned',
    overTime: 'timestamp'
  }, {
    primary: 'id'
  })
}