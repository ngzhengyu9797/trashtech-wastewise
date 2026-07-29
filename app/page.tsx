"use client";

import { FormEvent, useState } from "react";

type Language = "en" | "bm";
type Panel = "report" | "points" | null;

type Report = {
  id: string;
  category: string;
  location: string;
  status: string;
  tone: "resolved" | "verified" | "pending";
  when: string;
};

const copy = {
  en: {
    navHow: "How it works",
    navGuide: "Sorting guide",
    navPoints: "My points",
    language: "BM",
    eyebrow: "TRASHTECH  •  DESA MENTARI",
    heroTitle: "Cleaner Desa Mentari starts with one small report.",
    heroBody:
      "A low-data, Bahasa Melayu-friendly way for residents to report waste, sort with confidence and earn small household rewards.",
    report: "Report waste",
    guide: "Sorting guide",
    points: "My points",
    scan: "Scan to enter WasteWise",
    scanBody: "No new app. Just a quick QR link for the block.",
    demoQr: "DEMO QR",
    thisWeek: "Example pilot dashboard",
    reports: "reports verified",
    recycled: "recyclables collected",
    vouchers: "vouchers redeemed",
    simulated: "Simulated data for presentation demo",
    howEyebrow: "A simple loop for a busy block",
    howTitle: "One chat handles reporting, sorting and rewards.",
    howBody:
      "The prototype keeps every step light: residents use a QR entry, leaders verify the ticket, and clean recyclables become points.",
    step1Title: "Scan & report",
    step1Body: "Open the resident link from a noticeboard or lift lobby and send a photo, category and block location.",
    step2Title: "Check sorting",
    step2Body: "Use five Bahasa Melayu visual guides covering common recyclables and contaminated items.",
    step3Title: "Earn & redeem",
    step3Body: "Verified recyclable weight becomes points, then small vouchers for household essentials.",
    guideEyebrow: "Bahasa Melayu first",
    guideTitle: "Sort it right the first time.",
    guideBody: "Save these simple cards for the next trip to the collection point.",
    guideHint: "Tap a card to see the resident-friendly rule.",
    pulseEyebrow: "For residents + community leaders",
    pulseTitle: "A clearer hand-off from report to pickup.",
    pulseBody: "Leaders see what needs attention without collecting more personal data than the pilot needs.",
    pulseLabel: "Community pulse",
    pulseNote: "Demo queue · updated just now",
    impactTitle: "Why this matters",
    impactBody: "Cleaner source separation supports a healthier shared environment, more reliable pickups and visible community participation.",
    impactEnv: "Environment",
    impactSocial: "Social",
    impactEconomic: "Economic",
    footerNote: "A community-service prototype for planetary health",
    modalReportTitle: "Send a waste report",
    modalReportBody: "Keep it quick. The demo stores this only in your current session.",
    category: "What did you notice?",
    location: "Where is it?",
    notes: "Anything else?",
    notesPlaceholder: "e.g. bags beside the Block 8 chute",
    photo: "Add a photo (optional)",
    choosePhoto: "Choose image",
    consent: "I agree to share this report with the community pilot team.",
    submit: "Submit report",
    cancel: "Cancel",
    required: "Please choose a category and location first.",
    successTitle: "Report received",
    successBody: "Ticket added to the community queue. You earned +10 demo points for helping the block.",
    close: "Close",
    ticket: "Ticket",
    balance: "Your demo balance",
    pointsLabel: "points",
    pointsBody: "Redeem a small household voucher after a leader verifies your recyclable weight.",
    redeem: "Redeem",
    redeemed: "Voucher reserved for demo",
    notEnough: "Keep collecting",
    pointsDisclaimer: "Points and vouchers are simulated for the prototype.",
  },
  bm: {
    navHow: "Cara kerja",
    navGuide: "Panduan asing",
    navPoints: "Mata saya",
    language: "EN",
    eyebrow: "TRASHTECH  •  DESA MENTARI",
    heroTitle: "Desa Mentari yang lebih bersih bermula dengan satu laporan kecil.",
    heroBody:
      "Cara yang ringan data dan mesra Bahasa Melayu untuk melaporkan sampah, mengasingkan bahan dengan yakin dan menerima ganjaran rumah.",
    report: "Lapor sampah",
    guide: "Panduan asing",
    points: "Mata saya",
    scan: "Imbas untuk masuk WasteWise",
    scanBody: "Tiada aplikasi baharu. Hanya pautan QR ringkas untuk blok anda.",
    demoQr: "QR DEMO",
    thisWeek: "Papan pemuka contoh",
    reports: "laporan disahkan",
    recycled: "bahan dikumpul",
    vouchers: "baucar ditebus",
    simulated: "Data simulasi untuk demo pembentangan",
    howEyebrow: "Gelung mudah untuk komuniti",
    howTitle: "Satu chat mengurus laporan, asing dan ganjaran.",
    howBody:
      "Setiap langkah diringkaskan: penduduk imbas QR, pemimpin sahkan tiket dan bahan kitar semula menjadi mata.",
    step1Title: "Imbas & lapor",
    step1Body: "Buka pautan penduduk dari papan kenyataan atau lobi lif dan hantar foto, kategori serta lokasi blok.",
    step2Title: "Semak pengasingan",
    step2Body: "Gunakan lima panduan visual Bahasa Melayu untuk bahan kitar semula dan bahan tercemar.",
    step3Title: "Kumpul & tebus",
    step3Body: "Berat bahan yang disahkan menjadi mata, kemudian baucar kecil untuk keperluan rumah.",
    guideEyebrow: "Bahasa Melayu dahulu",
    guideTitle: "Asingkan dengan betul sejak awal.",
    guideBody: "Simpan kad ringkas ini sebelum ke tempat pengumpulan.",
    guideHint: "Tekan kad untuk melihat peraturan mudah.",
    pulseEyebrow: "Untuk penduduk + pemimpin komuniti",
    pulseTitle: "Serahan yang jelas daripada laporan ke kutipan.",
    pulseBody: "Pemimpin nampak perkara yang perlu tindakan tanpa mengumpul data peribadi berlebihan.",
    pulseLabel: "Nadi komuniti",
    pulseNote: "Giliran demo · dikemas kini sekarang",
    impactTitle: "Mengapa ia penting",
    impactBody: "Pengasingan dari punca membantu persekitaran bersama yang sihat, kutipan lebih teratur dan penyertaan komuniti yang jelas.",
    impactEnv: "Alam sekitar",
    impactSocial: "Sosial",
    impactEconomic: "Ekonomi",
    footerNote: "Prototaip khidmat komuniti untuk kesihatan planet",
    modalReportTitle: "Hantar laporan sampah",
    modalReportBody: "Ringkas sahaja. Demo ini menyimpan data dalam sesi semasa anda.",
    category: "Apa yang anda nampak?",
    location: "Di mana?",
    notes: "Catatan tambahan?",
    notesPlaceholder: "contoh: beg di sebelah pelongsor Blok 8",
    photo: "Tambah foto (pilihan)",
    choosePhoto: "Pilih imej",
    consent: "Saya bersetuju berkongsi laporan ini dengan pasukan perintis komuniti.",
    submit: "Hantar laporan",
    cancel: "Batal",
    required: "Sila pilih kategori dan lokasi dahulu.",
    successTitle: "Laporan diterima",
    successBody: "Tiket ditambah ke giliran komuniti. Anda mendapat +10 mata demo kerana membantu blok.",
    close: "Tutup",
    ticket: "Tiket",
    balance: "Baki demo anda",
    pointsLabel: "mata",
    pointsBody: "Tebus baucar rumah kecil selepas pemimpin mengesahkan berat bahan anda.",
    redeem: "Tebus",
    redeemed: "Baucar disimpan untuk demo",
    notEnough: "Terus kumpul",
    pointsDisclaimer: "Mata dan baucar adalah simulasi untuk prototaip.",
  },
} as const;

