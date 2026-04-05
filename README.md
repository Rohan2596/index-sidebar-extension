# Finzo – Real-time Index Watchlist

**Finzo** is a lightweight Chrome Extension that provides a powerful sidebar to track global market indices in real time. It delivers key metrics like daily performance, weekly trends, and 52-week highs/lows—all in a clean, fast interface.

---

## 🚀 Features

* 📊 Real-time global indices tracking
* 📈 1-Day and 5-Day performance insights
* 📉 52-week High & Low tracking
* ⚡ Fast and minimal UI inside Chrome Side Panel
* 🔄 Auto-refresh every 30 seconds
* 📋 Manual refresh option
* 🌍 Data powered via Google Sheets (Google Finance)

---

## 🧩 Installation

### Load Unpacked Extension

1. Download or clone this repository
2. Open Chrome and go to:

   ```
   chrome://extensions/
   ```
3. Enable **Developer Mode**
4. Click **Load unpacked**
5. Select the project folder

---

## 📂 Project Structure

```
├── manifest.json
├── background.js
├── sidebar.html
├── sidebar.js
├── icon/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
```

---

## ⚙️ How It Works

* Data is fetched from a **published Google Sheet (CSV format)**
* The extension parses and renders it into a dynamic table
* Auto-refresh ensures near real-time updates
* Uses Chrome's **Side Panel API** for seamless UI integration

---

## 🔐 Permissions Used

* `sidePanel` → To display the sidebar UI
* `storage` → Reserved for future preferences
* `notifications` → Reserved for alerts (future feature)
* `alarms` → For background refresh scheduling
* `host_permissions (Google Sheets)` → To fetch market data

---

## ⚠️ Disclaimer

This extension is for informational purposes only. Market data may be delayed (up to ~20 minutes). It does **not** constitute financial advice.

---

## 👨‍💻 Author

**Rohan Ravindra Kadam**
Brand: SmallPrep (smallprep.com)

---

## 📌 Future Improvements

* Click-to-open charts (TradingView integration)
* Custom watchlists
* Alerts & notifications
* Dark/light theme toggle
* Offline caching

---

## 📝 License

MIT License
