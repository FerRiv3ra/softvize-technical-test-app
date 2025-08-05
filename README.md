# Technical Test - Setup Instructions

This project is a React Native app built with Expo. Please follow the steps below to get it running on a physical device.

## 🛠️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/FerRiv3ra/softvize-technical-test-app
   ```

2. **Enter the project folder**

   ```bash
   cd softvize-technical-test-app
   ```

3. **Install dependencies**
   You can use either `npm` or `yarn`. I used `yarn` for this project.

   ```bash
   yarn install
   ```

   Or

   ```bash
   npm install
   ```

4. **Configure environment variables**
   Rename the `.env.template` file to `.env`

   ```bash
   mv .env.template .env
   ```

5. **Ensure the backend server is running**
   The app connects to a backend server. Make sure it is up and running before starting the app.

6. **Use your local IP address instead of `localhost`**
   Since this app is tested on **physical devices**, using `localhost` will not work.
   Replace any instance of `localhost` in the `.env` file with your machine’s local IP address.

   - **macOS:**
     Open Terminal and run:

     ```bash
     ipconfig getifaddr en0
     ```

   - **Windows:**
     Open Command Prompt and run:

     ```bash
     ipconfig
     ```

     Look for the **IPv4 Address** under your active network adapter.

7. **Start the Expo development server**

   ```bash
   yarn start
   ```

   Or

   ```bash
   npx expo start
   ```

8. **Open the app on a physical device**

   - Download the **Expo Go** app from the App Store or Google Play.
   - Scan the QR code shown in the terminal or browser after starting the project.

## 📦 Tech Stack & Packages

- **React Native with Expo** (latest version)
- **Redux** for state management
- **Axios** for API requests
- **Custom components**
- **Custom hooks**
- **Custom fonts**

---

Feel free to contact me if you encounter any issues while setting up the project.
