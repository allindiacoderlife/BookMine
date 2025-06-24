import { IKImage, IKVideo, IKContext, IKUpload } from "imagekitio-react";
import React, { useRef, useState } from "react";
import { icons } from "@/assets";
import { ToastContainer, toast } from "react-toastify";
import { cn } from "../lib/utils";

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

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  val,
  onFileChange,
  value,
}) => {
  const UploadRef = useRef();
  const [file, setFile] = useState(value ?? null);
  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      val === "dark" ? "bg-dark-300" : "bg-light-600 border-gray-100 border",
    placeholder: val === "dark" ? "text-light-100" : "text-slate-500",
    text: val === "dark" ? "text-light-100" : "text-dark-400",
  };

  const onError = (err) => {
    console.log("Error:", err);
    // toast({
    //   title: `${type} upload failed`,
    //   description: `Your ${type} could not be uploaded. Please try again.`,
    //   variant: "destructive",
    // });
    toast.error(`${type} upload failed`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const onSuccess = (res) => {
    setFile(res);
    onFileChange(res.url); // safer to return full URL

    // toast({
    //   title: `${type} uploaded successfully`,
    //   description: `Your ${type} has been uploaded successfully.`,
    // });
    toast.success(`${type} uploaded successfully`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const onValidation = (file) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        // toast({
        //   title: "File size too large.",
        //   description: "Image size should be less than 20MB.",
        //   variant: "destructive",
        // });
        toast.warn("Image size should be less than 20MB.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        // toast({
        //   title: "File size too large.",
        //   description: "Video size should be less than 50MB.",
        //   variant: "destructive",
        // });
        toast.warn("Video size should be less than 50MB.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return false;
      }
    }
    return true;
  };

  return (
    <IKContext
      publicKey={import.meta.env.VITE_PUBLIC_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_PUBLIC_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        ref={UploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidation}
        onUploadStart={() => {
          setProgress(0);
        }}
        onUploadProgress={({ loaded, total }) => {
          const precent = Math.round((loaded / total) * 100);
          setProgress(precent);
        }}
        folder={folder}
        accept={accept}
        className="hidden"
      />
      <button
        className={cn("upload-btn", styles.button)}
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
        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
        {file && (
          <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
        )}
        {progress > 0 && progress != 100 && (
          <div className="w-full rounded-full bg-green-200">
            <div className="progress" style={{ width: `${progress}%` }}>
              {progress}%
            </div>
          </div>
        )}
      </button>
      {file &&
        (type === "image" ? (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={500}
          />
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath}
            controls={true}
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </IKContext>
  );
};

export default FileUpload;
