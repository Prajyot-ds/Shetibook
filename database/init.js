const initSQL = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'shetibook.db');
let db = null;

async function getDb() {
  if (db) return db;
  const SQL = await initSQL();
  if (fs.existsSync(DB_PATH)) {
    const buf = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buf);
    createTables();
    ensureSeedUser();
  } else {
    db = new SQL.Database();
    createTables();
    seedData();
    ensureSeedUser();
    saveDb();
  }
  return db;
}

function saveDb() {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

function createTables() {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL,
    phone TEXT, password_hash TEXT NOT NULL, state TEXT, district TEXT,
    language_pref TEXT DEFAULT 'en', created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS crops (
    id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, name_hi TEXT, name_mr TEXT,
    category TEXT, season TEXT, soil_type TEXT, water_needs TEXT,
    description TEXT, description_hi TEXT, description_mr TEXT, image_url TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS diseases (
    id INTEGER PRIMARY KEY AUTOINCREMENT, crop_id INTEGER, name TEXT, name_hi TEXT, name_mr TEXT,
    symptoms TEXT, symptoms_hi TEXT, symptoms_mr TEXT,
    cause TEXT, cause_hi TEXT, cause_mr TEXT,
    solution TEXT, solution_hi TEXT, solution_mr TEXT, image_url TEXT,
    FOREIGN KEY(crop_id) REFERENCES crops(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS diagnoses (
    id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, description TEXT,
    image_path TEXT, matched_disease_id INTEGER, result_text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, title TEXT, content TEXT,
    category TEXT, image_path TEXT, likes INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INTEGER, user_id INTEGER, content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(post_id) REFERENCES posts(id), FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS schemes (
    id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, name_hi TEXT, name_mr TEXT,
    description TEXT, description_hi TEXT, description_mr TEXT,
    eligibility TEXT, eligibility_hi TEXT, eligibility_mr TEXT,
    how_to_apply TEXT, how_to_apply_hi TEXT, how_to_apply_mr TEXT,
    official_link TEXT, amount TEXT
  )`);
}

function seedData() {
  // Crops
  const crops = [
    ['Wheat','गेहूं','गहू','Grains','Rabi (Winter)','Loamy, Clay Loam','Medium',
     'Wheat is India\'s second most important cereal crop. It thrives in cool weather during growth and warm weather during harvest.',
     'गेहूं भारत की दूसरी सबसे महत्वपूर्ण अनाज फसल है।','गहू हे भारतातील दुसरे सर्वात महत्त्वाचे धान्य पीक आहे.','/images/crops/wheat.svg'],
    ['Rice','चावल','तांदूळ','Grains','Kharif (Monsoon)','Clay, Silty Clay','High',
     'Rice is the staple food crop of India, grown in waterlogged paddy fields primarily during monsoon season.',
     'चावल भारत की मुख्य खाद्य फसल है।','तांदूळ हे भारताचे मुख्य अन्नधान्य पीक आहे.','/images/crops/rice.svg'],
    ['Cotton','कपास','कापूस','Cash Crops','Kharif (Monsoon)','Black Cotton Soil','Medium',
     'Cotton is India\'s most important fiber crop, known as "White Gold". Maharashtra is a leading producer.',
     'कपास भारत की सबसे महत्वपूर्ण रेशा फसल है।','कापूस हे भारतातील सर्वात महत्त्वाचे तंतू पीक आहे.','/images/crops/cotton.svg'],
    ['Tomato','टमाटर','टोमॅटो','Vegetables','Year-round','Sandy Loam, Red Soil','Medium',
     'Tomato is one of the most widely grown vegetables in India used in every cuisine.',
     'टमाटर भारत में सबसे अधिक उगाई जाने वाली सब्जियों में से एक है।','टोमॅटो हे भारतातील सर्वात मोठ्या प्रमाणावर पिकवले जाणारे भाजीपाला आहे.','/images/crops/tomato.svg'],
    ['Sugarcane','गन्ना','ऊस','Cash Crops','Kharif','Deep Rich Loamy','Very High',
     'Sugarcane is a major cash crop in India. Maharashtra and UP are top producers.',
     'गन्ना भारत की प्रमुख नकदी फसल है।','ऊस हे भारतातील प्रमुख नगदी पीक आहे.','/images/crops/sugarcane.svg'],
    ['Soybean','सोयाबीन','सोयाबीन','Oilseeds','Kharif','Well-drained Loamy','Medium',
     'Soybean is the leading oilseed crop of India, primarily grown in Madhya Pradesh and Maharashtra.',
     'सोयाबीन भारत की प्रमुख तिलहन फसल है।','सोयाबीन हे भारतातील प्रमुख तेलबिया पीक आहे.','/images/crops/soybean.svg'],
    ['Onion','प्याज','कांदा','Vegetables','Rabi / Late Kharif','Sandy Loam, Alluvial','Low',
     'India is the second largest producer of onion in the world. Maharashtra dominates production.',
     'भारत दुनिया में प्याज का दूसरा सबसे बड़ा उत्पादक है।','भारत हा जगातील दुसरा सर्वात मोठा कांदा उत्पादक आहे.','/images/crops/onion.svg'],
    ['Potato','आलू','बटाटा','Vegetables','Rabi (Winter)','Sandy Loam','Medium',
     'Potato is the most important vegetable crop in India grown across the country.',
     'आलू भारत में सबसे महत्वपूर्ण सब्जी फसल है।','बटाटा हे भारतातील सर्वात महत्त्वाचे भाजीपाला पीक आहे.','/images/crops/potato.svg'],
  ];
  const cropStmt = db.prepare('INSERT INTO crops (name,name_hi,name_mr,category,season,soil_type,water_needs,description,description_hi,description_mr,image_url) VALUES (?,?,?,?,?,?,?,?,?,?,?)');
  crops.forEach(c => { cropStmt.run(c); });
  cropStmt.free();

  // Diseases
  const diseases = [
    [1,'Wheat Rust','गेहूं रतुआ','गव्हाचे तांबेरा','Orange-brown pustules on leaves and stems','पत्तियों और तनों पर नारंगी-भूरे रंग के छाले','पानांवर आणि खोडावर नारिंगी-तपकिरी फोड','Caused by Puccinia fungi, spreads through wind-borne spores','पक्सिनिया कवक के कारण','पक्सिनिया बुरशीमुळे','Use resistant varieties like HD-2967. Apply Propiconazole 25% EC spray. Remove infected plant debris.','प्रतिरोधी किस्में जैसे HD-2967 का उपयोग करें। प्रोपिकोनाज़ोल 25% EC का छिड़काव करें।','HD-2967 सारख्या प्रतिरोधक जाती वापरा. प्रोपिकोनाझोल 25% EC फवारणी करा.','/images/crops/wheat_rust.svg'],
    [1,'Loose Smut','खुली कंडुआ','मोकळी काणी','Entire ear head turns into black mass of spores','पूरा बालीवाला भाग काले बीजाणुओं के ढेर में बदल जाता है','संपूर्ण कणसाचे काळ्या बीजाणूंच्या राशीत रूपांतर','Seed-borne fungus Ustilago tritici','बीज जनित कवक उस्टिलागो ट्रिटिसी','बीजजन्य बुरशी उस्टिलागो ट्रिटिसी','Treat seeds with Carbendazim 50% WP @ 2g/kg or Carboxin 75% WP before sowing.','बुवाई से पहले बीजों को कार्बेन्डाजिम से उपचारित करें।','पेरणीपूर्वी बियाण्यांना कार्बेन्डाझिम ने बीजप्रक्रिया करा.','/images/crops/wheat_smut.svg'],
    [2,'Rice Blast','धान का ब्लास्ट','भाताचा ब्लास्ट','Spindle-shaped spots with grey center on leaves','पत्तियों पर भूरे केंद्र वाले धुरी आकार के धब्बे','पानांवर राखाडी मध्यभाग असलेले स्पिंडल-आकाराचे डाग','Fungus Magnaporthe oryzae, favored by humid weather','कवक मैग्नापोर्थ ओरिज़ी, नम मौसम में फैलता है','बुरशी मॅग्नापोर्थ ओरायझी, दमट हवामानात पसरते','Apply Tricyclazole 75% WP spray. Avoid excess nitrogen. Use resistant varieties like Pusa Basmati.','ट्राइसाइक्लाज़ोल 75% WP का छिड़काव करें।','ट्रायसायक्लाझोल 75% WP फवारणी करा.','/images/crops/rice_blast.svg'],
    [2,'Bacterial Leaf Blight','जीवाणु पत्ती अंगमारी','जिवाणू पानांचा करपा','Water-soaked streaks on leaf margins turning white-yellow','पत्ती के किनारों पर पानी जैसी धारियां जो सफेद-पीली हो जाती हैं','पानांच्या कडांवर पाण्यासारख्या रेषा ज्या पांढऱ्या-पिवळ्या होतात','Bacterium Xanthomonas oryzae, spreads through irrigation water','जीवाणु ज़ैंथोमोनास ओरिज़ी','जिवाणू झॅन्थोमोनास ओरायझी','Drain excess water. Apply Copper oxychloride spray. Use balanced fertilizers.','अतिरिक्त पानी निकालें। कॉपर ऑक्सीक्लोराइड का छिड़काव करें।','अतिरिक्त पाणी काढून टाका. कॉपर ऑक्सिक्लोराईड फवारणी करा.','/images/crops/rice_blight.svg'],
    [3,'Cotton Fusarium Wilt','कपास उकठा रोग','कापूस मर रोग','Yellowing, wilting of leaves, browning of vascular tissue','पत्तियों का पीलापन, मुरझाना, संवहनी ऊतक का भूरापन','पानांचा पिवळेपणा, कोमेजणे, वाहक ऊतींचा तपकिरीपणा','Soil-borne fungus Fusarium oxysporum','मृदा जनित कवक फ्यूज़ेरियम','मातीतील बुरशी फ्यूजेरियम','Use wilt-resistant varieties. Practice crop rotation with cereals. Treat seeds with Trichoderma viride.','विल्ट प्रतिरोधी किस्मों का उपयोग करें।','मर प्रतिरोधक जाती वापरा.','/images/crops/cotton_wilt.svg'],
    [4,'Early Blight','अगेती अंगमारी','लवकर करपा','Dark brown spots with concentric rings on lower leaves first','निचली पत्तियों पर संकेंद्रित छल्लों वाले गहरे भूरे धब्बे','खालच्या पानांवर प्रथम एककेंद्री वलयांसह गडद तपकिरी डाग','Fungus Alternaria solani, common in warm humid conditions','कवक अल्टरनेरिया सोलानी','बुरशी अल्टरनेरिया सोलानी','Spray Mancozeb 75% WP @ 2.5g/L at 10-day intervals. Remove infected leaves. Ensure good spacing.','मैनकोज़ेब 75% WP का छिड़काव करें।','मॅन्कोझेब 75% WP फवारणी करा.','/images/crops/tomato_blight.svg'],
    [4,'Tomato Leaf Curl','टमाटर पत्ती मोड़ रोग','टोमॅटो पानांचा मुरडा','Upward curling of leaves, stunted growth, yellowing','पत्तियों का ऊपर की ओर मुड़ना, बौनापन, पीलापन','पानांचा वरच्या बाजूला मुरडणे, खुंटलेली वाढ, पिवळेपणा','Virus transmitted by whitefly (Bemisia tabaci)','सफेद मक्खी द्वारा प्रसारित वायरस','पांढऱ्या माशीद्वारे प्रसारित विषाणू','Control whiteflies with yellow sticky traps and Imidacloprid spray. Use resistant varieties.','पीली चिपचिपी जाल से सफेद मक्खी नियंत्रित करें।','पिवळ्या चिकट सापळ्यांनी पांढरी माशी नियंत्रित करा.','/images/crops/tomato_curl.svg'],
  ];
  const disStmt = db.prepare('INSERT INTO diseases (crop_id,name,name_hi,name_mr,symptoms,symptoms_hi,symptoms_mr,cause,cause_hi,cause_mr,solution,solution_hi,solution_mr,image_url) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
  diseases.forEach(d => { disStmt.run(d); });
  disStmt.free();

  // Government Schemes
  const schemes = [
    ['PM-KISAN','पीएम-किसान','पीएम-किसान',
     'Direct income support of ₹6,000 per year to farmer families, paid in 3 installments of ₹2,000 each.',
     'किसान परिवारों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता, ₹2,000 की 3 किस्तों में।',
     'शेतकरी कुटुंबांना दरवर्षी ₹6,000 थेट उत्पन्न सहाय्य, प्रत्येकी ₹2,000 च्या 3 हप्त्यांमध्ये.',
     'All farmer families with cultivable land holding','सभी किसान परिवार जिनके पास खेती योग्य भूमि है','शेतीयोग्य जमीनधारणा असलेली सर्व शेतकरी कुटुंबे',
     'Register at pmkisan.gov.in with Aadhaar, land records, and bank account details.','pmkisan.gov.in पर आधार, भूमि रिकॉर्ड और बैंक खाता विवरण के साथ पंजीकरण करें।','pmkisan.gov.in वर आधार, जमीन नोंदी आणि बँक खाते तपशीलांसह नोंदणी करा.',
     'https://pmkisan.gov.in','₹6,000/year'],
    ['PM Fasal Bima Yojana','प्रधानमंत्री फसल बीमा योजना','प्रधानमंत्री पीक विमा योजना',
     'Crop insurance scheme providing financial support to farmers in case of crop failure due to natural calamities.',
     'प्राकृतिक आपदाओं के कारण फसल विफलता की स्थिति में किसानों को वित्तीय सहायता प्रदान करने वाली फसल बीमा योजना।',
     'नैसर्गिक आपत्तींमुळे पीक अपयशाच्या बाबतीत शेतकऱ्यांना आर्थिक सहाय्य देणारी पीक विमा योजना.',
     'All farmers including sharecroppers and tenant farmers growing notified crops','सभी किसान जो अधिसूचित फसलें उगाते हैं','अधिसूचित पिके घेणारे सर्व शेतकरी',
     'Apply through nearest bank, CSC center, or pmfby.gov.in before sowing season deadline.','निकटतम बैंक या CSC केंद्र के माध्यम से आवेदन करें।','जवळच्या बँक किंवा CSC केंद्रामार्फत अर्ज करा.',
     'https://pmfby.gov.in','Premium: 2% Kharif, 1.5% Rabi'],
    ['Kisan Credit Card','किसान क्रेडिट कार्ड','किसान क्रेडिट कार्ड',
     'Provides affordable credit to farmers for crop production, post-harvest needs, and farm maintenance at low interest rates.',
     'किसानों को फसल उत्पादन, कटाई के बाद की जरूरतों के लिए कम ब्याज दर पर ऋण।',
     'शेतकऱ्यांना पीक उत्पादन, काढणीनंतरच्या गरजांसाठी कमी व्याजदराने कर्ज.',
     'All farmers, fishermen, and animal husbandry farmers','सभी किसान, मछुआरे और पशुपालक','सर्व शेतकरी, मच्छीमार आणि पशुपालक',
     'Apply at any bank branch with land ownership documents and ID proof.','किसी भी बैंक शाखा में भूमि स्वामित्व दस्तावेजों के साथ आवेदन करें।','कोणत्याही बँक शाखेत जमीन मालकी कागदपत्रांसह अर्ज करा.',
     'https://www.pmkisan.gov.in','Up to ₹3 lakh @ 4% interest'],
    ['Soil Health Card','मृदा स्वास्थ्य कार्ड','माती आरोग्य कार्ड',
     'Government provides soil testing and health cards with recommendations for appropriate fertilizer dosage.',
     'सरकार मिट्टी परीक्षण और उचित उर्वरक खुराक की सिफारिशों के साथ स्वास्थ्य कार्ड प्रदान करती है।',
     'सरकार माती परीक्षण आणि योग्य खत मात्रेच्या शिफारशींसह आरोग्य कार्ड देते.',
     'All farmers across India','भारत भर के सभी किसान','भारतभरातील सर्व शेतकरी',
     'Visit nearest Krishi Vigyan Kendra or apply at soilhealth.dac.gov.in','निकटतम कृषि विज्ञान केंद्र पर जाएं।','जवळच्या कृषी विज्ञान केंद्राला भेट द्या.',
     'https://soilhealth.dac.gov.in','Free'],
    ['PM Krishi Sinchai Yojana','प्रधानमंत्री कृषि सिंचाई योजना','प्रधानमंत्री कृषी सिंचन योजना',
     'Promotes efficient water use through micro-irrigation (drip & sprinkler) with subsidies up to 55%.',
     'सूक्ष्म सिंचाई के माध्यम से कुशल जल उपयोग को बढ़ावा देता है, 55% तक सब्सिडी।',
     'सूक्ष्म सिंचनाद्वारे (ठिबक आणि तुषार) कार्यक्षम पाणी वापरास प्रोत्साहन, 55% पर्यंत अनुदान.',
     'All farmers, priority to small and marginal farmers','सभी किसान, छोटे और सीमांत किसानों को प्राथमिकता','सर्व शेतकरी, अल्प आणि सीमांत शेतकऱ्यांना प्राधान्य',
     'Apply through State Agriculture Department or district agriculture office.','राज्य कृषि विभाग के माध्यम से आवेदन करें।','राज्य कृषी विभागामार्फत अर्ज करा.',
     'https://pmksy.gov.in','Subsidy up to 55%'],
  ];
  const schStmt = db.prepare('INSERT INTO schemes (name,name_hi,name_mr,description,description_hi,description_mr,eligibility,eligibility_hi,eligibility_mr,how_to_apply,how_to_apply_hi,how_to_apply_mr,official_link,amount) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
  schemes.forEach(s => { schStmt.run(s); });
  schStmt.free();
}

function ensureSeedUser() {
  if (!db) return;
  try {
    const stmt = db.prepare("SELECT id FROM users WHERE LOWER(email) = 'test@example.com'");
    const exists = stmt.step();
    stmt.free();
    if (!exists) {
      const bcrypt = require('bcryptjs');
      const testHash = bcrypt.hashSync('password123', 10);
      db.run("INSERT INTO users (name, email, password_hash, state, district, language_pref) VALUES (?, ?, ?, ?, ?, ?)",
        ['Test Farmer', 'test@example.com', testHash, 'Maharashtra', 'Pune', 'en']);
      saveDb();
    }
  } catch (err) {
    console.error('Error ensuring seed user:', err);
  }
}

module.exports = { getDb, saveDb };
