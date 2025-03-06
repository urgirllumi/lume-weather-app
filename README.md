# Weather App

This project is a simple weather application built using **React**, allowing users to search for cities, and click on the map to show weather information for that location.

## 🚀 Features
- Search for cities.
- Show real-time weather data.
- Interactive map with location markers.
- Dark mode toggle.

## 🛠️ Technologies Used
- **React** (Create React App)
- **React Leaflet** (for interactive maps)
- **OpenWeather API** (for weather data)

## 📌 Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🛠️ Installation & Setup
1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Get a **free API key** from OpenWeather (See "Getting an API Key" below).
   - Create a `.env` file in the root directory and add:
     ```sh
     REACT_APP_OPEN_WEATHER_API_KEY=your_api_key_here
     ```
4. Start the development server:
   ```sh
   npm start
   ```
   The app will be available at **http://localhost:3000**.

## 🌍 Getting an API Key (OpenWeather)
This app uses the **OpenWeather API** for fetching weather data. Follow these steps to get an API key:

1. Go to [OpenWeather API](https://home.openweathermap.org/users/sign_up) and create an account.
2. Log in and navigate to **API Keys**.
3. Copy your **API key**.
4. Add the key to the `.env` file as shown above.

## 📜 Assumptions & Considerations
- The API only supports a limited number of free requests per minute.
- Users are expected to enter valid city names for accurate results.
- Dark mode persists using **local storage**.

## 📦 Available Scripts
- **`npm start`** - Runs the app in development mode.
- **`npm test`** - Runs tests.
- **`npm run build`** - Builds the app for production.
- **`npm run eject`** - Removes Create React App default setup (not recommended unless necessary).

## 🚀 Deployment
To deploy, run:
```sh
npm run build
```
This will generate a `build/` folder that can be hosted on services like **Vercel**, **Netlify**, or **GitHub Pages**.

## 📜 License
This project is licensed under [MIT License](LICENSE).

---

Happy coding! 🎉
