const translations = {
  en: {
    site_name: 'ShetiBook', tagline: 'Digital Farming Assistant',
    hero_title: 'Smart Farming Starts Here', hero_subtitle: 'Identify crop diseases, access government schemes, and connect with the farming community — all in your language.',
    nav_home: 'Home', nav_diagnose: 'Diagnose', nav_crops: 'Crops', nav_community: 'Community', nav_schemes: 'Schemes', nav_vendors: 'Vendors', nav_login: 'Login', nav_register: 'Register', nav_dashboard: 'Dashboard', nav_logout: 'Logout',
    get_started: 'Get Started', learn_more: 'Learn More',
    feature_diagnose: 'Disease Detection', feature_diagnose_desc: 'Upload a photo or describe symptoms to identify crop diseases instantly.',
    feature_crops: 'Crop Encyclopedia', feature_crops_desc: 'Complete information about crops, growing seasons, and best practices.',
    feature_community: 'Farmer Community', feature_community_desc: 'Connect with other farmers, share tips, and learn from experiences.',
    feature_schemes: 'Financial Schemes', feature_schemes_desc: 'Explore government schemes, subsidies, and financial assistance programs.',
    stat_farmers: 'Farmers Helped', stat_crops: 'Crops Covered', stat_diseases: 'Diseases Listed', stat_schemes: 'Govt Schemes',
    login_title: 'Welcome Back', login_subtitle: 'Login to your ShetiBook account', register_title: 'Join ShetiBook', register_subtitle: 'Create your farmer account',
    email: 'Email Address', password: 'Password', name: 'Full Name', phone: 'Phone Number', state: 'State', district: 'District', confirm_password: 'Confirm Password',
    login_btn: 'Login', register_btn: 'Create Account', no_account: "Don't have an account?", have_account: 'Already have an account?',
    welcome_back: 'Welcome back', dashboard_subtitle: 'Here\'s your farming dashboard',
    quick_diagnose: 'Diagnose Disease', quick_crops: 'Browse Crops', quick_community: 'Community', quick_schemes: 'Govt Schemes',
    diagnose_title: 'Crop Disease Diagnosis', diagnose_subtitle: 'Describe symptoms, upload photo, or use voice input',
    describe_symptoms: 'Describe the symptoms you see...', upload_photo: 'Upload Crop Photo', upload_hint: 'Drag & drop or click to upload (JPG, PNG)', voice_input: 'Voice Input', voice_hint: 'Click mic to speak',
    analyze_btn: 'Analyze Disease', analyzing: 'Analyzing...', results: 'Diagnosis Results', no_results: 'No matching diseases found. Try describing more symptoms.',
    disease_name: 'Disease', symptoms: 'Symptoms', cause: 'Cause', solution: 'Solution',
    crops_title: 'Crop Encyclopedia', crops_subtitle: 'Learn about crops grown across India',
    all_crops: 'All', grains: 'Grains', vegetables: 'Vegetables', cash_crops: 'Cash Crops', oilseeds: 'Oilseeds', search_crops: 'Search crops...',
    season: 'Season', soil_type: 'Soil Type', water_needs: 'Water Needs', common_diseases: 'Common Diseases',
    community_title: 'Farmer Community', community_subtitle: 'Share knowledge, ask questions, and help each other',
    create_post: 'Create Post', post_title: 'Post Title', post_content: 'Write your post...', post_category: 'Category',
    cat_questions: 'Questions', cat_tips: 'Tips', cat_success: 'Success Stories', cat_market: 'Market Info', cat_general: 'General',
    like: 'Like', comment: 'Comment', add_comment: 'Add a comment...', post_btn: 'Post', submit_comment: 'Send',
    schemes_title: 'Government Schemes', schemes_subtitle: 'Financial assistance and subsidies for farmers',
    eligibility: 'Eligibility', how_to_apply: 'How to Apply', visit_portal: 'Visit Official Portal', amount: 'Benefit Amount',
    loading: 'Loading...', error_occurred: 'An error occurred', try_again: 'Try Again',
    footer_text: '© 2024 ShetiBook. Empowering Indian Farmers with Technology.',
    voice_listening: 'Listening... Speak now', voice_not_supported: 'Voice recognition not supported in this browser. Please use Chrome or Edge.',
    quick_diagnose: 'Diagnose Disease', quick_crops: 'Browse Crops', quick_community: 'Community', quick_schemes: 'Govt Schemes', quick_vendors: 'Find Vendors',
    vendors_title: 'Agricultural Vendors & Contacts', vendors_subtitle: 'Connect with verified seed suppliers, fertilizer dealers, equipment providers, and agricultural experts across India.', vendors_search_placeholder: 'Search vendors by name, product, or location...',
    recent_diagnoses: 'Recent Diagnoses', view_all: 'View All', no_diagnoses: 'No diagnoses yet',
  },
  hi: {
    site_name: 'शेतीबुक', tagline: 'डिजिटल कृषि सहायक',
    hero_title: 'स्मार्ट खेती यहाँ से शुरू होती है', hero_subtitle: 'फसल रोगों की पहचान करें, सरकारी योजनाओं तक पहुँचें, और किसान समुदाय से जुड़ें — अपनी भाषा में।',
    nav_home: 'होम', nav_diagnose: 'रोग जाँच', nav_crops: 'फसलें', nav_community: 'समुदाय', nav_schemes: 'योजनाएँ', nav_vendors: 'विक्रेता', nav_login: 'लॉगिन', nav_register: 'रजिस्टर', nav_dashboard: 'डैशबोर्ड', nav_logout: 'लॉगआउट',
    get_started: 'शुरू करें', learn_more: 'और जानें',
    feature_diagnose: 'रोग पहचान', feature_diagnose_desc: 'फसल की फोटो अपलोड करें या लक्षण बताएं।',
    feature_crops: 'फसल विश्वकोश', feature_crops_desc: 'फसलों की पूरी जानकारी, मौसम और सर्वोत्तम तरीके।',
    feature_community: 'किसान समुदाय', feature_community_desc: 'अन्य किसानों से जुड़ें, सुझाव साझा करें।',
    feature_schemes: 'वित्तीय योजनाएँ', feature_schemes_desc: 'सरकारी योजनाएँ, सब्सिडी और वित्तीय सहायता।',
    stat_farmers: 'किसानों की मदद', stat_crops: 'फसलें शामिल', stat_diseases: 'रोग सूचीबद्ध', stat_schemes: 'सरकारी योजनाएँ',
    login_title: 'वापस स्वागत है', login_subtitle: 'अपने शेतीबुक खाते में लॉगिन करें', register_title: 'शेतीबुक से जुड़ें', register_subtitle: 'अपना किसान खाता बनाएं',
    email: 'ईमेल', password: 'पासवर्ड', name: 'पूरा नाम', phone: 'फ़ोन नंबर', state: 'राज्य', district: 'जिला', confirm_password: 'पासवर्ड पुष्टि',
    login_btn: 'लॉगिन', register_btn: 'खाता बनाएं', no_account: 'खाता नहीं है?', have_account: 'पहले से खाता है?',
    welcome_back: 'वापस स्वागत है', dashboard_subtitle: 'आपका कृषि डैशबोर्ड',
    quick_diagnose: 'रोग जाँच', quick_crops: 'फसलें देखें', quick_community: 'समुदाय', quick_schemes: 'सरकारी योजनाएँ',
    diagnose_title: 'फसल रोग निदान', diagnose_subtitle: 'लक्षण बताएं, फोटो अपलोड करें, या बोलकर बताएं',
    describe_symptoms: 'आप जो लक्षण देख रहे हैं उनका वर्णन करें...', upload_photo: 'फसल की फोटो अपलोड करें', upload_hint: 'खींचकर छोड़ें या क्लिक करें', voice_input: 'आवाज़ इनपुट', voice_hint: 'बोलने के लिए माइक दबाएं',
    analyze_btn: 'रोग जाँचें', analyzing: 'जाँच जारी...', results: 'निदान परिणाम', no_results: 'कोई मिलान नहीं मिला। अधिक लक्षण बताएं।',
    disease_name: 'रोग', symptoms: 'लक्षण', cause: 'कारण', solution: 'उपचार',
    crops_title: 'फसल विश्वकोश', crops_subtitle: 'भारत में उगाई जाने वाली फसलों के बारे में जानें',
    all_crops: 'सभी', grains: 'अनाज', vegetables: 'सब्जियां', cash_crops: 'नकदी फसलें', oilseeds: 'तिलहन', search_crops: 'फसलें खोजें...',
    season: 'मौसम', soil_type: 'मिट्टी', water_needs: 'पानी की ज़रूरत', common_diseases: 'सामान्य रोग',
    community_title: 'किसान समुदाय', community_subtitle: 'ज्ञान साझा करें, सवाल पूछें, एक-दूसरे की मदद करें',
    create_post: 'पोस्ट बनाएं', post_title: 'शीर्षक', post_content: 'अपनी पोस्ट लिखें...', post_category: 'श्रेणी',
    cat_questions: 'सवाल', cat_tips: 'सुझाव', cat_success: 'सफलता की कहानी', cat_market: 'बाज़ार जानकारी', cat_general: 'सामान्य',
    like: 'पसंद', comment: 'टिप्पणी', add_comment: 'टिप्पणी लिखें...', post_btn: 'पोस्ट करें', submit_comment: 'भेजें',
    schemes_title: 'सरकारी योजनाएँ', schemes_subtitle: 'किसानों के लिए वित्तीय सहायता और सब्सिडी',
    eligibility: 'पात्रता', how_to_apply: 'आवेदन कैसे करें', visit_portal: 'आधिकारिक पोर्टल', amount: 'लाभ राशि',
    loading: 'लोड हो रहा है...', error_occurred: 'एक त्रुटि हुई', try_again: 'पुनः प्रयास करें',
    footer_text: '© 2024 शेतीबुक। तकनीक से भारतीय किसानों को सशक्त बनाना।',
    voice_listening: 'सुन रहे हैं... अब बोलें', voice_not_supported: 'इस ब्राउज़र में आवाज़ पहचान समर्थित नहीं है।',
    quick_diagnose: 'रोग जाँच', quick_crops: 'फसलें देखें', quick_community: 'समुदाय', quick_schemes: 'सरकारी योजनाएँ', quick_vendors: 'विक्रेता खोजें',
    vendors_title: 'कृषि विक्रेता और संपर्क', vendors_subtitle: 'सत्यापित बीज आपूर्तिकर्ताओं, उर्वरक डीलरों और कृषि विशेषज्ञों से जुड़ें।', vendors_search_placeholder: 'नाम, उत्पाद या स्थान से विक्रेता खोजें...',
    recent_diagnoses: 'हाल के निदान', view_all: 'सभी देखें', no_diagnoses: 'अभी तक कोई निदान नहीं',
  },
  mr: {
    site_name: 'शेतीबुक', tagline: 'डिजिटल शेती सहाय्यक',
    hero_title: 'स्मार्ट शेती इथून सुरू होते', hero_subtitle: 'पिकांचे रोग ओळखा, सरकारी योजना मिळवा, आणि शेतकरी समुदायाशी जोडा — तुमच्या भाषेत.',
    nav_home: 'होम', nav_diagnose: 'रोग तपासा', nav_crops: 'पिके', nav_community: 'समुदाय', nav_schemes: 'योजना', nav_vendors: 'विक्रेते', nav_login: 'लॉगिन', nav_register: 'नोंदणी', nav_dashboard: 'डॅशबोर्ड', nav_logout: 'लॉगआउट',
    get_started: 'सुरू करा', learn_more: 'अधिक जाणा',
    feature_diagnose: 'रोग ओळख', feature_diagnose_desc: 'पिकाचा फोटो अपलोड करा किंवा लक्षणे सांगा.',
    feature_crops: 'पीक विश्वकोश', feature_crops_desc: 'पिकांची संपूर्ण माहिती, हंगाम आणि सर्वोत्तम पद्धती.',
    feature_community: 'शेतकरी समुदाय', feature_community_desc: 'इतर शेतकऱ्यांशी जोडा, सूचना शेअर करा.',
    feature_schemes: 'आर्थिक योजना', feature_schemes_desc: 'सरकारी योजना, अनुदान आणि आर्थिक मदत.',
    stat_farmers: 'शेतकऱ्यांना मदत', stat_crops: 'पिके समाविष्ट', stat_diseases: 'रोग सूचीबद्ध', stat_schemes: 'सरकारी योजना',
    login_title: 'पुन्हा स्वागत', login_subtitle: 'तुमच्या शेतीबुक खात्यात लॉगिन करा', register_title: 'शेतीबुक मध्ये सामील व्हा', register_subtitle: 'तुमचे शेतकरी खाते तयार करा',
    email: 'ईमेल', password: 'पासवर्ड', name: 'पूर्ण नाव', phone: 'फोन नंबर', state: 'राज्य', district: 'जिल्हा', confirm_password: 'पासवर्ड पुष्टी',
    login_btn: 'लॉगिन', register_btn: 'खाते तयार करा', no_account: 'खाते नाही?', have_account: 'आधीच खाते आहे?',
    welcome_back: 'पुन्हा स्वागत', dashboard_subtitle: 'तुमचा शेती डॅशबोर्ड',
    quick_diagnose: 'रोग तपासा', quick_crops: 'पिके पहा', quick_community: 'समुदाय', quick_schemes: 'सरकारी योजना', quick_vendors: 'विक्रेते शोधा',
    vendors_title: 'कृषी विक्रेते आणि संपर्क', vendors_subtitle: 'सत्यापित बियाणे पुरवठादार, खत डीलर आणि कृषी तज्ञांशी जोडा.', vendors_search_placeholder: 'नाव, उत्पाद किंवा ठिकाणाने विक्रेते शोधा...',
    diagnose_title: 'पीक रोग निदान', diagnose_subtitle: 'लक्षणे सांगा, फोटो अपलोड करा, किंवा बोलून सांगा',
    describe_symptoms: 'तुम्हाला दिसणारी लक्षणे सांगा...', upload_photo: 'पिकाचा फोटो अपलोड करा', upload_hint: 'ड्रॅग करा किंवा क्लिक करा', voice_input: 'आवाज इनपुट', voice_hint: 'बोलण्यासाठी माइक दाबा',
    analyze_btn: 'रोग तपासा', analyzing: 'तपासत आहे...', results: 'निदान परिणाम', no_results: 'कोणताही रोग जुळला नाही. अधिक लक्षणे सांगा.',
    disease_name: 'रोग', symptoms: 'लक्षणे', cause: 'कारण', solution: 'उपाय',
    crops_title: 'पीक विश्वकोश', crops_subtitle: 'भारतात पिकवल्या जाणाऱ्या पिकांबद्दल जाणून घ्या',
    all_crops: 'सर्व', grains: 'धान्य', vegetables: 'भाज्या', cash_crops: 'नगदी पिके', oilseeds: 'तेलबिया', search_crops: 'पिके शोधा...',
    season: 'हंगाम', soil_type: 'माती', water_needs: 'पाण्याची गरज', common_diseases: 'सामान्य रोग',
    community_title: 'शेतकरी समुदाय', community_subtitle: 'ज्ञान शेअर करा, प्रश्न विचारा, एकमेकांना मदत करा',
    create_post: 'पोस्ट तयार करा', post_title: 'शीर्षक', post_content: 'तुमची पोस्ट लिहा...', post_category: 'श्रेणी',
    cat_questions: 'प्रश्न', cat_tips: 'सूचना', cat_success: 'यशोगाथा', cat_market: 'बाजार माहिती', cat_general: 'सामान्य',
    like: 'आवडले', comment: 'प्रतिक्रिया', add_comment: 'प्रतिक्रिया लिहा...', post_btn: 'पोस्ट करा', submit_comment: 'पाठवा',
    schemes_title: 'सरकारी योजना', schemes_subtitle: 'शेतकऱ्यांसाठी आर्थिक मदत आणि अनुदान',
    eligibility: 'पात्रता', how_to_apply: 'अर्ज कसा करावा', visit_portal: 'अधिकृत पोर्टल', amount: 'लाभ रक्कम',
    loading: 'लोड होत आहे...', error_occurred: 'एक त्रुटी आली', try_again: 'पुन्हा प्रयत्न करा',
    footer_text: '© 2024 शेतीबुक. तंत्रज्ञानाने भारतीय शेतकऱ्यांना सक्षम बनवणे.',
    voice_listening: 'ऐकत आहे... आता बोला', voice_not_supported: 'या ब्राउझरमध्ये आवाज ओळख समर्थित नाही.',
    recent_diagnoses: 'अलीकडील निदान', view_all: 'सर्व पहा', no_diagnoses: 'अजून कोणतेही निदान नाही',
  }
};

let currentLang = localStorage.getItem('shetibook_lang') || 'en';

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || translations.en[key] || key;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('shetibook_lang', lang);
  document.documentElement.lang = lang === 'en' ? 'en' : lang === 'hi' ? 'hi' : 'mr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = t(key);
    else el.textContent = t(key);
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  if (window.onLanguageChange) window.onLanguageChange(lang);
}

function getLang() { return currentLang; }

function getLangSuffix() {
  if (currentLang === 'hi') return '_hi';
  if (currentLang === 'mr') return '_mr';
  return '';
}

function getLocalizedField(obj, field) {
  const suffix = getLangSuffix();
  return (suffix && obj[field + suffix]) || obj[field] || '';
}
