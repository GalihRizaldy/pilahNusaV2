# 🌿 PilahNusa AI — Implementation Plan
**Waste Classifier System | Frontend Implementation**
_React.js · JavaScript · Mobile-First_

---

## 📌 Overview

PilahNusa AI adalah aplikasi web berbasis React.js untuk klasifikasi sampah otomatis menggunakan AI. Pengguna dapat menscan atau mengupload foto sampah, mendapatkan klasifikasi otomatis, informasi daur ulang, dan melihat riwayat aktivitas scan.

---

## 🎨 Design System

### Brand Identity
| Token | Value |
|---|---|
| Primary Green | `#22C55E` |
| Dark Green | `#16A34A` |
| Light Green (bg) | `#F0FDF4` |
| White Card | `#FFFFFF` |
| Background | `#F8FAFC` |
| Text Primary | `#111827` |
| Text Secondary | `#6B7280` |
| Border Radius Card | `20px` |
| Border Radius Button | `14px` |

### Typography
```css
/* Heading */
font-family: 'Plus Jakarta Sans', sans-serif;
font-weight: 700;

/* Body */
font-family: 'DM Sans', sans-serif;
font-weight: 400–500;
```

### Design Principles (berdasarkan screenshot)
- **Clean & Airy** — Banyak whitespace, card-based layout dengan `box-shadow` halus
- **Green-forward** — Dominasi warna hijau sebagai brand color lingkungan
- **Mobile-first** — Layout harus responsif sempurna di 375px–430px
- **Rounded UI** — Semua elemen menggunakan border-radius besar (16–24px)
- **Subtle shadows** — `box-shadow: 0 4px 20px rgba(0,0,0,0.06)` untuk depth
- **Stat cards** — Badge kecil berisi angka (95% Akurasi, 10+ Kategori, Fast)
- **Icon-first navigation** — Sidebar/bottom nav menggunakan icon + label
- **Floating accents** — Elemen dekoratif kecil (daun, recycle icon) di hero section

### Component Design Reference

```
┌─────────────────────────────────┐
│  Sidebar (desktop)              │
│  ┌──────────────────────────┐   │
│  │ Logo + App Name          │   │
│  ├──────────────────────────┤   │
│  │ 🏠 Beranda  [active pill]│   │
│  │ 📷 Scan                  │   │
│  │ 🕐 Riwayat               │   │
│  │ ❓ Cara Menggunakan      │   │
│  └──────────────────────────┘   │
│                                 │
│  Hero Section                   │
│  ┌────────────┐ ┌─────────────┐ │
│  │ Title +    │ │  Visual     │ │
│  │ Subtitle   │ │  Card       │ │
│  │ CTA Buttons│ │  + Stats    │ │
│  └────────────┘ └─────────────┘ │
└─────────────────────────────────┘

Mobile: Bottom Tab Navigation
┌─────────────────────────────────┐
│          Content Area           │
├─────────────────────────────────┤
│  🏠 Beranda | 🕐 Riwayat | 📖 Panduan │
└─────────────────────────────────┘
```

---

## 🗂 Project Structure

