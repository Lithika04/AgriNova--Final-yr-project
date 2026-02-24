# 🌾 AgriNova AI - Smart Farming Advisory Platform

AgriNova AI is a high-fidelity, intelligent farming solution designed to empower Indian farmers with data-driven insights. By analyzing 38+ socio-economic and agricultural data points, the platform provides a localized technology adoption score and personalized recommendations for crops, government schemes, and modern agricultural equipment.

---

## 🌟 Project Highlights & Recent Updates

### ✅ What's Completed
- **Advanced PDF Generator**: Fixed complex font rendering issues for native Tamil characters using TrueType Collection (.ttc) support.
- **100% Bilingual Support**: Full Tamil/English toggle support for every UI element, dropdown, and recommendation.
- **ML-Powered Adoption Analysis**: Uses a Random Forest algorithm to evaluate a farmer's technology adoption readiness (Score 0-100%).
- **Localized PDF Reports**: High-quality advisory reports generated dynamically in the user's selected language.
- **Categorized Schemes**: Segmented view for Central Govt, Tamil Nadu State, and Women-specific schemes.
- **Premium Dashboard**: A sleek, modern UI with glassmorphism and a custom design system (#2E7D32).

### 🚧 Roadmap (Yet to do)
- 🤖 **AI Chatbot**: Intelligent voice/text-based assistant for real-time farming queries.
- 🚜 **Virtual Farming**: Interactive simulation module for crop management planning.

---

## 📂 Folder Structure

```text
📁 agri-guide/
├── 📁 frontend/             # React (Vite) Application
│   ├── 📁 src/
│   │   ├── 📁 api/          # Axios API configurations
│   │   ├── 📁 components/   # Reusable UI components
│   │   ├── 📁 locales/      # Translation files (EN/TA)
│   │   └── 📁 pages/        # Main pages (Profile, Dashboard)
│   └── package.json
├── 📁 backend/              # Flask Python API
│   ├── 📁 models/           # Data models and structures
│   ├── 📁 utils/            # Helper functions
│   ├── agrinova.db          # SQLite Database
│   ├── app.py               # Main Entry point
│   ├── pdf_gen.py           # Unicode PDF logic
│   ├── train_model.py       # ML Training script
│   └── model.pkl            # Pre-trained Random Forest model
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
- **React.js (Vite)**: Lightning-fast rendering and modern hooks.
- **Tailwind CSS**: Premium aesthetics with custom "Nature Green" theme.
- **i18next**: Deep localization integration (Bilingual).
- **Lucide React**: High-quality iconography.

### Backend
- **Python (Flask)**: Scalable backend logic and API routes.
- **SQLite**: Local relational database for secure farmer data storage.
- **fpdf2**: Specialized PDF engine with Unicode/Tamil font support.
- **Scikit-Learn**: Powering the predictive adoption model.

---

## 🤖 Machine Learning Details

### How the Model is Trained
The platform uses a supervised learning approach to classify farmers based on their likelihood to adopt new technologies.

1.  **Synthetic Data Generation**: Since real-world localized data is private, we developed a `generate_synthetic_data` engine in `train_model.py`. It creates 2,000+ realistic profiles based on Indian farming demographics.
2.  **Weighted Scoring System**: Each profile is evaluated using a proprietary formula:
    *   **Technology Usage** (30% weight)
    *   **Education & Internet Access** (25% weight)
    *   **Income & Risk Appetite** (25% weight)
    *   **Government Scheme Awareness** (20% weight)
3.  **Classification Labels**: Profiles are categorized into **Beginner**, **Intermediate**, and **Advanced** adoption levels based on their normalized scores.
4.  **Algorithm**: `RandomForestClassifier` with 100 estimators. This ensemble method was chosen for its high accuracy with categorical data and resistance to overfitting.
5.  **Optimization**: Data is split into 80% training and 20% testing sets.
6.  **Accuracy Rate**: **93.25%** 🎯

### Training the Model
To re-train or update the model, run the following command in the `/backend` directory:
```bash
python train_model.py
```

---

## 🔄 Project Flow

1.  **Authentication**: User registers and logs into the platform securely.
2.  **Multilingual Setup**: User toggles between **Tamil** and **English**; the system instantly applies translations using `i18next`.
3.  **Comprehensive Profiling**: The farmer completes a 9-step intelligent form (Basic Info, Land, Water, Financials, Tech, Schemes, Risk, Market).
4.  **ML Inference**:
    *   Backend normalizes the input data.
    *   The pre-trained `RandomForest` model predicts the **Adoption Score** and **Level**.
5.  **Strategic Analysis**:
    *   **Agro-Zone Detection**: Automatically maps districts to specific agro-climatic zones (e.g., Salem -> North Western Zone).
    *   **Gap Analysis**: Identifies missing critical components (e.g., if "Insurance" is "No", it triggers a priority recommendation).
    *   **Categorization**: Sorting 50+ government schemes and modern technologies to fit the farmer's specific soil and financial profile.
6.  **Insight Dashboard**: A high-fidelity visual dashboard displays the progress, comparison (Ahead of X%), and top 3 priority actions.
7.  **Report Generation**: The `fpdf2` engine executes localized PDF generation with Unicode support for offline access.

---

## 🚀 How to Run the Project

### 1. Database Connection & Setup
The project uses **SQLite**. No external DB installation is required.
Go to the `backend` directory and initialize the database:
```bash
cd backend
python database.py
```

### 2. Backend Installation & Run
Install dependencies and start the Flask server (runs on `http://localhost:5000`):
```bash
# Recommended: Create a virtual environment first
pip install flask flask-cors bcrypt scikit-learn fpdf2 pandas numpy
python app.py
```

### 3. Frontend Installation & Run
Install Node modules and start the Vite dev server (runs on `http://localhost:5173`):
```bash
cd frontend
npm install
npm run dev
```

---

## 🎯 Implementation Notes
- **Font Support**: Ensure you are running on Windows or have `Nirmala UI` / `Latha` fonts installed for Tamil PDF rendering.
- **API Parity**: The frontend automatically detects the current browser language and requests the corresponding PDF from the backend.

---
*Created for AgriNova AI - Empowering Farmers with Intelligence.*
