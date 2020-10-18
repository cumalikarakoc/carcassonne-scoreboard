export default interface Player{
    id: number,
    color: string,
    imageUrl: string,
    ownRobberImageUrl: string,
    selected: boolean,
    points: number,
    robbers: number[],
    transactions: string[]
}
