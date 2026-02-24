from pdf_gen import generate_pdf_report
import json
import os

test_data = {
    "profile": {
        "name": "சோதனை விவசாயி", # Test Farmer in Tamil
        "age": 45,
        "gender": "Female",
        "district": "மதுரை",
        "education": "பட்டதாரி",
        "land_size": 10.5,
        "soil_type": "வண்டல் மண்",
        "fertilizer_type": "இயற்கை",
        "livestock_owned": "ஆம்",
        "credit_history": "நல்லது",
        "previous_loss": "இல்லை"
    },
    "adoption_score": 85.0,
    "adoption_level": "High",
    "crops": [{"name": "நெல்", "yield": "2500", "profit": "40,000"}],
    "technologies": [{"name": "சொட்டு நீர் பாசன அமைப்பு", "cost": "20,000"}],
    "schemes": [{"name": "பிஎம்-கிசான்", "benefits": "6000 ரூபாய் ஆண்டிற்கு"}]
}

try:
    print("Attempting to generate PDF with Tamil characters...")
    path = generate_pdf_report(test_data, "debug_test.pdf")
    print(f"Success! PDF saved to {path}")
except Exception as e:
    print(f"FAILED: {str(e)}")
