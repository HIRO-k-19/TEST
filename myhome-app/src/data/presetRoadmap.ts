import type { Phase, Roadmap, Task } from '../types';

interface TaskTemplate {
  title: string;
  description?: string;
}

interface PhaseTemplate {
  name: string;
  description: string;
  emoji: string;
  tasks: TaskTemplate[];
}

/** 日本の注文住宅の標準的な流れに沿った8章・35クエスト */
const PHASE_TEMPLATES: PhaseTemplate[] = [
  {
    name: '第一章 情報収集・イメージづくり',
    description: 'まずは家づくりの全体像をつかみ、理想の暮らしを描く旅のはじまり。',
    emoji: '🏠',
    tasks: [
      {
        title: '家づくりの全体スケジュールを把握する',
        description: '相談から入居まで一般に1年〜1年半。逆算して動き出す時期を決める。',
      },
      {
        title: '家族の要望リストを作る',
        description: '「絶対ほしい(must)」と「できれば(want)」に分けると後の取捨選択が楽になる。',
      },
      {
        title: '住宅展示場・完成見学会に行く',
        description: 'モデルハウスは豪華仕様が多い点に注意。実寸感覚をつかむのが目的。',
      },
      {
        title: 'SNSやカタログで好みのテイストを集める',
        description: '画像を保存してフォルダ化しておくと、設計打合せで意図が伝わりやすい。',
      },
    ],
  },
  {
    name: '第二章 資金計画',
    description: '冒険の軍資金を整える章。無理のない予算が成功のカギ。',
    emoji: '💰',
    tasks: [
      {
        title: '世帯収入と貯蓄から総予算を決める',
        description: '返済負担率は手取りの25%以内が目安。建物以外に諸費用が1割程度かかる。',
      },
      {
        title: '自己資金（頭金＋諸費用分）を確認する',
        description: '引越し・家具家電・外構費用も忘れずに見込んでおく。',
      },
      {
        title: '住宅ローンの種類を比較する',
        description: '変動金利・固定金利・フラット35。金利だけでなく団信の内容も比較する。',
      },
      {
        title: '住宅ローンの事前審査（仮審査）を申し込む',
        description: '複数の銀行に出すと条件を比較できる。土地購入前に通しておくと強い。',
      },
      {
        title: '補助金・減税制度を調べる',
        description: '住宅ローン減税、子育て世帯向け支援、自治体独自の補助金など。年度で変わるため最新情報を確認。',
      },
    ],
  },
  {
    name: '第三章 土地探し',
    description: '冒険の舞台となる土地を探す章。焦らず、でも好機は逃さず。',
    emoji: '🗺️',
    tasks: [
      {
        title: '希望エリアと通勤・通学条件を整理する',
        description: '優先順位（駅距離・学区・実家との距離など）を家族で共有しておく。',
      },
      {
        title: '不動産会社・ハウスメーカーに土地探しを依頼する',
        description: '建築会社経由だと建築条件や予算と合わせて提案してもらえる。',
      },
      {
        title: '候補地の用途地域・建ぺい率・容積率を確認する',
        description: '建てられる家の大きさが決まる重要項目。市区町村の都市計画図で確認できる。',
      },
      {
        title: 'ハザードマップで災害リスクを確認する',
        description: '洪水・土砂災害・液状化など。国土交通省ハザードマップポータルが便利。',
      },
      {
        title: '時間帯や曜日を変えて現地を見に行く',
        description: '朝の交通量、夜の街灯、雨の日の水はけなど、昼間だけでは分からない情報を集める。',
      },
      {
        title: '土地の売買契約・手付金の支払い',
        description: '契約前に重要事項説明をしっかり確認。手付金は売買代金の5〜10%が一般的。',
      },
    ],
  },
  {
    name: '第四章 会社選び',
    description: 'ともに家を築く仲間（ハウスメーカー・工務店）を選ぶ章。',
    emoji: '🏢',
    tasks: [
      {
        title: '候補会社を3〜5社に絞る',
        description: '多すぎると比較疲れする。工法・価格帯・デザインの方向性で絞り込む。',
      },
      {
        title: '相見積もり・プラン提案を依頼する',
        description: '同じ要望リストを渡して条件を揃えると比較しやすい。',
      },
      {
        title: '構造・断熱性能を比較する',
        description: '耐震等級3、断熱等級6以上、UA値などの数値で比較。営業トークより仕様書。',
      },
      {
        title: '保証・アフターサービスの内容を確認する',
        description: '構造躯体の保証年数、定期点検の頻度と費用、倒産時の保証を確認。',
      },
      {
        title: '1社に決定し見積もり内容を最終確認する',
        description: '「別途工事」「概算」の項目が残っていないか確認。値引きより仕様の妥当性。',
      },
    ],
  },
  {
    name: '第五章 契約',
    description: '重要な契りを交わす章。書類はじっくり読み込むべし。',
    emoji: '📝',
    tasks: [
      {
        title: '工事請負契約の内容を確認する',
        description: '金額・工期・支払い条件・遅延時の違約条項。不明点は契約前に必ず質問。',
      },
      {
        title: '工事請負契約を締結し契約金を支払う',
        description: '契約金は工事費の10%程度が一般的。印紙税もかかる。',
      },
      {
        title: '住宅ローンの本審査を申し込む',
        description: '事前審査と同条件でも、転職や新たな借入があると否決されることがあるので注意。',
      },
      {
        title: 'つなぎ融資・分割実行の要否を確認する',
        description: '注文住宅は着工金・中間金が必要。ローン実行前の支払いをどう賄うか銀行と相談。',
      },
    ],
  },
  {
    name: '第六章 設計・仕様決め',
    description: '住まいの細部を決める、楽しくも決断の連続の章。',
    emoji: '📐',
    tasks: [
      {
        title: '間取りの詳細打ち合わせをする',
        description: '収納量・家事動線・コンセント位置は住んでからの後悔ポイント上位。生活を具体的に想像する。',
      },
      {
        title: '長期優良住宅・ZEH認定の取得を検討する',
        description: '税制優遇や補助金の対象になる。申請費用と工期への影響も確認。',
      },
      {
        title: '外装・内装・設備の仕様を決める',
        description: 'キッチン・浴室・トイレはショールームで実物確認を。標準仕様とオプションの差額に注意。',
      },
      {
        title: '地盤調査の結果と地盤改良の要否を確認する',
        description: '改良工事は数十万〜百万円超の追加費用になることも。予備費を確保しておく。',
      },
      {
        title: '最終図面・最終見積もりを承認する',
        description: 'ここが変更のラストチャンス。着工後の変更は割高になり工期も延びる。',
      },
      {
        title: '建築確認申請の完了を確認する',
        description: '確認済証が下りてから着工できる。長期優良住宅などの認定は申請順序に注意。',
      },
    ],
  },
  {
    name: '第七章 着工・工事',
    description: 'いよいよ家が形になっていく章。現場との対話を大切に。',
    emoji: '🔨',
    tasks: [
      {
        title: '地鎮祭の実施を決め、近隣に挨拶する',
        description: '地鎮祭は任意（3〜5万円程度）。近隣挨拶は工事トラブル予防に効果大。',
      },
      {
        title: '基礎工事の状況を見学する',
        description: '配筋検査のタイミングで見ると安心。写真を撮っておくと記録になる。',
      },
      {
        title: '上棟を迎える',
        description: '上棟式は簡略化が主流。職人さんへの差し入れは気持ちで十分。',
      },
      {
        title: '中間検査・現場立ち会いをする',
        description: '電気配線の位置確認は壁を閉じる前が勝負。図面と現場のズレをチェック。',
      },
      {
        title: '火災保険・地震保険を契約する',
        description: '引渡し日から有効になるよう手配。ローン契約の条件になっていることが多い。',
      },
    ],
  },
  {
    name: '最終章 完成・引渡し・入居',
    description: '冒険のクライマックス。新しい暮らしの扉を開けよう。',
    emoji: '🔑',
    tasks: [
      {
        title: '施主検査（内覧会）で不具合をチェックする',
        description: '傷・汚れ・建具の動き・設備の動作を確認。指摘は引渡し前に是正してもらう。',
      },
      {
        title: '残金決済・引渡しを受ける',
        description: '鍵・保証書・取扱説明書一式を受領。登記もこのタイミングで行われる。',
      },
      {
        title: '引越しとライフラインの手続きをする',
        description: '電気・ガス・水道・ネットの開通手配。ガス開栓は立ち会いが必要。',
      },
      {
        title: '転居届・住所変更の手続きをする',
        description: '転入届は引越しから14日以内。免許証・銀行・カード類の住所変更も忘れずに。',
      },
      {
        title: '入居翌年に住宅ローン減税の確定申告をする',
        description: '初年度は会社員でも確定申告が必要。2年目以降は年末調整でOK。',
      },
    ],
  },
];

function createTask(template: TaskTemplate, now: string): Task {
  return {
    id: crypto.randomUUID(),
    title: template.title,
    description: template.description,
    status: 'todo',
    memo: '',
    isCustom: false,
    createdAt: now,
  };
}

export function createInitialRoadmap(): Roadmap {
  const now = new Date().toISOString();
  const phases: Phase[] = PHASE_TEMPLATES.map((p) => ({
    id: crypto.randomUUID(),
    name: p.name,
    description: p.description,
    emoji: p.emoji,
    tasks: p.tasks.map((t) => createTask(t, now)),
    memo: '',
  }));
  return { schemaVersion: 1, phases, updatedAt: now };
}
