import { Context } from "koishi"
import { Xian } from "../user/IUser"
import { Dungeons } from "../dungeon/Idungeon"

// 为 koishi 添加新的数据库表
declare module 'koishi' {
    interface Tables {
      xian: Xian //玩家数据表
      dungeons: Dungeons
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
    status: 'boolean',
    isDungeon: 'boolean'
  }, {
    primary: 'id'
  })
  ctx.model.extend('dungeons', {
    id: 'string',
    dungeons: 'json'
  }, {
    primary: 'id'
  })

}