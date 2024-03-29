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

export interface Sects{
    id:number
    name:string
    skills:Skill[]
}

export type SkillEquip =[string?,string?,string?,string?]