```
pilahnusa-ai/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx           # Desktop sidebar nav
│   │   │   ├── BottomNav.jsx         # Mobile bottom tab nav
│   │   │   └── Layout.jsx            # Root layout wrapper
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.jsx            # Reusable button (primary/outline/ghost)
│   │   │   ├── Card.jsx              # Base card container
│   │   │   ├── Badge.jsx             # Status/category badge
│   │   │   ├── StatCard.jsx          # Stat chip (95% Akurasi)
│   │   │   ├── StepCard.jsx          # How-to step card (Cara Menggunakan)
│   │   │   ├── Toast.jsx             # Notification toast
│   │   │   └── Loader.jsx            # Scanning animation loader
│   │   │
│   │   ├── scanner/
│   │   │   ├── CameraCapture.jsx     # Camera access + live preview
│   │   │   ├── ImageUpload.jsx       # File upload dari galeri
│   │   │   ├── ScanResult.jsx        # Hasil klasifikasi AI
│   │   │   └── ScanButton.jsx        # CTA scan sekarang
│   │   │
│   │   ├── result/
│   │   │   ├── WasteInfoCard.jsx     # Info lengkap sampah
│   │   │   ├── CategoryBadge.jsx     # Kategori sampah (organik, anorganik, dll)
│   │   │   ├── RecyclingTips.jsx     # Tips daur ulang
│   │   │   └── DisposalGuide.jsx     # Panduan pembuangan
│   │   │
│   │   └── history/
│   │       ├── HistoryList.jsx       # Daftar riwayat scan
│   │       ├── HistoryItem.jsx       # Single item riwayat
│   │       └── EmptyHistory.jsx      # State kosong
│   │
│   ├── pages/
│   │   ├── HomePage.jsx              # Beranda / landing
│   │   ├── ScanPage.jsx              # Halaman scan kamera/upload
│   │   ├── ResultPage.jsx            # Hasil klasifikasi
│   │   ├── HistoryPage.jsx           # Riwayat scan
│   │   └── GuidePage.jsx             # Cara menggunakan
│   │
│   ├── hooks/
│   │   ├── useCamera.js              # Hook untuk akses kamera
│   │   ├── useClassifier.js          # Hook untuk AI classification API
│   │   └── useHistory.js             # Hook untuk localStorage riwayat
│   │
│   ├── services/
│   │   └── aiService.js              # Integrasi Claude AI API (Anthropic)
│   │
│   ├── data/
│   │   └── wasteCategories.js        # Data kategori & info sampah
│   │
│   ├── styles/
│   │   ├── globals.css               # CSS variables & reset
│   │   └── animations.css            # Keyframe animations
│   │
│   ├── utils/
│   │   ├── imageUtils.js             # Compress & convert gambar
│   │   └── storageUtils.js           # LocalStorage helpers
│   │
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

---

## 📄 Pages & Features

### 1. 🏠 HomePage (`/`)

**Tujuan:** Landing page yang menyambut pengguna dan menjelaskan fitur utama.

**Sections:**
- Hero dengan ilustrasi visual card hijau (mirip screenshot)
- Stat badges: `95% Akurasi`, `10+ Kategori`, `Fast Proses`
- CTA button: `Scan Sekarang` + `Upload dari Galeri`
- Feature highlights: AI Powered · Ramah Lingkungan · Mudah Digunakan
- Bottom card: "Bantu Lingkungan" dengan icon daun

**Design Detail:**
```
Hero Card (kanan):
- Background: white card dengan rounded-2xl
- Circle hijau besar di tengah dengan icon layers
- Floating icons: recycle (kiri atas), leaf (kanan bawah)
- Stat row di bawah: 3 kolom, teks hijau bold

