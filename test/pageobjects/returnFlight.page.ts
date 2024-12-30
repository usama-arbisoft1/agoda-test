import { addDurations } from '../../helper';
class returnFlight {
    public get firstReturnFlightCard(){
        return  $$('div[data-element-name="flight-detail-button"]')[1]
    }
    public get OriginAirportElement(){
        return this.firstReturnFlightCard.$$('p[data-testid="origin-airport"]')
    }
    public get selectButton(){
        return this.firstReturnFlightCard.$('button[data-component="flight-card-bookButton"]')
    }
    public get durationSpan(){
        return this.firstReturnFlightCard.$('span[data-testid="duration"]')
    }
    public get timeDurationParts(){
        return this.firstReturnFlightCard.$$('p[data-testid="duration"]')
    }
    public get layoverTimes(){
        return this.firstReturnFlightCard.$$('div[data-testid="layover"] p')
    }
    private async selectReturnFlight(){
        await this.selectButton.waitForClickable()
        await this.selectButton.click()
    }
    private async clickReturnFirstCard(){
        let firstCard = this.firstReturnFlightCard
        await firstCard.waitForClickable()
        await firstCard.click()
    }
    private async verifyReturnFlightParts(selectedfrom : string, selectedTo : string){
        let first = true
        let last = ""
        let orignElements = await this.OriginAirportElement
        for (const airport of orignElements) {
            await airport.waitForClickable({ timeout: 5000, timeoutMsg: 'From Airport not found in parts' });
            let airportName = await airport.getText()
            airportName = airportName.replace(" • ", "")
            if(first){
                await expect(airportName).toEqual(selectedfrom)
            }else{
                selectedfrom = last = airportName
                console.log(selectedfrom , last , airportName)
            }
            first = !first
        }
        await expect(last).toEqual(selectedTo)
    }
    private async verifyReturnFlightTime(){
        let totalTime = "0h 0m"
        await this.durationSpan.waitForClickable()
        let shownTime = await this.durationSpan.getText()
        let timeElements = await this.timeDurationParts
        for (const timeDuration of timeElements) {
            await timeDuration.waitForClickable({ timeout: 5000});
            let partTime = await timeDuration.getText()
            totalTime =  addDurations(totalTime, partTime);
        }
        let layOverTimes = await this.layoverTimes
        for (const layover of layOverTimes) {
            await layover.waitForClickable()
            let layovertext = await layover.getText()
            let time = layovertext.replace(" layover", "")
            totalTime = addDurations(totalTime, time)
        }
        await expect(totalTime).toEqual(shownTime)
    }
    public async verifyReturnFlightPage(from : string , to : string){
        await this.clickReturnFirstCard()
        await this.verifyReturnFlightParts(to , from);
        await this.verifyReturnFlightTime()
        await this.selectReturnFlight()
    }
}
export default new returnFlight()