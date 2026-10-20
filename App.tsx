import { useMemo, useState } from 'react';
import { Compass, Clapperboard, GitBranch, Home, Search, Settings, Play, RotateCcw, Sparkles, Heart, MessageCircle, Share2, ChevronRight, Globe2 } from 'lucide-react';

type Choice = { label: string; next: string };
type Node = { title: string; scene: string; choices?: Choice[]; ending?: string; mood: string };
const story: Record<string, Node> = {
  start: {
    title: 'ঝড়ের রাতে শেষ ফোন',
    scene: 'রাত ১২টা ১৭ মিনিট। বাইরে ঝড়, চারদিকে বিদ্যুৎ নেই। তোমার ফোনে অচেনা নম্বর থেকে কল আসে। ওপাশ থেকে কাঁপা গলায় কেউ বলে— “দয়া করে, দরজাটা খুলবেন না!” ঠিক তখনই দরজায় তিনবার টোকা পড়ে।',
    mood: 'RAIN • MYSTERY • 03:12',
    choices: [{ label: 'ফোনে কথা চালিয়ে যাও', next: 'phone' }, { label: 'জানালার ফাঁক দিয়ে দেখো', next: 'window' }]
  },
  phone: {
    title: 'অচেনা কণ্ঠের সতর্কতা',
    scene: 'ওপাশের মানুষটি বলে, “আমি পাশের বাড়ির রাফি। তোমার দরজার সামনে যে দাঁড়িয়ে আছে, সে আমি নই।” দরজার নিচ দিয়ে ধীরে ধীরে একটি ভেজা কাগজ ঘরের ভেতরে ঢুকে আসে।',
    mood: 'CHOICE 02 • TENSION RISES',
    choices: [{ label: 'কাগজটি পড়ো', next: 'paper' }, { label: 'জরুরি সাহায্যে ফোন করো', next: 'help' }]
  },
  window: {
    title: 'জানালার ওপাশে',
    scene: 'জানালার ফাঁক দিয়ে তুমি কাউকে দেখতে পাও না। শুধু কাদায় ভেজা পায়ের ছাপ—যেগুলো দরজার কাছে এসে শেষ হয়েছে। হঠাৎ ফোনের স্ক্রিনে একটি বার্তা জ্বলে ওঠে: “পেছনে তাকিও না।”',
    mood: 'CHOICE 02 • SOMETHING IS WRONG',
    choices: [{ label: 'বার্তাটির উত্তর দাও', next: 'paper' }, { label: 'আলো জ্বালিয়ে প্রতিবেশীকে ডাকো', next: 'help' }]
  },
  paper: {
    title: 'কাগজের সত্য',
    scene: 'কাগজে লেখা: “আমি রাফি। বিদ্যুৎ যাওয়ার আগে তোমার বাড়িতে এসেছিলাম। দরজার বাইরে যে আছে, সে তোমার ছায়া দেখে নড়ছে।” তুমি বুঝতে পারো—দরজার নিচের ছায়াটি তোমার নড়াচড়ার সঙ্গে মিলে যাচ্ছে না।',
    mood: 'REVELATION • FINAL DECISION',
    choices: [{ label: 'পেছনের দরজা দিয়ে বেরিয়ে যাও', next: 'safe' }, { label: 'দরজার সামনে দাঁড়িয়ে প্রশ্ন করো', next: 'twist' }]
  },
  help: {
    title: 'সাহায্যের অপেক্ষা',
    scene: 'তুমি প্রতিবেশীকে ফোন করতেই সংযোগ ফিরে আসে। কয়েক সেকেন্ড পর বাইরে থেকে পরিচিত কণ্ঠ শোনা যায়— “আমি রাফি, ফোন ধরো!” কিন্তু তোমার ফোনে রাফির কল তখনও চলছে।',
    mood: 'SUSPENSE • FINAL DECISION',
    choices: [{ label: 'নিরাপদ ঘরে লুকাও', next: 'safe' }, { label: 'দরজার পিপহোল দিয়ে দেখো', next: 'twist' }]
  },
  safe: {
    title: 'সমাপ্তি: নিরাপদ সিদ্ধান্ত',
    scene: 'তুমি দরজা না খুলে নিরাপদ ঘরে চলে যাও এবং সাহায্য আসা পর্যন্ত অপেক্ষা করো। সকালে দেখা যায়, ঝড়ে পাশের বাড়ির পুরোনো আয়না ভেঙে দরজার সামনে পড়েছিল। রাতের ছায়ার রহস্য পুরোপুরি মেলে না—কিন্তু তুমি নিরাপদে আছ।',
    ending: 'SAFE ENDING',
    mood: 'ENDING 01 • YOU CHOSE CAUTION'
  },
  twist: {
    title: 'সমাপ্তি: শেষ প্রতিফলন',
    scene: 'পিপহোলের ভেতর তুমি নিজের মুখ দেখতে পাও—কিন্তু তোমার প্রতিফলন হাসছে, অথচ তুমি হাসছ না। হঠাৎ বিদ্যুৎ ফিরে আসে। দরজা অক্ষত, ঘর খালি। ফোনে একটি নতুন নোটিফিকেশন: “তুমি এবার অন্য পথ বেছে নিতে পারতে।”',
    ending: 'MYSTERY ENDING',
    mood: 'ENDING 02 • THE STORY CONTINUES'
  }
};

