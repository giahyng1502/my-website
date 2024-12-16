'use client';

import { useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { Button, Container } from "react-bootstrap";

export default function Home() {
  const qrRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState("");

  const generateQRCode = () => {
    if (!url.trim()) {
      alert("Please enter a valid URL!");
      return;
    }

    const qrCode = new QRCodeStyling({
      width: 256,
      height: 256,
      data: url, 
      dotsOptions: {
        color: "#000",
        type: "rounded", 
      },
      backgroundOptions: {
        color: "#fff",
      },
    });

    if (qrRef.current) {
      qrRef.current.innerHTML = ""; // Xóa nội dung QR cũ
      qrCode.append(qrRef.current);
    }
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <h1 className="mb-4 text-center">QR Code Generator</h1>

      <input
        className="w-75 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter a URL"
      />

      <Button
        variant="primary"
        className="mt-3 px-4"
        onClick={generateQRCode}
      >
        Generate QR Code
      </Button>

      <div
        ref={qrRef}
        className="mt-4"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "256px",
          height: "256px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      />
    </Container>
  );
}