CTA Buttons:
- Primary: bg-green-500, text white, icon kamera
- Outline: border green, text green, icon upload
```

---

### 2. 📷 ScanPage (`/scan`)

**Tujuan:** Mengambil foto sampah via kamera atau upload dari galeri.

**States:**
1. **Idle** — Dua tombol pilihan: Kamera / Upload
2. **Camera Active** — Live preview + tombol capture
3. **Image Preview** — Tampilkan foto + tombol `Analisis` / `Ulangi`
4. **Analyzing** — Loading animation + teks "Menganalisis sampah..."

**Components yang digunakan:**
- `CameraCapture.jsx` — `getUserMedia()` API
- `ImageUpload.jsx` — `<input type="file" accept="image/*">`
- `Loader.jsx` — Pulsing green animation
- `Button.jsx`

---

### 3. 📊 ResultPage (`/result/:id`)

**Tujuan:** Menampilkan hasil klasifikasi AI secara lengkap.

**Informasi yang ditampilkan:**
- Foto sampah yang discan (thumbnail)
- Nama sampah (misal: "Botol Plastik PET")
- Kategori (Anorganik / Organik / B3 / Elektronik)
- Confidence score (persentase keyakinan AI)
- Deskripsi singkat sampah
- Cara pembuangan yang benar
- Tips daur ulang (3–5 poin)
- Estimasi waktu terurai
- Nilai ekonomi daur ulang (jika ada)

**Design Detail:**
```
Result Card Layout:
┌──────────────────────────┐
│  [Foto]  Botol Plastik   │
│          PET             │
│          🟢 Anorganik    │
│          Confidence: 94% │
├──────────────────────────┤
│  📋 Deskripsi            │
├──────────────────────────┤
│  ♻️ Tips Daur Ulang      │
│  1. ...                  │
│  2. ...                  │
├──────────────────────────┤
│  🗑️ Cara Pembuangan      │
└──────────────────────────┘
```

---

### 4. 🕐 HistoryPage (`/history`)

**Tujuan:** Menampilkan daftar riwayat scan sebelumnya.

**Features:**
- List item: thumbnail + nama + kategori + tanggal
- Tap untuk membuka detail hasil
- Empty state dengan ilustrasi & CTA scan pertama
- Data disimpan di `localStorage`

---

### 5. 📖 GuidePage (`/guide`)

**Tujuan:** Panduan penggunaan aplikasi step-by-step.

**Steps (sesuai screenshot):**
1. Buka aplikasi PilahNusa AI
2. Tekan tombol Scan atau Upload
3. Tunggu hasil analisis AI
4. Baca informasi & tips daur ulang
5. Simpan atau bagikan hasilnya

**Design Detail (sesuai screenshot):**
```
StepCard:
- Nomor step di pojok kanan atas (gray badge)
- Icon di kiri (teal/green soft background)
- Bold title + deskripsi singkat
- Card rounded-2xl dengan shadow halus
```

---

## 🧩 Component Specifications

### `Button.jsx`
```jsx
// Variants: primary | outline | ghost
// Sizes: sm | md | lg
// Props: icon, loading, disabled, fullWidth
<Button variant="primary" icon={<CameraIcon />} fullWidth>
  Scan Sekarang
</Button>
```

### `Card.jsx`
```jsx
// Reusable card dengan padding, shadow, border-radius
// Props: className, onClick, hoverable
```

### `StatCard.jsx`
```jsx
// Komponen untuk "95% Akurasi"
// Props: value, label, color
```

### `StepCard.jsx`
```jsx
// Komponen step panduan
// Props: stepNumber, icon, title, description
```

### `CategoryBadge.jsx`
```jsx
// Badge warna berdasarkan kategori sampah
// organik → green, anorganik → blue, B3 → red, elektronik → orange
```

---

## 🔌 AI Integration

### Service: `aiService.js`

Menggunakan **Anthropic Claude API** (claude-sonnet-4) dengan vision capability untuk menganalisis gambar sampah.

```javascript
// src/services/aiService.js

export const classifyWaste = async (base64Image) => {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: "image/jpeg", data: base64Image }
          },
          {
            type: "text",
            text: `Analisis gambar ini dan identifikasi jenis sampah.
            Kembalikan JSON dengan format:
            {
              "name": "nama sampah",
              "category": "organik|anorganik|B3|elektronik",
              "confidence": 0-100,
              "description": "deskripsi singkat",
              "recyclingTips": ["tip1", "tip2", "tip3"],
              "disposalGuide": "cara pembuangan",
              "decompositionTime": "estimasi waktu terurai"
            }`
          }
        ]
      }]
    })
  });
  const data = await response.json();
  return JSON.parse(data.content[0].text);
};
```

---

## 💾 State & Data Management

### Local Storage Schema
```javascript
// Key: "pilahnusa_history"
[
  {
    id: "uuid-xxx",
    timestamp: "2025-04-29T10:30:00Z",
    imageBase64: "data:image/jpeg;base64,...",  // thumbnail compressed
    result: {
      name: "Botol Plastik PET",
      category: "anorganik",
      confidence: 94,
      description: "...",
      recyclingTips: [...],
      disposalGuide: "...",
      decompositionTime: "450 tahun"
    }
  }
]
```

### Custom Hooks
```javascript
// useCamera.js — Akses kamera device
// useClassifier.js — Handle AI API call + loading/error state  
// useHistory.js — CRUD operasi ke localStorage
```

---

## 🗺 Routing

```javascript
// App.jsx — menggunakan React Router v6
<Routes>
  <Route path="/"         element={<HomePage />} />
  <Route path="/scan"     element={<ScanPage />} />
  <Route path="/result/:id" element={<ResultPage />} />
  <Route path="/history"  element={<HistoryPage />} />
  <Route path="/guide"    element={<GuidePage />} />
