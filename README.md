# 🏗️ Concrete Calculator for Detailed Statues & Decorative Pieces

A Node.js application that calculates precise concrete mix proportions for detailed statues and decorative work. Customized for **1:1 cement:sand ratios** (no aggregate) with **Level+ Concrete Plasticizer RM38**, **CSA cement** for maximum 2-hour hardening time, and **X33 Entschäumer** defoamer for bubble-free surface finish.

## 🚀 Features

- **Three calculation modes:**
  - Already mixed concrete (water & plasticizer calculation)
  - From scratch mixing (complete component calculation)
  - Mold volume calculator (uses 3D software volume with customizable safety tolerance)
- **Research-based formulas** using current industry best practices
- **CSA cement support** for rapid setting applications
- **X33 defoamer support** with per-batch dosing and step-by-step mixing order
- **Interactive CLI** with input validation
- **Optimized for detailed work** like statues and decorative pieces

## 🧪 Level+ Concrete Plasticizer RM38 Specifications

**Product**: Level+ Concrete Plasticizer Liquid Concrete Liquid RM38

- **Consistency**: Dark brown liquid
- **pH**: 5.0
- **Density**: ~1 g/cm³ at 20°C
- **Dosage**: 125ml to 250ml per 25kg of cement
- **Percentage**: 0.50% to 1.00% by cement weight
- **Operating Temperature**: +5°C to +25°C
- **Storage Stability**: 12 months from manufacture
- **Standard**: EN 934-2

## 🛒 Real Product Examples

### Pre-Mixed Concrete

