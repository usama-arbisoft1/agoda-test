import PassengerData from "../testData/passengerData.json" assert {type : "json"}
class passengerDetails {
    private get ContactFormBox(){
        return $('div[data-element-type="contact"]')
    }
    private get ContactFirstName(){
        return this.ContactFormBox.$('input[datatestid="contact.contactFirstName"]')
    }
    private get ContactLastName(){
        return this.ContactFormBox.$('input[datatestid="contact.contactLastName"]')
    }
    private get ContactEmail(){
        return this.ContactFormBox.$('input[name="contact.contactEmail"]')
    }
    private get ContactCountryButton(){
        return this.ContactFormBox.$('div[data-testid="contact.contactCountryOfResidenceId"]').$('button')
    }
    private get ContactCountrySearch(){
        return $('input[placeholder="Search"]')
    }
    private get FirstDropDownOption(){
        return $('ul[role="listbox"] li')
    }
    private get ContactPhone() {
        return this.ContactFormBox.$('input[datatestid="contact.contactPhoneNumber-PhoneNumberDataTestId"]')
    }
    private get departureFrom(){
        return $$('div[action-element-name="mob-flight-details-expand"]')[0].$('div[data-component="mob-flight-slice-originAirportCode"]')
    }
    private get departureTo(){
        return $$('div[action-element-name="mob-flight-details-expand"]')[0].$('div[data-component="mob-flight-slice-destinationAirportCode"]')
    }
    private get arrivalFrom(){
        return $$('div[action-element-name="mob-flight-details-expand"]')[1].$('div[data-component="mob-flight-slice-originAirportCode"]')
    }
    private get arrivalTo(){
        return $$('div[action-element-name="mob-flight-details-expand"]')[1].$('div[data-component="mob-flight-slice-destinationAirportCode"]')
    }
    private MaleCheckboxInput(num : number){
        return $('div[data-testid="flight.forms.i0.units.i'+num+'.passengerGender"]').$('input[type="radio"][aria-label="Male"]')
    }
    private FemaleCheckboxInput(num : number){
        return $('div[data-testid="flight.forms.i0.units.i'+num+'.passengerGender"]').$('input[type="radio"][aria-label="Female"]')
    }
    private FirstName(num : number){
        return $('input[datatestid="flight.forms.i0.units.i'+num+'.passengerFirstName"]')
    }
    private LastName(num : number){
        return $('input[datatestid="flight.forms.i0.units.i'+num+'.passengerLastName"]')
    }
    private BirthdayDay(num : number){
        return $('input[datatestid="flight.forms.i0.units.i'+num+'.passengerDateOfBirth-DateInputDataTestId"]')
    }
    private BirthdayMonthButton(num : number){
        return $('div[data-testid="flight.forms.i0.units.i'+num+'.passengerDateOfBirth-MonthInputDataTestId"]').$('button')
    }
    private BirthdayYear(num : number){
        return $('input[datatestid="flight.forms.i0.units.i'+num+'.passengerDateOfBirth-YearInputDataTestId"]')
    }
    private NationalityOptions(num : number){
        return $('div[data-testid="flight.forms.i0.units.i'+num+'.passengerNationality"]').$('button')
    }
    private PassportNationalityButton(num : number){
        return $('div[data-testid="flight.forms.i0.units.i'+num+'.passportCountryOfIssue"]').$('button')
    }
    private PassportExpDay(num : number){
        return $('input[datatestid="flight.forms.i0.units.i'+num+'.passportExpiryDate-DateInputDataTestId"]')
    }
    private PassportExpMonthButton(num : number){
        return $('div[data-testid="flight.forms.i0.units.i'+num+'.passportExpiryDate-MonthInputDataTestId"]').$('button')
    }
    private PassportExpYear(num : number){
        return $('input[datatestid="flight.forms.i0.units.i'+num+'.passportExpiryDate-YearInputDataTestId"]')
    }
    private get submitButton(){
        return $('button[data-testid="continue-to-payment-button"]')
    }
    private passportField(num:number){
        return $('input[datatestid="flight.forms.i0.units.i'+num+'.passportNumber"]')
    }
    public async verifyPassengerDetailsPage(from : string , to: string){
        await this.checkContactForm()
        await this.verifyAirports(from , to)
        await this.fillPassengerDetails()
        await this.submitPassengerDetails()
    }
    async checkContactForm(){
        await this.setName(PassengerData.firstName , PassengerData.lastName)
        await this.verifyName(PassengerData.firstName , PassengerData.lastName)
        await this.setemail(PassengerData.email)
        await this.setCountry(PassengerData.country)
        await this.setNumber(PassengerData.number)
    }
    async setName(firstname : string , lastname : string){
        await this.ContactFirstName.setValue(firstname)
        await this.ContactLastName.setValue(lastname)
    }
    async verifyName(firstname : string , lastname : string){
        await this.ContactFirstName.waitForDisplayed()
        let first = await this.ContactFirstName.getValue()
        await expect(first).toEqual(firstname)
        await this.ContactLastName.waitForDisplayed()
        let last = await this.ContactLastName.getValue()
        await expect(last).toEqual(lastname)
    }
    async setemail(email : string){
        await this.ContactEmail.waitForDisplayed()
        await this.ContactEmail.setValue(email)
    }
    async setCountry(country : string){
        await this.ContactCountryButton.waitForClickable()
        await this.ContactCountryButton.click()
        await this.ContactCountrySearch.waitForDisplayed()
        await this.ContactCountrySearch.setValue(country)
        await this.FirstDropDownOption.waitForClickable()
        await this.FirstDropDownOption.click()
    }
    async setNumber(number:string) {
        await this.ContactPhone.waitForDisplayed()
        await this.ContactPhone.setValue(number)
    }
    async verifyAirports(from : string , to : string){
        await this.departureFrom.waitForDisplayed()
        let fromAirport = await this.departureFrom.getText()
        await expect(fromAirport).toEqual(from)
        await this.departureTo.waitForDisplayed()
        let toAirport = await this.departureTo.getText()
        await expect(toAirport).toEqual(to)
        // return flight
        await this.arrivalFrom.waitForDisplayed()
        fromAirport = await this.arrivalFrom.getText()
        await expect(fromAirport).toEqual(to)
        await this.arrivalTo.waitForDisplayed()
        toAirport = await this.arrivalTo.getText()
        await expect(toAirport).toEqual(from)
    }
    async fillPassengerDetails(){
        await this.PassengerData(0)
        await this.PassengerData(1)
    }
    async PassengerData(num : number){
        // await passengerDetails.MaleCheckboxInput(num).waitForClickable()
        await this.MaleCheckboxInput(num).click()

        await this.FirstName(num).waitForDisplayed()
        await this.FirstName(num).setValue("Pass")

        await this.LastName(num).waitForDisplayed()
        await this.LastName(num).setValue("Lass name")

        await this.BirthdayDay(num).setValue(12)
        await this.BirthdayMonthButton(num).waitForClickable()
        await this.BirthdayMonthButton(num).click()
        await this.FirstDropDownOption.waitForClickable()
        await this.FirstDropDownOption.click()
        await this.BirthdayYear(num).setValue(1990)
        await this.NationalityOptions(num).waitForClickable()
        await this.NationalityOptions(num).click()
        await this.FirstDropDownOption.waitForClickable()
        await this.FirstDropDownOption.click()
        // await this.passportField(num).setValue("123123123123")
        // await this.PassportExpDay(num).setValue(11)
        // await this.PassportExpMonthButton(num).waitForClickable()
        // await this.PassportExpMonthButton(num).click()
        // await this.FirstDropDownOption.waitForClickable()
        // await this.FirstDropDownOption.click()
        // await this.PassportExpYear(num).setValue(2034)
        // await this.PassportNationalityButton(num).waitForClickable()
        // await this.PassportNationalityButton(num).click()
        // await this.FirstDropDownOption.waitForClickable()
        // await this.FirstDropDownOption.click()
    }
    async submitPassengerDetails(){
        this.submitButton.waitForClickable()
        this.submitButton.click()
    }
}
export default new passengerDetails()