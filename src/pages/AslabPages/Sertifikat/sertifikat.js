import sertifikat from "../../../assets/images/Sertifikat.pdf"
import Container from 'react-bootstrap/Container';
import { useState } from "react";
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; 
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core';

export default function Sertifikat() {

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <>
    <section id="teams" className="block teams-block">
      <Container fluid>
      <div
          style={{
              border: '1px solid rgba(0, 0, 0, 0.3)',
              height: '750px',
          }}
      >
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer fileUrl={sertifikat}
            plugins={[defaultLayoutPluginInstance]} />
      </Worker>
      </div>
    </Container>
    </section>
    </>
  );
}