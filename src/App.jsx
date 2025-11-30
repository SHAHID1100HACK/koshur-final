import React, { useState, useEffect, useMemo } from 'react';
import './index.css' // <--- THIS IS CRITICAL
import { 
  BookOpen, 
  Search, 
  Menu, 
  X, 
  ShoppingCart, 
  Users, 
  MapPin, 
  Activity,
  Sun,
  Layers,
  Home,
  Book,
  PlayCircle,
  PauseCircle,
  Settings,
  Filter,
  Mic,
  Volume2,
  MessageCircle,
  ChevronRight
} from 'lucide-react';

/**
 * KOSHUR GUIDE v9.0 - DUAL TRANSCRIPTION (Academic + Phonetic)
 */

// --- 1. DATA DEFINITION ---
const DATA = {
  alphabet: [
    { char: 'ا', roman: 'a', type: 'Vowel', sound: 'a as in alive' },
    { char: 'آ', roman: 'ā', type: 'Vowel', sound: 'aa as in arm' },
    { char: 'أ', roman: 'ə', type: 'Vowel', sound: 'Schwa (uh like "about")' },
    { char: 'ٳ', roman: 'ə̄', type: 'Vowel', sound: 'Long Schwa' },
    { char: 'إ', roman: 'i', type: 'Vowel', sound: 'i as in it' },
    { char: 'ای', roman: 'ī', type: 'Vowel', sound: 'ee as in see' },
    { char: 'u', roman: 'u', type: 'Vowel', sound: 'u as in put' },
    { char: 'oo', roman: 'ū', type: 'Vowel', sound: 'oo as in boot' },
    { char: 'e', roman: 'e', type: 'Vowel', sound: 'e as in bed' },
    { char: 'ē', roman: 'ē', type: 'Vowel', sound: 'ay as in say' },
    { char: 'o', roman: 'o', type: 'Vowel', sound: 'o as in go' },
    { char: 'ō', roman: 'ō', type: 'Vowel', sound: 'Long o' },
    { char: 'ɔ', roman: 'ɔ', type: 'Vowel', sound: 'aw as in saw' },
    // Consonants
    { char: 'ب', roman: 'b', type: 'Consonant', sound: 'b' },
    { char: 'پ', roman: 'p', type: 'Consonant', sound: 'p' },
    { char: 'ت', roman: 't', type: 'Consonant', sound: 'soft t' },
    { char: 'ٹ', roman: 'ṭ', type: 'Consonant', sound: 'hard t' },
    { char: 'ث', roman: 's', type: 'Consonant', sound: 's' },
    { char: 'ج', roman: 'j', type: 'Consonant', sound: 'j' },
    { char: 'چ', roman: 'č', type: 'Consonant', sound: 'ch' },
    { char: 'ح', roman: 'h', type: 'Consonant', sound: 'h' },
    { char: 'خ', roman: 'x', type: 'Consonant', sound: 'kh' },
    { char: 'د', roman: 'd', type: 'Consonant', sound: 'soft d' },
    { char: 'ڈ', roman: 'ḍ', type: 'Consonant', sound: 'hard d' },
    { char: 'ذ', roman: 'z', type: 'Consonant', sound: 'z' },
    { char: 'ر', roman: 'r', type: 'Consonant', sound: 'r' },
    { char: 'ڑ', roman: 'ṛ', type: 'Consonant', sound: 'hard r' },
    { char: 'ز', roman: 'z', type: 'Consonant', sound: 'z' },
    { char: 'ژ', roman: 'ts', type: 'Consonant', sound: 'ts' },
    { char: 'س', roman: 's', type: 'Consonant', sound: 's' },
    { char: 'ش', roman: 'š', type: 'Consonant', sound: 'sh' },
    { char: 'ص', roman: 's', type: 'Consonant', sound: 's' },
    { char: 'ض', roman: 'z', type: 'Consonant', sound: 'z' },
    { char: 'ط', roman: 't', type: 'Consonant', sound: 'soft t' },
    { char: 'ظ', roman: 'z', type: 'Consonant', sound: 'z' },
    { char: 'ع', roman: 'ʻ', type: 'Consonant', sound: 'ayn' },
    { char: 'غ', roman: 'ġ', type: 'Consonant', sound: 'gh' },
    { char: 'ف', roman: 'f', type: 'Consonant', sound: 'f' },
    { char: 'ق', roman: 'q', type: 'Consonant', sound: 'q' },
    { char: 'ک', roman: 'k', type: 'Consonant', sound: 'k' },
    { char: 'گ', roman: 'g', type: 'Consonant', sound: 'g' },
    { char: 'ل', roman: 'l', type: 'Consonant', sound: 'l' },
    { char: 'م', roman: 'm', type: 'Consonant', sound: 'm' },
    { char: 'ن', roman: 'n', type: 'Consonant', sound: 'n' },
    { char: 'و', roman: 'v', type: 'Consonant', sound: 'v/w' },
    { char: 'ہ', roman: 'h', type: 'Consonant', sound: 'h' },
    { char: 'ی', roman: 'y', type: 'Consonant', sound: 'y' },
  ],
  vocab: [
    { kash: 'اتھٕ', roman: 'athi', phonetic: 'atha', eng: 'Hand', category: 'Body' },
    { kash: 'کھۆر', roman: 'khor', phonetic: 'khor', eng: 'Foot', category: 'Body' },
    { kash: 'کن', roman: 'kan', phonetic: 'kan', eng: 'Ear', category: 'Body' },
    { kash: 'نس', roman: 'nas', phonetic: 'nas', eng: 'Nose', category: 'Body' },
    { kash: 'أچھ', roman: 'əch', phonetic: 'achh', eng: 'Eye', category: 'Body' },
    { kash: 'زؠو', roman: 'z\'av', phonetic: 'zyav', eng: 'Tongue', category: 'Body' },
    { kash: 'کلٕ', roman: 'kali', phonetic: 'kala', eng: 'Head', category: 'Body' },
    { kash: 'گردن', roman: 'gardan', phonetic: 'gardan', eng: 'Neck', category: 'Body' },
    { kash: 'زنگ', roman: 'zang', phonetic: 'zang', eng: 'Leg', category: 'Body' },
    { kash: 'مۆت', roman: 'koth', phonetic: 'koth', eng: 'Knee', category: 'Body' },
    { kash: 'انگجہ', roman: 'õgij', phonetic: 'ungje', eng: 'Finger', category: 'Body' },
    { kash: 'دند', roman: 'dand', phonetic: 'dand', eng: 'Teeth', category: 'Body' },
    { kash: 'دل', roman: 'dil', phonetic: 'dil', eng: 'Heart', category: 'Body' },
    { kash: 'وُٹھ', roman: 'vuth', phonetic: 'vuth', eng: 'Lips', category: 'Body' },
    { kash: 'مس', roman: 'mas', phonetic: 'mas', eng: 'Hair', category: 'Body' },
    { kash: 'یاڑ', roman: 'yad', phonetic: 'yad', eng: 'Belly', category: 'Body' },
    { kash: 'پھۆک', roman: 'ph\'ok', phonetic: 'phok', eng: 'Shoulder', category: 'Body' },
    
    { kash: 'گُر', roman: 'gur', phonetic: 'gur', eng: 'Horse', category: 'Animals' },
    { kash: 'گاو', roman: 'ga:v', phonetic: 'gaav', eng: 'Cow', category: 'Animals' },
    { kash: 'ہوٗن', roman: 'hu:n', phonetic: 'hoon', eng: 'Dog', category: 'Animals' },
    { kash: 'برۆر', roman: 'bro:r', phonetic: 'bror', eng: 'Cat', category: 'Animals' },
    { kash: 'خر', roman: 'khar', phonetic: 'khar', eng: 'Donkey', category: 'Animals' },
    { kash: 'سِہہ', roman: 'sih', phonetic: 'sih', eng: 'Lion', category: 'Animals' },
    { kash: 'ہاپُت', roman: 'ha:put', phonetic: 'haaput', eng: 'Bear', category: 'Animals' },
    { kash: 'ہۆس', roman: 'hos', phonetic: 'hos', eng: 'Elephant', category: 'Animals' },
    { kash: 'کاو', roman: 'ka:v', phonetic: 'kaav', eng: 'Crow', category: 'Animals' },
    { kash: 'طوطہٕ', roman: 'to:ti', phonetic: 'tota', eng: 'Parrot', category: 'Animals' },
    { kash: 'کوکر', roman: 'kokur', phonetic: 'kokur', eng: 'Cock/Rooster', category: 'Animals' },
    { kash: 'کانوُل', roman: 'kə:vul', phonetic: 'kaavul', eng: 'Goat', category: 'Animals' },

    { kash: 'ژوٗنٹھ', roman: 'tsu:th', phonetic: 'tsoonth', eng: 'Apple', category: 'Food' },
    { kash: 'ٹنگ', roman: 'tang', phonetic: 'tang', eng: 'Pear', category: 'Food' },
    { kash: 'دوٗن', roman: 'du:n', phonetic: 'doon', eng: 'Walnut', category: 'Food' },
    { kash: 'بادام', roman: 'ba:da:m', phonetic: 'baadaam', eng: 'Almond', category: 'Food' },
    { kash: 'داچھ', roman: 'dach', phonetic: 'daach', eng: 'Grapes', category: 'Food' },
    { kash: 'ال', roman: 'al', phonetic: 'al', eng: 'Pumpkin', category: 'Food' },
    { kash: 'مُج', roman: 'muj', phonetic: 'muj', eng: 'Radish', category: 'Food' },
    { kash: 'پالک', roman: 'pa:lakh', phonetic: 'paalak', eng: 'Spinach', category: 'Food' },
    { kash: 'ہاکھ', roman: 'ha:kh', phonetic: 'haakh', eng: 'Collard Greens', category: 'Food' },
    { kash: 'پیاز', roman: 'prān', phonetic: 'praan', eng: 'Onion', category: 'Food' },
    { kash: 'ٹماٹر', roman: 'tama:tar', phonetic: 'tamaatar', eng: 'Tomato', category: 'Food' },
    { kash: 'بینگن', roman: 'va:ngun', phonetic: 'vaangan', eng: 'Brinjal/Eggplant', category: 'Food' },
    { kash: 'آلو', roman: 'o:luv', phonetic: 'oluv', eng: 'Potato', category: 'Food' },
    { kash: 'گوجر', roman: 'ga:zir', phonetic: 'gaazir', eng: 'Carrot', category: 'Food' },
    
    { kash: 'ميز', roman: 'me:z', phonetic: 'mez', eng: 'Table', category: 'Household' },
    { kash: 'کرسی', roman: 'kursi:', phonetic: 'kursi', eng: 'Chair', category: 'Household' },
    { kash: 'چمچہٕ', roman: 'camci', phonetic: 'chamcha', eng: 'Spoon', category: 'Household' },
    { kash: 'تھالی', roman: 'tha:l', phonetic: 'thaal', eng: 'Plate', category: 'Household' },
    { kash: 'گلاس', roman: 'gila:s', phonetic: 'gilaas', eng: 'Glass', category: 'Household' },
    { kash: 'پردٕ', roman: 'pardi', phonetic: 'parda', eng: 'Curtain', category: 'Household' },
    { kash: 'پلنگ', roman: 'palang', phonetic: 'palang', eng: 'Bed', category: 'Household' },
    { kash: 'کانگٕر', roman: 'kāngri', phonetic: 'kangri', eng: 'Firepot', category: 'Household' }, 
    { kash: 'فرش', roman: 'pharš', phonetic: 'pharsh', eng: 'Floor', category: 'Household' },
    { kash: 'چھت', roman: 'chat', phonetic: 'chat', eng: 'Roof', category: 'Household' },
    { kash: 'دیوار', roman: 'de:va:r', phonetic: 'devaar', eng: 'Wall', category: 'Household' },
    { kash: 'قالین', roman: 'kə:li:n', phonetic: 'kaleen', eng: 'Carpet', category: 'Household' },

    { kash: 'آسمان', roman: 'a:sma:n', phonetic: 'aasmaan', eng: 'Sky', category: 'Nature' },
    { kash: 'آفتاب', roman: 'aphta:b', phonetic: 'aphtaab', eng: 'Sun', category: 'Nature' },
    { kash: 'زوٗن', roman: 'zu:n', phonetic: 'zoon', eng: 'Moon', category: 'Nature' },
    { kash: 'تارُکھ', roman: 'ta:rukh', phonetic: 'taarukh', eng: 'Star', category: 'Nature' },
    { kash: 'رُود', roman: 'ru:d', phonetic: 'rood', eng: 'Rain', category: 'Nature' },
    { kash: 'شین', roman: 'ši:n', phonetic: 'sheen', eng: 'Snow', category: 'Nature' },
    { kash: 'ہوا', roman: 'hava:', phonetic: 'hawa', eng: 'Air/Wind', category: 'Nature' },
    { kash: 'پہاڑ', roman: 'paha:d', phonetic: 'pahaad', eng: 'Mountain', category: 'Nature' },
    { kash: 'دریاو', roman: 'dəriya:v', phonetic: 'dariyaav', eng: 'River', category: 'Nature' },
    { kash: 'جنگل', roman: 'jangul', phonetic: 'jangal', eng: 'Forest', category: 'Nature' },
    { kash: 'صبح', roman: 'subuh', phonetic: 'subuh', eng: 'Morning', category: 'Time' },
    { kash: 'شام', roman: 'ša:m', phonetic: 'shaam', eng: 'Evening', category: 'Time' },
    { kash: 'رات', roman: 'ra:th', phonetic: 'raath', eng: 'Night', category: 'Time' },
    { kash: 'دوہ', roman: 'doh', phonetic: 'doh', eng: 'Day', category: 'Time' },
    { kash: 'ہفتہٕ', roman: 'haphti', phonetic: 'haphta', eng: 'Week', category: 'Time' },
    { kash: 'وہرٕ', roman: 'vari:', phonetic: 'wari', eng: 'Year', category: 'Time' },

    { kash: 'جان', roman: 'ja:n', phonetic: 'jaan', eng: 'Good', category: 'Adjectives' },
    { kash: 'خوبصورت', roman: 'khu:bsu:rath', phonetic: 'khoobsoorat', eng: 'Beautiful', category: 'Adjectives' },
    { kash: 'بۆڈ', roman: 'bod', phonetic: 'bod', eng: 'Big', category: 'Adjectives' },
    { kash: 'لۆکٹ', roman: 'lokut', phonetic: 'lokut', eng: 'Small', category: 'Adjectives' },
    { kash: 'زیوٗٹھ', roman: 'z\'u:th', phonetic: 'zyooth', eng: 'Tall/Long', category: 'Adjectives' },
    { kash: 'ژھۆٹ', roman: 'tshot', phonetic: 'tshot', eng: 'Short', category: 'Adjectives' },
    { kash: 'تۆت', roman: 'tot', phonetic: 'tot', eng: 'Hot', category: 'Adjectives' },
    { kash: 'سرد', roman: 'sarid', phonetic: 'sarid', eng: 'Cold', category: 'Adjectives' },
    { kash: 'نِیوٗل', roman: 'n\'u:l', phonetic: 'nyool', eng: 'Blue', category: 'Adjectives' },
    { kash: 'وُزُل', roman: 'vozul', phonetic: 'vozul', eng: 'Red', category: 'Adjectives' },
    { kash: 'سفید', roman: 'saphe:d', phonetic: 'saphed', eng: 'White', category: 'Adjectives' },
    { kash: 'کرُہُن', roman: 'kruhun', phonetic: 'kruhun', eng: 'Black', category: 'Adjectives' },
  ],
  phrases: {
    'Introduction & Basics': [
      { eng: 'What is this?', kash: 'یہِ کیا چھُ؟', roman: "yi k'a: chu?", phonetic: "yi kya chu?" },
      { eng: 'Who are you?', kash: 'تُہۍ کم چھو؟', roman: "toh' kam chiv?", phonetic: "toh kam chiv?" },
      { eng: 'I am Ramesh.', kash: 'بہٕ چھُس رمیش۔', roman: "bi chus rame:š.", phonetic: "bi chus Ramesh." },
      { eng: 'Are you Kashmiri?', kash: 'تُہۍ چھِوا کٲشِر؟', roman: "toh' chiva: kə:šir'?", phonetic: "toh chiva kaeshir?" },
      { eng: 'Yes, I am Kashmiri.', kash: 'آ، بہٕ چھُس کٲشُر۔', roman: "a:, bi chus kə:šur.", phonetic: "aa, bi chus kaeshur." },
      { eng: 'How are you?', kash: 'تُہۍ چھِوا وارے؟', roman: "toh' chiva: va:ray?", phonetic: "toh chiva vaaray?" },
      { eng: 'I am fine.', kash: 'آہن مہرا وارے۔', roman: "ahan ma:hra: va:ray.", phonetic: "ahan mahra vaaray." },
      { eng: 'Where do you live?', kash: 'تُہۍ کتِ چھِو روزان؟', roman: "toh' kati chiv ro:za:n?", phonetic: "toh kati chiv rozaan?" },
      { eng: 'I live in Srinagar.', kash: 'بہٕ چھُس روزان سرینگر۔', roman: "bi chus ro:za:n siri:nəgri.", phonetic: "bi chus rozaan Srinagar." },
      { eng: 'What is your name?', kash: 'تُہُند ناو کیا چھُ؟', roman: "tuhund na:v k'a: chu?", phonetic: "tuhund naav kya chu?" },
      { eng: 'My name is Ali.', kash: 'میون ناو چھُ علی۔', roman: "m'o:n na:v chu Ali.", phonetic: "myon naav chu Ali." },
      { eng: 'Nice to meet you.', kash: 'تُہۍ سٲتۍ مِلِتھ گٔیِ خوشی۔', roman: "toh' sə:t' milith gəyi khuši.", phonetic: "toh saet milith gayi khushi." },
      { eng: 'I do not understand.', kash: 'مےٚ چھُ نہٕ فِکرِ گژھان۔', roman: "me chu ni phikri gatsha:n.", phonetic: "me chu ni phikri gatshaan." },
      { eng: 'Please say it again.', kash: 'مہرربٲنی کرِتھ دُبارٕ ونِو۔', roman: "meharbə:ni kərith duba:ri vaniv.", phonetic: "meharbaani karith dubaara vaniv." },
      { eng: 'I speak a little Kashmiri.', kash: 'بہٕ چھُس رَچھہٕ کٲشُر بولان۔', roman: "bi chus rachi kə:šur bola:n.", phonetic: "bi chus racha kaeshur bolaan." },
      { eng: 'What does this mean?', kash: 'امیک مطلب کیا گو؟', roman: "amik matlab k'a: gav?", phonetic: "amik matlab kya gav?" },
      { eng: 'I am learning Kashmiri.', kash: 'بہٕ چھُس کٲشُر ہیچھان۔', roman: "bi chus kə:šur hecha:n.", phonetic: "bi chus kaeshur hechhaan." },
      { eng: 'Where are you from?', kash: 'تُہۍ کتِ پیٹھہٕ چھِو؟', roman: "toh' kati pethi chiv?", phonetic: "toh kati peth chiv?" },
      { eng: 'I am from Delhi.', kash: 'بہٕ چھُس دِلی پیٹھہٕ۔', roman: "bi chus dili pethi.", phonetic: "bi chus Dilli peth." },
      { eng: 'See you later.', kash: 'پتہٕ مِلو۔', roman: "pati milav.", phonetic: "pata milav." },
      { eng: 'Thank you.', kash: 'شُکریہ۔', roman: "šukriya.", phonetic: "shukriya." },
      { eng: 'Excuse me.', kash: 'معاف کرِو۔', roman: "ma:ph kəriv.", phonetic: "maaph kariv." },
      { eng: 'Yes, please.', kash: 'آ، مہرربٲنی۔', roman: "a:, meharbə:ni.", phonetic: "aa, meharbaani." },
      { eng: 'No, thank you.', kash: 'نہ، شُکریہ۔', roman: "na, šukriya.", phonetic: "na, shukriya." },
      { eng: 'Good morning.', kash: 'سلام / نمسکار۔', roman: "sala:m / namaska:r.", phonetic: "salaam / namaskaar." },
      { eng: 'Good night.', kash: 'شَب بخیر۔', roman: "šab bakhayr.", phonetic: "shab bakhayr." },
      { eng: 'Are you a student?', kash: 'تُہۍ چھِوا طالب علم؟', roman: "toh' chiva: ta:lib-e-ilm?", phonetic: "toh chiva taalib-e-ilm?" },
      { eng: 'I am a teacher.', kash: 'بہٕ چھُس اُستاد۔', roman: "bi chus usta:d.", phonetic: "bi chus ustaad." },
      { eng: 'Is this yours?', kash: 'یہِ چھا تُہُند؟', roman: "yi cha: tuhund?", phonetic: "yi chaa tuhund?" },
      { eng: 'This is mine.', kash: 'یہِ چھُ میون۔', roman: "yi chu m'o:n.", phonetic: "yi chu myon." },
      { eng: 'I don\'t know.', kash: 'مےٚ چھُ نہٕ پتہ۔', roman: "me chu ni pata:.", phonetic: "me chu ni pata." },
      { eng: 'Can you help me?', kash: 'تُہۍ ہیکِوا مےٚ مدد کٔرِتھ؟', roman: "toh' hekiva: me madad kərith?", phonetic: "toh hekiva me madad karith?" },
      { eng: 'What do you do?', kash: 'تُہۍ کیا چھِو کران؟', roman: "toh' k'a: chiv kara:n?", phonetic: "toh kya chiv karaan?" },
      { eng: 'I am happy.', kash: 'بہٕ چھُس خوش۔', roman: "bi chus khuš.", phonetic: "bi chus khush." },
      { eng: 'I am sad.', kash: 'بہٕ چھُس غمگین۔', roman: "bi chus gamgi:n.", phonetic: "bi chus gamgeen." },
      { eng: 'Let us go.', kash: 'پکِو گژھو۔', roman: "pakiv gatshav.", phonetic: "pakiv gatshav." },
      { eng: 'Wait here.', kash: 'یتی رُکِو۔', roman: "yeti rukiv.", phonetic: "yeti rukiv." },
      { eng: 'Come with me.', kash: 'مےٚ سٲتۍ ییِو۔', roman: "me sə:t' yiyiv.", phonetic: "me saet yiyiv." },
    ],
    'Shopping & Market': [
      { eng: 'What do you want?', kash: 'توہیہِ کیا گژھِ؟', roman: "tohi k'a: gatshi?", phonetic: "tohi kya gatshi?" },
      { eng: 'Give me money.', kash: 'مےٚ دِیِو پونسی۔', roman: 'me diyiv pɔ:si.', phonetic: "me diyiv ponsi." },
      { eng: 'How much is this?', kash: 'یہِ کوتہُ چھُ؟', roman: "yi ko:tah chu?", phonetic: "yi kota chu?" },
      { eng: 'I will buy some things.', kash: 'بہٕ ہیمٕہ کہِ سامان۔', roman: 'bi hemi kẽh sa:ma:n.', phonetic: "bi hema keh saamaan." },
      { eng: 'Do you have rice?', kash: 'توہیہِ چھِوا تومُل؟', roman: "tohi chiva: tomul?", phonetic: "tohi chiva tomul?" },
      { eng: 'I want 1kg of apples.', kash: 'مےٚ گژھِ اکھ کلو ژوٗنٹھ۔', roman: 'me gatshi akh kilo tsu:th.', phonetic: "me gatshi akh kilo tsoonth." },
      { eng: 'This is too expensive.', kash: 'یہِ چھُ سٹھا ڈرۆگ۔', roman: 'yi chu s\'atha: drog.', phonetic: "yi chu satha drog." },
      { eng: 'Do you have change?', kash: 'توہیہِ چھِوا ریزگی؟', roman: "tohi chiva: re:zgi?", phonetic: "tohi chiva rezgi?" },
      { eng: 'The shop is closed.', kash: 'دکان چھُ بند۔', roman: 'duka:n chu band.', phonetic: "dukaan chu band." },
      { eng: 'Please show me that.', kash: 'مےٚ ہأوِیو ہہ۔', roman: 'me hə:viv hu.', phonetic: "me haaviv hu." },
      { eng: 'I need medicine.', kash: 'مےٚ گژھِ دوا۔', roman: 'me gatshi dava:.', phonetic: "me gatshi dava." },
      { eng: 'Where is the bakery?', kash: 'کانٔدر دکان کتِ چھُ؟', roman: 'kāndur duka:n kati chu?', phonetic: "kaandar dukaan kati chu?" },
      { eng: 'Give me a discount.', kash: 'کم کرِو۔', roman: 'kam kəriv.', phonetic: "kam kariv." },
      { eng: 'I will come again.', kash: 'بہٕ یِمہٕ بییہِ۔', roman: 'bi yimi beyi.', phonetic: "bi yima beyi." },
      { eng: 'Do you sell shawls?', kash: 'تُہۍ چھِوا شال کِنان؟', roman: "toh' chiva: ša:l kina:n?", phonetic: "toh chiva shaal kinaan?" },
      { eng: 'I want a red shirt.', kash: 'مےٚ گژھِ وُزِج قمیض۔', roman: "me gatshi vozij kəmi:z.", phonetic: "me gatshi vozij kameez." },
      { eng: 'Is this fresh?', kash: 'یہِ چھا تازہ؟', roman: "yi cha: ta:zi?", phonetic: "yi chaa taaza?" },
      { eng: 'I don\'t want this.', kash: 'مےٚ گژھِ نہٕ یہِ۔', roman: "me gatshi ni yi.", phonetic: "me gatshi ni yi." },
      { eng: 'Do you have a bag?', kash: 'تُہِہ نِش چھا تھیلہِ؟', roman: "tohi niš cha: the:li?", phonetic: "tohi nish chaa thela?" },
      { eng: 'I will pay by cash.', kash: 'بہٕ دِمہٕ نقد۔', roman: "bi dimi nakad.", phonetic: "bi dima nakad." },
      { eng: 'Can I try this on?', kash: 'بہٕ ہیکہٕ چھا یہِ لاگِتھ وُچھِتھ؟', roman: "bi heki cha: yi la:gith vuchith?", phonetic: "bi heka chaa yi laagith vuchith?" },
      { eng: 'It fits well.', kash: 'یہِ چھُ برابر۔', roman: "yi chu bara:bar.", phonetic: "yi chu baraabar." },
      { eng: 'It is too big.', kash: 'یہِ چھُ سٹھا بۆڈ۔', roman: "yi chu s'atha: bod.", phonetic: "yi chu satha bod." },
      { eng: 'It is too small.', kash: 'یہِ چھُ سٹھا لۆکٹ۔', roman: "yi chu s'atha: lokut.", phonetic: "yi chu satha lokut." },
      { eng: 'Where can I buy milk?', kash: 'دود کتِ میلہِ؟', roman: "dod kati me:li?", phonetic: "dod kati meli?" },
      { eng: 'I need 2 kilos of sugar.', kash: 'مےٚ گژھِ زٕ کلو مَدریر۔', roman: "me gatshi zi kilo mədre:r.", phonetic: "me gatshi zi kilo madreer." },
      { eng: 'Do you have walnuts?', kash: 'توہیہِ چھِوا دوٗن؟', roman: "tohi chiva: du:n?", phonetic: "tohi chiva doon?" },
      { eng: 'What is the price of almonds?', kash: 'بادامن کیا چھُ مول؟', roman: "ba:da:man k'a: chu mol?", phonetic: "baadaaman kya chu mol?" },
      { eng: 'This is very good quality.', kash: 'یہِ چھُ سٹھا اصل۔', roman: "yi chu s'atha: asal.", phonetic: "yi chu satha asal." },
      { eng: 'I am just looking.', kash: 'بہٕ چھُس صرف وُچھان۔', roman: "bi chus siriph vucha:n.", phonetic: "bi chus siriph vuchhaan." },
      { eng: 'Do you have a receipt?', kash: 'توہیہِ چھِوا رسید؟', roman: "tohi chiva: rasi:d?", phonetic: "tohi chiva raseed?" },
      { eng: 'I will take this one.', kash: 'بہٕ ہیمٕہ یہِ۔', roman: "bi hemi yi.", phonetic: "bi hema yi." },
      { eng: 'Is there a cheaper one?', kash: 'اَمہِ کھوتہٕ سستہٕ چھا کہِ؟', roman: "ami khoti sasti cha: kēh?", phonetic: "ami khoti sasta cha keh?" },
      { eng: 'What time do you close?', kash: 'تُہۍ کر چھِو بند کران؟', roman: "toh' kar chiv band kara:n?", phonetic: "toh kar chiv band karaan?" },
      { eng: 'I want a refund.', kash: 'مےٚ گژھن پونسی واپس۔', roman: "me gatshan pɔ:si va:pas.", phonetic: "me gatshan ponsi vaapas." },
      { eng: 'Show me another colour.', kash: 'مےٚ ہأوِیو بییاکھ رنگ۔', roman: "me hə:viv beya:kh rang.", phonetic: "me haaviv beyaakh rang." },
      { eng: 'This is broken.', kash: 'یہِ چھُ پھُٹمُت۔', roman: "yi chu phutmut.", phonetic: "yi chu phutmut." },
    ],
    'Family & Relationships': [
      { eng: 'This is my father.', kash: 'یہِ چھُ میون مول۔', roman: "yi chu m'o:n mo:l.", phonetic: "yi chu myon mol." },
      { eng: 'This is my mother.', kash: 'یہِ چھِ میٲنۍ موج۔', roman: "yi cha me:n' mə:j.", phonetic: "yi cha myaen moj." },
      { eng: 'He is my brother.', kash: 'سُہ چھُ میون بوے۔', roman: "su chu m'o:n bo:y.", phonetic: "su chu myon boy." },
      { eng: 'She is my sister.', kash: 'سۄ چھِ میٲنۍ بینہِ۔', roman: "so cha me:n' beni.", phonetic: "so cha myaen beni." },
      { eng: 'I have two sons.', kash: 'مےٚ چھِ زٕ نیچِوۍ۔', roman: "me chi zi neciv'.", phonetic: "me chi zi nechiv." },
      { eng: 'She is my wife.', kash: 'سۄ چھِ میٲنۍ زنان۔', roman: "so cha me:n' zana:n.", phonetic: "so cha myaen zanaan." },
      { eng: 'This is my friend.', kash: 'یہِ چھُ میون دوست۔', roman: "yi chu m'o:n do:s.", phonetic: "yi chu myon dost." },
      { eng: 'Are you married?', kash: 'تُہۍ چھِوا خاندار کٔرِتھ؟', roman: "toh' chiva: khāndar kərith?", phonetic: "toh chiva khaandaar karith?" },
      { eng: 'How is your family?', kash: 'گھرِ چھِا وارے؟', roman: "gari cha: va:ray?", phonetic: "gari chaa vaaray?" },
      { eng: 'He is my uncle.', kash: 'سُہ چھُ میون پیٹٕر۔', roman: "su chu m'o:n petir.", phonetic: "su chu myon petar." },
      { eng: 'We are happy.', kash: 'أسۍ چھِ خوش۔', roman: "əs' chi khuš.", phonetic: "aes chi khush." },
      { eng: 'They are my relatives.', kash: 'تِم چھِ میأنی رِشتہ دار۔', roman: "tim chi me:n' rištida:r.", phonetic: "tim chi myaeni rishtidaar." },
      { eng: 'My grandfather is old.', kash: 'میون بڈِ بب چھُ بڈِ۔', roman: "m'o:n badibab chu budi.", phonetic: "myon badi-bab chu budi." },
      { eng: 'She is my aunt (paternal).', kash: 'سۄ چھِ میٲنۍ پۆپھ۔', roman: "so cha me:n' poph.", phonetic: "so cha myaen poph." },
      { eng: 'He is my maternal uncle.', kash: 'سُہ چھُ میون مام۔', roman: "su chu m'o:n ma:m.", phonetic: "su chu myon maam." },
      { eng: 'My daughter is at school.', kash: 'میٲنۍ کور چھِ سکولس منز۔', roman: "me:n' ku:r cha sku:las manz.", phonetic: "myaen koor cha skoolas manz." },
      { eng: 'I live with my parents.', kash: 'بہٕ چھُس مولِ موجِ سٲتۍ روزان۔', roman: "bi chus moli-maji sə:t' ro:za:n.", phonetic: "bi chus moli-maji saet rozaan." },
      { eng: 'What is your father\'s name?', kash: 'تُہنٛدِس مول سٔنٛد ناو کیا چھُ؟', roman: "tuhundis mol sund na:v k'a: chu?", phonetic: "tuhundis mol sund naav kya chu?" },
      { eng: 'We are a big family.', kash: 'أسۍ چھِ بۆڈ خاندان۔', roman: "əs' chi bod kha:nda:n.", phonetic: "aes chi bod khaandaan." },
      { eng: 'Do you have siblings?', kash: 'توہیہِ چھِوا بٲے یا بینہِ؟', roman: "tohi chiva: bə:y ya: beni?", phonetic: "tohi chiva baey ya beni?" },
      { eng: 'My sister is a doctor.', kash: 'میٲنۍ بینہِ چھِ ڈاکٹر۔', roman: "me:n' beni cha da:ktar.", phonetic: "myaen beni cha daaktar." },
      { eng: 'His son is very naughty.', kash: 'تُمُسُند نیچُو چھُ شرارتی۔', roman: "təmsund necuv chu šara:rti.", phonetic: "tamsund nechu chu sharaarti." },
      { eng: 'Grandmother tells stories.', kash: 'نانِ چھِ کتھہٕ ونان۔', roman: "na:ni cha kathi vana:n.", phonetic: "naani cha katha vanaan." },
      { eng: 'They are our guests.', kash: 'تِم چھِ سأنی پۆتُش۔', roman: "tim chi sə:n' potsh.", phonetic: "tim chi saeni potsh." },
      { eng: 'Is he your cousin?', kash: 'سُہ چھا تُہُند پِتُر بوے۔؟', roman: "su cha: tuhund pitur bo:y?", phonetic: "su chaa tuhund pitur boy?" },
      { eng: 'We love our children.', kash: 'اسہِ چھُ بَچن سٲتۍ محبت۔', roman: "asi chu bacan sə:t' mohabat.", phonetic: "asi chu bachan saet mohabbat." },
      { eng: 'She is my niece.', kash: 'سۄ چھِ میٲنۍ باوِز۔', roman: "so cha me:n' ba:viz.", phonetic: "so cha myaen baaviz." },
      { eng: 'He is my nephew.', kash: 'سُہ چھُ میون بابُتھُر۔', roman: "su chu m'o:n ba:bthur.", phonetic: "su chu myon baabthur." },
      { eng: 'Family is important.', kash: 'خاندان چھُ ضروری۔', roman: "kha:nda:n chu zaru:ri.", phonetic: "khaandaan chu zaroori." },
      { eng: 'I miss my home.', kash: 'مےٚ چھِ گھرِچ یاد یِوان۔', roman: "me cha garic ya:d yiva:n.", phonetic: "me cha garich yaad yivaan." },
      { eng: 'He is my step-brother.', kash: 'سُہ چھُ میون وورِ بوے۔', roman: "su chu m'o:n vo:ri bo:y.", phonetic: "su chu myon vori boy." },
      { eng: 'She is my step-mother.', kash: 'سۄ چھِ میٲنۍ وورِ موج۔', roman: "so cha me:n' vo:ri mə:j.", phonetic: "so cha myaen vori moj." },
      { eng: 'My friend is getting married.', kash: 'میون دوست چھُ خاندار کران۔', roman: "m'o:n do:s chu khāndar kara:n.", phonetic: "myon dost chu khaandaar karaan." },
      { eng: 'I have a twin brother.', kash: 'مےٚ چھُ جُڑِ بوے۔', roman: "me chu juḍi bo:y.", phonetic: "me chu judi boy." },
      { eng: 'They live in the village.', kash: 'تِم چھِ گامس منز روزان۔', roman: "tim chi ga:mas manz ro:za:n.", phonetic: "tim chi gaamas manz rozaan." },
    ],
    'Daily Routine & Time': [
      { eng: 'I get up early.', kash: 'بہٕ چھُس سُلی وۆتھان۔', roman: 'bi chus suli votha:n.', phonetic: "bi chus suli vothaan." },
      { eng: 'I eat food.', kash: 'بہٕ چھُس بتہٕ کھیوان۔', roman: 'bi chus bati kheva:n.', phonetic: "bi chus bati khevaan." },
      { eng: 'I drink tea.', kash: 'بہٕ چھُس چائے چوان۔', roman: 'bi chus ca:y cava:n.', phonetic: "bi chus chaay chavaan." },
      { eng: 'I go to school.', kash: 'بہٕ چھُس سکول گژھان۔', roman: 'bi chus sku:l gatsha:n.', phonetic: "bi chus skool gatshaan." },
      { eng: 'What time is it?', kash: 'وقت کیا گو؟', roman: 'vakhit k\'a: gav?', phonetic: "waqt kya gav?" },
      { eng: 'It is 9 o\'clock.', kash: 'نو بجے۔', roman: 'nav baje.', phonetic: "nav bajay." },
      { eng: 'I will sleep now.', kash: 'بہٕ شونگہٕ وُنِ۔', roman: 'bi šõgi vuni.', phonetic: "bi shonga vuni." },
      { eng: 'I work in an office.', kash: 'بہٕ چھُس دفترس منز کام کران۔', roman: 'bi chus daphtaras manz kə:m kara:n.', phonetic: "bi chus daphtaras manz kaam karaan." },
      { eng: 'Today is a holiday.', kash: 'از چھِ چھُٹی۔', roman: 'az cha chuti:.', phonetic: "az cha chuti." },
      { eng: 'I am tired.', kash: 'بہٕ چھُس تھۆکمُت۔', roman: 'bi chus thokmut.', phonetic: "bi chus thokmut." },
      { eng: 'It is getting late.', kash: 'دیر چھُ گژھان۔', roman: 'de:r chu gatsha:n.', phonetic: "der chu gatshaan." },
      { eng: 'I woke up late.', kash: 'بہٕ وۆتھُس دیرِ۔', roman: 'bi vothus de:ri.', phonetic: "bi vothus deri." },
      { eng: 'I take a bath daily.', kash: 'بہٕ چھُس دُہہَے شران کران۔', roman: 'bi chus dohay šra:n kara:n.', phonetic: "bi chus dohay shraan karaan." },
      { eng: 'I pray.', kash: 'بہٕ چھُس عبادت کران۔', roman: 'bi chus iba:dath kara:n.', phonetic: "bi chus ibaadat karaan." },
      { eng: 'We eat dinner at 8.', kash: 'أسۍ چھِ شامُک بتہٕ أٹھِ بجےٕ کھیوان۔', roman: "əs' chi ša:muk bati ə:thi baji kheva:n.", phonetic: "aes chi shaamuk bati aethi bajay khevaan." },
      { eng: 'I watch TV in the evening.', kash: 'بہٕ چھُس شامس ٹی وی وُچھان۔', roman: 'bi chus ša:mas TV vucha:n.', phonetic: "bi chus shaamas TV vuchhaan." },
      { eng: 'He goes to bed at 10.', kash: 'سُہ چھُ دٔہِ بجےٕ شونگان۔', roman: "su chu dəhi baji šõga:n.", phonetic: "su chu dahi bajay shongaan." },
      { eng: 'I have breakfast.', kash: 'بہٕ چھُس ناشتہٕ کران۔', roman: 'bi chus na:shti kara:n.', phonetic: "bi chus naashta karaan." },
      { eng: 'I will go tomorrow.', kash: 'بہٕ گژھہٕ پگاہ۔', roman: 'bi gatshi paga:h.', phonetic: "bi gatsha pagaah." },
      { eng: 'Yesterday was Sunday.', kash: 'راتھ اوس آتھوار۔', roman: 'ra:th o:s a:thva:r.', phonetic: "raath os aathvaar." },
      { eng: 'Today is Monday.', kash: 'از چھُ ژندرار۔', roman: 'az chu tsandrava:r.', phonetic: "az chu tsandravaar." },
      { eng: 'I am busy now.', kash: 'بہٕ چھُس وُنِ مصروف۔', roman: 'bi chus vuni masru:ph.', phonetic: "bi chus vuni masroof." },
      { eng: 'Wait a minute.', kash: 'اکھ منٹ رُکِو۔', roman: 'akh minat rukiv.', phonetic: "akh minat rukiv." },
      { eng: 'I am cleaning the room.', kash: 'بہٕ چھُس کمرہ صاف کران۔', roman: 'bi chus kamri sa:ph kara:n.', phonetic: "bi chus kamra saaph karaan." },
      { eng: 'She is cooking.', kash: 'سۄ چھِ رنَان۔', roman: "so cha rana:n.", phonetic: "so cha ranaan." },
      { eng: 'He is reading a newspaper.', kash: 'سُہ چھُ اخبار پران۔', roman: "su chu akhba:r para:n.", phonetic: "su chu akhbaar paraan." },
      { eng: 'I brush my teeth.', kash: 'بہٕ چھُس دندن برش کران۔', roman: 'bi chus dandan braš kara:n.', phonetic: "bi chus dandan brush karaan." },
      { eng: 'I get ready.', kash: 'بہٕ چھُس تیار گژھان۔', roman: 'bi chus taya:r gatsha:n.', phonetic: "bi chus teyaar gatshaan." },
      { eng: 'It is lunch time.', kash: 'دوپہُرس ہُند وقت گو۔', roman: 'dopaharas hund vakhit gav.', phonetic: "dopaharas hund waqt gav." },
      { eng: 'I will meet you at 5.', kash: 'بہٕ مِلہٕ توہہِ پانچِ بجے۔', roman: 'bi mili tohi pã:tsi baji.', phonetic: "bi mila tohi paanchi bajay." },
      { eng: 'I wash my clothes.', kash: 'بہٕ چھُس پلو چھلان۔', roman: 'bi chus palav chala:n.', phonetic: "bi chus palav chalaan." },
      { eng: 'He works hard.', kash: 'سُہ چھُ محنت کران۔', roman: 'su chu mehnat kara:n.', phonetic: "su chu mehnat karaan." },
      { eng: 'We go for a walk.', kash: 'أسۍ چھِ سیر کرنی گژھان۔', roman: "əs' chi sə:r karni gatsha:n.", phonetic: "aes chi ser karni gatshaan." },
      { eng: 'She sings well.', kash: 'سۄ چھِ اصل گیوان۔', roman: 'so cha asal geva:n.', phonetic: "so cha asal gevaan." },
      { eng: 'They play football.', kash: 'تِم چھِ فٹ بال گِندان۔', roman: 'tim chi futba:l ginda:n.', phonetic: "tim chi football gindaan." },
    ],
    'Health & Imperatives': [
      { eng: 'I am sick.', kash: 'بہٕ چھُس بیمار۔', roman: 'bi chus bema:r.', phonetic: "bi chus bemaar." },
      { eng: 'I have a headache.', kash: 'مےٚ چھُ کلس دود۔', roman: 'me chu kalas do:d.', phonetic: "me chu kalas dod." },
      { eng: 'Call the doctor.', kash: 'ڈاکٹرس کرِو فون۔', roman: 'da:ktaras kəriv pho:n.', phonetic: "daaktaras kariv phone." },
      { eng: 'I have a fever.', kash: 'مےٚ چھُ تپھ۔', roman: 'me chu taph.', phonetic: "me chu taph." },
      { eng: 'Sit down.', kash: 'بہہِ بون۔', roman: 'behi bon.', phonetic: "behi bon." },
      { eng: 'Come here.', kash: 'یور وال۔', roman: 'yo:r va:l.', phonetic: "yor vaal." },
      { eng: 'Go there.', kash: 'تۆر گژھ۔', roman: 'tor gatsh.', phonetic: "tor gatsh." },
      { eng: 'Don\'t talk.', kash: 'کتھ مہٕ کر۔', roman: 'kath ma kar.', phonetic: "kath ma kar." },
      { eng: 'Eat your food.', kash: 'بتہٕ کھے۔', roman: 'bati khe.', phonetic: "bati khe." },
      { eng: 'Drink water.', kash: 'پونۍ چے۔', roman: 'po:n\' ce.', phonetic: "pony che." },
      { eng: 'I need rest.', kash: 'مےٚ گژھِ آرام۔', roman: 'me gatshi a:ra:m.', phonetic: "me gatshi aaraam." },
      { eng: 'Be careful.', kash: 'خبردار روز۔', roman: 'khabarda:r roz.', phonetic: "khabardaar roz." },
      { eng: 'Speak slowly.', kash: 'وارہِ وارہِ بول۔', roman: 'va:ri va:ri bol.', phonetic: "vaari vaari bol." },
      { eng: 'My stomach hurts.', kash: 'مےٚ چھُ یڈِ دود۔', roman: 'me chu yadi do:d.', phonetic: "me chu yadi dod." },
      { eng: 'I have a cold.', kash: 'مےٚ چھُ زُکام۔', roman: 'me chu zuka:m.', phonetic: "me chu zukaam." },
      { eng: 'Take this medicine.', kash: 'یہِ دوا کھےٚ۔', roman: 'yi dava: khe.', phonetic: "yi dava khe." },
      { eng: 'Are you feeling better?', kash: 'تُہۍ چھِوا وُنِ ٹھیک؟', roman: "toh' chiva: vuni thi:k?", phonetic: "toh chiva vuni theek?" },
      { eng: 'Go to the hospital.', kash: 'ہسپتال گژھ۔', roman: 'haspata:l gatsh.', phonetic: "haspataal gatsh." },
      { eng: 'Don\'t worry.', kash: 'فِکر مہٕ کر۔', roman: 'phikir ma kar.', phonetic: "phikir ma kar." },
      { eng: 'Open the door.', kash: 'دروازہ دِ۔', roman: 'darva:zi di.', phonetic: "darvaaza di." },
      { eng: 'Close the window.', kash: 'دٔر کر بند۔', roman: 'də:r kar band.', phonetic: "daer kar band." },
      { eng: 'Help me.', kash: 'مےٚ کر مدد۔', roman: 'me kar madad.', phonetic: "me kar madad." },
      { eng: 'Don\'t go outside.', kash: 'نیبرِ مہٕ گژھ۔', roman: 'nebri ma gatsh.', phonetic: "nebri ma gatsh." },
      { eng: 'Wash your face.', kash: 'بُتھ چھل۔', roman: 'buth chal.', phonetic: "buth chal." },
      { eng: 'Stand up.', kash: 'وۆتھ تھۆد۔', roman: 'voth thod.', phonetic: "voth thod." },
      { eng: 'Give me water.', kash: 'مےٚ دِ پونۍ۔', roman: 'me di po:n\'.', phonetic: "me di pony." },
      { eng: 'I am tired.', kash: 'بہٕ چھُس تھۆکمُت۔', roman: 'bi chus thokmut.', phonetic: "bi chus thokmut." },
      { eng: 'My leg hurts.', kash: 'میٲنۍ زنگ چھِ دُکھان۔', roman: "me:n' zang cha dukha:n.", phonetic: "myaen zang cha dukhaan." },
      { eng: 'I need a doctor.', kash: 'مےٚ چھُ ڈاکٹرس ضرورت۔', roman: 'me chu da:ktaras zaru:rath.', phonetic: "me chu daaktaras zaroorat." },
      { eng: 'Get well soon.', kash: 'جلدی گژھ ٹھیک۔', roman: 'jaldi gatsh thi:k.', phonetic: "jaldi gatsh theek." },
      { eng: 'My throat is sore.', kash: 'میون ہوٹ چھُ دُکھان۔', roman: "m'o:n hot chu dukha:n.", phonetic: "myon hot chu dukhaan." },
      { eng: 'He has a cough.', kash: 'تَمس چھِ ژاس۔', roman: 'təmis cha tsa:s.', phonetic: "tamis cha tsaas." },
      { eng: 'Bring the medicine.', kash: 'دوا ان۔', roman: 'dava: an.', phonetic: "dava an." },
      { eng: 'Do not smoke.', kash: 'تمہ تمباکھ مہٕ چے۔', roman: 'tama:kh ma ce.', phonetic: "tamaakh ma che." },
      { eng: 'Clean your hands.', kash: 'اتھہٕ کر صاف۔', roman: 'athi kar sa:ph.', phonetic: "atha kar saaph." },
      { eng: 'I am feeling dizzy.', kash: 'مےٚ چھُ چکر یِوان۔', roman: 'me chu cakar yiva:n.', phonetic: "me chu chakar yivaan." },
      { eng: 'My back hurts.', kash: 'میٲنۍ شانہٕ چھِ دُکھان۔', roman: "me:n' ša:ni cha dukha:n.", phonetic: "myaen shaana cha dukhaan." },
    ],
    'Travel & City': [
      { eng: 'Where are you going?', kash: 'تُہۍ کوت چھِو گژھان؟', roman: "toh' kot chiv gatsha:n?", phonetic: "toh kot chiv gatshaan?" },
      { eng: 'I am going to Srinagar.', kash: 'بہٕ چھُس سرینگر گژھان۔', roman: 'bi chus siri:nəgir gatsha:n.', phonetic: "bi chus Srinagar gatshaan." },
      { eng: 'Is it far?', kash: 'یہِ چھا دوٗر؟', roman: 'yi cha: du:r?', phonetic: "yi chaa door?" },
      { eng: 'How will we go?', kash: 'أسۍ کِتھٕ کٔنۍ گژھو؟', roman: "əs' kithi kən' gatshav?", phonetic: "aes kithikan gatshav?" },
      { eng: 'We will go by bus.', kash: 'أسۍ گژھو بسِ منز۔', roman: "əs' gatshav basi manz.", phonetic: "aes gatshav basi manz." },
      { eng: 'Stop the car.', kash: 'گاڑی رُکأوِیو۔', roman: 'ga:di rukə:viv.', phonetic: "gaadi rukaaviv." },
      { eng: 'The road is bad.', kash: 'سڑک چھِ خراب۔', roman: 'sadak cha khara:b.', phonetic: "sadak cha kharaab." },
      { eng: 'Beautiful mountains.', kash: 'خوبصورت پہاڑ۔', roman: 'khu:bsu:rath paha:d.', phonetic: "khoobsoorat pahaad." },
      { eng: 'I want to see Dal Lake.', kash: 'مےٚ چھُ ڈل وُچھُن۔', roman: 'me chu ḍal vuchun.', phonetic: "me chu Dal vuchhun." },
      { eng: 'Where is the hotel?', kash: 'ہوٹل کتِ چھُ؟', roman: 'ho:tal kati chu?', phonetic: "hotel kati chu?" },
      { eng: 'How is the weather?', kash: 'موسم کیا چھُ؟', roman: 'mausam k\'a: chu?', phonetic: "mausam kya chu?" },
      { eng: 'It is raining.', kash: 'رُود چھُ پیوان۔', roman: 'ru:d chu peva:n.', phonetic: "rood chu pevaan." },
      { eng: 'It is snowing.', kash: 'شین چھُ پیوان۔', roman: 'ši:n chu peva:n.', phonetic: "sheen chu pevaan." },
      { eng: 'I want a ticket.', kash: 'مےٚ گژھِ ٹکٹ۔', roman: 'me gatshi tikat.', phonetic: "me gatshi tikat." },
      { eng: 'When does the bus leave?', kash: 'بس کر چھِ نیران؟', roman: 'bas kar cha ne:ra:n?', phonetic: "bas kar cha neeraan?" },
      { eng: 'I am lost.', kash: 'بہٕ چھُس راومُت۔', roman: 'bi chus ra:vmut.', phonetic: "bi chus raavmut." },
      { eng: 'Show me the way.', kash: 'مےٚ ہاوِیو وتھ۔', roman: 'me ha:viv vath.', phonetic: "me haaviv vath." },
      { eng: 'Is there a restaurant nearby?', kash: 'یتی چھا ہوٹل؟', roman: 'yeti cha: ho:tal?', phonetic: "yeti chaa hotel?" },
      { eng: 'I want to go to Gulmarg.', kash: 'مےٚ چھُ گُل‌مرگ گژھُن۔', roman: 'me chu gulmarg gatshun.', phonetic: "me chu Gulmarg gatshun." },
      { eng: 'The view is amazing.', kash: 'نظارٕ چھُ زبردست۔', roman: 'naza:ri chu zabardast.', phonetic: "nazaara chu zabardast." },
      { eng: 'Take a photo.', kash: 'فوٹو تُلِو۔', roman: 'pho:to tuliv.', phonetic: "photo tuliv." },
      { eng: 'I like Kashmir.', kash: 'مےٚ چھِ کشمیر خوش یِوان۔', roman: 'me cha kəši:r khuš yiva:n.', phonetic: "me cha Kashmir khush yivaan." },
      { eng: 'Where is the airport?', kash: 'ہوائی اڈہ کتِ چھُ؟', roman: 'hava:i aḍi kati chu?', phonetic: "havaai adda kati chu?" },
      { eng: 'How much is the fare?', kash: 'کرایہِ کوتہٕ چھُ؟', roman: 'kira:yi ko:tah chu?', phonetic: "kiraayi kota chu?" },
      { eng: 'Drive slowly.', kash: 'گاڑی چلاوِیو وارہِ۔', roman: 'ga:di calə:viv va:ri.', phonetic: "gaadi chalaaviv vaari." },
      { eng: 'Turn left.', kash: 'کھووُرِ گژھِو۔', roman: 'kho:vuri gatshiv.', phonetic: "khovur gatshiv." },
      { eng: 'Turn right.', kash: 'دچھِنِ گژھِو۔', roman: 'dachini gatshiv.', phonetic: "dachhin gatshiv." },
      { eng: 'This place is crowded.', kash: 'یتِ چھِ سٹھا بھیڑ۔', roman: 'yeti cha s\'atha: bhi:d.', phonetic: "yeti cha satha bheed." },
      { eng: 'I want to buy souvenirs.', kash: 'مےٚ چھِ نشانی ہِنۍ۔', roman: 'me cha niša:ni hen\'.', phonetic: "me cha nishaani hiny." },
      { eng: 'Is it safe here?', kash: 'یتِ چھا ٹھیک؟', roman: 'yeti cha: thi:k?', phonetic: "yeti chaa theek?" },
      { eng: 'The train is late.', kash: 'ریل چھِ لیٹ۔', roman: 're:l cha le:t.', phonetic: "rail cha late." },
      { eng: 'I want to hire a taxi.', kash: 'مےٚ چھِ ٹیکسی کرٕنی۔', roman: 'me cha ṭe:ksi karni.', phonetic: "me cha taxi karni." },
      { eng: 'Where is the police station?', kash: 'تھانہٕ کتِ چھُ؟', roman: 'tha:ni kati chu?', phonetic: "thaana kati chu?" },
      { eng: 'Can we walk there?', kash: 'أسۍ ہیکو پادل گژھِتھ؟', roman: "əs' hekav pa:dal gatshith?", phonetic: "aes hekav paadal gatshith?" },
      { eng: 'This is a beautiful village.', kash: 'یہِ چھُ خوبصورت گام۔', roman: 'yi chu khu:bsu:rath ga:m.', phonetic: "yi chu khoobsoorat gaam." },
    ]
  }
};

