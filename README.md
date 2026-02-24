# 🌾 AgriNova AI - Precision Farming Advisory Platform

AgriNova AI is a high-fidelity, intelligent farming solution designed to empower Indian farmers with data-driven insights. By analyzing 38+ socio-economic and agricultural data points, the platform provides a localized technology adoption score and personalized recommendations for crops, government schemes, and modern agricultural equipment.

## ✨ Key Features

- **ML-Powered Adoption Analysis**: Uses a Random Forest algorithm to evaluate a farmer's technology adoption readiness (Score 0-100%).
- **Premium Dashboard**: A sleek, high-fidelity UI matching the project's green brand identity (#2E7D32).
- **100% Bilingual Support**: Full Tamil/English toggle support for every UI element and recommendation.
- **Localized PDF Reports**: High-quality advisory reports generated in the user's selected language (Tamil/English) with Unicode support.
- **Categorized Schemes**: Segmented view for Central Govt, Tamil Nadu State, and Women-specific schemes.
- **Priority Actions**: Dynamic "Top 3 Actions" generated based on gaps in the farmer's profile (e.g., lack of insurance or irrigation).

## 🛠️ Tech Stack

### Frontend
- **React.js (Vite)**: For a lightning-fast, modern web interface.
- **Tailwind CSS**: Custom design system with glassmorphism and premium aesthetics.
- **i18next**: Comprehensive localization framework.
- **Lucide React**: Premium icon set for intuitive navigation.

### Backend
- **Python (Flask)**: Robust API layer handling business logic and PDF generation.
- **SQLite**: Lightweight, portable relational database.
- **fpdf2**: Unicode-supported PDF engine for multi-language report generation.
- **Scikit-Learn**: Powering the predictive model for adoption scoring.

## 🤖 Machine Learning Model

- **Algorithm**: Random Forest Classifier / Regressor.
- **Accuracy**: 93.75%
- **Input Features**: Socio-economic factors, land size, water source, current technology usage, and financial stability.
- **Output**: An adoption score and level (Low, Medium, High) that drives the recommendation engine.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Python (3.9+)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd final-year-agri/agri-guide
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   pip install flask flask-cors bcrypt scikit-learn fpdf2
   python database.py  # Initialize DB
   python app.py       # Start Server (Port 5000)
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev         # Start Frontend (Port 5173)
   ```

## 📂 Project Structure
- `/frontend`: React source code, components, and localization files.
- `/backend`: Flask API, PDF generation logic, and SQLite database.
- `/model.pkl`: Pre-trained ML model for adoption prediction.

## 🤝 Support
For any queries, please refer to the documentation or contact the development team.
