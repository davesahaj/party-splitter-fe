// eslint-disable-next-line checkFile/filename-naming-convention
export interface BillCardType {
  venue: string
  people: number
  date: Date
  cost: number
}

export interface BillItem {
  name: string
  price: number
  qty: number
  consumers?: string[]
}

export interface Report {
  id: string
  venue: string
  date: Date
  participants: string[]
  items: BillItem[]
  discount: number
  taxes: number
  total: number
}
