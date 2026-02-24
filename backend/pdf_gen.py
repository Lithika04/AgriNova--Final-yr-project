from fpdf import FPDF
import os
import json

# Path to the translation files
LOCALES_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'frontend', 'src', 'locales')

def get_translation(key, lang='en'):
    try:
        path = os.path.join(LOCALES_DIR, lang, 'translation.json')
        with open(path, 'r', encoding='utf-8') as f:
            translations = json.load(f)
            # Handle nested keys like 'districts.Salem'
            parts = key.split('.')
            val = translations
            for p in parts:
                if isinstance(val, dict):
                    val = val.get(p, key)
                else:
                    return key
            return val if isinstance(val, str) else key
    except Exception as e:
        print(f"Translation error: {e}")
        return key

class AgriReport(FPDF):
    def __init__(self, lang='en'):
        super().__init__()
        self.lang = lang
        # Register Unicode Font for Tamil Support
        # Register Unicode Font for Tamil Support - Better Path Detection
        import glob
        self.font_loaded = False
        
        # Try to find a suitable Unicode font - More aggressive search
        win_dir = os.environ.get('WINDIR', 'C:/Windows').replace('\\', '/')
        possible_patterns = [
            f"{win_dir}/Fonts/Latha*",
            f"{win_dir}/Fonts/latha*",
            f"{win_dir}/Fonts/Nirmala*",
            f"{win_dir}/Fonts/nirmala*",
            f"C:/Windows/Fonts/Latha*",
            f"C:/Windows/Fonts/Nirmala*",
        ]
        
        for p in possible_patterns:
            matches = glob.glob(p)
            if matches:
                # Filter for .ttf, .TTF, .ttc, .TTC
                font_matches = [m for m in matches if m.lower().endswith(('.ttf', '.ttc'))]
                if not font_matches: continue
                
                # Priority: .ttf over .ttc usually, but some systems only have .ttc
                # Let's just pick the first one and try
                path = font_matches[0]
                try:
                    # Register as 'customfont' (lowercase is safer)
                    # For .ttc files, we might need an index, but add_font usually handles it
                    # or fails gracefully.
                    self.add_font('customfont', '', path)
                    self.font_loaded = True
                    print(f"AgriReport: Successfully loaded font: {path}")
                    break
                except Exception as e:
                    print(f"AgriReport: Failed to load font {path}: {e}")
                    continue
        
        if self.font_loaded:
            self.set_font('customfont', '', 12)
        else:
            print("AgriReport: No custom Tamil font found. Falling back to Helvetica.")
            self.set_font('helvetica', '', 12)

    def header(self):
        # Brand Green Header
        self.set_fill_color(46, 125, 50) # #2E7D32
        self.rect(0, 0, 210, 40, 'F')
        
        self.set_text_color(255, 255, 255)
        
        # Use customfont if loaded, otherwise helvetica
        fname = 'customfont' if self.font_loaded else 'helvetica'
        # Crucial: Only use 'B' if using standard fonts, or if bold variation was added
        # Since we only added regular, we avoid 'B' for CustomFont to prevent errors
        style = 'B' if not self.font_loaded else ''
        self.set_font(fname, style, 20)
        
        title = get_translation('app_name', self.lang) + " - " + get_translation('dashboard', self.lang)
        self.set_y(15)
        self.cell(0, 10, title, 0, 1, 'C')
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        # helvetica is safer for small non-unicode footers, or use self.font_family
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

