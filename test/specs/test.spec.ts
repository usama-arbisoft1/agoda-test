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
        let fromDate =  new Date("2025-01-18")
        let toDate=new Date("2025-01-23")
        let ticketCount = 2
        let SearchPageData = {
            datesDate : {
                departureDate: "",
                returnDate: ""
            },
            airportShortcodes : {
                origin : "",
                destination : ""
            }
        }
        await step("Navigate To Agoda" , async ()=>{
            await browser.url('https://www.agoda.com')
        })
        await step("Search Flight" , async ()=>{
            SearchPageData = await homePage.searchFlight(origin , destination, 2 , 2, fromDate , toDate , "Premium" , ticketCount , "Flight")
        })
        await step("Verify Flight Search Results" , async ()=>{
            await resultPage.VerifyResultPageData(origin , destination , SearchPageData.airportShortcodes.origin , SearchPageData.airportShortcodes.destination , SearchPageData.datesDate.departureDate , SearchPageData.datesDate.returnDate)
        })
        await step("Verify Return Flight Page" , async ()=>{
            await returnFlight.verifyReturnFlightPage(origin , destination)
        })
        await step("Add passenger data & verify flight details", async () => {
            await passengerDetails.verifyPassengerDetailsPage(origin, destination)
        })
    })
})