</Routes>
```

---

## 📦 Tech Stack & Dependencies

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "lucide-react": "^0.383.0",
    "uuid": "^9.x"
  },
  "devDependencies": {
    "vite": "^5.x",
    "@vitejs/plugin-react": "^4.x"
  }
}
```

> **Note:** Tidak ada CSS framework eksternal — menggunakan CSS murni dengan custom variables untuk mempertahankan kontrol penuh atas design.

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout | Nav |
|---|---|---|
| `< 768px` | Single column, full-width cards | Bottom Tab Nav |
| `768px – 1024px` | 2 column grid | Sidebar (collapsed) |
| `> 1024px` | 3 column, sidebar terbuka | Sidebar penuh |

---

## ♿ Accessibility

- Semua tombol memiliki `aria-label`
- Kontras warna minimum 4.5:1 (WCAG AA)
- Focus states yang visible (`outline: 2px solid #22C55E`)
- Loading states menggunakan `aria-live="polite"`
- Gambar hasil scan memiliki `alt` text deskriptif

---

## 🚀 Development Phases

### Phase 1 — Foundation (Week 1)
- [ ] Setup project Vite + React
- [ ] Buat design system (CSS variables, typography, colors)
- [ ] Buat komponen UI dasar: Button, Card, Badge, Layout
- [ ] Implementasi routing

### Phase 2 — Core Pages (Week 2)
- [ ] HomePage dengan hero section & animasi
- [ ] GuidePage dengan StepCards
- [ ] HistoryPage dengan localStorage integration

### Phase 3 — Scanner Feature (Week 3)
- [ ] CameraCapture dengan `getUserMedia` API
- [ ] ImageUpload dari galeri
- [ ] Integrasi Claude AI API
- [ ] ResultPage dengan full waste information

### Phase 4 — Polish (Week 4)
- [ ] Animasi & micro-interactions
- [ ] Loading states & error handling
- [ ] Mobile responsiveness QA
- [ ] Performance optimization (lazy loading, image compression)

---

## 🎨 Animation Specifications

```css
/* Page transitions */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Scan loading pulse */
@keyframes scanPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.08); opacity: 0.7; }
}

/* Card hover lift */
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(34, 197, 94, 0.15);
  transition: all 0.25s ease;
}

/* Floating icons hero */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
}
```

---

## 📋 Waste Categories Data

```javascript
// src/data/wasteCategories.js
export const CATEGORIES = {
  organik: {
    label: "Organik",
    color: "#22C55E",
    bgColor: "#F0FDF4",
    icon: "🌱",
    description: "Sampah yang dapat terurai secara alami"
  },
  anorganik: {
    label: "Anorganik", 
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    icon: "♻️",
    description: "Sampah yang sulit terurai, dapat didaur ulang"
  },
  B3: {
    label: "B3 (Berbahaya)",
    color: "#EF4444",
    bgColor: "#FEF2F2",
    icon: "⚠️",
    description: "Bahan Berbahaya dan Beracun"
  },
  elektronik: {
    label: "Elektronik",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    icon: "🔋",
    description: "Limbah elektronik / e-waste"
  }
};
```

---

*Dokumen ini adalah panduan implementasi front-end untuk PilahNusa AI. Design mengacu pada screenshot yang diberikan dengan sistem hijau-putih yang bersih, mobile-friendly, dan component-based.*