# freshmilksource — Pure Farm Direct Dairy

A modern, responsive, high-converting single page website designed for **freshmilksource** — an artisanal, ethically-sourced, farm-to-doorstep dairy brand delivering pure unadulterated A2 milk and organic dairy in eco-friendly glass bottles within 4 hours of milking.

---

## 🥛 Features Included

1. **Brand Identity & Modern Hero Section:**
   - Custom SVG leaf & milk droplet logo identity for `freshmilksource`.
   - Morning dispatch alert bar with real-time freshness guarantees.
   - Dynamic counter metrics (15 mins chilling, 0% chemicals, 42k+ weekly bottles, 99.8% on-time delivery).
   - High-impact visuals with floating social proof and purity certificates.

2. **The Source & Origin Story:**
   - Ethical calf-first dairying and open-pasture, grass-fed native herd standards.
   - Farm-level QR code traceability.

3. **Interactive Morning Harvest Product Catalog:**
   - Filterable product collection (`All`, `Fresh Milk`, `Artisanal & Ghee`, `Curd & Paneer`).
   - Detailed dairy specifications: FAT %, SNF %, packaging type, and pricing.
   - One-click "Add to Daily" or "Add to Box" buttons that sync with the slide-out shopping drawer.

4. **Interactive Purity Benchmark:**
   - Side-by-side comparison matrix: `freshmilksource` vs. commercial supermarket cartons.
   - 4-step pipeline: Dawn Milking &rarr; 4°C Rapid Chilling &rarr; Steam-Sanitized Glass &rarr; 7:00 AM Doorstep Drop.

5. **Live Subscription & Custom Plan Calculator:**
   - Real-time interactive calculation for milk type, daily quantity slider (0.5L – 5L), and delivery frequency (Daily, Alternate Days, Weekdays).
   - Automatically computes monthly liters, unit rates, and applies an introductory 15% discount.

6. **Closed Loop Glass Bottle Sustainability Showcase:**
   - Explains the zero-waste doorstep bottle swap mechanism and zero-microplastic health advantages.

7. **Slide-Out Shopping Basket & Cart Drawer:**
   - Dynamic item additions, quantity increment/decrement, subtotal calculation, free shipping badges, and checkout dispatch integration.

8. **Verified Testimonials & Interactive FAQ Accordion:**
   - Testimonials from families, coffee roasters, and nutritionists.
   - Expandable accordion covering A1 vs. A2 milk, home boiling, doorstep pause/modifications, and partner farm radius.

9. **Lead Capture & Free Morning Trial Form:**
   - Pincode and address verification with toast confirmation feedback.

10. **Live Social Proof Activity Notifications:**
    - Non-intrusive floating pill showcasing real-time community activity.

---

## 🚀 How to Run Locally

### Option 1: Direct File Preview
Simply double click `index.html` or open it directly in any modern browser (Chrome, Safari, Edge, Firefox).

### Option 2: Python HTTP Server (Built-in)
```bash
python3 -m http.server 3000
```
Then visit `http://localhost:3000` in your web browser.

### Option 3: Node / NPX Serve
```bash
npx serve -l 3000 .
```

---

## 📁 File Structure

```
freshmilksource/
├── index.html        # Main semantic single-page HTML layout & Tailwind markup
├── css/
│   └── style.css     # Custom range sliders, scrollbars, animations & glassmorphism
├── js/
│   └── main.js       # Cart state, plan calculator, filter, counters, FAQ & toasts
├── package.json      # Dev server scripts
└── README.md         # Documentation & guide
```