def generate_pdf_report(data, filename, lang='en'):
    pdf = AgriReport(lang=lang)
    pdf.add_page()
    
    font_name = pdf.font_family
    
    # helper for localized text
    def t(key): return get_translation(key, lang)
    
    # helper for font style (Unicode fonts usually don't have bold variants loaded)
    def s(base_style=''): 
        if not pdf.font_loaded: return base_style
        return '' # Return regular style for custom fonts

    # 1. FARMER PROFILE SECTION
    pdf.ln(10)
    pdf.set_text_color(46, 125, 50)
    pdf.set_font(font_name, s('B'), 16)
    pdf.cell(0, 10, t('FARMER PROFILE'), 0, 1, 'L')
    pdf.set_draw_color(46, 125, 50)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(5)

    profile = data['profile']
    pdf.set_font(font_name, '', 11)
    pdf.set_text_color(50, 50, 50)
    
    col1 = 40
    col2 = 60
    
    # Row 1
    pdf.set_font(font_name, s('B'), 11)
    pdf.cell(col1, 8, t('Full Name') + ":", 0, 0)
    pdf.set_font(font_name, '', 11)
    pdf.cell(col2, 8, profile.get('name', 'N/A'), 0, 0)
    pdf.set_font(font_name, s('B'), 11)
    pdf.cell(col1, 8, t('DISTRICT') + ":", 0, 0)
    pdf.set_font(font_name, '', 11)
    pdf.cell(0, 8, t(f"districts.{profile['district']}"), 0, 1)

    # Row 2
    pdf.set_font(font_name, s('B'), 11)
    pdf.cell(col1, 8, t('LAND AREA') + ":", 0, 0)
    pdf.set_font(font_name, '', 11)
    # Translate Acres if present in string
    land_val = profile.get('land_area', 'N/A')
    if isinstance(land_val, str):
        land_val = land_val.replace('Acres', t('Acres'))
    pdf.cell(col2, 8, land_val, 0, 0)
    
    pdf.set_font(font_name, s('B'), 11)
    pdf.cell(col1, 8, t('SOIL TYPE') + ":", 0, 0)
    pdf.set_font(font_name, '', 11)
    pdf.cell(0, 8, t(f"options.{profile['soil_type']}"), 0, 1)

    # Row 3
    pdf.set_font(font_name, s('B'), 11)
    pdf.cell(col1, 8, t('CROPS') + ":", 0, 0)
    pdf.set_font(font_name, '', 11)
    pdf.cell(col2, 8, t(f"options.{profile['crops']}"), 0, 0)
    
    pdf.set_font(font_name, s('B'), 11)
    pdf.cell(col1, 8, t('AGRO ZONE') + ":", 0, 0)
    pdf.set_font(font_name, '', 11)
    pdf.cell(0, 8, t(profile.get('agro_zone', 'N/A')), 0, 1)

    # Row 4 (Irrigation)
    pdf.set_font(font_name, s('B'), 11)
    pdf.cell(col1, 8, t('IRRIGATION') + ":", 0, 0)
    pdf.set_font(font_name, '', 11)
    # Handle combined irrigation strings like "Borewell + Pond"
    irr_val = profile.get('irrigation', 'N/A')
    if isinstance(irr_val, str) and '+' in irr_val:
        parts = [p.strip() for p in irr_val.split('+')]
        translated_parts = [t(f"options.{p}") if t(f"options.{p}") != f"options.{p}" else t(p) for p in parts]
        irr_val = " + ".join(translated_parts)
    elif isinstance(irr_val, str):
        irr_val = t(f"options.{irr_val}") if t(f"options.{irr_val}") != f"options.{irr_val}" else t(irr_val)
        
    pdf.cell(0, 8, irr_val, 0, 1)

    pdf.ln(10)

    # 2. ADOPTION ANALYSIS
    pdf.set_fill_color(244, 249, 244)
    pdf.rect(10, pdf.get_y(), 190, 45, 'F')
    pdf.set_y(pdf.get_y() + 5)
    pdf.set_x(15)
    
    analysis = data['analysis']
    pdf.set_font(font_name, s('B'), 14)
    pdf.set_text_color(46, 125, 50)
    pdf.cell(0, 10, f"{t('adoption_score')}: {analysis['score']}%", 0, 1)
    pdf.set_font(font_name, s('B'), 11)
    pdf.set_x(15)
    pdf.cell(0, 8, f"{t('LEVEL')}: {t(f'options.{analysis['level']}')}", 0, 1)
    
    pdf.set_x(15)
    pdf.set_font(font_name, '', 11)
    pdf.set_text_color(80, 80, 80)
    status_text = f"{t('Ahead of')} {analysis['ahead_of']}% {t('of farmers in')} {t(f'districts.{profile['district']}')} {t('district_level')}."
    pdf.multi_cell(180, 8, status_text)
    
    pdf.ln(15)

    # 3. PRIORITY ACTIONS
    pdf.set_text_color(46, 125, 50)
    pdf.set_font(font_name, s('B'), 13)
    pdf.cell(0, 10, t('YOUR 3 PRIORITY ACTIONS'), 0, 1)
    pdf.ln(2)
    
    pdf.set_font(font_name, '', 10)
    pdf.set_text_color(50, 50, 50)
    for i, action in enumerate(analysis['priority_actions']):
        pdf.set_font(font_name, s('B'), 10)
        pdf.cell(0, 7, f"{i+1}. {t(action['title'])}", 0, 1)
        pdf.set_font(font_name, '', 10)
        pdf.set_x(15)
        pdf.multi_cell(0, 6, t(action['desc']))
        pdf.ln(2)

    pdf.ln(5)

    # 4. TECH RECOMMENDATIONS
    pdf.set_text_color(46, 125, 50)
    pdf.set_font(font_name, s('B'), 13)
    pdf.cell(0, 10, t('Recommended Technologies'), 0, 1)
    
    for tech in data['tech_recommendations']:
        pdf.set_font(font_name, s('B'), 11)
        pdf.set_text_color(30, 30, 30)
        pdf.cell(0, 8, t(tech['name']), 0, 1)
        pdf.set_font(font_name, '', 10)
        pdf.set_text_color(80, 80, 80)
        pdf.multi_cell(0, 6, t(tech['description']))
        pdf.set_font(font_name, s('B'), 9)
        pdf.set_text_color(46, 125, 50)
        pdf.cell(0, 6, f"{t('est_cost')}: {t(tech['cost'])} | {t(tech['subsidy'])}", 0, 1)
        pdf.ln(4)

    pdf.ln(5)

    # 5. GOVT SCHEMES
    if pdf.get_y() > 230: pdf.add_page()
    pdf.set_text_color(46, 125, 50)
    pdf.set_font(font_name, s('B'), 13)
    pdf.cell(0, 10, t('Government Schemes'), 0, 1)
    
    schemes = data['schemes']
    all_schemes = schemes['central'] + schemes['tamil_nadu'] + schemes.get('women', [])
    for scheme in all_schemes:
        pdf.set_font(font_name, s('B'), 11)
        pdf.set_text_color(30, 30, 30)
        pdf.cell(0, 8, t(scheme['name']), 0, 1)
        pdf.set_font(font_name, '', 10)
        pdf.set_text_color(80, 80, 80)
        pdf.multi_cell(0, 6, t(scheme['description']))
        pdf.ln(2)

    # 6. CROP RECOMMENDATIONS
    if data.get('crop_recommendations'):
        pdf.add_page()
        pdf.set_text_color(46, 125, 50)
        pdf.set_font(font_name, s('B'), 13)
        pdf.cell(0, 10, t('crop_recommendations'), 0, 1)
        pdf.ln(5)
        
        for crop in data['crop_recommendations']:
            pdf.set_font(font_name, s('B'), 11)
            pdf.set_text_color(30, 30, 30)
            pdf.cell(0, 8, t(f"options.{crop}"), 0, 1)
            pdf.ln(2)

    output_path = os.path.join(os.path.dirname(__file__), filename)
    pdf.output(output_path)
    return output_path
