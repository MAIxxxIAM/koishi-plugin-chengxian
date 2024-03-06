export interface Skill {
    id:string
    name: string
    target:string
    priority: number
    cd: number
    round: number
    buffId?: number
    Damage: number
    description?: string
}

export type SkillEquip =[string?,string?,string?,string?]