const sortingCards = [
  { icon: "▤", title: "Kadbod & kertas", rule: "Kering, rata dan bebas makanan.", tone: "mint" },
  { icon: "◌", title: "Plastik PET / HDPE", rule: "Kosongkan, bilas dan tekan penutup.", tone: "blue" },
  { icon: "◒", title: "Minyak masak terpakai", rule: "Sejukkan dan simpan dalam botol bertutup.", tone: "coral" },
  { icon: "▦", title: "E-waste kecil", rule: "Bateri dan kabel masuk kotak khas.", tone: "purple" },
  { icon: "×", title: "Tidak boleh dikitar semula", rule: "Lampin, tisu dan sisa makanan masuk tong biasa.", tone: "sand" },
];

const initialReports: Report[] = [
  { id: "TW-024", category: "Blocked chute", location: "Block 8 · Level 3", status: "Resolved", tone: "resolved", when: "Today · 9:10 AM" },
  { id: "TW-023", category: "Plastic bottles", location: "Community hall", status: "Verified", tone: "verified", when: "Yesterday · 4:35 PM" },
  { id: "TW-022", category: "Illegal dumping", location: "Lift lobby B", status: "Needs pickup", tone: "pending", when: "Yesterday · 1:20 PM" },
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [panel, setPanel] = useState<Panel>(null);
  const [submitted, setSubmitted] = useState(false);
  const [reportCount, setReportCount] = useState(18);
  const [points, setPoints] = useState(125);
  const [redeemedVoucher, setRedeemedVoucher] = useState("");
  const [formError, setFormError] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [form, setForm] = useState({ category: "", location: "", notes: "", consent: false });
  const [reports, setReports] = useState<Report[]>(initialReports);
  const t = copy[language];

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const openReport = () => {
    setSubmitted(false);
    setFormError("");
    setPanel("report");
  };

  const openPoints = () => {
    setRedeemedVoucher("");
    setPanel("points");
  };

  const closePanel = () => setPanel(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.category || !form.location) {
      setFormError(t.required);
      return;
    }
    const nextId = `TW-${String(reportCount + 7).padStart(3, "0")}`;
    setReports((current) => [
      {
        id: nextId,
        category: form.category,
        location: form.location,
        status: "New report",
        tone: "pending",
        when: "Just now",
      },
      ...current,
    ]);
    setReportCount((current) => current + 1);
    setPoints((current) => current + 10);
    setSubmitted(true);
    setFormError("");
  };

  const redeem = (cost: number, label: string) => {
    if (points < cost) {
      setRedeemedVoucher(t.notEnough);
      return;
    }
    setPoints((current) => current - cost);
    setRedeemedVoucher(`${t.redeemed}: ${label}`);
  };

  return (
    <main className="site-shell">
      <div className="announcement"><span className="announcement-dot" /> Pilot demo · Block 8 + community hall · 8 Aug 2026</div>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="TrashTech home">
          <span className="brand-symbol">♻</span>
          <span><strong>TrashTech</strong><small>WasteWise</small></span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#how-it-works">{t.navHow}</a>
          <a href="#sorting-guide">{t.navGuide}</a>
          <button type="button" onClick={openPoints}>{t.navPoints}</button>
        </nav>
        <button className="language-toggle" type="button" onClick={() => setLanguage((current) => current === "en" ? "bm" : "en")} aria-label="Switch language">
          <span className={language === "en" ? "active" : ""}>EN</span><span className="toggle-divider">/</span><span className={language === "bm" ? "active" : ""}>BM</span>
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-body">{t.heroBody}</p>
          <div className="hero-actions">
            <button className="btn btn-primary" type="button" onClick={openReport}><span>＋</span>{t.report}</button>
            <button className="btn btn-secondary" type="button" onClick={() => scrollTo("sorting-guide")}>{t.guide}</button>
            <button className="btn btn-quiet" type="button" onClick={openPoints}>{t.points}<span className="arrow">↗</span></button>
          </div>
          <div className="trust-row"><span>✓ {language === "en" ? "Low-data by design" : "Direka untuk data rendah"}</span><span>✓ {language === "en" ? "No new app" : "Tiada aplikasi baharu"}</span><span>✓ BM / EN</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-art"><img src="/desa-mentari-hero.png" alt="Residents using color-coded recycling bins in a Malaysian apartment community" /></div>
          <button className="qr-card" type="button" onClick={openReport} aria-label={t.scan}>
            <span className="qr-demo" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></span>
            <span className="qr-copy"><strong>{t.scan}</strong><small>{t.scanBody}</small><em>{t.demoQr} <span>↗</span></em></span>
          </button>
        </div>
      </section>

      <section className="metrics" aria-label={t.thisWeek}>
        <div className="metrics-heading"><span className="live-dot" />{t.thisWeek}<small>{t.simulated}</small></div>
        <div className="metric"><strong>{reportCount}</strong><span>{t.reports}</span></div>
        <div className="metric"><strong>42<span className="unit">kg</span></strong><span>{t.recycled}</span></div>
        <div className="metric"><strong>9</strong><span>{t.vouchers}</span></div>
      </section>

      <section className="section how-section" id="how-it-works">
        <div className="section-heading"><div><p className="eyebrow">{t.howEyebrow}</p><h2>{t.howTitle}</h2></div><p>{t.howBody}</p></div>
        <div className="steps-grid">
          <article className="step-card step-card-one"><span className="step-number">01</span><span className="step-icon">⌁</span><h3>{t.step1Title}</h3><p>{t.step1Body}</p><span className="step-link">{language === "en" ? "Open the report form" : "Buka borang laporan"} <button type="button" onClick={openReport} aria-label={t.report}>↗</button></span></article>
          <article className="step-card step-card-two"><span className="step-number">02</span><span className="step-icon">▤</span><h3>{t.step2Title}</h3><p>{t.step2Body}</p><span className="step-link">{language === "en" ? "See the five cards" : "Lihat lima kad"} <button type="button" onClick={() => scrollTo("sorting-guide")} aria-label={t.guide}>↗</button></span></article>
          <article className="step-card step-card-three"><span className="step-number">03</span><span className="step-icon">✦</span><h3>{t.step3Title}</h3><p>{t.step3Body}</p><span className="step-link">{language === "en" ? "View your balance" : "Lihat baki anda"} <button type="button" onClick={openPoints} aria-label={t.points}>↗</button></span></article>
        </div>
      </section>

      <section className="section guide-section" id="sorting-guide">
        <div className="section-heading guide-heading"><div><p className="eyebrow">{t.guideEyebrow}</p><h2>{t.guideTitle}</h2></div><p>{t.guideBody}<br /><span className="muted-note">{t.guideHint}</span></p></div>
        <div className="guide-grid">
          {sortingCards.map((card) => <article className={`guide-card guide-${card.tone}`} key={card.title}><div className="guide-card-top"><span className="guide-icon">{card.icon}</span><span className="guide-arrow">↗</span></div><h3>{card.title}</h3><p>{card.rule}</p></article>)}
        </div>
      </section>

      <section className="section pulse-section" id="community-pulse">
        <div className="section-heading"><div><p className="eyebrow">{t.pulseEyebrow}</p><h2>{t.pulseTitle}</h2></div><p>{t.pulseBody}</p></div>
        <div className="pulse-grid">
          <div className="queue-card"><div className="queue-header"><div><span className="mini-label">{t.pulseLabel}</span><h3>Block 8 queue</h3></div><span className="queue-status">● {t.pulseNote}</span></div><div className="report-list">{reports.slice(0, 3).map((report) => <div className="report-row" key={report.id}><span className={`status-dot ${report.tone}`} /><div className="report-main"><strong>{report.category}</strong><small>{report.location} · {report.when}</small></div><span className={`status-pill ${report.tone}`}>{report.status}</span></div>)}</div><button className="text-button" type="button" onClick={openReport}>{language === "en" ? "Add a new report" : "Tambah laporan baharu"} <span>＋</span></button></div>
          <aside className="impact-card"><span className="impact-spark">✦</span><p className="mini-label">{t.impactTitle}</p><h3>{t.impactBody}</h3><div className="impact-items"><div><span className="impact-icon">⌁</span><strong>{t.impactEnv}</strong><small>{language === "en" ? "Cleaner surroundings" : "Persekitaran lebih bersih"}</small></div><div><span className="impact-icon">◉</span><strong>{t.impactSocial}</strong><small>{language === "en" ? "More neighbours involved" : "Lebih ramai jiran terlibat"}</small></div><div><span className="impact-icon">✦</span><strong>{t.impactEconomic}</strong><small>{language === "en" ? "Useful small rewards" : "Ganjaran kecil berguna"}</small></div></div></aside>
        </div>
      </section>

      <section className="closing-cta"><div><p className="eyebrow">{language === "en" ? "Ready when the block is" : "Sedia apabila komuniti"}</p><h2>{language === "en" ? "Start with one photo. Build a cleaner habit together." : "Bermula dengan satu foto. Bina tabiat bersih bersama."}</h2></div><button className="btn btn-primary" type="button" onClick={openReport}>{t.report}<span>↗</span></button></section>
      <footer className="footer"><span>TrashTech / WasteWise</span><span>{t.footerNote}</span><span>Prototype · BM / EN</span></footer>

      {panel && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closePanel(); }}>
        <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button className="modal-close" type="button" onClick={closePanel} aria-label={t.close}>×</button>
          {panel === "report" && <>
            {!submitted ? <>
              <p className="eyebrow">{t.eyebrow}</p><h2 id="modal-title">{t.modalReportTitle}</h2><p className="modal-intro">{t.modalReportBody}</p>
              <form onSubmit={handleSubmit}>
                <label>{t.category}<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}><option value="">Select a category</option><option>Illegal dumping</option><option>Blocked chute</option><option>Plastic bottles</option><option>Food-contaminated recyclables</option></select></label>
                <label>{t.location}<select value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })}><option value="">Select a location</option><option>Block 8 · Level 3</option><option>Block 8 · Lift lobby</option><option>Community hall</option><option>Ground-floor collection point</option></select></label>
                <label>{t.notes}<textarea rows={3} value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder={t.notesPlaceholder} /></label>
                <label className="file-field"><span>{t.photo}</span><input type="file" accept="image/*" onChange={(event) => setPhotoName(event.target.files?.[0]?.name ?? "")} /><span className="file-button">{photoName || t.choosePhoto}</span></label>
                <label className="consent"><input type="checkbox" checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} /><span>{t.consent}</span></label>
                {formError && <p className="form-error" role="alert">{formError}</p>}
                <div className="modal-actions"><button className="btn btn-secondary" type="button" onClick={closePanel}>{t.cancel}</button><button className="btn btn-primary" type="submit">{t.submit}<span>↗</span></button></div>
              </form>
            </> : <div className="success-state"><span className="success-mark">✓</span><p className="eyebrow">{t.ticket} {reports[0]?.id}</p><h2 id="modal-title">{t.successTitle}</h2><p>{t.successBody}</p><button className="btn btn-primary" type="button" onClick={closePanel}>{t.close}</button></div>}
          </>}
          {panel === "points" && <div className="points-panel"><p className="eyebrow">TrashTech · WasteWise</p><h2 id="modal-title">{t.balance}</h2><div className="points-balance"><strong>{points}</strong><span>{t.pointsLabel}</span><small>＋10 after each verified report</small></div><p className="modal-intro">{t.pointsBody}</p><div className="voucher-list"><div className="voucher"><span className="voucher-icon">RM</span><div><strong>RM5 kedai runcit</strong><small>100 {t.pointsLabel}</small></div><button type="button" onClick={() => redeem(100, "RM5 kedai runcit")}>{t.redeem}</button></div><div className="voucher"><span className="voucher-icon">✦</span><div><strong>Household essentials</strong><small>180 {t.pointsLabel}</small></div><button type="button" onClick={() => redeem(180, "Household essentials")}>{t.redeem}</button></div></div>{redeemedVoucher && <p className="redeem-message" role="status">{redeemedVoucher}</p>}<p className="points-disclaimer">{t.pointsDisclaimer}</p></div>}
        </section>
      </div>}
    </main>
  );
}
