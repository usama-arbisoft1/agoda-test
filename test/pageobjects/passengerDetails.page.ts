import PassengerData from "../testData/passengerData.json" assert { type: "json" };
class passengerDetails {
  private get ContactFormBox() {
    return $('div[data-element-type="contact"]');
  }
  private get ContactFirstName() {
    return this.ContactFormBox.$(
      'input[datatestid="contact.contactFirstName"]'
    );
  }
  private get ContactLastName() {
    return this.ContactFormBox.$('input[datatestid="contact.contactLastName"]');
  }
  private get ContactEmail() {
    return this.ContactFormBox.$('input[name="contact.contactEmail"]');
  }
  private get ContactCountryButton() {
    return this.ContactFormBox.$(
      'div[data-testid="contact.contactCountryOfResidenceId"]'
    ).$("button");
  }
  private get ContactCountrySearch() {
    return $('input[placeholder="Search"]');
  }
  private get FirstDropDownOption() {
    return $('ul[role="listbox"] li');
  }
  private get ContactPhone() {
    return this.ContactFormBox.$(
      'input[datatestid="contact.contactPhoneNumber-PhoneNumberDataTestId"]'
    );
  }
  private get departureFrom() {
    return $('div[action-element-name="mob-flight-details-expand"]').$(
      'div[data-component="mob-flight-slice-originAirportCode"]'
    );
  }
  private get departureTo() {
    return $('div[action-element-name="mob-flight-details-expand"]').$(
      'div[data-component="mob-flight-slice-destinationAirportCode"]'
    );
  }
  private get arrivalFrom() {
    return $$('div[action-element-name="mob-flight-details-expand"]')[1].$(
      'div[data-component="mob-flight-slice-originAirportCode"]'
    );
  }
  private get arrivalTo() {
    return $$('div[action-element-name="mob-flight-details-expand"]')[1].$(
      'div[data-component="mob-flight-slice-destinationAirportCode"]'
    );
  }
  private MaleCheckboxInput(passengerNumber: number) {
    return $(
      `div[data-testid="flight.forms.i0.units.i${passengerNumber}.passengerGender"]`
    ).$('input[type="radio"][aria-label="Male"]');
  }
  private FemaleCheckboxInput(passengerNumber: number) {
    return $(
      `div[data-testid="flight.forms.i0.units.i${passengerNumber}.passengerGender"]`
    ).$('input[type="radio"][aria-label="Female"]');
  }
  private FirstName(passengerNumber: number) {
    return $(
      `input[datatestid="flight.forms.i0.units.i${passengerNumber}.passengerFirstName"]`
    );
  }
  private LastName(passengerNumber: number) {
    return $(
      `input[datatestid="flight.forms.i0.units.i${passengerNumber}.passengerLastName"]`
    );
  }
  private BirthdayDay(passengerNumber: number) {
    return $(
      `input[datatestid="flight.forms.i0.units.i${passengerNumber}.passengerDateOfBirth-DateInputDataTestId"]`
    );
  }
  private BirthdayMonthButton(passengerNumber: number) {
    return $(
      `div[data-testid="flight.forms.i0.units.i${passengerNumber}.passengerDateOfBirth-MonthInputDataTestId"]`
    ).$("button");
  }
  private BirthdayYear(passengerNumber: number) {
    return $(
      `input[datatestid="flight.forms.i0.units.i${passengerNumber}.passengerDateOfBirth-YearInputDataTestId"]`
    );
  }
  private NationalityOptions(passengerNumber: number) {
    return $(
      `div[data-testid="flight.forms.i0.units.i${passengerNumber}.passengerNationality"]`
    ).$("button");
  }
  private PassportNationalityButton(passengerNumber: number) {
    return $(
      `div[data-testid="flight.forms.i0.units.i${passengerNumber}.passportCountryOfIssue"]`
    ).$("button");
  }
  private PassportExpDay(passengerNumber: number) {
    return $(
      `input[datatestid="flight.forms.i0.units.i${passengerNumber}.passportExpiryDate-DateInputDataTestId"]`
    );
  }
  private PassportExpMonthButton(passengerNumber: number) {
    return $(
      `div[data-testid="flight.forms.i0.units.i${passengerNumber}.passportExpiryDate-MonthInputDataTestId"]`
    ).$("button");
  }
  private PassportExpYear(passengerNumber: number) {
    return $(
      `input[datatestid="flight.forms.i0.units.i${passengerNumber}.passportExpiryDate-YearInputDataTestId"]`
    );
  }
  private get submitButton() {
    return $('button[data-testid="continue-to-payment-button"]');
  }
  private passportField(passengerNumber: number) {
    return $(
      'input[datatestid="flight.forms.i0.units.i' +
        passengerNumber +
        '.passportNumber"]'
    );
  }
  public async verifyPassengerDetailsPage(from: string, to: string) {
    await this.checkContactForm();
    await this.verifyAirports(from, to);
    await this.setPassengerDetails(0);
    await this.setPassengerDetails(1);
    await this.submitPassengerDetails();
  }
  async checkContactForm() {
    await this.setName(PassengerData.firstName, PassengerData.lastName);
    await this.verifyName(PassengerData.firstName, PassengerData.lastName);
    await this.setemail(PassengerData.email);
    await this.setCountry(PassengerData.country);
    await this.setNumber(PassengerData.number);
  }
  async setName(firstname: string, lastname: string) {
    await this.ContactFirstName.clearValue();
    await this.ContactFirstName.setValue(firstname);
    await this.ContactLastName.clearValue();
    await this.ContactLastName.setValue(lastname);
  }
  async verifyName(firstname: string, lastname: string) {
    await this.ContactFirstName.waitForDisplayed();
    let first = await this.ContactFirstName.getValue();
    await expect(first).toEqual(firstname);
    await this.ContactLastName.waitForDisplayed();
    let last = await this.ContactLastName.getValue();
    await expect(last).toEqual(lastname);
  }
  async setemail(email: string) {
    await this.ContactEmail.waitForDisplayed();
    await this.ContactEmail.setValue(email);
  }
  async setCountry(country: string) {
    await this.ContactCountryButton.waitForClickable();
    await this.ContactCountryButton.click();
    await this.ContactCountrySearch.waitForDisplayed();
    await this.ContactCountrySearch.setValue(country);
    await this.FirstDropDownOption.waitForClickable();
    await this.FirstDropDownOption.click();
  }
  async setNumber(number: string) {
    await this.ContactPhone.waitForDisplayed();
    await this.ContactPhone.setValue(number);
  }
  async verifyAirports(from: string, to: string) {
    await this.departureFrom.waitForDisplayed();
    let fromAirport = await this.departureFrom.getText();
    await expect(fromAirport).toEqual(from);
    await this.departureTo.waitForDisplayed();
    let toAirport = await this.departureTo.getText();
    await expect(toAirport).toEqual(to);
    // return flight
    await this.arrivalFrom.waitForDisplayed();
    fromAirport = await this.arrivalFrom.getText();
    await expect(fromAirport).toEqual(to);
    await this.arrivalTo.waitForDisplayed();
    toAirport = await this.arrivalTo.getText();
    await expect(toAirport).toEqual(from);
  }
  async setPassengerDetails(passengerNumber: number) {
    await this.PassengerData(passengerNumber);
  }
  async PassengerData(num: number) {
    // await passengerDetails.MaleCheckboxInput(num).waitForClickable()
    await this.MaleCheckboxInput(num).click();

    await this.FirstName(num).waitForDisplayed();
    await this.FirstName(num).setValue(PassengerData.firstName);

    await this.LastName(num).waitForDisplayed();
    await this.LastName(num).setValue(PassengerData.lastName);

    await this.BirthdayDay(num).setValue(PassengerData.birthDate);
    await this.BirthdayMonthButton(num).waitForClickable();
    await this.BirthdayMonthButton(num).click();
    await this.FirstDropDownOption.waitForClickable();
    await this.FirstDropDownOption.click();
    await this.BirthdayYear(num).setValue(PassengerData.birthYear);
    await this.NationalityOptions(num).scrollIntoView();
    await this.NationalityOptions(num).waitForClickable();
    await this.NationalityOptions(num).click();
    await this.FirstDropDownOption.waitForClickable();
    await this.FirstDropDownOption.click();
    // await this.passportField(num).setValue(PassengerData.passportNumber)
    // await this.PassportExpDay(num).setValue(PassengerData.passportExpiryDate)
    // await this.PassportExpMonthButton(num).waitForClickable()
    // await this.PassportExpMonthButton(num).click()
    // await this.FirstDropDownOption.waitForClickable()
    // await this.FirstDropDownOption.click()
    // await this.PassportExpYear(num).setValue(PassengerData.passportExpiryYear)
    // await this.PassportNationalityButton(num).waitForClickable()
    // await this.PassportNationalityButton(num).click()
    // await this.FirstDropDownOption.waitForClickable()
    // await this.FirstDropDownOption.click()
  }
  async submitPassengerDetails() {
    this.submitButton.waitForClickable();
    this.submitButton.click();
  }
}
export default new passengerDetails();
