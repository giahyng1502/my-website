"use client";

import { useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { Button, Container } from "react-bootstrap";
import { ClipboardIcon } from "@heroicons/react/16/solid";

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
  const handlePaste = async () => {
    try {
      navigator.clipboard.readText().then((text) => {
        setUrl(text);
      });
    } catch (error) {
      console.error("Clipboard error:", error);
    }
  };
  return (
    <Container
      className="d-flex flex-column align-items-center"
      style={{ height: "100vh" }}
    >
      <h1 className="my-5" style={{ fontSize: 30 }}>
        GET QR CODE
      </h1>

      <div className="relative w-full">
        <button
          onClick={() => {
            handlePaste();
          }}
        >
          <ClipboardIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 h-7 w-7" />
        </button>
        <input
          className="w-100 p-3 pl-10 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          type="text"
          style={{ borderRadius: 16 }}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a URL"
        />
      </div>
      <Button variant="primary" className="mt-4 px-5" onClick={generateQRCode}>
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
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      />
    </Container>
  );
}
