export interface PopulationResponse {
    data: PopulationNationData[] | PopulationStateData[]
    source: Source
}

export interface PopulationNationData {
    "ID Nation": string
    Nation: string
    "ID Year": number
    Year: string
    Population: number
    "Slug Nation": string
}

export interface PopulationStateData {
    "ID State": string
    State: string
    "ID Year": number
    Year: string
    Population: number
    "Slug State": string
}

export interface Source {
    measures: string[]
    annotations: Annotations
    name: string
    substitutions: string[]
}

export interface Annotations {
    source_name: string
    source_description: string
    dataset_name: string
    dataset_link: string
    table_id: string
    topic: string
    subtopic: string
}

export type pupulationDrilldowns = 'Nation' | 'State'