const CATEGORY_ICONS = {
  'Introduction & Basics': MessageCircle,
  'Shopping & Market': ShoppingCart,
  'Family & Relationships': Users,
  'Daily Routine & Time': Sun,
  'Health & Imperatives': Activity,
  'Travel & City': MapPin,
};

// --- 3. COMPONENTS ---

// Voice Settings Modal
const VoiceSettings = ({ onClose, onSave }) => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(0.85);
  const [pitch, setPitch] = useState(1.0);

  useEffect(() => {
    const loadVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const v = window.speechSynthesis.getVoices();
        setVoices(v);
        const hindiVoice = v.find(voice => voice.lang.includes('hi'));
        if (hindiVoice && !selectedVoice) setSelectedVoice(hindiVoice.name);
      }
    };
    
    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
       window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const handleSave = () => {
    onSave({ voiceName: selectedVoice, rate, pitch });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl animate-in slide-in-from-bottom-10">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
          <Settings size={20} className="text-rose-600"/> Voice Settings
        </h3>
        
        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Voice Engine</label>
            <div className="relative">
              <select 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 appearance-none focus:ring-2 focus:ring-rose-500 outline-none"
                value={selectedVoice || ''}
                onChange={(e) => setSelectedVoice(e.target.value)}
              >
                <option value="">Default Browser Voice</option>
                {voices.map(v => (
                  <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-3.5 text-slate-400 rotate-90" size={16}/>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase flex justify-between mb-2">
              <span>Speaking Speed</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{rate}x</span>
            </label>
            <input 
              type="range" min="0.5" max="1.5" step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Slow</span>
              <span>Normal</span>
              <span>Fast</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase flex justify-between mb-2">
              <span>Pitch</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{pitch}</span>
            </label>
            <input 
              type="range" min="0.5" max="1.5" step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button onClick={onClose} className="flex-1 py-3 text-slate-500 font-medium hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
          <button onClick={handleSave} className="flex-1 py-3 bg-rose-600 text-white rounded-xl font-bold shadow-md shadow-rose-200 active:scale-95 transition-all">Save Settings</button>
        </div>
      </div>
    </div>
  );
};

// TTS Button with Config
const TTSButton = ({ text, settings, size = 22 }) => {
  const [playing, setPlaying] = useState(false);

  const speak = (e) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      const voices = window.speechSynthesis.getVoices();
      let voiceToUse = null;

      if (settings?.voiceName) {
        voiceToUse = voices.find(voice => voice.name === settings.voiceName);
      } 
      
      if (!voiceToUse) {
         voiceToUse = voices.find(v => v.name.includes('Google Hindi')) || 
                      voices.find(v => v.lang.includes('hi')) || 
                      voices.find(v => v.lang.includes('ur'));
      }

      if (voiceToUse) utterance.voice = voiceToUse;
      
      utterance.rate = settings?.rate || 0.85; 
      utterance.pitch = settings?.pitch || 1.0;
      utterance.volume = 1.0; 
      
      utterance.onstart = () => setPlaying(true);
      utterance.onend = () => setPlaying(false);
      utterance.onerror = () => setPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <button 
      onClick={speak}
      className={`p-2 rounded-full transition-all active:scale-95 ${playing ? 'text-rose-600 bg-rose-50 ring-2 ring-rose-100' : 'text-slate-400 hover:text-rose-600 hover:bg-slate-100'}`}
      title="Play Pronunciation"
    >
      {playing ? <PauseCircle size={size} /> : <Volume2 size={size} />}
    </button>
  );
};

// --- Components ---

const ScriptTab = ({ ttsSettings }) => {
  return (
    <div className="p-4 pb-32 space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-rose-600 to-rose-700 p-6 rounded-3xl shadow-lg text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <h2 className="text-2xl font-bold relative z-10">The Script</h2>
        <p className="text-rose-100 text-sm mt-1 opacity-90 relative z-10">
          Standard Perso-Arabic alphabet for Kashmiri. Tap to listen.
        </p>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
        {DATA.alphabet.map((item, idx) => (
          <div key={idx} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center active:scale-95 transition-transform duration-150 relative group cursor-pointer hover:border-rose-200 hover:shadow-md">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-0 opacity-100">
               <TTSButton text={item.sound} settings={ttsSettings} size={14} />
            </div>
            <span className="text-4xl font-serif text-slate-800 mb-2 font-bold h-12 flex items-center justify-center mt-2">{item.char}</span>
            <span className="text-[10px] uppercase font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full mb-1 tracking-wider">{item.roman}</span>
            <p className="text-[10px] text-slate-400 leading-tight mb-1">{item.sound}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const VocabTab = ({ ttsSettings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [displayCount, setDisplayCount] = useState(20);
  
  const categories = ['All', ...new Set(DATA.vocab.map(item => item.category))];

  const filteredVocab = useMemo(() => {
    return DATA.vocab.filter(item => {
      const matchesSearch = item.eng.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.roman.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.phonetic.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const displayedVocab = filteredVocab.slice(0, displayCount);

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="sticky top-0 bg-slate-50/95 backdrop-blur-md z-10 border-b border-slate-200 shadow-sm">
        <div className="p-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search vocabulary..." 
              className="w-full pl-10 pr-4 py-3 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-rose-500 transition-all outline-none text-slate-700 placeholder:text-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="px-4 pb-3 overflow-x-auto scrollbar-hide flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setDisplayCount(20); }}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                selectedCategory === cat 
                  ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 pb-32 space-y-3 overflow-y-auto">
        {displayedVocab.length > 0 ? (
          <>
            {displayedVocab.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center border-l-[6px] border-rose-500 animate-in slide-in-from-bottom-2 duration-300 hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{item.eng}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide bg-slate-100 px-2 py-0.5 rounded-md">{item.category}</span>
                </div>
                <div className="text-right flex flex-col items-end">
                  <div className="text-2xl font-serif text-slate-800 mb-1" dir="rtl">{item.kash}</div>
                  <div className="flex items-center gap-3 bg-slate-50 pl-3 pr-1 py-1 rounded-full border border-slate-100">
                    <div className="flex flex-col items-end mr-2">
                      <span className="font-mono text-xs text-slate-400">{item.roman}</span>
                      <span className="font-mono text-sm text-rose-600 font-bold">{item.phonetic}</span>
                    </div>
                    <TTSButton text={item.phonetic} settings={ttsSettings} size={16} />
                  </div>
                </div>
              </div>
            ))}
            {filteredVocab.length > displayCount && (
               <button 
                 onClick={() => setDisplayCount(prev => prev + 20)}
                 className="w-full py-3 bg-white text-slate-500 rounded-xl font-medium active:bg-slate-50 transition-colors border border-slate-200 shadow-sm mt-4"
               >
                 Load More Words
               </button>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-slate-400 flex flex-col items-center opacity-60">
            <BookOpen size={48} className="mb-4 opacity-20" />
            <p>No words found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const PhrasebookTab = ({ ttsSettings, onOpenSettings }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const categories = Object.keys(DATA.phrases);

  if (activeCategory) {
    const Icon = CATEGORY_ICONS[activeCategory] || MessageCircle;
    
    return (
      <div className="p-4 pb-32 min-h-screen bg-slate-50">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-slate-50 z-10 py-2">
          <button 
            onClick={() => setActiveCategory(null)}
            className="flex items-center text-slate-500 font-bold hover:text-rose-600 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200"
          >
            <ChevronRight className="rotate-180 mr-1" size={18} /> Back
          </button>
          <button onClick={onOpenSettings} className="p-2 bg-white text-rose-600 rounded-full shadow-sm border border-slate-200 active:scale-95 transition-transform"><Settings size={20} /></button>
        </div>

        <div className="flex items-center gap-4 mb-8 px-2">
          <div className="p-4 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-2xl shadow-lg shadow-rose-200">
            <Icon size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 leading-tight">{activeCategory}</h2>
        </div>

        <div className="space-y-4">
          {DATA.phrases[activeCategory].map((phrase, idx) => (
            <div key={idx} className="bg-white p-5 rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden transition-all hover:shadow-md group">
              <div className="absolute top-4 right-4">
                 <TTSButton text={phrase.phonetic} settings={ttsSettings} />
              </div>
              
              <h3 className="font-bold text-slate-800 text-lg pr-14 mb-4 leading-snug">{phrase.eng}</h3>
              
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 group-hover:bg-rose-50/30 group-hover:border-rose-100 transition-colors">
                <p className="text-2xl font-serif text-right text-rose-700 mb-3 leading-loose" dir="rtl">{phrase.kash}</p>
                
                <div className="flex flex-col gap-2 border-t border-slate-200 pt-3 mt-1">
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest w-16">Roman</span>
                      <p className="font-mono text-xs text-slate-500 text-right w-full">{phrase.roman}</p>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest w-16">Easy</span>
                      <p className="font-mono text-sm text-rose-600 font-bold bg-white px-2 py-1 rounded border border-slate-200 text-right w-full">{phrase.phonetic}</p>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-32 bg-slate-50 min-h-screen">
      <div className="mb-8 mt-2 flex justify-between items-end px-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Phrasebook</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">What would you like to learn today?</p>
        </div>
        <button onClick={onOpenSettings} className="p-2.5 bg-white text-slate-400 hover:text-rose-600 rounded-xl shadow-sm border border-slate-200"><Settings size={22} /></button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {categories.map((cat, idx) => {
          const Icon = CATEGORY_ICONS[cat] || MessageCircle;
          return (
            <button 
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 active:scale-[0.98] transition-all hover:shadow-lg hover:border-rose-100 group"
            >
              <div className="p-4 bg-slate-50 text-slate-600 rounded-2xl group-hover:bg-rose-50 group-hover:text-rose-600 transition-colors">
                <Icon size={28} />
              </div>
              <div className="flex-1 text-left py-2">
                <h3 className="font-bold text-slate-800 text-lg">{cat}</h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">{DATA.phrases[cat].length} phrases</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-rose-600 group-hover:text-white transition-all">
                 <ChevronRight size={20} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [activeTab, setActiveTab] = useState('phrases');
  const [showSettings, setShowSettings] = useState(false);
  const [ttsSettings, setTtsSettings] = useState({ rate: 0.85, pitch: 1.0, voiceName: null });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-slate-200 flex flex-col">
      
      {/* Top Bar */}
      <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-20 px-5 py-4 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
           <div className="w-9 h-9 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md shadow-rose-200">K</div>
           <div>
             <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-none">Koshur<span className="text-rose-600">Guide</span></h1>
             <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase mt-0.5">Learn Kashmiri</p>
           </div>
        </div>
        <button 
          onClick={() => setShowSettings(true)}
          className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-slate-50 rounded-xl transition-all"
        >
          <Activity size={22} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto scrollbar-hide bg-slate-50">
        {activeTab === 'script' && <ScriptTab ttsSettings={ttsSettings} />}
        {activeTab === 'vocab' && <VocabTab ttsSettings={ttsSettings} />}
        {activeTab === 'phrases' && 
          <PhrasebookTab 
            ttsSettings={ttsSettings} 
            onOpenSettings={() => setShowSettings(true)} 
          />
        }
      </main>

      {/* Modern Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white/90 backdrop-blur-lg border-t border-slate-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] z-30 pb-safe rounded-t-3xl">
        <div className="flex justify-around items-center px-6 py-3">
          <button 
            onClick={() => setActiveTab('phrases')}
            className={`flex flex-col items-center p-2 rounded-2xl transition-all duration-300 w-20 group ${activeTab === 'phrases' ? '-translate-y-1' : 'hover:bg-slate-50'}`}
          >
            <div className={`mb-1 p-1.5 rounded-xl transition-colors ${activeTab === 'phrases' ? 'bg-rose-100 text-rose-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
              <Home size={24} strokeWidth={activeTab === 'phrases' ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] font-bold transition-colors ${activeTab === 'phrases' ? 'text-rose-600' : 'text-slate-400'}`}>Home</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('script')}
            className={`flex flex-col items-center p-2 rounded-2xl transition-all duration-300 w-20 group ${activeTab === 'script' ? '-translate-y-1' : 'hover:bg-slate-50'}`}
          >
            <div className={`mb-1 p-1.5 rounded-xl transition-colors ${activeTab === 'script' ? 'bg-rose-100 text-rose-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
              <Book size={24} strokeWidth={activeTab === 'script' ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] font-bold transition-colors ${activeTab === 'script' ? 'text-rose-600' : 'text-slate-400'}`}>Script</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('vocab')}
            className={`flex flex-col items-center p-2 rounded-2xl transition-all duration-300 w-20 group ${activeTab === 'vocab' ? '-translate-y-1' : 'hover:bg-slate-50'}`}
          >
            <div className={`mb-1 p-1.5 rounded-xl transition-colors ${activeTab === 'vocab' ? 'bg-rose-100 text-rose-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
              <Layers size={24} strokeWidth={activeTab === 'vocab' ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] font-bold transition-colors ${activeTab === 'vocab' ? 'text-rose-600' : 'text-slate-400'}`}>Vocab</span>
          </button>
        </div>
      </nav>
      
      {/* Settings Modal */}
      {showSettings && (
        <VoiceSettings 
          onClose={() => setShowSettings(false)} 
          onSave={setTtsSettings} 
        />
      )}

      {/* Mobile Safe Area Spacer */}
      <div className="h-6 bg-white w-full fixed bottom-0 z-40 md:hidden"></div>
    </div>
  );
};

export default App;
