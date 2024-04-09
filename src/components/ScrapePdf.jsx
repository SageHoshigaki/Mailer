import React from "react";
import puppeteer from "puppeteer";
const { Storage} = require("@google-cloud/storage");

const ScrapePdf = async () => {
    
    const url ='https://link.pennequitygroup.com/documents/v1/25d92655-3f21-464e-a026-bd54234ab15d'

    try {
        const browser = await puppeteer.launch({headless:true});
        const page = await browser.newPage();
        await page.goto(url);

        //TRY TO Hit Finish button
        const finishBtn = await page.waitForSelector("#success-scroll-btn");
        await finishBtn.click();

        // Try to Hit And Download Pdf 
        const downLoadbtn = await page.waitForSelector(".n-button-down");
        await downLoadbtn.click();

    }catch(error){
        
    }
    return(
        <div>
            <h1>Scrape Pdf</h1>
        </div>
    )
};

export default ScrapePdf;


//id=success-scroll-btn cLASSdoownloaddropdwn= n-button__content class= n-dropdown-option-body__label idForSvg=document-state-actions-btn