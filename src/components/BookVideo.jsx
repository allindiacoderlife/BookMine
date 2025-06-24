import { IKContext, IKVideo } from "imagekitio-react";

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

const BookVideo = ({ videoUrl }) => {
  return (
    <IKContext
      publicKey={import.meta.env.VITE_PUBLIC_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_PUBLIC_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKVideo path={videoUrl} controls={true} className="w-full rounded-xl" />
    </IKContext>
  );
};

export default BookVideo;
