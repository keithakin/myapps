/* 暢遊澳門街 — seed data
 * fromDeck: true  = 簡報示例
 * fromDeck: false = 為使每個主題可左右劃撥而補上的真實地點路線
 */
window.MACA_DATA = {
  themes: [
    {
      id: "nearby",
      name: "附近路線",
      icon: "pin",
      color: "#32A3DD",
      headerText: "#ffffff",
      special: true
    },
    {
      id: "green",
      name: "綠色漫步",
      icon: "tree",
      color: "#82C75D",
      headerText: "#ffffff"
    },
    {
      id: "history",
      name: "歷史足跡",
      icon: "arch",
      color: "#F2DF90",
      headerText: "#454547"
    },
    {
      id: "culture",
      name: "文化創意",
      icon: "bulb",
      color: "#54C6C7",
      headerText: "#ffffff"
    },
    {
      id: "food",
      name: "美食之旅",
      icon: "swirl",
      color: "#DB618A",
      headerText: "#ffffff"
    }
  ],

  routes: [
    /* ---------- 簡報示例：大堂區輕鬆遊 ---------- */
    {
      id: "se-district",
      name: "大堂區輕鬆遊",
      shortName: "大堂區",
      theme: "history",
      fromDeck: true,
      nearby: true,
      fallbackDistance: 550,
      stopsSummary: "南灣大馬路 - 郵政總局 - 民政總署大樓",
      metrics: { walk: 70, energy: 3, food: 5, green: 2, heritage: 4 },
      hero: "img/photos/senado.jpg",
      photos: [
        "img/photos/senado.jpg",
        "img/photos/leal-senado.jpg",
        "img/photos/yellow-colonial.jpg",
        "img/photos/post-office-window.jpg",
        "img/photos/post-office-tower.jpg",
        "img/photos/post-office-window-full.jpg",
        "img/photos/leal-senado-door.jpg",
        "img/photos/senado-pink.jpg",
        "img/photos/senado-yellow.jpg"
      ],
      descriptions: [
        "此路線主要覆蓋「新馬路」一帶，「新馬路」的正式名稱是亞美打利庇盧大馬路，澳門市民稱它為「新馬路」，是市區的主要街道，連接南灣大馬路和內港。新馬路長度不足一英里，但處處可見土生葡人的生活痕跡。"
      ],
      seedComments: [
        {
          name: "馬先生",
          from: "北京",
          text: "這一條路線很有特色，可以看到當地的傳統文化；附近有很多小吃都很好吃。",
          date: "2013/06/15",
          energy: 3,
          food: 5,
          green: 2,
          heritage: 4
        }
      ],
      stops: [
        {
          name: "內港",
          lat: 22.1948,
          lng: 113.5378,
          photos: ["img/photos/senado-street.jpg"],
          intro: "內港是澳門開埠以來最重要的港口之一，昔日貨船、漁船沿碼頭一字排開，華洋商號林立。今日沿岸仍可見舊式倉碼頭和騎樓建築，是理解澳門作為港口城市的起點。"
        },
        {
          name: "爐石塘巷",
          lat: 22.1940,
          lng: 113.5394,
          photos: ["img/photos/senado-pink.jpg"],
          intro: "爐石塘巷位於內港與市區之間的舊街巷，名稱來自昔日在此開設的石塘與手工作坊。巷內樓宇緊湊，石仔路彎延，尚保留着早年澳門平民生活的尺度與節奏。"
        },
        {
          name: "福隆新街",
          lat: 22.1943,
          lng: 113.5404,
          photos: ["img/photos/senado-yellow.jpg"],
          intro: "福隆新街在十九至二十世紀曾是著名的風月區， 往日的紅窗花與窄長街道，記錄着另一面的澳門都市史。今時街道已改為商住混合，沿途仍可見當年的樓體比例與精緻鐵欄。"
        },
        {
          name: "民政總署",
          lat: 22.1936,
          lng: 113.5399,
          photos: ["img/photos/leal-senado.jpg", "img/photos/leal-senado-door.jpg"],
          intro: "民政總署大樓前身為市政廳，是澳門中區最重要的公共建築之一。大樓內設有畫廊、庭園和圖書館等，可供市民和遊客參觀使用。白色新古典主義立面與前方的波浪紋石仔路，是議事亭前地最為人熟悉的景色。"
        },
        {
          name: "議事亭前地",
          lat: 22.1934,
          lng: 113.5401,
          photos: ["img/photos/senado.jpg", "img/photos/senado-pavement.jpg", "img/photos/senado-white.jpg"],
          intro: "議事亭前地是澳門的城市客廳。廣場以黑白波浪紋葡式石仔路鋪砌，四周環繞仁慈堂、郵局與各色商舖。白日遊人如織，黃昏後燈光照在石地面上，更顯這座廣場的從容。"
        },
        {
          name: "郵政局",
          lat: 22.1936,
          lng: 113.5433,
          photos: [
            "img/photos/post-office-window.jpg",
            "img/photos/post-office-tower.jpg",
            "img/photos/post-office-window-full.jpg"
          ],
          intro: "接著往前，便是郵政總局（內設集郵專櫃，出售副有澳門特色的集郵品），每隔一段時間從郵政總局的鐘樓內會傳出不同的悅耳鐘聲；在郵政總局的前右方可見一座莊嚴的、具明顯的南歐建築藝術特色的建築物，為民政總署大樓（大樓內設有畫廊、庭園和圖書館等，可供市民和遊客參觀使用）。"
        },
        {
          name: "玫瑰堂",
          lat: 22.1940,
          lng: 113.5408,
          photos: ["img/photos/senado-white.jpg"],
          intro: "玫瑰堂又名板樟堂，是多明我會在澳門的教堂，以其鮮黃色外牆和巴洛克風格的室內裝飾聞名。教堂面向板樟堂前地，與四周的商業街道形成對比，是大堂區內重要的宗教與建築地標。"
        },
        {
          name: "南灣大馬路",
          lat: 22.1918,
          lng: 113.5432,
          photos: ["img/photos/yellow-colonial.jpg"],
          intro: "南灣大馬路沿昔日的南灣海岸而建，是連接新馬路與南灣湖一帶的主幹道。路旁多是二十世紀初的南歐風格樓宇，漫步其間，可以想像填海之前，海水曾就在街道的另一邊。"
        }
      ]
    },

    /* ---------- 簡報示例：東望洋綠色漫步 ---------- */
    {
      id: "guia-green",
      name: "東望洋綠色漫步",
      theme: "green",
      fromDeck: true,
      nearby: true,
      fallbackDistance: 200,
      stopsSummary: "觀音堂 - 松山纜車 - 東望洋炮台",
      metrics: { walk: 120, energy: 5, food: 3, green: 5, heritage: 3 },
      hero: "img/photos/guia-lighthouse.jpg",
      photos: [
        "img/photos/guia-lighthouse.jpg",
        "img/covers/green-hill.svg"
      ],
      descriptions: [
        "此路線由望廈的觀音堂出發，沿松山山徑或松山纜車上升，終點為東望洋炮台與松山燈塔。沿途林蔭覆蓋，可遠眺新口岸與珠江口，是澳門半島上綠化最豐、體能要求亦較高的步行路線之一。"
      ],
      seedComments: [],
      stops: [
        {
          name: "觀音堂",
          lat: 22.2103,
          lng: 113.5514,
          photos: ["img/covers/garden.svg"],
          intro: "觀音堂（普濟禪院）是澳門著名的佛教寺院，庭園清幽，石刻與百年古樹相映。1844年中美《望廈條約》曾在此簽署，寺院因此同時具有宗教與近代史意義，是這條綠色路線適宜的起點。"
        },
        {
          name: "松山纜車",
          lat: 22.1976,
          lng: 113.5494,
          photos: ["img/covers/green-hill.svg"],
          intro: "松山纜車連接山腳與東望洋山腰，是登塔較為省力的選擇。選擇步行的遊客可沿松山晨運徑上山，沿途樹木成蔭，偶有展望台可看城市與海面。纜車站附近亦是市民日常運動的地方。"
        },
        {
          name: "東望洋炮台",
          lat: 22.1965,
          lng: 113.5498,
          photos: ["img/photos/guia-lighthouse.jpg"],
          intro: "東望洋炮台位於松山之巔，炮台內的松山燈塔建於1865年，是中國海岸最古老的現代燈塔，亦是澳門的象徵之一。晴朗日子可從山巔環顧半島、氹仔以至珠江口，是這條路線的高潮所在。"
        }
      ]
    },

    /* ---------- 簡報示例：中葡交匯之旅 ---------- */
    {
      id: "luso-chinese",
      name: "中葡交匯之旅",
      theme: "culture",
      fromDeck: true,
      nearby: true,
      fallbackDistance: 400,
      stopsSummary: "議事亭前地 - 崗頂前地 - 聖若瑟修院及聖堂",
      metrics: { walk: 85, energy: 3, food: 4, green: 2, heritage: 5 },
      hero: "img/photos/senado.jpg",
      photos: [
        "img/photos/senado.jpg",
        "img/photos/leal-senado.jpg",
        "img/photos/senado-white.jpg",
        "img/photos/senado-yellow.jpg",
        "img/covers/culture.svg"
      ],
      descriptions: [
        "從議事亭前地起步，經過崗頂前地的劇院與圖書館，再到聖若瑟修院及聖堂，這條路線把澳門歷史城區中最能體現中葡文化交匯的公共空間串連起來。廣場、教堂、劇院與書院在咫尺之間並置，正是澳門城市性格的縮影。"
      ],
      seedComments: [],
      stops: [
        {
          name: "議事亭前地",
          lat: 22.1934,
          lng: 113.5401,
          photos: ["img/photos/senado.jpg", "img/photos/senado-pavement.jpg"],
          intro: "議事亭前地是澳門歷史城區的核心廣場，四周建築融合南歐與嶺南元素。從這裏出發，可以清楚感受到公共空間如何成為華洋共處的舞台。"
        },
        {
          name: "崗頂前地",
          lat: 22.1922,
          lng: 113.5410,
          photos: ["img/photos/senado-yellow.jpg", "img/covers/culture.svg"],
          intro: "崗頂前地是一處幽靜的三角形廣場，周圍有崗頂劇院、何東圖書館和聖奧斯定堂。劇院是中國現存最古老的西式劇院之一，圖書館的花園與藏書則見證了澳門的閱讀傳統。"
        },
        {
          name: "聖若瑟修院及聖堂",
          lat: 22.1917,
          lng: 113.5415,
          photos: ["img/photos/yellow-colonial.jpg"],
          intro: "聖若瑟修院及聖堂是天主教在東方培養神職人員的重要場所，聖堂的穹頂與裝飾具有明顯的巴洛克特徵。修院建築群依山而建，遊人在此可同時欣賞宗教藝術與山城街巷的層次。"
        }
      ]
    },

    /* ---------- 補上：白鴿巢公園綠意遊 ---------- */
    {
      id: "camoes-garden",
      name: "白鴿巢公園綠意遊",
      theme: "green",
      fromDeck: false,
      nearby: true,
      fallbackDistance: 900,
      stopsSummary: "白鴿巢公園 - 賈梅士石洞 - 基督教墳場",
      metrics: { walk: 60, energy: 2, food: 2, green: 5, heritage: 3 },
      hero: "img/covers/garden.svg",
      photos: ["img/covers/garden.svg", "img/covers/green-hill.svg"],
      descriptions: [
        "白鴿巢公園是澳門半島上最古老的公園之一，園內古樹參天，是市民散步、晨運的常用去處。路線把公園、賈梅士石洞與毗鄰的基督教墳場連成一圈輕鬆的綠色行程，體能要求不高，綠化含量卻十分豐富。"
      ],
      seedComments: [],
      stops: [
        {
          name: "白鴿巢公園",
          lat: 22.2015,
          lng: 113.5410,
          photos: ["img/covers/garden.svg"],
          intro: "白鴿巢公園原為葡萄牙人的宅邸花園，後闢作公開公園。園內小徑蜿蜒，滿布榕樹與石桌椅，春夏之間陰涼宜人，是市區少有的大型綠地。"
        },
        {
          name: "賈梅士石洞",
          lat: 22.2017,
          lng: 113.5412,
          photos: ["img/covers/green-hill.svg"],
          intro: "相傳葡萄牙詩人賈梅士曾在此石洞中寫下《葡國魂》的部分篇章。洞前立有詩人和詩句的紀念物，是文學愛好者必訪之處，也為這座公園添上一層人文色彩。"
        },
        {
          name: "基督教墳場",
          lat: 22.2009,
          lng: 113.5416,
          photos: ["img/covers/garden.svg"],
          intro: "基督教墳場與公園毗鄰，安葬了多位早期在澳門居住的新教徒與外籍人士。墓園規模不大，卻林木蒼郁、氣氛寧靜，是認識澳門作為國際港口歷史的另一扇窗。"
        }
      ]
    },

    /* ---------- 補上：大三巴歷史巡禮 ---------- */
    {
      id: "ruinas",
      name: "大三巴歷史巡禮",
      theme: "history",
      fromDeck: false,
      nearby: true,
      fallbackDistance: 700,
      stopsSummary: "大三巴牌坊 - 大炮台 - 哪吒廟",
      metrics: { walk: 90, energy: 3, food: 3, green: 2, heritage: 5 },
      hero: "img/covers/ruins.svg",
      photos: ["img/covers/ruins.svg", "img/photos/senado-street.jpg"],
      descriptions: [
        "大三巴牌坊是澳門最廣為人知的地標，原為聖保祿學院教堂的前壁。由此上至大炮台，再回到牌坊側的哪吒廟，一條短短的路線就把天主教書院、軍事炮台與中國廟宇放在同一視野裏，古蹟豐富度極高。"
      ],
      seedComments: [],
      stops: [
        {
          name: "大三巴牌坊",
          lat: 22.19752,
          lng: 113.54075,
          photos: ["img/covers/ruins.svg"],
          intro: "大三巴牌坊是1637年落成的聖保祿教堂前壁，經歷火災後只餘這面石壁，卻成為澳門的象徵。壁上的雕像與紋飾融合天主教圖像與東方元素，值得細看每一層的故事。"
        },
        {
          name: "大炮台",
          lat: 22.1970,
          lng: 113.5425,
          photos: ["img/covers/green-hill.svg"],
          intro: "大炮台建於十七世紀，用以保衛聖保祿學院一帶。今日炮台上是澳門博物館所在地，平台視野開闊，可俯瞰歷史城區的屋脊與遠方的橋樑。"
        },
        {
          name: "哪吒廟",
          lat: 22.19785,
          lng: 113.54095,
          photos: ["img/covers/culture.svg"],
          intro: "哪吒廟緊貼大三巴牌坊一側，規模雖小，卻清楚說明在同一坡地上，中國民間信仰與天主教建築如何比鄰而居。廟內供奉哪吒，香火延續至今。"
        }
      ]
    },

    /* ---------- 補上：望德堂文創徑 ---------- */
    {
      id: "st-lazarus",
      name: "望德堂文創徑",
      theme: "culture",
      fromDeck: false,
      nearby: true,
      fallbackDistance: 800,
      stopsSummary: "望德堂 - 瘋堂斜巷 - 塔石藝文區",
      metrics: { walk: 75, energy: 2, food: 3, green: 3, heritage: 4 },
      hero: "img/covers/culture.svg",
      photos: ["img/covers/culture.svg", "img/photos/senado-yellow.jpg", "img/photos/yellow-colonial.jpg"],
      descriptions: [
        "望德堂區是澳門近年文創氛圍最濃的街區之一。從望德堂出發，走過瘋堂斜巷的藝廊與工作室，再到塔石廣場與塔石藝文館，沿途可見舊區活化、藝術展覽與生活店舖並存，適合慢慢逛、慢慢看。"
      ],
      seedComments: [],
      stops: [
        {
          name: "望德堂",
          lat: 22.1987,
          lng: 113.5454,
          photos: ["img/covers/culture.svg"],
          intro: "望德聖母堂是澳門最早的教堂之一，曾服務於附近的痲瘋院，因而有「瘋堂」之稱。今日教堂粉黃色外牆成為拍照片段，也是望德堂區的地理與精神中心。"
        },
        {
          name: "瘋堂斜巷",
          lat: 22.1989,
          lng: 113.5458,
          photos: ["img/photos/senado-yellow.jpg"],
          intro: "瘋堂斜巷兩旁多是低層的舊式樓房，近年開設了畫廊、設計商店與茶室。斜巷不長，卻常有展覽與市集，是體驗澳門當代文化創意最輕鬆的一段路。"
        },
        {
          name: "塔石藝文區",
          lat: 22.1994,
          lng: 113.5470,
          photos: ["img/photos/yellow-colonial.jpg"],
          intro: "塔石廣場連同塔石藝文館、旁邊的公園與周邊校舍，構成一處開放的公共藝文空間。館內不時舉辦本地與國際展覽，廣場上則常見市民歇息、活動。"
        }
      ]
    },

    /* ---------- 補上：新馬路小吃巡禮 ---------- */
    {
      id: "new-road-food",
      name: "新馬路小吃巡禮",
      theme: "food",
      fromDeck: false,
      nearby: true,
      fallbackDistance: 500,
      stopsSummary: "新馬路 - 福隆新街 - 營地大街",
      metrics: { walk: 50, energy: 2, food: 5, green: 1, heritage: 3 },
      hero: "img/covers/food-street.svg",
      photos: [
        "img/covers/food-street.svg",
        "img/photos/senado-pink.jpg",
        "img/photos/senado-street.jpg"
      ],
      descriptions: [
        "新馬路一帶不單是購物街道，也是品嚐澳門街頭小吃的好地方。由亞美打利庇盧大馬路走到福隆新街與營地大街，沿途可以找到豬油糕、叉燒包、牛雜、雙皮奶與各式茶餐廳小食，美食豐富度極高，路程卻很輕鬆。"
      ],
      seedComments: [],
      stops: [
        {
          name: "新馬路",
          lat: 22.1939,
          lng: 113.5402,
          photos: ["img/photos/senado-street.jpg"],
          intro: "新馬路是市區的主要街道，兩旁商舖林立，既有老字號餅家，也有茶餐廳與手信店。一邊走一邊看櫥窗，本身已是這條美食路線的一部分。"
        },
        {
          name: "福隆新街",
          lat: 22.1943,
          lng: 113.5404,
          photos: ["img/photos/senado-pink.jpg"],
          intro: "福隆新街今日開設了不少風格小店與食檔，舊日風月區的建築外壳下，是另一種市井的熱鬧。在這裏可以稍作停留，尝尝街頭小食，再轉入更密集的營地大街。"
        },
        {
          name: "營地大街",
          lat: 22.1952,
          lng: 113.5412,
          photos: ["img/covers/food-street.svg"],
          intro: "營地大街及附近街巷是澳門人買餸、吃小吃的傳統地方。攤檔與小店密集，貨品與味道都很「本地」，想深入市民的日常飲食，這裏比觀光餐廳更有代表性。"
        }
      ]
    },

    /* ---------- 補上：官也街美食遊 ---------- */
    {
      id: "taipa-food",
      name: "官也街美食遊",
      theme: "food",
      fromDeck: false,
      nearby: true,
      fallbackDistance: 3200,
      stopsSummary: "官也街 - 龍環葡韻 - 氹仔舊城區",
      metrics: { walk: 80, energy: 2, food: 5, green: 3, heritage: 3 },
      hero: "img/covers/food-street.svg",
      photos: ["img/covers/food-street.svg", "img/covers/culture.svg", "img/covers/garden.svg"],
      descriptions: [
        "官也街是氹仔舊城區最著名的美食街道，杏仁餅、蛋撻、豬扒包的香氣沿街飄散。走完官也街，可續行至龍環葡韻的湖景與葡式房屋，再回到氹仔舊城的巷裡，把味覺與風景放在同一段行程之中。"
      ],
      seedComments: [],
      stops: [
        {
          name: "官也街",
          lat: 22.1530,
          lng: 113.5590,
          photos: ["img/covers/food-street.svg"],
          intro: "官也街兩旁盡是手信店、餅家與食肆，是遊客與本地人都會路過的美食街。建議預留時間慢慢試吃，不必急於一次買齊；街道本身不長，卻值得來回走一趟。"
        },
        {
          name: "龍環葡韻",
          lat: 22.1536,
          lng: 113.5595,
          photos: ["img/covers/culture.svg"],
          intro: "龍環葡韻住宅式博物館由一列湖畔葡式房屋組成，屋前的水池與小橋在黃昏時分特別動人。這裏綠化較多，正好在飽餐之後放慢腳步。"
        },
        {
          name: "氹仔舊城區",
          lat: 22.1524,
          lng: 113.5584,
          photos: ["img/covers/garden.svg"],
          intro: "氹仔舊城區保留了廟宇、巷道與低層住宅，生活氣味濃厚。從官也街散入這些巷裡，可以遇見小店、神廳與居民的日常，是這條美食路線的平靜收結。"
        }
      ]
    }
  ],

  promos: [
    {
      id: "guia-open",
      title: "松山燈塔開放參觀",
      body: "五月二十日為澳門港務局日，松山燈塔當天將開放參觀，想探索燈塔內的秘密，不容錯過，費用全免。",
      relatedRoute: "guia-green",
      relatedLabel: "相關路線...",
      photo: "img/photos/guia-lighthouse.jpg",
      fromDeck: true
    },
    {
      id: "senado-fair",
      title: "議事亭前地週末藝墟",
      body: "本週末於議事亭前地舉行本地手工與小食藝墟，匯集土生葡人糕點、手作與街頭表演。想順便走訪歷史城區，可接上大堂區輕鬆遊，把廣場、郵局與民政總署一次走完。",
      relatedRoute: "se-district",
      relatedLabel: "相關路線...",
      photo: "img/photos/senado.jpg",
      fromDeck: false
    },
    {
      id: "taipa-fest",
      title: "官也街美食節開始",
      body: "氹仔官也街一連三日舉行美食節，老字號與新店同時設攤，可品嚐豬扒包、蛋撻、馬介休以及季節限定小食。建議由官也街美食遊出發，再散步至龍環葡韻。",
      relatedRoute: "taipa-food",
      relatedLabel: "相關路線...",
      photo: "img/covers/food-street.svg",
      fromDeck: false
    }
  ]
};
