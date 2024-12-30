import homePage from '../pageobjects/homePage.page.js'
import passengerDetails from '../pageobjects/passengerDetails.page.js'
import resultPage from '../pageobjects/resultPage.page.js'
import returnFlight from '../pageobjects/returnFlight.page.js'
import {
    addDescription,
    addLink,
    addOwner,
    addSeverity,
    TYPE,
    addParentSuite, 
    step,
  } from "@wdio/allure-reporter";


describe("Agoda Flight Booking Feature" , () => {
    it("Search a flight" , async ()=>{
        addDescription("Testing Flight Searching Feature For Agoda.", TYPE.MARKDOWN);
        addSeverity("testing");
        addOwner("Usama Jalal");
        addLink("https://agoda.com", "Agoda");
        addParentSuite("Tests for web interface");
        let origin = "Berlin (BER)"
        let destination = "New York (NY) (JFK)"
        let fromDate ="2025-1-15"
        let toDate="2025-1-20"  
        let ticketCount = 2
        let originShortCode = "BER"
        let destinationShortCode = "JFK"
        await step("Navigate To Agoda" , async ()=>{
            await browser.url('https://www.agoda.com')
            await browser.saveScreenshot('./screenshots/before_click.png');
        })
        await step("Search Flight" , async ()=>{
            await homePage.searchFlight(origin , destination, fromDate , toDate , "premium" , ticketCount , 4)
        })
        // addAttachment("Screenshot", fs.readFileSync("./test/Images/screenshots/searchBox.png"), "image/png");
        await step("Verify Flight Search Results" , async ()=>{
            await resultPage.VerifyResultPageData(origin , destination , originShortCode, destinationShortCode , homePage.departureDateAttribute , homePage.returnDateAttribute)
        })
        await step("Verify Return Flight Page" , async ()=>{
            await returnFlight.verifyReturnFlightPage(origin , destination)
        })
        await step("Add passenger data & verify flight details", async () => {
            await passengerDetails.verifyPassengerDetailsPage(origin, destination)
        })
    })
})