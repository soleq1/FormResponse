
export  type Question = {
    id: Number,
    question?: String,
    response?: String,
    rating?:Number,
    comments?:String,
    focused:Boolean,
}
export type Response ={
    id:Number,
    response?:String,
    question?:String,
    rating?:Number,
    comments?:String,
    focused:Boolean,
}

export  type Focus = {
    type: keyof Response | null,
    index: number | null
}