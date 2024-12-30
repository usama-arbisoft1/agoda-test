import { formatDate } from '../../helper';
class homePage {
    private departureDate = ""
    private returnDate = ""
    public get departureDateAttribute(){
        return this.departureDate
    }
    public get returnDateAttribute(){
        return this.returnDate
    }
    private FilterOptions = {
        1: "tab-all-rooms-tab",
        2: "tab-home",
        3: "tab-packages-tab",
        4: "tab-flight-tab",
        5: "tab-activities-tab",
        6: "tab-journey-tab"
    } as const;
    private TicketClassOptions = {
        "economy": "economy",
        "premium": "premium-economy",
        "business": "business",
        "first": "first"
    } as const;
    private get flightFrom(){
        return $('#flight-origin-search-input')
    }
    private get flightTo(){
        return $('#flight-destination-search-input')
    }
    private getSelectorType(type : string){
        return $('#'+type)
    }
    private get TowayButton(){
        return $$('button[data-element-object-id="round-trip"]')[0];
    }
    private get departureDateField(){
        return $('div[data-component="flight-search-departureDate"]')
    }
    private get returnDateField(){
        return $('div[data-component="flight-search-returnDate"]')
    }
    private get CalanderDatePopup(){
        return $('div[class="Popup__content DateSelector__PopupContent"]')
    }
    private CalanderDateField(date : string){
        return $('[data-selenium-date="'+date+'"]')
    }
    private get flightOriginSearchSuggestions(){
        return $$('#autocompleteSearch-origin li')[2]
    }
    private get flightDestinationSearchSuggestions(){
        return $$('#autocompleteSearch-destination li')[2]
    }
    private get ticketIncrementButton(){
        return $('button[data-element-name="flight-occupancy-adult-increase"]')
    }
    private premiumEconomyButtom(ticketClass : string){
        return $('button[data-element-object-id="'+ticketClass+'"]')
    }
    private get searchButton(){
        return $('button[data-element-name="flight-search"]')
    }
    // private async takeScreenshot(){
    //     const elem = await $('div[data-testid="drone-box"]');
    //     await elem.saveScreenshot('./test/Images/screenshots/searchBox.png');
    // } 
    private async selectType(num: 1 | 2 | 3 | 4 | 5 | 6) {
        await this.getSelectorType(this.FilterOptions[num]).click();
        await this.TowayButton.waitForClickable()
        await this.TowayButton.click()
    }
    private async setOrigin(origin : string){
        await this.flightFrom.setValue(origin)
        await this.flightOriginSearchSuggestions.getAttribute('data-element-value')
        await this.flightOriginSearchSuggestions.waitForClickable()
        await this.flightOriginSearchSuggestions.click()
        // await this.flightFrom.getValue()
    }
    private async setDestination(destination : string){
        await this.flightTo.setValue(destination)
        await this.flightDestinationSearchSuggestions.getAttribute('data-element-value')
        this.flightDestinationSearchSuggestions.waitForClickable()
        this.flightDestinationSearchSuggestions.click()
        // await this.flightTo.getValue()
    }
    private async setDates(startDate : string , endDate : string){
        // if(!await this.CalanderDatePopup.isClickable()){
        //     await this.departureDateField.click()
        // }
        await this.CalanderDateField(startDate).waitForClickable({ timeout: 5000 })
        await this.CalanderDateField(startDate).click()
        let depDate = await this.departureDateField.getAttribute('data-date')
        this.departureDate = formatDate(depDate)
        await this.CalanderDateField(endDate).waitForClickable({ timeout: 5000 })
        await this.CalanderDateField(endDate).click()
        let returnDate = await this.returnDateField.getAttribute('data-date')
        this.returnDate = formatDate(returnDate)
    }
    private async selectTicket(ticketClass: "economy" | "premium" | "business" | "first"  , count : number){
        await this.ticketIncrementButton.waitForClickable({timeout : 5000})
        for (let index = 1; index < count; index++) {
            await this.ticketIncrementButton.click()
        }
        await this.premiumEconomyButtom(this.TicketClassOptions[ticketClass]).waitForClickable({timeout : 5000})
        await this.premiumEconomyButtom(this.TicketClassOptions[ticketClass]).click()
    }
    private async submitAndSearch(){
        await this.searchButton.waitForClickable()
        await this.searchButton.click()
    }
    public async  searchFlight(origin :string , destination : string , startDate : string , endDate : string, ticketClass: "economy" | "premium" | "business" | "first" , count : number ,  num: 1 | 2 | 3 | 4 | 5 | 6){
        await this.selectType(num)
        await this.setOrigin(origin)
        await this.setDestination(destination)
        await this.setDates(startDate , endDate)
        await this.selectTicket(ticketClass, count)
        //await this.takeScreenshot()
        await this.submitAndSearch()
    }
}
export default new homePage();