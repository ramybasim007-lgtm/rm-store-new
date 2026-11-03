import React, { useMemo, useState } from "react";
import "./App.css";

const componentCategories = [
  "كروت الشاشة", "المعالجات", "اللوحات الأم", "الرامات",
  "مزودات الطاقة", "وحدات التخزين", "قطع التبريد", "الكيسات",
];

const products = [
  { id: 1, name: "تجميعة Gaming احترافية", category: "التجميعات", specs: "Core i5 • RTX • 16GB RAM", price: 1250000, image: "https://placehold.co/600x450/171b27/ffffff?text=Gaming+PC" },
  { id: 2, name: "لابتوب Gaming", category: "اللابتوبات", specs: "Core i7 • RTX • 16GB RAM", price: 1450000, image: "https://placehold.co/600x450/171b27/ffffff?text=Gaming+Laptop" },
  { id: 3, name: "شاشة Gaming 27", category: "الشاشات", specs: "27 Inch • 165Hz", price: 350000, image: "https://placehold.co/600x450/171b27/ffffff?text=Gaming+Monitor" },
  { id: 4, name: "RTX 4060 8GB", category: "قطع الكمبيوتر", subcategory: "كروت الشاشة", specs: "Graphics Card • 8GB", price: 650000, image: "https://placehold.co/600x450/171b27/ffffff?text=GPU" },
  { id: 5, name: "Ryzen 5 5600", category: "قطع الكمبيوتر", subcategory: "المعالجات", specs: "6 Cores • 12 Threads", price: 185000, image: "https://placehold.co/600x450/171b27/ffffff?text=CPU" },
  { id: 6, name: "B550 Motherboard", category: "قطع الكمبيوتر", subcategory: "اللوحات الأم", specs: "AM4 • M.2", price: 175000, image: "https://placehold.co/600x450/171b27/ffffff?text=Motherboard" },
  { id: 7, name: "16GB DDR4 RAM", category: "قطع الكمبيوتر", subcategory: "الرامات", specs: "2×8GB • 3200MHz", price: 85000, image: "https://placehold.co/600x450/171b27/ffffff?text=RAM" },
  { id: 8, name: "650W Bronze PSU", category: "قطع الكمبيوتر", subcategory: "مزودات الطاقة", specs: "650W • 80+ Bronze", price: 95000, image: "https://placehold.co/600x450/171b27/ffffff?text=PSU" },
  { id: 9, name: "NVMe SSD 1TB", category: "قطع الكمبيوتر", subcategory: "وحدات التخزين", specs: "M.2 • 1TB", price: 110000, image: "https://placehold.co/600x450/171b27/ffffff?text=SSD" },
  { id: 10, name: "Liquid Cooler 240mm", category: "قطع الكمبيوتر", subcategory: "قطع التبريد", specs: "AIO • 240mm", price: 145000, image: "https://placehold.co/600x450/171b27/ffffff?text=Cooler" },
  { id: 11, name: "Gaming Case 4 Fans", category: "قطع الكمبيوتر", subcategory: "الكيسات", specs: "Mid Tower • ARGB", price: 125000, image: "https://placehold.co/600x450/171b27/ffffff?text=PC+Case" },
  { id: 12, name: "كيبورد ميكانيكي RGB", category: "الملحقات", specs: "RGB • Mechanical", price: 75000, image: "https://placehold.co/600x450/171b27/ffffff?text=Keyboard" },
  { id: 13, name: "تجميعة مستخدمة", category: "قسم المستخدم", specs: "مواصفات وسعر حسب الإعلان", price: 800000, image: "https://placehold.co/600x450/171b27/ffffff?text=Used+PC" },
];

