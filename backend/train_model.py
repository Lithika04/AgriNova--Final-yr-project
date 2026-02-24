import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import random

def generate_synthetic_data(num_rows=2000):
    data = []
    
    # Standardized Mappings
    # Education: 0-4 scale
    # Income: 1-5 scale
    # Risk: 1-3 scale
    # Yes/No: 1 / 0
    
    for _ in range(num_rows):
        education = random.randint(0, 4)
        income = random.randint(1, 5)
        risk = random.randint(1, 3)
        tech_usage = random.randint(0, 10)
        internet = random.choice([0, 1])
        scheme = random.choice([0, 1])
        
        # User Scoring Formula
        raw_score = (tech_usage * 3) + (education * 2) + (risk * 2) + (income * 2) + \
                    (scheme * 2) + (internet * 3)
        
        # Max Possible Score = (10*3) + (4*2) + (3*2) + (5*2) + (1*2) + (1*3) = 30+8+6+10+2+3 = 59
        max_score = 59
        normalized_score = (raw_score / max_score) * 100
        
        # Classification thresholds
        if normalized_score < 40:
            adoption_level = "Low"
        elif normalized_score <= 70:
            adoption_level = "Medium"
        else:
            adoption_level = "High"
            
        data.append([education, income, risk, tech_usage, internet, scheme, adoption_level])
        
    df = pd.DataFrame(data, columns=['education_level', 'income_level', 'risk_level', 'tech_usage_count', 'internet_access', 'scheme_awareness', 'adoption_level'])
    return df

def train_and_save_model():
    print(f"Generating synthetic dataset (2000 rows)...")
    df = generate_synthetic_data(2000)
    
    X = df.drop('adoption_level', axis=1)
    y = df['adoption_level']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training RandomForest model...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"Model Accuracy: {accuracy * 100:.2f}%")
    
    # Save Model and Column information
    ml_data = {
        'model': model,
        'features': X.columns.tolist(),
        'le_map': {}, # No label encoders needed for numeric features now
        'version': 'standardized_v2'
    }
    
    with open('model.pkl', 'wb') as f:
        pickle.dump(ml_data, f)
    
    print("Model saved as model.pkl")

if __name__ == "__main__":
    train_and_save_model()
