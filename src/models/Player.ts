export default interface Player{
    id: number,
    color: string,
    imageUrl: string,
    selected: boolean,
    points: number,
    robbers: number[],
    transactions: string[]
}