'use client'

import React from "react";
import Layout from "../layout";
import AccountSummary from "@components/Dashboard/AccountSummary";
import MoneyFlow from "@components/Dashboard/MoneyFlow";
import DigitalWallet from "@components/Dashboard/DigitalWallet";
import RecentActivity from "@components/Dashboard/RecentActivity";

function Dashboard(){
    return(
        <div>
            <AccountSummary/>
            <MoneyFlow/>
            <DigitalWallet/>
            <RecentActivity/>   
        </div>
    )
}


export default Dashboard