const copy = {
  bn: {
    tagline: 'তুমি শুধু দেখবে না। তুমি ঠিক করবে, এরপর কী হবে।',
    discover: 'আবিষ্কার', continue: 'গল্প চালিয়ে যাও', featured: 'আজকের ইন্টারঅ্যাকটিভ গল্প',
    choose: 'তোমার সিদ্ধান্ত কী?', paths: 'তোমার গল্পের পথ', reset: 'আবার শুরু', creator: 'Creator Studio',
    studioDesc: 'নিজের গল্প তৈরি করো—দৃশ্য যোগ করো, সিদ্ধান্ত দাও, একাধিক সমাপ্তি বানাও।',
    demo: 'প্রোটোটাইপ ডেমো', demoDesc: 'এটি প্রথম লোকাল ডেমো। এখনো অ্যাকাউন্ট, অনলাইন আপলোড বা সার্ভার যুক্ত হয়নি।',
    library: 'গল্প লাইব্রেরি', profile: 'প্রোফাইল', search: 'গল্প খুঁজুন…', create: 'নতুন গল্পের পরিকল্পনা',
    createDesc: 'পরবর্তী ধাপে এখানে scene editor ও branching node builder যোগ হবে।',
    home: 'হোম', explore: 'এক্সপ্লোর', settings: 'সেটিংস', ending: 'তুমি একটি সমাপ্তিতে পৌঁছেছ।',
    switch: 'English', next: 'পথ বেছে নাও'
  },
  en: {
    tagline: 'You don’t just watch. You decide what happens next.',
    discover: 'Discover', continue: 'Continue story', featured: 'Featured interactive story',
    choose: 'What will you do?', paths: 'Your story path', reset: 'Start over', creator: 'Creator Studio',
    studioDesc: 'Build your own story—add scenes, decisions, and multiple endings.',
    demo: 'Prototype demo', demoDesc: 'This is a local first demo. Accounts, online uploads, and a backend are not connected yet.',
    library: 'Story library', profile: 'Profile', search: 'Search stories…', create: 'Plan a new story',
    createDesc: 'A scene editor and branching node builder will be added here in a later step.',
    home: 'Home', explore: 'Explore', settings: 'Settings', ending: 'You reached an ending.',
    switch: 'বাংলা', next: 'Choose your path'
  }
};

