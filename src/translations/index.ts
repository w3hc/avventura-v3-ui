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
    cancel: string
    copyUrlAriaLabel: string
    urlCopied: string
    loading: string
    srLoadingText: string
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
    failedToStart: string
    failedToLoadGameState: string
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
  header: {
    registerTitle: string
    walletInfoText: string
    usernameLabel: string
    usernamePlaceholder: string
    usernameError: string
    createAccount: string
    optionsAriaLabel: string
    mainNavAriaLabel: string
    usernameRequiredTitle: string
    usernameRequiredDescription: string
    registrationFailedTitle: string
    registrationFailedDefaultDescription: string
  }
  passwordModal: {
    passwordLabel: string
    passwordPlaceholder: string
    passwordRequiredTitle: string
    passwordRequiredDescription: string
    weakPasswordTitle: string
    weakPasswordDescription: string
    submissionErrorTitle: string
    submissionErrorDefaultDescription: string
    requirementsNotMet: string
    strongPassword: string
    mustInclude: string
    reqMinLength: string
    reqUpperCase: string
    reqLowerCase: string
    reqNumber: string
    reqSpecialChar: string
    satisfied: string
    required: string
    submit: string
  }
  editStory: {
    storyNotFound: string
    failedToLoadStory: string
    invalidJson: string
    savedSuccessfully: string
    failedToSave: string
    backToCreate: string
    title: string
    playLabel: string
    editLabel: string
    slugLabel: string
    titleLabel: string
    contentLabel: string
    homepageDisplayLabel: string
    activeLabel: string
    savingText: string
    saveChanges: string
    createdLabel: string
    updatedLabel: string
    sessionsLabel: string
    requestsLabel: string
  }
  createStory: {
    pleaseEnterPrompt: string
    failedToCreate: string
    title: string
    instructions: string
    promptPlaceholder: string
    createButton: string
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
      cancel: 'Cancel',
      copyUrlAriaLabel: 'Copy URL',
      urlCopied: 'URL copied to clipboard',
      loading: 'Loading...',
      srLoadingText: 'Loading, please wait...',
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
      failedToStart: 'Failed to start the adventure. Please try again.',
      failedToLoadGameState: 'Failed to load game state',
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
    header: {
      registerTitle: 'Register New Account',
      walletInfoText:
        'An Ethereum wallet will be created and securely stored on your device, protected by your biometric or PIN thanks to',
      usernameLabel: 'Username',
      usernamePlaceholder: 'Enter your username',
      usernameError:
        'Username must be 3-50 characters long and contain only letters, numbers, underscores, and hyphens. It must start and end with a letter or number.',
      createAccount: 'Create Account',
      optionsAriaLabel: 'Options',
      mainNavAriaLabel: 'Main navigation',
      usernameRequiredTitle: 'Username Required',
      usernameRequiredDescription: 'Please enter a username to register.',
      registrationFailedTitle: 'Registration Failed',
      registrationFailedDefaultDescription: 'Unable to complete registration. Please try again.',
    },
    passwordModal: {
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      passwordRequiredTitle: 'Password Required.',
      passwordRequiredDescription: 'Please enter your password.',
      weakPasswordTitle: 'Weak Password.',
      weakPasswordDescription: 'Please use a stronger password that meets all requirements.',
      submissionErrorTitle: 'Submission Error.',
      submissionErrorDefaultDescription: 'An unexpected error occurred.',
      requirementsNotMet: 'Password does not meet all requirements',
      strongPassword: 'Strong password!',
      mustInclude: 'Password must include:',
      reqMinLength: 'At least 12 characters',
      reqUpperCase: 'One uppercase letter',
      reqLowerCase: 'One lowercase letter',
      reqNumber: 'One number',
      reqSpecialChar: 'One special character',
      satisfied: ' (satisfied)',
      required: ' (required)',
      submit: 'Submit',
    },
    editStory: {
      storyNotFound: 'Story not found',
      failedToLoadStory: 'Failed to load story',
      invalidJson: 'Invalid JSON in homepage_display field',
      savedSuccessfully: 'Story saved successfully!',
      failedToSave: 'Failed to save story. Please try again.',
      backToCreate: 'Back to Create',
      title: 'Edit Story',
      playLabel: 'Play:',
      editLabel: 'Edit:',
      slugLabel: 'Slug',
      titleLabel: 'Title',
      contentLabel: 'Content',
      homepageDisplayLabel: 'Homepage Display (JSON)',
      activeLabel: 'Active',
      savingText: 'Saving...',
      saveChanges: 'Save Changes',
      createdLabel: 'Created: ',
      updatedLabel: 'Updated: ',
      sessionsLabel: 'Sessions: ',
      requestsLabel: 'Requests: ',
    },
    createStory: {
      pleaseEnterPrompt: 'Please enter a prompt',
      failedToCreate: 'Failed to create story. Please try again.',
      title: 'Create New Story',
      instructions:
        "In what world does the story take place? What will happen? Any milestones you want players to achieve? Don't worry about being rough—the assistant will edit it cleanly.",
      promptPlaceholder: 'Enter a prompt for your story...',
      createButton: 'Create',
    },
  },

  // Mandarin Chinese
  zh: {
    common: {
      login: '登录',
      logout: '登出',
      register: '注册',
      pleaseLogin: '请登录',
      cancel: '取消',
      copyUrlAriaLabel: '复制链接',
      urlCopied: '链接已复制到剪贴板',
      loading: '加载中...',
      srLoadingText: '加载中，请稍候...',
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
      failedToStart: '开始冒险失败，请重试。',
      failedToLoadGameState: '加载游戏状态失败',
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
    header: {
      registerTitle: '注册新账户',
      walletInfoText:
        '系统将为您创建一个以太坊钱包，并安全地存储在您的设备上，通过生物识别或PIN码保护，这要归功于',
      usernameLabel: '用户名',
      usernamePlaceholder: '请输入您的用户名',
      usernameError:
        '用户名长度必须为3-50个字符，只能包含字母、数字、下划线和连字符，且必须以字母或数字开头和结尾。',
      createAccount: '创建账户',
      optionsAriaLabel: '选项',
      mainNavAriaLabel: '主导航',
      usernameRequiredTitle: '需要用户名',
      usernameRequiredDescription: '请输入用户名以完成注册。',
      registrationFailedTitle: '注册失败',
      registrationFailedDefaultDescription: '无法完成注册，请重试。',
    },
    passwordModal: {
      passwordLabel: '密码',
      passwordPlaceholder: '请输入您的密码',
      passwordRequiredTitle: '需要密码。',
      passwordRequiredDescription: '请输入您的密码。',
      weakPasswordTitle: '密码强度不足。',
      weakPasswordDescription: '请使用满足所有要求的更强密码。',
      submissionErrorTitle: '提交错误。',
      submissionErrorDefaultDescription: '发生意外错误。',
      requirementsNotMet: '密码不满足所有要求',
      strongPassword: '密码强度足够！',
      mustInclude: '密码必须包含：',
      reqMinLength: '至少12个字符',
      reqUpperCase: '一个大写字母',
      reqLowerCase: '一个小写字母',
      reqNumber: '一个数字',
      reqSpecialChar: '一个特殊字符',
      satisfied: '（已满足）',
      required: '（必需）',
      submit: '提交',
    },
    editStory: {
      storyNotFound: '未找到故事',
      failedToLoadStory: '加载故事失败',
      invalidJson: 'homepage_display 字段中的 JSON 无效',
      savedSuccessfully: '故事保存成功！',
      failedToSave: '保存故事失败，请重试。',
      backToCreate: '返回创建页面',
      title: '编辑故事',
      playLabel: '游玩：',
      editLabel: '编辑：',
      slugLabel: '短链接',
      titleLabel: '标题',
      contentLabel: '内容',
      homepageDisplayLabel: '主页显示（JSON）',
      activeLabel: '启用',
      savingText: '保存中...',
      saveChanges: '保存更改',
      createdLabel: '创建时间：',
      updatedLabel: '更新时间：',
      sessionsLabel: '会话数：',
      requestsLabel: '请求数：',
    },
    createStory: {
      pleaseEnterPrompt: '请输入提示词',
      failedToCreate: '创建故事失败，请重试。',
      title: '创建新故事',
      instructions:
        '故事发生在什么样的世界？将会发生什么？您希望玩家达成哪些里程碑？不必担心内容粗糙——助手会帮您编辑得更清晰。',
      promptPlaceholder: '请输入您故事的提示词...',
      createButton: '创建',
    },
  },

  // Hindi
  hi: {
    common: {
      login: 'लॉगिन',
      logout: 'लॉगआउट',
      register: 'रजिस्टर करें',
      pleaseLogin: 'कृपया लॉगिन करें',
      cancel: 'रद्द करें',
      copyUrlAriaLabel: 'यूआरएल कॉपी करें',
      urlCopied: 'यूआरएल क्लिपबोर्ड पर कॉपी किया गया',
      loading: 'लोड हो रहा है...',
      srLoadingText: 'लोड हो रहा है, कृपया प्रतीक्षा करें...',
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
      failedToStart: 'साहसिक कार्य शुरू करने में विफल। कृपया पुनः प्रयास करें।',
      failedToLoadGameState: 'गेम की स्थिति लोड करने में विफल',
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
    header: {
      registerTitle: 'नया खाता पंजीकृत करें',
      walletInfoText:
        'एक एथेरियम वॉलेट बनाया जाएगा और आपके डिवाइस पर सुरक्षित रूप से संग्रहीत किया जाएगा, जो आपके बायोमेट्रिक या पिन द्वारा सुरक्षित होगा, धन्यवाद',
      usernameLabel: 'उपयोगकर्ता नाम',
      usernamePlaceholder: 'अपना उपयोगकर्ता नाम दर्ज करें',
      usernameError:
        'उपयोगकर्ता नाम 3-50 अक्षरों का होना चाहिए और इसमें केवल अक्षर, संख्याएं, अंडरस्कोर और हाइफ़न हो सकते हैं। इसे एक अक्षर या संख्या से शुरू और समाप्त होना चाहिए।',
      createAccount: 'खाता बनाएं',
      optionsAriaLabel: 'विकल्प',
      mainNavAriaLabel: 'मुख्य नेविगेशन',
      usernameRequiredTitle: 'उपयोगकर्ता नाम आवश्यक है',
      usernameRequiredDescription: 'पंजीकरण के लिए कृपया एक उपयोगकर्ता नाम दर्ज करें।',
      registrationFailedTitle: 'पंजीकरण विफल',
      registrationFailedDefaultDescription: 'पंजीकरण पूरा करने में असमर्थ। कृपया पुनः प्रयास करें।',
    },
    passwordModal: {
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      passwordRequiredTitle: 'पासवर्ड आवश्यक है।',
      passwordRequiredDescription: 'कृपया अपना पासवर्ड दर्ज करें।',
      weakPasswordTitle: 'कमज़ोर पासवर्ड।',
      weakPasswordDescription:
        'कृपया एक मजबूत पासवर्ड का उपयोग करें जो सभी आवश्यकताओं को पूरा करता हो।',
      submissionErrorTitle: 'सबमिशन त्रुटि।',
      submissionErrorDefaultDescription: 'एक अप्रत्याशित त्रुटि हुई।',
      requirementsNotMet: 'पासवर्ड सभी आवश्यकताओं को पूरा नहीं करता',
      strongPassword: 'मजबूत पासवर्ड!',
      mustInclude: 'पासवर्ड में शामिल होना चाहिए:',
      reqMinLength: 'कम से कम 12 अक्षर',
      reqUpperCase: 'एक बड़ा अक्षर',
      reqLowerCase: 'एक छोटा अक्षर',
      reqNumber: 'एक संख्या',
      reqSpecialChar: 'एक विशेष वर्ण',
      satisfied: ' (पूर्ण)',
      required: ' (आवश्यक)',
      submit: 'जमा करें',
    },
    editStory: {
      storyNotFound: 'कहानी नहीं मिली',
      failedToLoadStory: 'कहानी लोड करने में विफल',
      invalidJson: 'homepage_display फ़ील्ड में अमान्य JSON',
      savedSuccessfully: 'कहानी सफलतापूर्वक सहेजी गई!',
      failedToSave: 'कहानी सहेजने में विफल। कृपया पुनः प्रयास करें।',
      backToCreate: 'बनाने पर वापस जाएं',
      title: 'कहानी संपादित करें',
      playLabel: 'खेलें:',
      editLabel: 'संपादित करें:',
      slugLabel: 'स्लग',
      titleLabel: 'शीर्षक',
      contentLabel: 'सामग्री',
      homepageDisplayLabel: 'होमपेज डिस्प्ले (JSON)',
      activeLabel: 'सक्रिय',
      savingText: 'सहेजा जा रहा है...',
      saveChanges: 'परिवर्तन सहेजें',
      createdLabel: 'बनाया गया: ',
      updatedLabel: 'अद्यतन: ',
      sessionsLabel: 'सत्र: ',
      requestsLabel: 'अनुरोध: ',
    },
    createStory: {
      pleaseEnterPrompt: 'कृपया एक प्रॉम्प्ट दर्ज करें',
      failedToCreate: 'कहानी बनाने में विफल। कृपया पुनः प्रयास करें।',
      title: 'नई कहानी बनाएं',
      instructions:
        'कहानी किस दुनिया में घटित होती है? क्या होगा? क्या आप चाहते हैं कि खिलाड़ी कोई विशेष उपलब्धियां हासिल करें? कच्चे लेखन की चिंता न करें—सहायक इसे साफ-सुथरा संपादित कर देगा।',
      promptPlaceholder: 'अपनी कहानी के लिए एक प्रॉम्प्ट दर्ज करें...',
      createButton: 'बनाएं',
    },
  },

  // Spanish
  es: {
    common: {
      login: 'Iniciar sesión',
      logout: 'Cerrar sesión',
      register: 'Registrarse',
      pleaseLogin: 'Por favor inicia sesión',
      cancel: 'Cancelar',
      copyUrlAriaLabel: 'Copiar URL',
      urlCopied: 'URL copiada al portapapeles',
      loading: 'Cargando...',
      srLoadingText: 'Cargando, por favor espera...',
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
      failedToStart: 'No se pudo iniciar la aventura. Por favor, inténtalo de nuevo.',
      failedToLoadGameState: 'No se pudo cargar el estado del juego',
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
    header: {
      registerTitle: 'Registrar nueva cuenta',
      walletInfoText:
        'Se creará una billetera de Ethereum y se almacenará de forma segura en tu dispositivo, protegida por tu biometría o PIN gracias a',
      usernameLabel: 'Nombre de usuario',
      usernamePlaceholder: 'Introduce tu nombre de usuario',
      usernameError:
        'El nombre de usuario debe tener entre 3 y 50 caracteres y contener solo letras, números, guiones bajos y guiones. Debe comenzar y terminar con una letra o número.',
      createAccount: 'Crear cuenta',
      optionsAriaLabel: 'Opciones',
      mainNavAriaLabel: 'Navegación principal',
      usernameRequiredTitle: 'Nombre de usuario requerido',
      usernameRequiredDescription: 'Por favor introduce un nombre de usuario para registrarte.',
      registrationFailedTitle: 'Registro fallido',
      registrationFailedDefaultDescription:
        'No se pudo completar el registro. Por favor, inténtalo de nuevo.',
    },
    passwordModal: {
      passwordLabel: 'Contraseña',
      passwordPlaceholder: 'Introduce tu contraseña',
      passwordRequiredTitle: 'Contraseña requerida.',
      passwordRequiredDescription: 'Por favor introduce tu contraseña.',
      weakPasswordTitle: 'Contraseña débil.',
      weakPasswordDescription:
        'Por favor usa una contraseña más segura que cumpla con todos los requisitos.',
      submissionErrorTitle: 'Error de envío.',
      submissionErrorDefaultDescription: 'Ocurrió un error inesperado.',
      requirementsNotMet: 'La contraseña no cumple con todos los requisitos',
      strongPassword: '¡Contraseña segura!',
      mustInclude: 'La contraseña debe incluir:',
      reqMinLength: 'Al menos 12 caracteres',
      reqUpperCase: 'Una letra mayúscula',
      reqLowerCase: 'Una letra minúscula',
      reqNumber: 'Un número',
      reqSpecialChar: 'Un carácter especial',
      satisfied: ' (cumplido)',
      required: ' (requerido)',
      submit: 'Enviar',
    },
    editStory: {
      storyNotFound: 'Historia no encontrada',
      failedToLoadStory: 'No se pudo cargar la historia',
      invalidJson: 'JSON no válido en el campo homepage_display',
      savedSuccessfully: '¡Historia guardada con éxito!',
      failedToSave: 'No se pudo guardar la historia. Por favor, inténtalo de nuevo.',
      backToCreate: 'Volver a crear',
      title: 'Editar historia',
      playLabel: 'Jugar:',
      editLabel: 'Editar:',
      slugLabel: 'Slug',
      titleLabel: 'Título',
      contentLabel: 'Contenido',
      homepageDisplayLabel: 'Visualización de la página principal (JSON)',
      activeLabel: 'Activo',
      savingText: 'Guardando...',
      saveChanges: 'Guardar cambios',
      createdLabel: 'Creado: ',
      updatedLabel: 'Actualizado: ',
      sessionsLabel: 'Sesiones: ',
      requestsLabel: 'Solicitudes: ',
    },
    createStory: {
      pleaseEnterPrompt: 'Por favor introduce una instrucción',
      failedToCreate: 'No se pudo crear la historia. Por favor, inténtalo de nuevo.',
      title: 'Crear nueva historia',
      instructions:
        '¿En qué mundo transcurre la historia? ¿Qué sucederá? ¿Algún hito que quieras que los jugadores alcancen? No te preocupes por que sea tosco: el asistente lo editará de forma clara.',
      promptPlaceholder: 'Introduce una instrucción para tu historia...',
      createButton: 'Crear',
    },
  },

  // French
  fr: {
    common: {
      login: 'Connexion',
      logout: 'Déconnexion',
      register: "S'inscrire",
      pleaseLogin: 'Veuillez vous connecter',
      cancel: 'Annuler',
      copyUrlAriaLabel: "Copier l'URL",
      urlCopied: 'URL copiée dans le presse-papiers',
      loading: 'Chargement...',
      srLoadingText: 'Chargement, veuillez patienter...',
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
      failedToStart: "Échec du démarrage de l'aventure. Veuillez réessayer.",
      failedToLoadGameState: "Échec du chargement de l'état du jeu",
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
    header: {
      registerTitle: 'Créer un nouveau compte',
      walletInfoText:
        'Un portefeuille Ethereum sera créé et stocké en toute sécurité sur votre appareil, protégé par votre biométrie ou votre code PIN grâce à',
      usernameLabel: "Nom d'utilisateur",
      usernamePlaceholder: "Entrez votre nom d'utilisateur",
      usernameError:
        "Le nom d'utilisateur doit comporter entre 3 et 50 caractères et ne contenir que des lettres, chiffres, tirets bas et tirets. Il doit commencer et se terminer par une lettre ou un chiffre.",
      createAccount: 'Créer un compte',
      optionsAriaLabel: 'Options',
      mainNavAriaLabel: 'Navigation principale',
      usernameRequiredTitle: "Nom d'utilisateur requis",
      usernameRequiredDescription: "Veuillez entrer un nom d'utilisateur pour vous inscrire.",
      registrationFailedTitle: "Échec de l'inscription",
      registrationFailedDefaultDescription:
        "Impossible de terminer l'inscription. Veuillez réessayer.",
    },
    passwordModal: {
      passwordLabel: 'Mot de passe',
      passwordPlaceholder: 'Entrez votre mot de passe',
      passwordRequiredTitle: 'Mot de passe requis.',
      passwordRequiredDescription: 'Veuillez entrer votre mot de passe.',
      weakPasswordTitle: 'Mot de passe faible.',
      weakPasswordDescription:
        'Veuillez utiliser un mot de passe plus fort qui répond à toutes les exigences.',
      submissionErrorTitle: 'Erreur de soumission.',
      submissionErrorDefaultDescription: "Une erreur inattendue s'est produite.",
      requirementsNotMet: 'Le mot de passe ne répond pas à toutes les exigences',
      strongPassword: 'Mot de passe robuste !',
      mustInclude: 'Le mot de passe doit inclure :',
      reqMinLength: 'Au moins 12 caractères',
      reqUpperCase: 'Une lettre majuscule',
      reqLowerCase: 'Une lettre minuscule',
      reqNumber: 'Un chiffre',
      reqSpecialChar: 'Un caractère spécial',
      satisfied: ' (satisfait)',
      required: ' (requis)',
      submit: 'Soumettre',
    },
    editStory: {
      storyNotFound: 'Histoire introuvable',
      failedToLoadStory: "Échec du chargement de l'histoire",
      invalidJson: 'JSON invalide dans le champ homepage_display',
      savedSuccessfully: 'Histoire enregistrée avec succès !',
      failedToSave: "Échec de l'enregistrement de l'histoire. Veuillez réessayer.",
      backToCreate: 'Retour à la création',
      title: "Modifier l'histoire",
      playLabel: 'Jouer :',
      editLabel: 'Modifier :',
      slugLabel: 'Slug',
      titleLabel: 'Titre',
      contentLabel: 'Contenu',
      homepageDisplayLabel: "Affichage de la page d'accueil (JSON)",
      activeLabel: 'Actif',
      savingText: 'Enregistrement...',
      saveChanges: 'Enregistrer les modifications',
      createdLabel: 'Créé le : ',
      updatedLabel: 'Mis à jour le : ',
      sessionsLabel: 'Sessions : ',
      requestsLabel: 'Requêtes : ',
    },
    createStory: {
      pleaseEnterPrompt: 'Veuillez entrer une instruction',
      failedToCreate: "Échec de la création de l'histoire. Veuillez réessayer.",
      title: 'Créer une nouvelle histoire',
      instructions:
        "Dans quel monde se déroule l'histoire ? Que va-t-il se passer ? Des étapes que vous souhaitez que les joueurs atteignent ? Ne vous inquiétez pas si c'est brouillon, l'assistant le retravaillera proprement.",
      promptPlaceholder: 'Entrez une instruction pour votre histoire...',
      createButton: 'Créer',
    },
  },

  // Arabic
  ar: {
    common: {
      login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
      register: 'التسجيل',
      pleaseLogin: 'الرجاء تسجيل الدخول',
      cancel: 'إلغاء',
      copyUrlAriaLabel: 'نسخ الرابط',
      urlCopied: 'تم نسخ الرابط إلى الحافظة',
      loading: 'جارٍ التحميل...',
      srLoadingText: 'جارٍ التحميل، يرجى الانتظار...',
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
      failedToStart: 'فشل بدء المغامرة. يرجى المحاولة مرة أخرى.',
      failedToLoadGameState: 'فشل تحميل حالة اللعبة',
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
    header: {
      registerTitle: 'تسجيل حساب جديد',
      walletInfoText:
        'سيتم إنشاء محفظة إيثريوم وتخزينها بأمان على جهازك، محمية ببصمتك البيومترية أو رمز PIN بفضل',
      usernameLabel: 'اسم المستخدم',
      usernamePlaceholder: 'أدخل اسم المستخدم الخاص بك',
      usernameError:
        'يجب أن يتكون اسم المستخدم من 3 إلى 50 حرفًا وأن يحتوي فقط على أحرف وأرقام وشرطات سفلية وشرطات. يجب أن يبدأ وينتهي بحرف أو رقم.',
      createAccount: 'إنشاء حساب',
      optionsAriaLabel: 'خيارات',
      mainNavAriaLabel: 'التنقل الرئيسي',
      usernameRequiredTitle: 'اسم المستخدم مطلوب',
      usernameRequiredDescription: 'يرجى إدخال اسم مستخدم للتسجيل.',
      registrationFailedTitle: 'فشل التسجيل',
      registrationFailedDefaultDescription: 'تعذر إكمال التسجيل. يرجى المحاولة مرة أخرى.',
    },
    passwordModal: {
      passwordLabel: 'كلمة المرور',
      passwordPlaceholder: 'أدخل كلمة المرور الخاصة بك',
      passwordRequiredTitle: 'كلمة المرور مطلوبة.',
      passwordRequiredDescription: 'يرجى إدخال كلمة المرور الخاصة بك.',
      weakPasswordTitle: 'كلمة مرور ضعيفة.',
      weakPasswordDescription: 'يرجى استخدام كلمة مرور أقوى تستوفي جميع المتطلبات.',
      submissionErrorTitle: 'خطأ في الإرسال.',
      submissionErrorDefaultDescription: 'حدث خطأ غير متوقع.',
      requirementsNotMet: 'كلمة المرور لا تستوفي جميع المتطلبات',
      strongPassword: 'كلمة مرور قوية!',
      mustInclude: 'يجب أن تتضمن كلمة المرور:',
      reqMinLength: '12 حرفًا على الأقل',
      reqUpperCase: 'حرف كبير واحد',
      reqLowerCase: 'حرف صغير واحد',
      reqNumber: 'رقم واحد',
      reqSpecialChar: 'رمز خاص واحد',
      satisfied: ' (مستوفى)',
      required: ' (مطلوب)',
      submit: 'إرسال',
    },
    editStory: {
      storyNotFound: 'القصة غير موجودة',
      failedToLoadStory: 'فشل تحميل القصة',
      invalidJson: 'صيغة JSON غير صالحة في حقل homepage_display',
      savedSuccessfully: 'تم حفظ القصة بنجاح!',
      failedToSave: 'فشل حفظ القصة. يرجى المحاولة مرة أخرى.',
      backToCreate: 'العودة إلى الإنشاء',
      title: 'تعديل القصة',
      playLabel: 'اللعب:',
      editLabel: 'التعديل:',
      slugLabel: 'الرابط المختصر',
      titleLabel: 'العنوان',
      contentLabel: 'المحتوى',
      homepageDisplayLabel: 'عرض الصفحة الرئيسية (JSON)',
      activeLabel: 'نشط',
      savingText: 'جارٍ الحفظ...',
      saveChanges: 'حفظ التغييرات',
      createdLabel: 'تاريخ الإنشاء: ',
      updatedLabel: 'تاريخ التحديث: ',
      sessionsLabel: 'الجلسات: ',
      requestsLabel: 'الطلبات: ',
    },
    createStory: {
      pleaseEnterPrompt: 'يرجى إدخال موجه',
      failedToCreate: 'فشل إنشاء القصة. يرجى المحاولة مرة أخرى.',
      title: 'إنشاء قصة جديدة',
      instructions:
        'في أي عالم تدور أحداث القصة؟ ماذا سيحدث؟ هل هناك إنجازات معينة تريد أن يحققها اللاعبون؟ لا تقلق بشأن الخشونة - سيقوم المساعد بتحريرها بشكل واضح.',
      promptPlaceholder: 'أدخل موجهًا لقصتك...',
      createButton: 'إنشاء',
    },
  },

  // Bengali
  bn: {
    common: {
      login: 'লগ ইন',
      logout: 'লগ আউট',
      register: 'নিবন্ধন করুন',
      pleaseLogin: 'অনুগ্রহ করে লগইন করুন',
      cancel: 'বাতিল করুন',
      copyUrlAriaLabel: 'ইউআরএল কপি করুন',
      urlCopied: 'ইউআরএল ক্লিপবোর্ডে কপি করা হয়েছে',
      loading: 'লোড হচ্ছে...',
      srLoadingText: 'লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...',
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
      failedToStart: 'অভিযান শুরু করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
      failedToLoadGameState: 'গেমের অবস্থা লোড করা যায়নি',
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
    header: {
      registerTitle: 'নতুন অ্যাকাউন্ট নিবন্ধন করুন',
      walletInfoText:
        'একটি ইথেরিয়াম ওয়ালেট তৈরি করা হবে এবং আপনার ডিভাইসে নিরাপদে সংরক্ষিত হবে, যা আপনার বায়োমেট্রিক বা পিন দ্বারা সুরক্ষিত, ধন্যবাদ',
      usernameLabel: 'ব্যবহারকারীর নাম',
      usernamePlaceholder: 'আপনার ব্যবহারকারীর নাম লিখুন',
      usernameError:
        'ব্যবহারকারীর নাম অবশ্যই ৩-৫০ অক্ষরের হতে হবে এবং শুধুমাত্র অক্ষর, সংখ্যা, আন্ডারস্কোর এবং হাইফেন থাকতে পারবে। এটি অবশ্যই একটি অক্ষর বা সংখ্যা দিয়ে শুরু এবং শেষ হতে হবে।',
      createAccount: 'অ্যাকাউন্ট তৈরি করুন',
      optionsAriaLabel: 'বিকল্প',
      mainNavAriaLabel: 'প্রধান নেভিগেশন',
      usernameRequiredTitle: 'ব্যবহারকারীর নাম প্রয়োজন',
      usernameRequiredDescription: 'নিবন্ধনের জন্য অনুগ্রহ করে একটি ব্যবহারকারীর নাম লিখুন।',
      registrationFailedTitle: 'নিবন্ধন ব্যর্থ হয়েছে',
      registrationFailedDefaultDescription:
        'নিবন্ধন সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
    },
    passwordModal: {
      passwordLabel: 'পাসওয়ার্ড',
      passwordPlaceholder: 'আপনার পাসওয়ার্ড লিখুন',
      passwordRequiredTitle: 'পাসওয়ার্ড প্রয়োজন।',
      passwordRequiredDescription: 'অনুগ্রহ করে আপনার পাসওয়ার্ড লিখুন।',
      weakPasswordTitle: 'দুর্বল পাসওয়ার্ড।',
      weakPasswordDescription:
        'অনুগ্রহ করে সমস্ত প্রয়োজনীয়তা পূরণ করে এমন একটি শক্তিশালী পাসওয়ার্ড ব্যবহার করুন।',
      submissionErrorTitle: 'জমা দেওয়ার ত্রুটি।',
      submissionErrorDefaultDescription: 'একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।',
      requirementsNotMet: 'পাসওয়ার্ড সমস্ত প্রয়োজনীয়তা পূরণ করে না',
      strongPassword: 'শক্তিশালী পাসওয়ার্ড!',
      mustInclude: 'পাসওয়ার্ডে অবশ্যই থাকতে হবে:',
      reqMinLength: 'কমপক্ষে ১২টি অক্ষর',
      reqUpperCase: 'একটি বড় হাতের অক্ষর',
      reqLowerCase: 'একটি ছোট হাতের অক্ষর',
      reqNumber: 'একটি সংখ্যা',
      reqSpecialChar: 'একটি বিশেষ অক্ষর',
      satisfied: ' (পূরণ হয়েছে)',
      required: ' (প্রয়োজন)',
      submit: 'জমা দিন',
    },
    editStory: {
      storyNotFound: 'গল্প পাওয়া যায়নি',
      failedToLoadStory: 'গল্প লোড করা যায়নি',
      invalidJson: 'homepage_display ফিল্ডে অবৈধ JSON',
      savedSuccessfully: 'গল্প সফলভাবে সংরক্ষিত হয়েছে!',
      failedToSave: 'গল্প সংরক্ষণ করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
      backToCreate: 'তৈরিতে ফিরে যান',
      title: 'গল্প সম্পাদনা করুন',
      playLabel: 'খেলুন:',
      editLabel: 'সম্পাদনা:',
      slugLabel: 'স্লাগ',
      titleLabel: 'শিরোনাম',
      contentLabel: 'বিষয়বস্তু',
      homepageDisplayLabel: 'হোমপেজ ডিসপ্লে (JSON)',
      activeLabel: 'সক্রিয়',
      savingText: 'সংরক্ষণ করা হচ্ছে...',
      saveChanges: 'পরিবর্তনগুলি সংরক্ষণ করুন',
      createdLabel: 'তৈরি হয়েছে: ',
      updatedLabel: 'আপডেট হয়েছে: ',
      sessionsLabel: 'সেশন: ',
      requestsLabel: 'অনুরোধ: ',
    },
    createStory: {
      pleaseEnterPrompt: 'অনুগ্রহ করে একটি প্রম্পট লিখুন',
      failedToCreate: 'গল্প তৈরি করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
      title: 'নতুন গল্প তৈরি করুন',
      instructions:
        'গল্পটি কোন জগতে ঘটে? কী ঘটবে? খেলোয়াড়দের কোনো মাইলফলক অর্জন করাতে চান? এটি অগোছালো হওয়া নিয়ে চিন্তা করবেন না—সহায়ক এটি সুন্দরভাবে সম্পাদনা করে দেবে।',
      promptPlaceholder: 'আপনার গল্পের জন্য একটি প্রম্পট লিখুন...',
      createButton: 'তৈরি করুন',
    },
  },

  // Russian
  ru: {
    common: {
      login: 'Вход',
      logout: 'Выход',
      register: 'Регистрация',
      pleaseLogin: 'Пожалуйста, войдите',
      cancel: 'Отмена',
      copyUrlAriaLabel: 'Скопировать URL',
      urlCopied: 'URL скопирован в буфер обмена',
      loading: 'Загрузка...',
      srLoadingText: 'Загрузка, пожалуйста подождите...',
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
      failedToStart: 'Не удалось начать приключение. Попробуйте ещё раз.',
      failedToLoadGameState: 'Не удалось загрузить состояние игры',
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
    header: {
      registerTitle: 'Регистрация нового аккаунта',
      walletInfoText:
        'Будет создан Ethereum-кошелёк, надёжно хранящийся на вашем устройстве и защищённый биометрией или PIN-кодом благодаря',
      usernameLabel: 'Имя пользователя',
      usernamePlaceholder: 'Введите имя пользователя',
      usernameError:
        'Имя пользователя должно содержать от 3 до 50 символов и включать только буквы, цифры, подчёркивания и дефисы. Оно должно начинаться и заканчиваться буквой или цифрой.',
      createAccount: 'Создать аккаунт',
      optionsAriaLabel: 'Опции',
      mainNavAriaLabel: 'Основная навигация',
      usernameRequiredTitle: 'Требуется имя пользователя',
      usernameRequiredDescription: 'Пожалуйста, введите имя пользователя для регистрации.',
      registrationFailedTitle: 'Ошибка регистрации',
      registrationFailedDefaultDescription: 'Не удалось завершить регистрацию. Попробуйте ещё раз.',
    },
    passwordModal: {
      passwordLabel: 'Пароль',
      passwordPlaceholder: 'Введите пароль',
      passwordRequiredTitle: 'Требуется пароль.',
      passwordRequiredDescription: 'Пожалуйста, введите пароль.',
      weakPasswordTitle: 'Слабый пароль.',
      weakPasswordDescription:
        'Пожалуйста, используйте более надёжный пароль, отвечающий всем требованиям.',
      submissionErrorTitle: 'Ошибка отправки.',
      submissionErrorDefaultDescription: 'Произошла непредвиденная ошибка.',
      requirementsNotMet: 'Пароль не соответствует всем требованиям',
      strongPassword: 'Надёжный пароль!',
      mustInclude: 'Пароль должен содержать:',
      reqMinLength: 'Не менее 12 символов',
      reqUpperCase: 'Одну заглавную букву',
      reqLowerCase: 'Одну строчную букву',
      reqNumber: 'Одну цифру',
      reqSpecialChar: 'Один специальный символ',
      satisfied: ' (выполнено)',
      required: ' (требуется)',
      submit: 'Отправить',
    },
    editStory: {
      storyNotFound: 'История не найдена',
      failedToLoadStory: 'Не удалось загрузить историю',
      invalidJson: 'Недопустимый JSON в поле homepage_display',
      savedSuccessfully: 'История успешно сохранена!',
      failedToSave: 'Не удалось сохранить историю. Попробуйте ещё раз.',
      backToCreate: 'Назад к созданию',
      title: 'Редактировать историю',
      playLabel: 'Играть:',
      editLabel: 'Редактировать:',
      slugLabel: 'Слаг',
      titleLabel: 'Заголовок',
      contentLabel: 'Содержание',
      homepageDisplayLabel: 'Отображение на главной странице (JSON)',
      activeLabel: 'Активна',
      savingText: 'Сохранение...',
      saveChanges: 'Сохранить изменения',
      createdLabel: 'Создано: ',
      updatedLabel: 'Обновлено: ',
      sessionsLabel: 'Сессии: ',
      requestsLabel: 'Запросы: ',
    },
    createStory: {
      pleaseEnterPrompt: 'Пожалуйста, введите запрос',
      failedToCreate: 'Не удалось создать историю. Попробуйте ещё раз.',
      title: 'Создать новую историю',
      instructions:
        'В каком мире происходит история? Что произойдёт? Есть ли этапы, которых должны достичь игроки? Не переживайте, если текст черновой — ассистент аккуратно его отредактирует.',
      promptPlaceholder: 'Введите запрос для вашей истории...',
      createButton: 'Создать',
    },
  },

  // Portuguese
  pt: {
    common: {
      login: 'Entrar',
      logout: 'Sair',
      register: 'Registrar',
      pleaseLogin: 'Por favor faça login',
      cancel: 'Cancelar',
      copyUrlAriaLabel: 'Copiar URL',
      urlCopied: 'URL copiada para a área de transferência',
      loading: 'Carregando...',
      srLoadingText: 'Carregando, por favor aguarde...',
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
      failedToStart: 'Falha ao iniciar a aventura. Por favor, tente novamente.',
      failedToLoadGameState: 'Falha ao carregar o estado do jogo',
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
    header: {
      registerTitle: 'Registrar nova conta',
      walletInfoText:
        'Uma carteira Ethereum será criada e armazenada com segurança no seu dispositivo, protegida por sua biometria ou PIN graças ao',
      usernameLabel: 'Nome de usuário',
      usernamePlaceholder: 'Digite seu nome de usuário',
      usernameError:
        'O nome de usuário deve ter entre 3 e 50 caracteres e conter apenas letras, números, sublinhados e hífens. Deve começar e terminar com uma letra ou número.',
      createAccount: 'Criar conta',
      optionsAriaLabel: 'Opções',
      mainNavAriaLabel: 'Navegação principal',
      usernameRequiredTitle: 'Nome de usuário obrigatório',
      usernameRequiredDescription: 'Por favor, digite um nome de usuário para se registrar.',
      registrationFailedTitle: 'Falha no registro',
      registrationFailedDefaultDescription:
        'Não foi possível concluir o registro. Por favor, tente novamente.',
    },
    passwordModal: {
      passwordLabel: 'Senha',
      passwordPlaceholder: 'Digite sua senha',
      passwordRequiredTitle: 'Senha obrigatória.',
      passwordRequiredDescription: 'Por favor, digite sua senha.',
      weakPasswordTitle: 'Senha fraca.',
      weakPasswordDescription:
        'Por favor, use uma senha mais forte que atenda a todos os requisitos.',
      submissionErrorTitle: 'Erro de envio.',
      submissionErrorDefaultDescription: 'Ocorreu um erro inesperado.',
      requirementsNotMet: 'A senha não atende a todos os requisitos',
      strongPassword: 'Senha forte!',
      mustInclude: 'A senha deve incluir:',
      reqMinLength: 'Pelo menos 12 caracteres',
      reqUpperCase: 'Uma letra maiúscula',
      reqLowerCase: 'Uma letra minúscula',
      reqNumber: 'Um número',
      reqSpecialChar: 'Um caractere especial',
      satisfied: ' (satisfeito)',
      required: ' (obrigatório)',
      submit: 'Enviar',
    },
    editStory: {
      storyNotFound: 'História não encontrada',
      failedToLoadStory: 'Falha ao carregar a história',
      invalidJson: 'JSON inválido no campo homepage_display',
      savedSuccessfully: 'História salva com sucesso!',
      failedToSave: 'Falha ao salvar a história. Por favor, tente novamente.',
      backToCreate: 'Voltar para criar',
      title: 'Editar história',
      playLabel: 'Jogar:',
      editLabel: 'Editar:',
      slugLabel: 'Slug',
      titleLabel: 'Título',
      contentLabel: 'Conteúdo',
      homepageDisplayLabel: 'Exibição da página inicial (JSON)',
      activeLabel: 'Ativo',
      savingText: 'Salvando...',
      saveChanges: 'Salvar alterações',
      createdLabel: 'Criado em: ',
      updatedLabel: 'Atualizado em: ',
      sessionsLabel: 'Sessões: ',
      requestsLabel: 'Solicitações: ',
    },
    createStory: {
      pleaseEnterPrompt: 'Por favor, digite um prompt',
      failedToCreate: 'Falha ao criar a história. Por favor, tente novamente.',
      title: 'Criar nova história',
      instructions:
        'Em que mundo a história se passa? O que vai acontecer? Algum marco que você queira que os jogadores alcancem? Não se preocupe em deixar bruto — o assistente vai editar tudo com clareza.',
      promptPlaceholder: 'Digite um prompt para sua história...',
      createButton: 'Criar',
    },
  },

  // Urdu
  ur: {
    common: {
      login: 'لاگ ان',
      logout: 'لاگ آؤٹ',
      register: 'رجسٹر کریں',
      pleaseLogin: 'براہ کرم لاگ ان کریں',
      cancel: 'منسوخ کریں',
      copyUrlAriaLabel: 'یو آر ایل کاپی کریں',
      urlCopied: 'یو آر ایل کلپ بورڈ پر کاپی ہو گیا',
      loading: 'لوڈ ہو رہا ہے...',
      srLoadingText: 'لوڈ ہو رہا ہے، براہ کرم انتظار کریں...',
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
      failedToStart: 'مہم شروع کرنے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔',
      failedToLoadGameState: 'گیم کی حالت لوڈ کرنے میں ناکامی',
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
    header: {
      registerTitle: 'نیا اکاؤنٹ رجسٹر کریں',
      walletInfoText:
        'ایک ایتھیریم والیٹ بنایا جائے گا اور آپ کے ڈیوائس پر محفوظ طریقے سے محفوظ کیا جائے گا، جو آپ کے بائیومیٹرک یا پن کے ذریعے محفوظ ہوگا، شکریہ',
      usernameLabel: 'صارف نام',
      usernamePlaceholder: 'اپنا صارف نام درج کریں',
      usernameError:
        'صارف نام 3-50 حروف کا ہونا چاہیے اور اس میں صرف حروف، اعداد، انڈر سکور اور ہائیفن ہونے چاہئیں۔ اسے حرف یا عدد سے شروع اور ختم ہونا چاہیے۔',
      createAccount: 'اکاؤنٹ بنائیں',
      optionsAriaLabel: 'اختیارات',
      mainNavAriaLabel: 'مرکزی نیویگیشن',
      usernameRequiredTitle: 'صارف نام درکار ہے',
      usernameRequiredDescription: 'رجسٹریشن کے لیے براہ کرم صارف نام درج کریں۔',
      registrationFailedTitle: 'رجسٹریشن ناکام ہوگئی',
      registrationFailedDefaultDescription:
        'رجسٹریشن مکمل کرنے سے قاصر۔ براہ کرم دوبارہ کوشش کریں۔',
    },
    passwordModal: {
      passwordLabel: 'پاس ورڈ',
      passwordPlaceholder: 'اپنا پاس ورڈ درج کریں',
      passwordRequiredTitle: 'پاس ورڈ درکار ہے۔',
      passwordRequiredDescription: 'براہ کرم اپنا پاس ورڈ درج کریں۔',
      weakPasswordTitle: 'کمزور پاس ورڈ۔',
      weakPasswordDescription:
        'براہ کرم ایک مضبوط پاس ورڈ استعمال کریں جو تمام تقاضے پورے کرتا ہو۔',
      submissionErrorTitle: 'جمع کرانے میں خرابی۔',
      submissionErrorDefaultDescription: 'ایک غیر متوقع خرابی پیش آگئی۔',
      requirementsNotMet: 'پاس ورڈ تمام تقاضے پورے نہیں کرتا',
      strongPassword: 'مضبوط پاس ورڈ!',
      mustInclude: 'پاس ورڈ میں شامل ہونا چاہیے:',
      reqMinLength: 'کم از کم 12 حروف',
      reqUpperCase: 'ایک بڑا حرف',
      reqLowerCase: 'ایک چھوٹا حرف',
      reqNumber: 'ایک عدد',
      reqSpecialChar: 'ایک خاص کریکٹر',
      satisfied: ' (پورا ہوگیا)',
      required: ' (درکار ہے)',
      submit: 'جمع کروائیں',
    },
    editStory: {
      storyNotFound: 'کہانی نہیں ملی',
      failedToLoadStory: 'کہانی لوڈ کرنے میں ناکامی',
      invalidJson: 'homepage_display فیلڈ میں غلط JSON',
      savedSuccessfully: 'کہانی کامیابی سے محفوظ ہوگئی!',
      failedToSave: 'کہانی محفوظ کرنے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔',
      backToCreate: 'تخلیق پر واپس جائیں',
      title: 'کہانی میں ترمیم کریں',
      playLabel: 'کھیلیں:',
      editLabel: 'ترمیم:',
      slugLabel: 'سلگ',
      titleLabel: 'عنوان',
      contentLabel: 'مواد',
      homepageDisplayLabel: 'ہوم پیج ڈسپلے (JSON)',
      activeLabel: 'فعال',
      savingText: 'محفوظ ہو رہا ہے...',
      saveChanges: 'تبدیلیاں محفوظ کریں',
      createdLabel: 'تخلیق کردہ: ',
      updatedLabel: 'اپ ڈیٹ کردہ: ',
      sessionsLabel: 'سیشنز: ',
      requestsLabel: 'درخواستیں: ',
    },
    createStory: {
      pleaseEnterPrompt: 'براہ کرم ایک پرامپٹ درج کریں',
      failedToCreate: 'کہانی بنانے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔',
      title: 'نئی کہانی بنائیں',
      instructions:
        'کہانی کس دنیا میں رونما ہوتی ہے؟ کیا ہوگا؟ کیا آپ چاہتے ہیں کہ کھلاڑی کچھ خاص کامیابیاں حاصل کریں؟ کچے مواد کی فکر نہ کریں—اسسٹنٹ اسے صاف ستھرا بنا دے گا۔',
      promptPlaceholder: 'اپنی کہانی کے لیے ایک پرامپٹ درج کریں...',
      createButton: 'بنائیں',
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
