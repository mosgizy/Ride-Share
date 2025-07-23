Here’s an improved version of your README with clearer structure, markdown formatting, and developer-friendly instructions:

---

# 🚗 Ride-Share App

A modern, location-aware ride-sharing app built with **React Native**, **Expo**, and **Supabase**.

---

## 📦 Prerequisites

* **Node.js** (v16+ recommended)
* **Expo CLI** (`npm install -g expo-cli`)
* **Android Studio** / **Xcode** (for emulator or device testing)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mosgizy/Ride-Share.git
cd ride-share
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project with the following keys:

```env
# Supabase credentials
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_KEY=your_supabase_anon_key

# Google Maps API key
EXPO_PUBLIC_MAP_API_KEY=your_google_maps_api_key

# Rapid API key (for getting state data)
EXPO_PUBLIC_STATE_KEY=your_rapid_api_key
```

⚠️ Make sure your `.env` file is added to `.gitignore` to avoid exposing secrets.

---

### 4. Start the App

```bash
npx expo start
```

Use `a` to open on Android, `i` for iOS, or scan the QR code with the Expo Go app.

---

## 🛠 Features

* 📍 Google Maps integration
* 🔐 Supabase auth and session
* 🌎 Reverse geolocation from Rapid API
* 👤 Avatar uploads & user profile
* 📦 Environment-based configuration

---

## 🤝 Contributing

Contributions are welcome! Please fork this repo and open a pull request.

---

## 📝 License

MIT © \[Asterisk]

---

Let me know if you'd like me to generate a `README.md` file for direct use.
