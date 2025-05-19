const config = {
    env: {
        imageKit: {
            publicKey: import.meta.env.VITE_PUBLIC_IMAGEKIT_URL_ENDPOINT,
            urlEndpoint: import.meta.env.VITE_PUBLIC_IMAGEKIT_PUBLIC_KEY,
            authenticationEndpoint: import.meta.env.VITE_PRIVATE_IMAGEKIT_PRIVATE_KEY,
        }
    }
}
export default config;