- **[Rayher Creative Concrete](https://www.amazon.es/-/en/Rayher-Creative-Concrete-Craft-34464558/dp/B08XW6ZP6Q)** - Ready-to-use concrete for detailed craft work
- Check product specifications for water ratio (typically 15-20ml per 100g)

### Plasticizer

- **[Level+ Concrete Plasticizer RM38](https://www.amazon.es/dp/B0821X2T8C)** - The exact plasticizer used in this calculator
- Dosage: 0.5-1.0% of cement weight (calculator uses 0.75%)
- Operating temperature: +5°C to +25°C

### CSA Cement

- **[BUZZI NEXT BASE CSA Cement](https://www.moertelshop.com/buy-csa-cement-grey-cheaply-5.html)** - Grey CSA cement for rapid setting
- Use 30-70% addition to Portland cement (calculator uses 35%)
- Provides maximum 2-hour hardening time for detailed work
- **Note**: CSA cement solidifies within minutes in pure form - always mix with Portland cement as shown in calculator

### Defoamer

- **[X33 Entschäumer für Beton (powder, 150g)](https://www.moertelshop.com/Entschaeumer-fuer-Beton-guenstig-kaufen_3)** — BACKSTEIN brand, moertelshop.com
- Powder defoamer and de-aeration aid specifically formulated for cement-based systems
- Eliminates internal air bubbles and prevents surface pinholes in fine mold work
- Dosage: 0.01–0.20% of cement weight (calculator uses 0.05% — conservative starting point)
- **Form**: Dry powder — must be blended into dry ingredients before adding water
- Compatible with PCE and SNF/naphthalene plasticizers (your Level+ RM38)
- 150g lasts approximately 1,500–3,000 small batches

## 📦 Installation

```bash
# Clone or download the project
cd concrete-calculator

# Install dependencies
yarn install

# Run the calculator
yarn start
```

## 🧪 Scientific Ratios Used

### Already Mixed Concrete

- **Level+ Plasticizer**: 0.75% of cement weight
- **Water reduction**: 10% less than supplier's recommended ratio (optimized for detailed work)
- Based on Level+ Concrete Plasticizer RM38 specifications
- Dosage range: 0.5% to 1.0% (using middle value for consistency)
- **Benefit**: Better workability with less water = stronger concrete

### From Scratch Mixing

- **Mix ratio**: 1:1 (cement:sand) - No aggregate for fine detailed work
- **Water-cement ratio**: 0.44 (optimized for detailed mold flow - 2025 research)
- **CSA cement**: 35% of total cement when selected (for 2-hour max hardening)
- **Level+ Plasticizer**: 0.75% of total cement weight (optimal dosage range)
- **X33 Defoamer**: 0.05% of total cement weight (dry-blended before water addition)

### Research Sources

These ratios are based on **2025 industry research** including:

- Latest ASTM and AASHTO standards for detailed work
- CSA cement rapid hardening studies (20-35% optimal range)
- Plasticizer flow optimization for intricate molds
- Water-cement ratio studies for maximum flow characteristics
- Research on concrete flow properties for statue and decorative applications

## 🎯 Usage

### Mode 1: Already Mixed Concrete

1. Select "Already mixed concrete" from the menu
2. Enter the amount of concrete you want (in grams)
3. Enter the water ratio from your supplier (ml per 100g)
4. Answer whether to include X33 defoamer
5. Get calculated amounts of water, plasticizer, and X33 — with mixing order

### Mode 2: From Scratch Mix

1. Select "Starting from scratch" from the menu
2. Enter the total amount of concrete desired (in grams)
3. Choose whether to use CSA cement
4. Answer whether to include X33 defoamer
5. Get complete breakdown of all components — with mixing order

## 📊 Example Calculations

### Already Mixed (1000g concrete, 18ml/100g ratio, with X33)

```
Concrete amount: 1000g
Supplier's recommended water: 180.0ml
Reduced water needed: 162.0ml
Water saved: 18.0ml (10% reduction - optimized for detailed flow)
Level+ Plasticizer needed: 3.8ml
Estimated cement: 500.0g
X33 Defoamer: 250mg (0.250g) — weigh on a mg scale

Mixing Order (X33 active):
  1. Weigh out concrete powder into mixing vessel
  2. Add X33 powder — mix dry for 30 seconds until evenly distributed
  3. Mix plasticizer into water in a separate cup
  4. Add water+plasticizer to dry mix gradually
  5. Mix thoroughly for 2–3 minutes
```

### From Scratch (1000g total, with CSA, with X33)

```
Total concrete: 1000g
Portland cement: 325.0g
CSA cement: 175.0g
Total cement: 500.0g
Fine sand: 500.0g
Water: 220.0ml (0.44 ratio for optimal flow)
Level+ Plasticizer: 3.8ml
X33 Defoamer: 250mg (0.250g) — weigh on a mg scale

Mixing Order (X33 active):
  1. Combine Portland cement + CSA cement in vessel
  2. Add fine sand — stir to combine
  3. Add X33 powder — mix dry for 30 seconds until evenly distributed
  4. Mix plasticizer into water in a separate cup
  5. Add water+plasticizer to dry mix gradually
  6. Mix thoroughly for 2–3 minutes
  ⚠️  Do not exceed X33 dosage — overdosing weakens surface quality
```

### Mold Volume Calculator (152,726 mm³ from 3D software, 20% tolerance)

```
With 20% safety tolerance: 183271.2 mm³
Estimated concrete needed: 440g

Mold Volume Summary:
Original volume: 152726.0 mm³
With 20% tolerance: 183271.2 mm³
Concrete density: 0.0024 g/mm³
```

## 🔬 Technical Details

### Safety Tolerance

- **Default**: 15% (recommended minimum)
- **Range**: 0-50% (customizable by user)
- **Recommended**: 15-25% for most detailed work
- **Why needed**: Accounts for mixing losses, mold irregularities, and measurement variations

### Water-Cement Ratio (0.44)

- **2025 Research Optimized** for detailed mold flow
- Balanced ratio for excellent flow while maintaining strength
- Provides superior surface finish for intricate detailed molds
- Optimal workability for complex statue features
- Prevents shrinkage while ensuring complete mold filling

### CSA Cement Benefits (35% blend)

- **Maximum 2-hour hardening time** guaranteed
- Rapid setting ideal for detailed mold work
- Early strength development for quick demolding
- Perfect for time-sensitive artistic projects

### Level+ Plasticizer (RM38)

- **Dosage**: 0.75% of cement weight (125-250ml per 25kg cement)
- **pH**: 5.0, density ~1 g/cm³
- **Temperature range**: +5°C to +25°C
- Improves workability without compromising strength
- Dark brown liquid, 12-month stability

### X33 Entschäumer (Defoamer)

- **Dosage**: 0.05% of cement weight (calculator default — safe conservative start)
- **Safe range**: 0.01% to 0.20% of cement weight
- **Form**: Dry white powder — must be added to dry ingredients
- **Timing**: Step 3 of dry mix, before any water is introduced
- **Why powder matters**: Powder disperses uniformly through dry cement+sand; liquid defoamers at these tiny quantities are nearly impossible to dose accurately for small batches
- **Compatibility**: Works with Level+ RM38, PCE, and SNF plasticizers — no adverse reactions
- **Effect**: Breaks surface tension of air bubbles during mixing, prevents pinholes on mold-contact surfaces
- **Overdose warning**: Exceeding 0.20% can weaken surface finish — measure carefully on a milligram scale
- **Storage**: Sealed bag, cool and dry, away from moisture — 2-year shelf life

## ⚠️ Important Notes

1. **Always use clean, potable water**
2. **X33 defoamer must be blended into dry ingredients BEFORE adding any water**
3. **Mix Level+ Plasticizer with water before adding to concrete**
4. **Add water gradually to achieve desired consistency**
5. **1:1 cement:sand ratio - NO aggregate for smooth fine finish**
6. **CSA cement blend ensures maximum 2-hour hardening**
7. **These ratios are optimized for detailed statue/decorative work**
8. **Operating temperature: +5°C to +25°C for plasticizer effectiveness**
9. **Weigh X33 on a milligram scale — kitchen scales are not accurate enough at these quantities**
10. **Never increase X33 dosage beyond 0.20% of cement weight — overdosing causes defects**

## 🛠️ Requirements

- Node.js 24 or higher
- Yarn package manager
- Terminal/Command prompt

## 📝 License

MIT License - Feel free to use and modify for your projects.

## 🤝 Contributing

This calculator uses research-based industry standards. If you have updated technical data or improvements, please feel free to contribute.

---

## 📋 Quick Reference

### For 1kg Total Mix (From Scratch with CSA + X33):

- **Portland Cement**: 325g
- **CSA Cement**: 175g
- **Fine Sand**: 500g
- **Water**: 220ml (W/C: 0.44)
- **Level+ Plasticizer**: 3.8ml
- **X33 Defoamer**: 250mg (0.250g)
- **Hardening Time**: Maximum 2 hours

**Mixing order**: Blend dry (Portland + CSA + sand + X33) → dissolve plasticizer in water → combine gradually → mix 2–3 min