export default function App() {
  const [lang, setLang] = useState<'bn'|'en'>('bn');
  const [nodeId, setNodeId] = useState('start');
  const [history, setHistory] = useState<string[]>([]);
  const [tab, setTab] = useState<'home'|'explore'|'studio'|'profile'>('home');
  const [search, setSearch] = useState('');
  const t = copy[lang];
  const node = story[nodeId];
  const currentPath = useMemo(() => history.map(id => story[id].title), [history]);

  function choose(next: string) {
    setHistory(h => [...h, nodeId]);
    setNodeId(next);
  }
  function reset() { setNodeId('start'); setHistory([]); }

  return <div className="app-shell">
    <header className="topbar">
      <button className="brand" onClick={() => {setTab('home'); reset();}} aria-label="Project Beyond home">
        <span className="brand-mark"><GitBranch size={20}/></span>
        <span><strong>BEYOND</strong><small>PROJECT / INTERACTIVE VIDEO</small></span>
      </button>
      <button className="lang-button" onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}><Globe2 size={16}/>{t.switch}</button>
    </header>

    <main>
      {tab === 'home' && <>
        <section className="hero">
          <div className="eyebrow"><Sparkles size={14}/> {t.demo}</div>
          <h1>{lang === 'bn' ? <>ভিডিওর ভবিষ্যৎ,<br/><span>তোমার সিদ্ধান্তে।</span></> : <>The future of video,<br/><span>in your hands.</span></>}</h1>
          <p>{t.tagline}</p>
          <div className="hero-pills"><span>BRANCHING STORIES</span><span>MULTIPLE ENDINGS</span></div>
        </section>

        <section className="story-layout">
          <div className="player-card">
            <div className={`scene-art ${node.ending ? 'ending-art' : ''}`}>
              <div className="art-orb orb-one"></div><div className="art-orb orb-two"></div>
              <div className="rain-lines"></div>
              <div className="scene-overlay"></div>
              <div className="scene-top"><span className="live-dot"></span> INTERACTIVE STORY <span className="scene-time">{node.ending ? 'END' : `SCENE ${history.length + 1}`}</span></div>
              <div className="scene-center"><div className="play-icon"><Play fill="currentColor" size={25}/></div><span>{node.ending || 'BEYOND ORIGINAL'}</span></div>
              <div className="scene-bottom"><span>CHOOSE YOUR REALITY</span><span>◈ 4K STORY WORLD</span></div>
            </div>
            <div className="player-info">
              <div className="mood">{node.mood}</div>
              <h2>{node.title}</h2>
              <p>{node.scene}</p>
              {!node.ending ? <div className="choices">
                <h3>{t.choose}</h3>
                {node.choices?.map((c, i) => <button className="choice-button" key={c.next} onClick={() => choose(c.next)}>
                  <span className="choice-number">0{i+1}</span><span>{c.label}</span><ChevronRight size={18}/>
                </button>)}
              </div> : <div className="ending-box"><Sparkles size={18}/><span>{t.ending}</span><button onClick={reset}><RotateCcw size={15}/>{t.reset}</button></div>}
              {history.length > 0 && <button className="back-button" onClick={() => {setNodeId(history[history.length-1]); setHistory(history.slice(0,-1));}}>← {lang === 'bn' ? 'আগের দৃশ্যে ফিরুন' : 'Back to previous scene'}</button>}
            </div>
          </div>
          <aside className="side-panel">
            <div className="side-heading"><div><span className="section-kicker">STORY MAP</span><h3>{t.paths}</h3></div><GitBranch size={20}/></div>
            <div className="path-map">
              <div className={`path-node ${nodeId==='start'?'active':''}`}><span className="node-dot"/>01 · {lang==='bn'?'শুরু':'Beginning'}</div>
              <div className="path-lines"><i/><i/></div>
              <div className="path-split"><div className={`path-node ${['phone','window'].includes(nodeId)?'active':''}`}><span className="node-dot"/>02A · {lang==='bn'?'সতর্কতা':'Warning'}</div><div className="path-node"><span className="node-dot"/>02B · {lang==='bn'?'জানালা':'Window'}</div></div>
              <div className="path-lines"><i/><i/></div>
              <div className={`path-node ${['paper','help'].includes(nodeId)?'active':''}`}><span className="node-dot"/>03 · {lang==='bn'?'সত্য প্রকাশ':'Reveal'}</div>
              <div className="path-lines"><i/><i/></div>
              <div className="ending-grid"><div className="ending-node">✦ {lang==='bn'?'নিরাপদ সমাপ্তি':'Safe ending'}</div><div className="ending-node">◈ {lang==='bn'?'রহস্যময় সমাপ্তি':'Mystery ending'}</div></div>
            </div>
            <div className="path-progress"><div><span>{lang==='bn'?'দৃশ্য অগ্রগতি':'Story progress'}</span><strong>{Math.min(history.length+1,5)}/5</strong></div><div className="progress-track"><i style={{width:`${Math.min((history.length+1)*20,100)}%`}}/></div></div>
            <div className="side-note"><Sparkles size={16}/><p>{lang==='bn'?'তোমার পছন্দ গল্পের পরবর্তী পথ বদলে দেয়। আবার শুরু করলে অন্য সমাপ্তিও দেখতে পারো।':'Your choice changes the next path. Restart to explore another ending.'}</p></div>
          </aside>
        </section>

        <section className="feature-strip">
          <div><span className="feature-icon purple"><GitBranch size={20}/></span><h3>{lang==='bn'?'একাধিক গল্পপথ':'Branching paths'}</h3><p>{lang==='bn'?'একটি গল্প, অনেক সম্ভাবনা':'One story, many possibilities'}</p></div>
          <div><span className="feature-icon blue"><Play size={20}/></span><h3>{lang==='bn'?'দর্শকের সিদ্ধান্ত':'Viewer choices'}</h3><p>{lang==='bn'?'দর্শকও গল্পের অংশ':'Become part of the story'}</p></div>
          <div><span className="feature-icon pink"><Sparkles size={20}/></span><h3>{lang==='bn'?'একাধিক সমাপ্তি':'Multiple endings'}</h3><p>{lang==='bn'?'আবার দেখে নতুন পথ বেছে নাও':'Replay and choose again'}</p></div>
        </section>
      </>}

      {tab === 'explore' && <section className="page-panel">
        <div className="eyebrow"><Compass size={14}/>{t.explore}</div><h1>{t.library}</h1><p>{t.tagline}</p>
        <label className="searchbox"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search}/></label>
        <button className="library-card" onClick={() => {setTab('home'); reset();}}><div className="library-art"><Play fill="currentColor"/></div><div><span className="mood">MYSTERY • INTERACTIVE</span><h3>ঝড়ের রাতে শেষ ফোন</h3><p>{lang==='bn'?'২টি সম্ভাব্য সমাপ্তি · সিদ্ধান্তভিত্তিক গল্প':'2 possible endings · Choose-your-path story'}</p></div><ChevronRight/></button>
        {search && !'ঝড়ের রাতে শেষ ফোন storm night last phone'.toLowerCase().includes(search.toLowerCase()) && <p className="muted">{lang==='bn'?'এই ডেমোতে আপাতত একটি গল্প আছে।':'Only one sample story is included in this demo.'}</p>}
      </section>}

      {tab === 'studio' && <section className="page-panel">
        <div className="eyebrow"><Clapperboard size={14}/>{t.creator}</div><h1>{t.create}</h1><p>{t.studioDesc}</p>
        <div className="studio-preview"><div className="studio-icon"><GitBranch size={30}/></div><h2>{lang==='bn'?'তোমার গল্পের গাছ তৈরি করো':'Build your story tree'}</h2><p>{t.createDesc}</p><div className="mini-flow"><span>START</span><i></i><span>CHOICE</span><i></i><span>ENDING A / B</span></div></div>
        <div className="notice"><Sparkles size={18}/><p>{lang==='bn'?'এই সংস্করণে Creator Studio-এর পরিকল্পনা দেখা যাচ্ছে; এখনো ভিডিও আপলোড বা গল্প সেভ করার সুবিধা চালু হয়নি।':'This version previews the Creator Studio concept; uploading video and saving stories are not active yet.'}</p></div>
      </section>}

      {tab === 'profile' && <section className="page-panel">
        <div className="eyebrow"><Settings size={14}/>{t.settings}</div><h1>{t.profile}</h1><div className="profile-card"><div className="avatar">B</div><div><h2>Beyond Explorer</h2><p className="muted">Guest mode · Local demo</p></div></div><div className="notice"><Globe2 size={18}/><p>{t.demoDesc}</p></div><button className="choice-button" onClick={()=>setLang(lang==='bn'?'en':'bn')}><Globe2 size={18}/><span>{lang==='bn'?'Switch interface to English':'ইন্টারফেস বাংলায় করুন'}</span><ChevronRight size={18}/></button></section>}
    </main>

    <nav className="bottom-nav">
      <button className={tab==='home'?'selected':''} onClick={()=>setTab('home')}><Home size={20}/><span>{t.home}</span></button>
      <button className={tab==='explore'?'selected':''} onClick={()=>setTab('explore')}><Compass size={20}/><span>{t.explore}</span></button>
      <button className={`create-nav ${tab==='studio'?'selected':''}`} onClick={()=>setTab('studio')}><span className="create-symbol"><GitBranch size={22}/></span><span>{t.creator}</span></button>
      <button className={tab==='profile'?'selected':''} onClick={()=>setTab('profile')}><Settings size={20}/><span>{t.settings}</span></button>
    </nav>
    <footer>PROJECT BEYOND <span>·</span> {lang==='bn'?'প্রথম প্রোটোটাইপ':'FIRST PROTOTYPE'} <span>·</span> NOT CONNECTED TO A SERVER</footer>
  </div>;
}