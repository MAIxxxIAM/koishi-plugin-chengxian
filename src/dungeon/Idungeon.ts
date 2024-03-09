import {Map } from '../map/map'
import { Monster } from '../monster/IMonster'
import { Position } from '../user/IUser'
import { dungeon, map } from '../utils/data'

export interface Dungeons {
    id:string
    dungeons: Dungeon
}

export class Dungeon {
    map: Map[]

    constructor(position:Position){
        const inMap=map.find(P=>P.coordinates==position.x+","+position.y)
        const DungeonId:number=(inMap.id-9)%dungeon.length
        const DungeonNameList:string[] = dungeon[DungeonId].nameList
        let visited: boolean[] = []
        let maps:Map[]=[]
        let dx = [0, 1, 0, -1]
        let dy = [1, 0, -1, 0]
        const dfs = (x:number,y:number,id:number) =>{
            let coordinates = `${x},${y}`
            let name = DungeonNameList[Math.floor(Math.random() * DungeonNameList.length)]
            let level = inMap.level
            const command = ["遭遇","采集","出秘境"]
            const monsters={
                monsters:[],
            }
            const monstersNumber = Math.floor(Math.random() * 3)+1
            for(let i=0;i<monstersNumber;i++){
                monsters.monsters.push(new Monster(level+1,level))
            }
            maps.push({ coordinates, id, name, level,monsters,command})
            visited[id] = true
            let directions = [0, 1, 2, 3]
            for (let i = 3; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1))
                ;[directions[i], directions[j]] = [directions[j], directions[i]]
            }
            for (let i = 0; i < 4; i++) {
                let nx = x + dx[directions[i]]
                let ny = y + dy[directions[i]]
                let nid = nx * 10 + ny
    
                if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10 && !visited[nid]) {
                    dfs(nx, ny, nid)
                }
            }
        }
        dfs(0,0,0)
        this.map=maps
    }
}