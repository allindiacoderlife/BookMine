import { IKImage, IKVideo, IKContext, IKUpload } from "imagekitio-react";
import React, { useRef, useState } from "react";
import { icons } from "@/assets";

const ImageUpload = ({ onFileChange }) => {
  const UploadRef = useRef();
  const [file, setFile] = useState(null);
  const mainUrl = import.meta.env.VITE_URL_MAIN;
  const authenticator = async () => {
    try {
      const response = await fetch(`${mainUrl}/api/imagekit/auth`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  const onError = (err) => {
    console.log("Error:", err);
  };

  const onSuccess = (res) => {
    setFile(res);
    onFileChange(res.url); // safer to return full URL
  };

  return (
    <IKContext
      publicKey={import.meta.env.VITE_PUBLIC_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_PUBLIC_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={UploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload"
      />
      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          if (UploadRef.current) {
            UploadRef.current?.click();
          }
        }}
      >
        <img
          src={icons.upload}
          alt="upload-icons"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a File</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
    </IKContext>
  );
};

export default ImageUpload;
