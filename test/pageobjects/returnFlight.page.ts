import { addDurations, verifyFlightParts } from '../../helper';
class returnFlight {
    private get firstReturnFlightCard(){
        return  $$('div[data-element-name="flight-detail-button"]')[1]
    }
    private get selectButton(){
        return this.firstReturnFlightCard.$('button[data-component="flight-card-bookButton"]')
    }
    private get addToCartButton(){
        return this.firstReturnFlightCard.$('button[data-element-name="flights-details-add-to-cart"]')
    }
    private get durationSpan(){
        return this.firstReturnFlightCard.$('span[data-testid="duration"]')
    }
    private get timeDurationParts(){
        return this.firstReturnFlightCard.$$('p[data-testid="duration"]')
    }
    private get layoverTimes(){
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
        await verifyFlightParts(to , from , 1);
        await this.verifyReturnFlightTime()
        await this.selectReturnFlight()
    }
}
export default new returnFlight()