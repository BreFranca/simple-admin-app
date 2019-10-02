import React from "react"

import { FaCopy } from "react-icons/fa"

import { Container, Text, Button } from "./styles.js"

const CopyText = (text) => {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text)
}

const Copy = (props) => (
    <Container>
        <Text>{props.children}</Text>
        <Button onClick={() => CopyText(props.link)}><FaCopy /></Button>
    </Container>
)

export default Copy