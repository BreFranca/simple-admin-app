import React from "react"

import { PDFViewer } from '@react-pdf/renderer';
import Pdf from "./pdf"

class EventPdf extends React.Component {
    render() {
        return(
            <React.Fragment>
                <button onClick={() => console.log('teste')}>Teste</button>
                <PDFViewer>
                    <Pdf />
                </PDFViewer>
            </React.Fragment>
        )
    }
}

export default EventPdf