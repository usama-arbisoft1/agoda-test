import { addDurations } from '../../helper';
class resultPage {
    private get flightFilterToggle(){
        return $('label[data-element-name="flight-filter-airline-toggle"]')
    }
    private get fromDestInput(){
        return $('div[data-testid="flight-origin-text-search"] input[placeholder="Flying from"]')
    }
    private get toDestInput(){
        return $('div[data-testid="flight-destination-text-search"] input[placeholder="Flying to"]')
    }
    private get thirdDivText(){
        return $('div[data-testid="flex-date-item-card"].a2578-border-product-primary-strong div p')
    }
    private get bestOverallButton(){
        return $('button[data-quick-sort-item-title="Best overall"]')
    }
    private get firstCard(){
        return $('div[data-element-name="flight-detail-button"]')
    }
    private get originCard(){
        return $('p[data-testid="origin"]')
    }
    private get destinationCard(){
        return $('p[data-testid="destination"]')
    }
    private get selectButton(){
        return $('button[data-component="flight-card-bookButton"]')
    }
    private get durationSpan(){
        return $('span[data-testid="duration"]')
    }
    private get flightDetailButton(){
        return $('div[data-element-name="flight-detail-button"]')
    }
    private async verifySingleDestination(destination : string , element : ChainablePromiseElement){
        await browser.waitUntil(async () =>  await element.getValue() !== ""
        , {
            timeout : 20000,
            timeoutMsg : "Not fount in 10 Sec",
            interval : 1000
        })
        let fromDest = await element.getValue()
        await expect(fromDest).toEqual(destination)
    }
    private async verifyDestinationsData (from : string , to : string){
        await this.flightFilterToggle.waitForClickable({timeout : 30000});
        await this.verifySingleDestination(from , this.fromDestInput)
        await this.verifySingleDestination(to , this.toDestInput)
    }
    private async verifyDates(departureDate : string , arrivalDate : string){
        await expect(this.thirdDivText).toBeDisplayed()
        let dateRange = await this.thirdDivText.getText()
        await expect(dateRange).toEqual(departureDate + ' — ' + arrivalDate)
    }
    private async verifyBestResellerOption (){
        browser.waitUntil(async () => await this.bestOverallButton.isClickable())
        await expect(this.bestOverallButton).toHaveElementClass('a2578-text-product-primary', { message: 'Best Overall isnt selected by default!' })
    }
    private async clickFirstListElement(){
        await this.firstCard.waitForExist()
        await this.firstCard.waitForClickable()
        await this.firstCard.click();
    }
    private async verifyParts(selectedfrom : string, selectedTo : string){
        let first = true
        let last = ""
        let orignElements = await this.firstCard.$$('p[data-testid="origin-airport"]')
        for (const airport of orignElements) {
            await airport.waitForClickable({ timeout: 5000, timeoutMsg: 'From Airport not found in parts' });
            if(first){
                let airportName = await airport.getText()
                airportName = airportName.replace(" • ", "");
                await expect(airportName).toEqual(selectedfrom)
            }else{
                let airportName = await airport.getText()
                last = airportName.replace(" • ", "");
                selectedfrom = last
            }
            first = !first
        }
        await expect(last).toEqual(selectedTo)
    }

    private async verifyOrigin(originShortCode : string){
        await this.originCard.waitForDisplayed({timeout : 5000 , timeoutMsg : "Orign Text not available"})
        await expect(await this.originCard.getText()).toEqual(originShortCode)
    }
    private async verifyDestinations(destinationShortCode : string){
        await this.destinationCard.waitForDisplayed({timeout : 5000 , timeoutMsg : "Destination Text not available"})
        await expect(await this.destinationCard.getText()).toEqual(destinationShortCode)
    }
    private async verifyTime(){
        let totalTime = "0h 0m"
        this.durationSpan.waitForClickable()
        let shownTime = await this.durationSpan.getText()
        let timeElements = await this.flightDetailButton.$$('p[data-testid="duration"]')
        for (const timeDuration of timeElements) {
            await timeDuration.waitForClickable({ timeout: 5000});
            let partTime = await timeDuration.getText()
            totalTime = addDurations(totalTime, partTime);
        }
        let layOverTimes = await this.flightDetailButton.$$('div[data-testid="layover"] p')
        for (const layover of layOverTimes) {
            await layover.waitForClickable()
            let layovertext = await layover.getText()
            let time = layovertext.replace(" layover", "")
            totalTime = addDurations(totalTime, time)
        }
        await expect(totalTime).toEqual(shownTime)
    }
    public async VerifyResultPageData(from : string , to : string , originShortCode : string , destinationShortCode : string , departureDate : string , arrivalDate : string){
        await this.verifyDestinationsData(from , to)
        await this.verifyDates(departureDate , arrivalDate)
        await this.verifyBestResellerOption()
        await this.clickFirstListElement()
        await this.verifyParts(from, to)
        await this.verifyOrigin(originShortCode)
        await this.verifyDestinations(destinationShortCode)
        await this.verifyTime()
        await this.selectButton.waitForClickable()
        await this.selectButton.click()
    }
}
export default new resultPage()