const mainCategories = ["الكل", "التجميعات", "اللابتوبات", "الشاشات", "قطع الكمبيوتر", "الملحقات", "قسم المستخدم"];
const builderSlots = ["المعالجات", "اللوحات الأم", "الرامات", "كروت الشاشة", "وحدات التخزين", "قطع التبريد", "مزودات الطاقة", "الكيسات"];
const money = (value) => new Intl.NumberFormat("en-US").format(value) + " د.ع";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [componentsOpen, setComponentsOpen] = useState(false);
  const [activeSubcategory, setActiveSubcategory] = useState("");
  const [search, setSearch] = useState("");
  const [builderOpen, setBuilderOpen] = useState(false);
  const [build, setBuild] = useState({});

  const filteredProducts = useMemo(() => products.filter((product) => {
    const categoryMatch = activeCategory === "الكل" || product.category === activeCategory;
    const subcategoryMatch = activeCategory !== "قطع الكمبيوتر" || !activeSubcategory || product.subcategory === activeSubcategory;
    const searchMatch = `${product.name} ${product.specs} ${product.subcategory || ""}`.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && subcategoryMatch && searchMatch;
  }), [activeCategory, activeSubcategory, search]);

  const buildTotal = builderSlots.reduce((sum, slot) => {
    const selected = products.find((product) => product.id === Number(build[slot]));
    return sum + (selected?.price || 0);
  }, 0);

  const selectMainCategory = (category) => {
    setActiveCategory(category);
    setActiveSubcategory("");
    if (category !== "قطع الكمبيوتر") setComponentsOpen(false);
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const selectSubcategory = (subcategory) => {
    setActiveCategory("قطع الكمبيوتر");
    setActiveSubcategory(subcategory);
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const addProductToBuild = (product) => {
    if (product.subcategory && builderSlots.includes(product.subcategory)) {
      setBuild((current) => ({ ...current, [product.subcategory]: String(product.id) }));
      setBuilderOpen(true);
      document.getElementById("builder")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div dir="rtl" className="store">
      <style>{`
        *{box-sizing:border-box} body{margin:0;background:#0b0e14;color:#fff;font-family:Arial,sans-serif}.store{min-height:100vh;background:#0b0e14}.topbar{background:#111722;color:#d9e1ed;text-align:center;padding:10px;font-size:14px}.header{max-width:1250px;margin:auto;padding:22px 20px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}.logo{font-size:30px;font-weight:900;color:#39d5a3;letter-spacing:1px}.logo span{color:white}.search{flex:1;max-width:480px}.search input{width:100%;background:#171e2a;border:1px solid #303b4d;color:white;padding:14px 16px;border-radius:10px;outline:none;font-size:15px}.header-action{background:#39d5a3;color:#07130f;padding:13px 20px;border-radius:9px;font-weight:bold}.nav{border-top:1px solid #202938;border-bottom:1px solid #202938}.nav-inner{max-width:1250px;margin:auto;padding:0 20px;display:flex;gap:8px;align-items:center;overflow-x:auto}.nav button{white-space:nowrap;border:0;background:transparent;color:#c3ccda;padding:17px 13px;cursor:pointer;font-size:14px}.nav button.active,.nav button:hover{color:#39d5a3;border-bottom:2px solid #39d5a3}.component-nav{display:flex;align-items:center;gap:0}.component-nav .expand{font-size:20px;color:#39d5a3;padding:10px 12px;border:1px solid #2b594d;border-radius:8px;margin-inline-start:4px}.subnav{max-width:1250px;margin:auto;padding:12px 20px;display:flex;gap:8px;flex-wrap:wrap;background:#101722;border-bottom:1px solid #263243}.subnav button{border:1px solid #334253;background:#172130;color:#dce5ef;padding:9px 13px;border-radius:8px;cursor:pointer}.subnav button.active,.subnav button:hover{background:#39d5a3;color:#07130f;border-color:#39d5a3}.hero{max-width:1250px;margin:30px auto;padding:55px 35px;border-radius:18px;background:linear-gradient(110deg,#172b32,#182235 55%,#111722);border:1px solid #263a43}.hero small{color:#39d5a3;font-weight:bold}.hero h1{font-size:clamp(30px,5vw,48px);margin:18px 0 12px}.hero p{color:#b5c0ce;font-size:17px;line-height:1.8;max-width:650px}.hero button,.builder button,.build-add{background:#39d5a3;border:0;border-radius:9px;padding:13px 22px;font-weight:bold;cursor:pointer;color:#07130f}.features{max-width:1250px;margin:25px auto;padding:0 20px;display:grid;grid-template-columns:repeat(3,1fr);gap:15px}.feature{background:#141b27;border:1px solid #273243;padding:20px;border-radius:12px;color:#dce5ef}.feature b{color:#39d5a3;display:block;margin-bottom:8px}.products-section{max-width:1250px;margin:55px auto;padding:0 20px}.section-heading{display:flex;justify-content:space-between;align-items:center;gap:15px;margin-bottom:22px}.section-heading h2{margin:0;font-size:25px}.section-heading span{color:#39d5a3;font-size:14px}.products{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.product{background:#141b27;border:1px solid #273243;border-radius:13px;overflow:hidden}.product img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;background:#202938}.product-info{padding:16px}.product-category{color:#39d5a3;font-size:12px}.product h3{margin:9px 0;font-size:18px}.specs{color:#9eacbd;font-size:13px}.price{color:#39d5a3;font-size:19px;font-weight:bold;margin:17px 0}.product-actions{display:flex;gap:8px}.details{flex:1;background:#202b3a;color:white;border:0;padding:12px;border-radius:8px;cursor:pointer}.build-add{padding:10px 12px}.empty{color:#aab6c5;padding:35px;text-align:center;background:#141b27;border-radius:12px}.builder{max-width:1250px;margin:35px auto;padding:35px;background:#132a28;border:1px solid #285147;border-radius:16px}.builder h2{color:#39d5a3;margin-top:0}.builder p{color:#c4d4d0;line-height:1.8}.builder-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:20px 0}.builder-field label{display:block;color:#dce5ef;margin-bottom:7px;font-size:14px}.builder-field select{width:100%;background:#101b20;color:white;border:1px solid #42665e;padding:12px;border-radius:8px}.builder-total{font-size:22px;color:#39d5a3;font-weight:bold;margin:18px 0}.builder-hint{font-size:13px;color:#a8c2b9}.footer{margin-top:60px;background:#111722;padding:35px 20px;text-align:center;color:#9eacbd}.footer strong{color:#39d5a3;font-size:22px}@media(max-width:750px){.header{justify-content:center}.search{order:3;flex-basis:100%;max-width:none}.hero{margin:18px 12px;padding:35px 22px}.features{grid-template-columns:1fr}.products{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.product-info{padding:11px}.product h3{font-size:15px}.price{font-size:16px}.builder{margin:20px 12px;padding:25px 20px}.builder-grid{grid-template-columns:1fr}}@media(max-width:420px){.products{grid-template-columns:1fr}}
      `}</style>

      <div className="topbar">🚚 توصيل مجاني للطلبات فوق 100,000 دينار عراقي</div>
      <header className="header">
        <div className="logo">RM <span>STORE</span></div>
        <div className="search"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث عن منتج أو قطعة..." /></div>
        <div className="header-action">متجر الكمبيوتر</div>
      </header>

      <nav className="nav"><div className="nav-inner">
        {mainCategories.map((category) => category === "قطع الكمبيوتر" ? (
          <div className="component-nav" key={category}>
            <button className={activeCategory === category ? "active" : ""} onClick={() => selectMainCategory(category)}>{category}</button>
            <button className="expand" aria-label="فتح تصنيفات قطع الكمبيوتر" onClick={() => { setComponentsOpen((open) => !open); setActiveCategory("قطع الكمبيوتر"); setActiveSubcategory(""); }}>{componentsOpen ? "−" : "+"}</button>
          </div>
        ) : <button key={category} className={activeCategory === category ? "active" : ""} onClick={() => selectMainCategory(category)}>{category}</button>)}
      </div></nav>

      {componentsOpen && <div className="subnav" aria-label="تصنيفات قطع الكمبيوتر">
        <button className={!activeSubcategory ? "active" : ""} onClick={() => selectSubcategory("")}>كل قطع الكمبيوتر</button>
        {componentCategories.map((subcategory) => <button key={subcategory} className={activeSubcategory === subcategory ? "active" : ""} onClick={() => selectSubcategory(subcategory)}>{subcategory}</button>)}
      </div>}

      <section className="hero"><small>RM STORE ONLINE</small><h1>كل ما تحتاجه لعالم الكمبيوتر</h1><p>اكتشف أحدث تجميعات الكمبيوتر واللابتوبات وقطع الحاسوب والملحقات، واختر جهازك بالمواصفات التي تناسبك.</p><button onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>تسوق الآن</button></section>
      <section className="features"><div className="feature"><b>🚚 توصيل مجاني</b>للطلبات فوق 100,000 د.ع</div><div className="feature"><b>🛡️ ضمان</b>ضمان حسب نوع المنتج</div><div className="feature"><b>💻 كوّن جهازك</b>اختر القطع المناسبة لك</div></section>

      <section className="products-section" id="products">
        <div className="section-heading"><h2>{activeCategory === "الكل" ? "أحدث المنتجات" : activeSubcategory || activeCategory}</h2><span>{filteredProducts.length} منتجات</span></div>
        {filteredProducts.length ? <div className="products">{filteredProducts.map((product) => <article className="product" key={product.id}>
          <img src={product.image} alt={product.name} /><div className="product-info"><div className="product-category">{product.subcategory || product.category}</div><h3>{product.name}</h3><div className="specs">{product.specs}</div><div className="price">{money(product.price)}</div>
          <div className="product-actions"><button className="details" onClick={() => alert(`${product.name}\n${product.specs}\n${money(product.price)}`)}>عرض التفاصيل</button>{product.subcategory && <button className="build-add" onClick={() => addProductToBuild(product)}>أضف للتجميعة</button>}</div>
        </div></article>)}</div> : <div className="empty">ماكو منتجات مطابقة حالياً.</div>}
      </section>

      <section className="builder" id="builder"><h2>كوّن جهازك بنفسك</h2><p>اختَر القطع من نفس مخزون قسم قطع الكمبيوتر، وشوف السعر النهائي لتجميعتك يتحدث تلقائياً.</p>
        <button onClick={() => setBuilderOpen((open) => !open)}>{builderOpen ? "إخفاء أداة التجميع" : "ابدأ بتجميع جهازك"}</button>
        {builderOpen && <><div className="builder-grid">{builderSlots.map((slot) => {
          const choices = products.filter((product) => product.category === "قطع الكمبيوتر" && product.subcategory === slot);
          return <div className="builder-field" key={slot}><label htmlFor={`build-${slot}`}>{slot}</label><select id={`build-${slot}`} value={build[slot] || ""} onChange={(e) => setBuild((current) => ({ ...current, [slot]: e.target.value }))}><option value="">اختر {slot}</option>{choices.map((product) => <option key={product.id} value={product.id}>{product.name} — {money(product.price)}</option>)}</select></div>;
        })}</div><div className="builder-total">المجموع: {money(buildTotal)}</div><div className="builder-hint">هذه بيانات تجريبية للعرض حالياً؛ الربط الفعلي بالمخزون وقاعدة Supabase سيكون بمرحلة لاحقة.</div></>}
      </section>
      <footer className="footer"><strong>RM STORE</strong><p>متجرك لعالم الكمبيوتر والتقنيات</p><p>© 2026 RM STORE ONLINE</p></footer>
    </div>
  );
}
