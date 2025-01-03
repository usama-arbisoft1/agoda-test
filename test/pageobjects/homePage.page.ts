import { formatDate } from "../../helper";
enum FilterOptions {
  AllRooms = "tab-all-rooms-tab",
  Home = "tab-home",
  Packages = "tab-packages-tab",
  Flight = "tab-flight-tab",
  Activities = "tab-activities-tab",
  Journey = "tab-journey-tab",
}
enum TicketClassOptions {
  Economy = "economy",
  Premium = "premium-economy",
  Business = "business",
  First = "first",
}
class homePage {
  private get flightFrom() {
    return $("#flight-origin-search-input");
  }
  private get flightTo() {
    return $("#flight-destination-search-input");
  }
  private getSelectorType(type: string) {
    return $(`#${type}`);
  }
  private get TowayButton() {
    return $('button[data-element-object-id="round-trip"]');
  }
  private get departureDateField() {
    return $('div[data-component="flight-search-departureDate"]');
  }
  private get returnDateField() {
    return $('div[data-component="flight-search-returnDate"]');
  }
  private CalanderDateField(date: string) {
    return $(`[data-selenium-date="${date}"]`);
  }
  private flightOriginSearchSuggestions(optionNumber: number) {
    return $$("#autocompleteSearch-origin li")[optionNumber];
  }
  private flightDestinationSearchSuggestions(optionNumber: number) {
    return $$("#autocompleteSearch-destination li")[optionNumber];
  }
  private get ticketIncrementButton() {
    return $('button[data-element-name="flight-occupancy-adult-increase"]');
  }
  private premiumEconomyButtom(ticketClass: string) {
    return $(`button[data-element-object-id="${ticketClass}"]`);
  }
  private get searchButton() {
    return $('button[data-element-name="flight-search"]');
  }
  private async selectType(tab: keyof typeof FilterOptions) {
    await this.getSelectorType(
      FilterOptions[tab as keyof typeof FilterOptions]
    ).click();
    await this.TowayButton.waitForClickable();
    await this.TowayButton.click();
  }
  private async setOrigin(origin: string, optionNumber: number) {
    await this.flightFrom.setValue(origin);
    await this.flightOriginSearchSuggestions(optionNumber).getAttribute(
      "data-element-value"
    );
    await this.flightOriginSearchSuggestions(optionNumber).waitForClickable();
    await this.flightOriginSearchSuggestions(optionNumber).click();
  }
  private async setDestination(destination: string, optionNumber: number) {
    await this.flightTo.setValue(destination);
    await this.flightDestinationSearchSuggestions(optionNumber).getAttribute(
      "data-element-value"
    );
    this.flightDestinationSearchSuggestions(optionNumber).waitForClickable();
    this.flightDestinationSearchSuggestions(optionNumber).click();
  }
  private async getAirportShortCodes() {
    let origin = await this.flightFrom.getValue();
    let destination = await this.flightTo.getValue();
    return {
      origin: this.extractCode(origin),
      destination: this.extractCode(destination),
    };
  }
  private extractCode(airport: string) {
    const shortcode = airport.match(/\(([^()]*)\)[^()]*$/);
    return shortcode ? shortcode[1] : "";
  }
  private async setDates(startDate: Date, endDate: Date) {
    await this.CalanderDateField(
      startDate.toISOString().split("T")[0]
    ).waitForClickable({ timeout: 5000 });
    await this.CalanderDateField(startDate.toISOString().split("T")[0]).click();
    await this.CalanderDateField(
      endDate.toISOString().split("T")[0]
    ).waitForClickable({ timeout: 5000 });
    await this.CalanderDateField(endDate.toISOString().split("T")[0]).click();
    let depDate = await this.departureDateField.getAttribute("data-date");
    let returnDate = await this.returnDateField.getAttribute("data-date");
    return {
      departureDate: formatDate(depDate),
      returnDate: formatDate(returnDate),
    };
  }
  private async selectTicket(
    ticketClass: keyof typeof TicketClassOptions,
    count: number
  ) {
    await this.ticketIncrementButton.waitForClickable({ timeout: 5000 });
    for (let index = 1; index < count; index++) {
      await this.ticketIncrementButton.click();
    }
    await this.premiumEconomyButtom(
      TicketClassOptions[ticketClass as keyof typeof TicketClassOptions]
    ).waitForClickable({ timeout: 5000 });
    await this.premiumEconomyButtom(
      TicketClassOptions[ticketClass as keyof typeof TicketClassOptions]
    ).click();
  }
  private async submitAndSearch() {
    await this.searchButton.waitForClickable();
    await this.searchButton.click();
  }
  public async searchFlight(
    origin: string,
    destination: string,
    originAirportIndexNumber: number,
    DestinationAirportIndexNumber: number,
    startDate: Date,
    endDate: Date,
    ticketClass: keyof typeof TicketClassOptions,
    count: number,
    tab: keyof typeof FilterOptions
  ) {
    await this.selectType(tab);
    await this.setOrigin(origin, originAirportIndexNumber);
    await this.setDestination(destination, DestinationAirportIndexNumber);
    let airportShortcodes = await this.getAirportShortCodes();
    let datesDate = await this.setDates(startDate, endDate);
    await this.selectTicket(ticketClass, count);
    await this.submitAndSearch();
    return {
      datesDate,
      airportShortcodes,
    };
  }
}
export default new homePage();
