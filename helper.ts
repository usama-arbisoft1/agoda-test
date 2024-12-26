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
    return `${hours}h ${minutes.toString().padStart(1, '0')}m`
}
export function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    const day = date.getDate()
    const month = date.toLocaleString('en-US', { month: 'short' })
    return `${day} ${month}`
}
export async function verifyFlightParts(selectedfrom : string, selectedTo : string , index : number = 0){
    let first = true
    let last = ""
    let orignElements = await $$('div[data-element-name="flight-detail-button"]')[index].$$('p[data-testid="origin-airport"]')
    for (const airport of orignElements) {
        await airport.waitForClickable({ timeout: 5000, timeoutMsg: 'From Airport not found in parts' });
        let airportName = await airport.getText()
        airportName = airportName.replace(" • ", "")
        if(first){
            await expect(airportName).toEqual(selectedfrom)
        }else{
            selectedfrom = last = airportName
        }
        first = !first
    }
    await expect(last).toEqual(selectedTo)
}