export function addDurations(time1: string, time2: string): string {
    function parseToMinutes(time: string): number {
        const hoursMatch = time.match(/(\d+)h/)
        const minutesMatch = time.match(/(\d+)m/)
        const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0
        const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0
        return hours * 60 + minutes
    }
    const totalMinutes1 = parseToMinutes(time1)
    const totalMinutes2 = parseToMinutes(time2)
    const totalMinutes = totalMinutes1 + totalMinutes2
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}h ${minutes.toString().padStart(2, '0')}m`
}
export function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    const day = date.getDate()
    const month = date.toLocaleString('en-US', { month: 'short' })
    return `${day} ${month}`
}