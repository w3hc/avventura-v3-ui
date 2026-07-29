/**
 * Translation system for the application
 * Contains all text strings organized by language
 */

import { Language } from '@/utils/i18n'

// Define the structure of our translations
type TranslationKeys = {
  common: {
    login: string
    logout: string
    register: string
    pleaseLogin: string
  }
  home: {
    title: string
    subtitle: string
    greeting: string
    greetingSubtitle: string
  }
  navigation: { settings: string }
  settings: {
    title: string
    loginRequired: string
  }
  game: {
    waitingMessage: string
  }
  storySetup: {
    title: string
    playersLabel: string
    playerNamePlaceholder: string
    playerInfoPlaceholder: string
    addPlayerButton: string
    durationLabel: string
    durationPlaceholder: string
    difficultyLabel: string
    difficultyEasy: string
    difficultyHard: string
    difficultySuperHard: string
    languageLabel: string
    modeLabel: string
    modeSolo: string
    modeFamily: string
    modeMulti: string
    modeWeb3: string
    startButton: string
    cancelButton: string
    playersRequiredError: string
    durationRequiredError: string
  }
}

// Define translations for each supported language
type Translations = {
  [key in Language]: TranslationKeys
}

export const translations: Translations = {
  // English
  en: {
    common: {
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
      pleaseLogin: 'Please login',
    },
    home: {
      title: 'Welcome!',
      subtitle: "It's a pleasure to have you here!",
      greeting: 'Hello Anon!',
      greetingSubtitle: 'Sit back, relax, and build something cool!',
    },
    navigation: {
      settings: 'Settings',
    },
    settings: {
      title: 'Settings',
      loginRequired: 'Please login to access your settings',
    },
    game: {
      waitingMessage: 'Just a moment, please',
    },
    storySetup: {
      title: 'Before you begin',
      playersLabel: 'Players',
      playerNamePlaceholder: 'Player name',
      playerInfoPlaceholder: 'Notes (optional)',
      addPlayerButton: '+ Add player',
      durationLabel: 'Game duration (minutes)',
      durationPlaceholder: 'e.g. 30',
      difficultyLabel: 'Difficulty',
      difficultyEasy: 'Easy',
      difficultyHard: 'Hard',
      difficultySuperHard: 'Super hard',
      languageLabel: 'Language',
      modeLabel: 'Mode',
      modeSolo: 'Solo',
      modeFamily: 'Family',
      modeMulti: 'Multi',
      modeWeb3: 'Web3',
      startButton: 'Start adventure',
      cancelButton: 'Cancel',
      playersRequiredError: 'Please enter at least one player name',
      durationRequiredError: 'Please enter a valid duration',
    },
  },

  // Mandarin Chinese
  zh: {
    common: {
      login: '登录',
      logout: '登出',
      register: '注册',
      pleaseLogin: '请登录',
    },
    home: {
      title: '欢迎！',
      subtitle: '很高兴您来到这里！',
      greeting: '你好，匿名用户！',
      greetingSubtitle: '坐下来，放松，创造一些很酷的东西！',
    },
    navigation: {
      settings: '设置',
    },
    settings: {
      title: '设置',
      loginRequired: '请登录以访问您的设置',
    },
    game: {
      waitingMessage: '请稍等',
    },
    storySetup: {
      title: '开始之前',
      playersLabel: '玩家',
      playerNamePlaceholder: '玩家姓名',
      playerInfoPlaceholder: '备注（可选）',
      addPlayerButton: '+ 添加玩家',
      durationLabel: '游戏时长（分钟）',
      durationPlaceholder: '例如 30',
      difficultyLabel: '难度',
      difficultyEasy: '简单',
      difficultyHard: '困难',
      difficultySuperHard: '超难',
      languageLabel: '语言',
      modeLabel: '模式',
      modeSolo: '单人',
      modeFamily: '家庭',
      modeMulti: '多人',
      modeWeb3: 'Web3',
      startButton: '开始冒险',
      cancelButton: '取消',
      playersRequiredError: '请至少输入一位玩家的姓名',
      durationRequiredError: '请输入有效的时长',
    },
  },

  // Hindi
  hi: {
    common: {
      login: 'लॉगिन',
      logout: 'लॉगआउट',
      register: 'रजिस्टर करें',
      pleaseLogin: 'कृपया लॉगिन करें',
    },
    home: {
      title: 'स्वागत है!',
      subtitle: 'आपका यहाँ स्वागत है!',
      greeting: 'नमस्ते मित्र!',
      greetingSubtitle: 'आराम से बैठें और कुछ शानदार बनाएं!',
    },
    navigation: {
      settings: 'सेटिंग्स',
    },
    settings: {
      title: 'सेटिंग्स',
      loginRequired: 'अपनी सेटिंग्स एक्सेस करने के लिए कृपया लॉगिन करें',
    },
    game: {
      waitingMessage: 'कृपया एक पल रुकें',
    },
    storySetup: {
      title: 'शुरू करने से पहले',
      playersLabel: 'खिलाड़ी',
      playerNamePlaceholder: 'खिलाड़ी का नाम',
      playerInfoPlaceholder: 'नोट्स (वैकल्पिक)',
      addPlayerButton: '+ खिलाड़ी जोड़ें',
      durationLabel: 'खेल की अवधि (मिनट)',
      durationPlaceholder: 'जैसे 30',
      difficultyLabel: 'कठिनाई',
      difficultyEasy: 'आसान',
      difficultyHard: 'कठिन',
      difficultySuperHard: 'बहुत कठिन',
      languageLabel: 'भाषा',
      modeLabel: 'मोड',
      modeSolo: 'सोलो',
      modeFamily: 'परिवार',
      modeMulti: 'मल्टी',
      modeWeb3: 'Web3',
      startButton: 'साहसिक कार्य शुरू करें',
      cancelButton: 'रद्द करें',
      playersRequiredError: 'कृपया कम से कम एक खिलाड़ी का नाम दर्ज करें',
      durationRequiredError: 'कृपया एक मान्य अवधि दर्ज करें',
    },
  },

  // Spanish
  es: {
    common: {
      login: 'Iniciar sesión',
      logout: 'Cerrar sesión',
      register: 'Registrarse',
      pleaseLogin: 'Por favor inicia sesión',
    },
    home: {
      title: '¡Bienvenido!',
      subtitle: '¡Es un placer tenerte aquí!',
      greeting: '¡Hola Anon!',
      greetingSubtitle: '¡Siéntate, relájate y crea algo genial!',
    },
    navigation: {
      settings: 'Configuración',
    },
    settings: {
      title: 'Configuración',
      loginRequired: 'Por favor inicia sesión para acceder a tu configuración',
    },
    game: {
      waitingMessage: 'Un momento, por favor',
    },
    storySetup: {
      title: 'Antes de empezar',
      playersLabel: 'Jugadores',
      playerNamePlaceholder: 'Nombre del jugador',
      playerInfoPlaceholder: 'Notas (opcional)',
      addPlayerButton: '+ Añadir jugador',
      durationLabel: 'Duración del juego (minutos)',
      durationPlaceholder: 'ej. 30',
      difficultyLabel: 'Dificultad',
      difficultyEasy: 'Fácil',
      difficultyHard: 'Difícil',
      difficultySuperHard: 'Muy difícil',
      languageLabel: 'Idioma',
      modeLabel: 'Modo',
      modeSolo: 'Solo',
      modeFamily: 'Familia',
      modeMulti: 'Multi',
      modeWeb3: 'Web3',
      startButton: 'Comenzar aventura',
      cancelButton: 'Cancelar',
      playersRequiredError: 'Por favor ingresa al menos el nombre de un jugador',
      durationRequiredError: 'Por favor ingresa una duración válida',
    },
  },

  // French
  fr: {
    common: {
      login: 'Connexion',
      logout: 'Déconnexion',
      register: "S'inscrire",
      pleaseLogin: 'Veuillez vous connecter',
    },
    home: {
      title: 'Bienvenue !',
      subtitle: "C'est un plaisir de vous avoir ici !",
      greeting: 'Bonjour Anon !',
      greetingSubtitle: 'Détendez-vous et créez quelque chose de cool !',
    },
    navigation: {
      settings: 'Paramètres',
    },
    settings: {
      title: 'Paramètres',
      loginRequired: 'Veuillez vous connecter pour accéder à vos paramètres',
    },
    game: {
      waitingMessage: "Un instant, s'il vous plaît",
    },
    storySetup: {
      title: 'Avant de commencer',
      playersLabel: 'Joueurs',
      playerNamePlaceholder: 'Nom du joueur',
      playerInfoPlaceholder: 'Notes (facultatif)',
      addPlayerButton: '+ Ajouter un joueur',
      durationLabel: 'Durée de jeu (minutes)',
      durationPlaceholder: 'ex. 30',
      difficultyLabel: 'Difficulté',
      difficultyEasy: 'Facile',
      difficultyHard: 'Difficile',
      difficultySuperHard: 'Très difficile',
      languageLabel: 'Langue',
      modeLabel: 'Mode',
      modeSolo: 'Solo',
      modeFamily: 'Famille',
      modeMulti: 'Multi',
      modeWeb3: 'Web3',
      startButton: "Commencer l'aventure",
      cancelButton: 'Annuler',
      playersRequiredError: "Veuillez entrer au moins le nom d'un joueur",
      durationRequiredError: 'Veuillez entrer une durée valide',
    },
  },

  // Arabic
  ar: {
    common: {
      login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
      register: 'التسجيل',
      pleaseLogin: 'الرجاء تسجيل الدخول',
    },
    home: {
      title: 'مرحباً!',
      subtitle: 'يسعدنا وجودك هنا!',
      greeting: 'مرحبا أيها المجهول!',
      greetingSubtitle: 'استرخ وابنِ شيئاً رائعاً!',
    },
    navigation: {
      settings: 'الإعدادات',
    },
    settings: {
      title: 'الإعدادات',
      loginRequired: 'يرجى تسجيل الدخول للوصول إلى إعداداتك',
    },
    game: {
      waitingMessage: 'لحظة من فضلك',
    },
    storySetup: {
      title: 'قبل أن تبدأ',
      playersLabel: 'اللاعبون',
      playerNamePlaceholder: 'اسم اللاعب',
      playerInfoPlaceholder: 'ملاحظات (اختياري)',
      addPlayerButton: '+ إضافة لاعب',
      durationLabel: 'مدة اللعبة (بالدقائق)',
      durationPlaceholder: 'مثال 30',
      difficultyLabel: 'الصعوبة',
      difficultyEasy: 'سهل',
      difficultyHard: 'صعب',
      difficultySuperHard: 'صعب جداً',
      languageLabel: 'اللغة',
      modeLabel: 'الوضع',
      modeSolo: 'فردي',
      modeFamily: 'عائلي',
      modeMulti: 'متعدد اللاعبين',
      modeWeb3: 'Web3',
      startButton: 'ابدأ المغامرة',
      cancelButton: 'إلغاء',
      playersRequiredError: 'الرجاء إدخال اسم لاعب واحد على الأقل',
      durationRequiredError: 'الرجاء إدخال مدة صالحة',
    },
  },

  // Bengali
  bn: {
    common: {
      login: 'লগ ইন',
      logout: 'লগ আউট',
      register: 'নিবন্ধন করুন',
      pleaseLogin: 'অনুগ্রহ করে লগইন করুন',
    },
    home: {
      title: 'স্বাগতম!',
      subtitle: 'আপনাকে এখানে পেয়ে আনন্দিত!',
      greeting: 'হ্যালো বন্ধু!',
      greetingSubtitle: 'বসুন, আরাম করুন এবং কিছু দুর্দান্ত তৈরি করুন!',
    },
    navigation: {
      settings: 'সেটিংস',
    },
    settings: {
      title: 'সেটিংস',
      loginRequired: 'আপনার সেটিংস অ্যাক্সেস করতে অনুগ্রহ করে লগইন করুন',
    },
    game: {
      waitingMessage: 'একটু অপেক্ষা করুন',
    },
    storySetup: {
      title: 'শুরু করার আগে',
      playersLabel: 'খেলোয়াড়',
      playerNamePlaceholder: 'খেলোয়াড়ের নাম',
      playerInfoPlaceholder: 'নোট (ঐচ্ছিক)',
      addPlayerButton: '+ খেলোয়াড় যোগ করুন',
      durationLabel: 'খেলার সময়কাল (মিনিট)',
      durationPlaceholder: 'যেমন ৩০',
      difficultyLabel: 'কঠিনতা',
      difficultyEasy: 'সহজ',
      difficultyHard: 'কঠিন',
      difficultySuperHard: 'অতি কঠিন',
      languageLabel: 'ভাষা',
      modeLabel: 'মোড',
      modeSolo: 'একক',
      modeFamily: 'পরিবার',
      modeMulti: 'মাল্টি',
      modeWeb3: 'Web3',
      startButton: 'অভিযান শুরু করুন',
      cancelButton: 'বাতিল করুন',
      playersRequiredError: 'অনুগ্রহ করে অন্তত একজন খেলোয়াড়ের নাম লিখুন',
      durationRequiredError: 'অনুগ্রহ করে একটি বৈধ সময়কাল লিখুন',
    },
  },

  // Russian
  ru: {
    common: {
      login: 'Вход',
      logout: 'Выход',
      register: 'Регистрация',
      pleaseLogin: 'Пожалуйста, войдите',
    },
    home: {
      title: 'Добро пожаловать!',
      subtitle: 'Рады видеть вас здесь!',
      greeting: 'Привет, незнакомец!',
      greetingSubtitle: 'Расслабьтесь и создайте что-нибудь крутое!',
    },
    navigation: {
      settings: 'Настройки',
    },
    settings: {
      title: 'Настройки',
      loginRequired: 'Пожалуйста, войдите, чтобы получить доступ к настройкам',
    },
    game: {
      waitingMessage: 'Минутку, пожалуйста',
    },
    storySetup: {
      title: 'Прежде чем начать',
      playersLabel: 'Игроки',
      playerNamePlaceholder: 'Имя игрока',
      playerInfoPlaceholder: 'Заметки (необязательно)',
      addPlayerButton: '+ Добавить игрока',
      durationLabel: 'Продолжительность игры (минуты)',
      durationPlaceholder: 'напр. 30',
      difficultyLabel: 'Сложность',
      difficultyEasy: 'Легко',
      difficultyHard: 'Сложно',
      difficultySuperHard: 'Очень сложно',
      languageLabel: 'Язык',
      modeLabel: 'Режим',
      modeSolo: 'Соло',
      modeFamily: 'Семейный',
      modeMulti: 'Мульти',
      modeWeb3: 'Web3',
      startButton: 'Начать приключение',
      cancelButton: 'Отмена',
      playersRequiredError: 'Пожалуйста, введите имя хотя бы одного игрока',
      durationRequiredError: 'Пожалуйста, введите допустимую продолжительность',
    },
  },

  // Portuguese
  pt: {
    common: {
      login: 'Entrar',
      logout: 'Sair',
      register: 'Registrar',
      pleaseLogin: 'Por favor faça login',
    },
    home: {
      title: 'Bem-vindo!',
      subtitle: 'É um prazer tê-lo aqui!',
      greeting: 'Olá Anon!',
      greetingSubtitle: 'Sente-se, relaxe e construa algo legal!',
    },
    navigation: {
      settings: 'Configurações',
    },
    settings: {
      title: 'Configurações',
      loginRequired: 'Por favor faça login para acessar suas configurações',
    },
    game: {
      waitingMessage: 'Um momento, por favor',
    },
    storySetup: {
      title: 'Antes de começar',
      playersLabel: 'Jogadores',
      playerNamePlaceholder: 'Nome do jogador',
      playerInfoPlaceholder: 'Notas (opcional)',
      addPlayerButton: '+ Adicionar jogador',
      durationLabel: 'Duração do jogo (minutos)',
      durationPlaceholder: 'ex. 30',
      difficultyLabel: 'Dificuldade',
      difficultyEasy: 'Fácil',
      difficultyHard: 'Difícil',
      difficultySuperHard: 'Muito difícil',
      languageLabel: 'Idioma',
      modeLabel: 'Modo',
      modeSolo: 'Solo',
      modeFamily: 'Família',
      modeMulti: 'Multi',
      modeWeb3: 'Web3',
      startButton: 'Começar aventura',
      cancelButton: 'Cancelar',
      playersRequiredError: 'Por favor, digite o nome de pelo menos um jogador',
      durationRequiredError: 'Por favor, digite uma duração válida',
    },
  },

  // Urdu
  ur: {
    common: {
      login: 'لاگ ان',
      logout: 'لاگ آؤٹ',
      register: 'رجسٹر کریں',
      pleaseLogin: 'براہ کرم لاگ ان کریں',
    },
    home: {
      title: 'خوش آمدید!',
      subtitle: 'آپ کا یہاں ہونا خوشی کی بات ہے!',
      greeting: 'ہیلو دوست!',
      greetingSubtitle: 'آرام سے بیٹھیں اور کچھ شاندار بنائیں!',
    },
    navigation: {
      settings: 'ترتیبات',
    },
    settings: {
      title: 'ترتیبات',
      loginRequired: 'اپنی ترتیبات تک رسائی کے لیے براہ کرم لاگ ان کریں',
    },
    game: {
      waitingMessage: 'ایک لمحہ، براہ کرم',
    },
    storySetup: {
      title: 'شروع کرنے سے پہلے',
      playersLabel: 'کھلاڑی',
      playerNamePlaceholder: 'کھلاڑی کا نام',
      playerInfoPlaceholder: 'نوٹس (اختیاری)',
      addPlayerButton: '+ کھلاڑی شامل کریں',
      durationLabel: 'کھیل کا دورانیہ (منٹ)',
      durationPlaceholder: 'مثال 30',
      difficultyLabel: 'مشکل کی سطح',
      difficultyEasy: 'آسان',
      difficultyHard: 'مشکل',
      difficultySuperHard: 'انتہائی مشکل',
      languageLabel: 'زبان',
      modeLabel: 'موڈ',
      modeSolo: 'سولو',
      modeFamily: 'خاندان',
      modeMulti: 'ملٹی',
      modeWeb3: 'Web3',
      startButton: 'مہم شروع کریں',
      cancelButton: 'منسوخ کریں',
      playersRequiredError: 'براہ کرم کم از کم ایک کھلاڑی کا نام درج کریں',
      durationRequiredError: 'براہ کرم ایک درست دورانیہ درج کریں',
    },
  },
}

/**
 * Get translations for the current language
 * @param language Current language code
 * @returns Translation object for the specified language
 */
export function getTranslations(language: Language) {
  return translations[language]
}

/**
 * Hook to use translations in components
 * @param language Current language code
 * @returns Translation object for the specified language
 */
export function useTranslations(language: Language) {
  return translations[language]
}
