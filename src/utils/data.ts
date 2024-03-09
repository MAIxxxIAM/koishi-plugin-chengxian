import * as  ide from '../assets/json/identity.json'
import * as Stage from '../assets/json/stage.json'
import * as Maps from '../assets/json/map.json'
import * as Buff from '../assets/json/buff.json'
import * as Skills from '../assets/json/skill.json'
import { Map } from '../map/map'
import { Skill } from '../skill/Skill'
import * as Dungeon from '../assets/json/dungeons.json'

export const identity = ide.identity
export const monster = ide.monster
export const stage = Stage.friar
export const monsterStage = Stage.monster
export const map = Maps as Map[]
export const buffs = Buff
export const skills = Skills as Skill[]
export const dungeon = Dungeon

