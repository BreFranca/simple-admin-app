import React from 'react'

import { Tabs, Tab, TabContent } from "./styles"

export const PaymentTab = (props) => (
    <Tab value={props.value} onClick={props.onClick} className={props.className}>
        {props.children}
    </Tab>
)

export const PaymentTabs = (props) => (
    <Tabs>
        {props.children}
    </Tabs>
)

export const PaymentTabContent = (props) => (
    <TabContent className={props.className}>
        {props.children}
    </TabContent>
)