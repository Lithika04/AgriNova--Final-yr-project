import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'agrinova.db')

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
    )
    ''')
    
    # Farmer Profiles table (Standardized 8-Section Schema)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS farmer_profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        
        -- Section 1: Basic Profile
        name TEXT, age INTEGER, gender TEXT, education TEXT, farming_exp INTEGER, district TEXT,
        
        -- Section 2: Land & Crop
        land_size REAL, land_type TEXT, soil_type TEXT, current_crops TEXT, avg_yield REAL, farming_type TEXT,
        
        -- Section 3: Water
        irrigation_type TEXT, water_source TEXT, water_usage REAL, rainfall REAL,
        
        -- Section 4: Financial
        income_range TEXT, loan_access TEXT, crop_insurance TEXT, savings_habit TEXT,
        
        -- Section 5: Tech Usage
        use_machinery TEXT, use_drip TEXT, use_mobile_apps TEXT, internet_access TEXT, tech_usage_count INTEGER,
        
        -- Section 6: Scheme Awareness
        scheme_awareness TEXT, enrolled_pm_kisan TEXT, enrolled_tn_schemes TEXT, member_shg TEXT, women_farmer TEXT,
        
        -- Section 7: Risk & Attitude
        will_adopt_new_tech TEXT, risk_level TEXT, climate_concern TEXT, interested_training TEXT,
        
        -- Section 8: Market
        selling_method TEXT, storage_facility TEXT, transport_access TEXT, price_awareness TEXT,
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    ''')

    # Comprehensive Migration
    expected_columns = [
        ('name', 'TEXT'), ('age', 'INTEGER'), ('gender', 'TEXT'), ('education', 'TEXT'), 
        ('farming_exp', 'INTEGER'), ('district', 'TEXT'), 
        ('land_size', 'REAL'), ('land_type', 'TEXT'), ('soil_type', 'TEXT'), ('current_crops', 'TEXT'), 
        ('avg_yield', 'REAL'), ('farming_type', 'TEXT'),
        ('irrigation_type', 'TEXT'), ('water_source', 'TEXT'), ('water_usage', 'REAL'), ('rainfall', 'REAL'),
        ('income_range', 'TEXT'), ('loan_access', 'TEXT'), ('crop_insurance', 'TEXT'), ('savings_habit', 'TEXT'), 
        ('use_machinery', 'TEXT'), ('use_drip', 'TEXT'), ('use_mobile_apps', 'TEXT'), ('internet_access', 'TEXT'), 
        ('tech_usage_count', 'INTEGER'),
        ('scheme_awareness', 'TEXT'), ('enrolled_pm_kisan', 'TEXT'), ('enrolled_tn_schemes', 'TEXT'), 
        ('member_shg', 'TEXT'), ('women_farmer', 'TEXT'), 
        ('will_adopt_new_tech', 'TEXT'), ('risk_level', 'TEXT'), ('climate_concern', 'TEXT'), 
        ('interested_training', 'TEXT'), 
        ('selling_method', 'TEXT'), ('storage_facility', 'TEXT'), ('transport_access', 'TEXT'), 
        ('price_awareness', 'TEXT')
    ]
    
    cursor.execute("PRAGMA table_info(farmer_profiles)")
    existing_columns = [row[1] for row in cursor.fetchall()]
    
    for col_name, col_type in expected_columns:
        if col_name not in existing_columns:
            try:
                print(f"Adding missing column: {col_name}")
                cursor.execute(f"ALTER TABLE farmer_profiles ADD COLUMN {col_name} {col_type}")
            except Exception as e:
                print(f"Error adding {col_name}: {e}")
    
    # Recommendations table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS recommendations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        adoption_score REAL,
        adoption_level TEXT,
        recommended_technologies TEXT,
        recommended_schemes TEXT,
        recommended_crops TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    ''')
    
    conn.commit()
    conn.close()
    print("Database sync completed.")

if __name__ == "__main__":
    init_db()
