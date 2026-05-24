# 🏗️ Concrete Calculator for Detailed Statues & Decorative Pieces

A Node.js CLI that calculates precise concrete mix proportions for detailed statues and decorative work. Customized for **1:1 cement:sand ratios** (no aggregate) with **Level+ Concrete Plasticizer RM38**, **CSA cement** for maximum 2-hour hardening time, **X33 Entschäumer** defoamer for bubble-free surface finish, and **iron oxide pigments** for pre-mix color previewing.

## 🚀 Features

- **Two calculation modes:**
  - From scratch mixing (complete component calculation with step-by-step mixing order)
  - Mold volume calculator (uses 3D software volume with customizable safety tolerance)
- **Fixed mix ratios** (1:1 cement:sand, W/C 0.44, plasticizer 0.75%, X33 0.05%)
- **Grey or White Portland cement**, white supported with identical ratios
- **Cement-only paste mode**, skip sand for experimental decorative pieces
- **Pigment support**, pick from 4 iron oxide products and dial 1–10% of cement weight
- **CSA cement support** for rapid setting applications (grey CSA slightly shifts white Portland color)
- **X33 defoamer support** with per-batch dosing and step-by-step mixing order
- **Interactive CLI** with input validation and a "calculate another?" loop
- **Color simulator** (`color-simulator.html`), open in any browser, no server needed

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

### White Portland Cement

- White limestone Portland cement used for decorative pieces and pigmented work
- Same W/C ratio, plasticizer, and X33 dosages as grey Portland
- **Note**: Combining with grey CSA is permitted but will visibly shift the white color toward grey

### Plasticizer

- **[Level+ Concrete Plasticizer RM38](https://www.amazon.es/dp/B0821X2T8C)**, The exact plasticizer used in this calculator
- Dosage: 0.5-1.0% of cement weight (calculator uses 0.75%)
- Operating temperature: +5°C to +25°C

### CSA Cement

- **[BUZZI NEXT BASE CSA Cement](https://www.moertelshop.com/buy-csa-cement-grey-cheaply-5.html)**, Grey CSA cement for rapid setting
- Use 30-70% addition to Portland cement (calculator uses 35%)
- Provides maximum 2-hour hardening time for detailed work
- **Grey Portland recommended**, combining with white Portland is permitted but grey CSA will visibly shift the color
- **Note**: CSA cement solidifies within minutes in pure form, always mix with Portland cement as shown in calculator

### Pigment

- **SC Pigments® Pardo 4660, Dark Brown Leather** (Fe2O3), warm reddish-brown earth tone
- **SC Pigments® Negro 55, Black** (Fe2O3), dark charcoal, deepens any base
- **QUARKZMAN Iron Oxide Powder Pigment Ruby Red** (Mesh 500, 200g), warm brick/ruby red
- **QUARKZMAN Iron Oxide Pigment Moss Green** (Mesh 325, 100g), muted forest green
- Dosage: 1–10% of cement weight; use `color-simulator.html` to preview before mixing
- Added as a dry ingredient, blend into cement before adding sand or water
- **White Portland** produces vivid, true-to-pigment colors
- **Grey Portland** produces earthy, muted tones
- The CLI lets you select a specific pigment product and amount, it shows the product name in the results output

### Defoamer

- **[X33 Entschäumer für Beton (powder, 150g)](https://www.moertelshop.com/Entschaeumer-fuer-Beton-guenstig-kaufen_3)**, BACKSTEIN brand, moertelshop.com
- Powder defoamer and de-aeration aid specifically formulated for cement-based systems
- Eliminates internal air bubbles and prevents surface pinholes in fine mold work
- Dosage: 0.01–0.20% of cement weight (calculator uses 0.05%, conservative starting point)
- **Form**: Dry powder, must be blended into dry ingredients before adding water
- Compatible with PCE and SNF/naphthalene plasticizers (your Level+ RM38)
- 150g lasts approximately 1,500–3,000 small batches

## 📦 Installation

```bash
# Clone or download the project
cd concrete-calculator

# Install dependencies
yarn install

# Regenerate browser data for the color simulator (also runs in CI)
yarn build:simulator

# Run the calculator
yarn start
```

## 🧪 Scientific Ratios Used

### From Scratch Mixing

- **Mix ratio**: 1:1 (cement:sand) or cement-only paste, no aggregate for fine detailed work
- **Water-cement ratio**: 0.44 (flow for fine mold work without excess shrinkage)
- **CSA cement**: 35% of total cement when selected (grey Portland recommended; permitted with white)
- **Level+ Plasticizer**: 0.75% of total cement weight
- **X33 Defoamer**: 0.05% of total cement weight (dry-blended before water addition)
- **Pigment**: 1–10% of cement weight, added as dry ingredient (both grey and white Portland)

## 🎯 Usage

### Mode 1: From Scratch Mix

1. Select "Starting from scratch" from the menu
2. Enter the total dry mix desired (in grams)
3. Choose cement type: Grey Portland or White Portland
4. Choose whether to include fine sand (uncheck for cement-only paste)
5. Choose whether to use CSA cement (2-hour hardening)
6. Choose whether to include X33 defoamer
7. Optionally add pigment, pick a product and dial in the percentage (1–10%)
8. Get complete breakdown of all components with mixing order and curing times
9. Optionally calculate another mix without restarting

### Mode 2: Mold Volume Calculator

1. Select "Calculate concrete needed for mold" from the menu
2. Enter the model volume from your 3D software (mm³)
3. Enter your safety tolerance (recommended 15–25%)
4. Configure your mix (same steps as Mode 1 above, amount is pre-filled from the volume calc)
5. Get the mix breakdown plus a mold volume summary

## 📊 Example Calculations

### From Scratch (1000g total, with CSA, with X33)

```
Dry mix total: 1000g
Portland: 325.0g
CSA: 175.0g
Sand: 500.0g
Water: 220.0ml
Level+ Plasticizer: 3.8ml
X33 Defoamer: 250mg (0.250g), weigh on a mg scale

Mixing Order:
  1. Combine Portland cement + CSA cement in vessel
  2. Add fine sand, stir to combine
  3. Add X33 powder, mix dry for 30 seconds until evenly distributed
  4. Mix plasticizer into water in a separate cup
  5. Add water+plasticizer to dry mix gradually
  6. Mix thoroughly for 2–3 minutes
  ⚠️  Do not exceed X33 dosage, overdosing weakens surface quality

📝 1:1 ratio | W/C: 0.44 | CSA blend: 2hr max hardening

⏱️  Curing Times:
  Initial set:    ~15–30 minutes, work quickly once mixed
  Hard / demold:  ~1–2 hours
  80% strength:   ~24 hours
  Full cure:      28 days
```

### From Scratch, White Portland + 5% Pigment (1000g total, with X33)

```
Dry mix total: 1000g
White Portland: 500.0g
Sand: 500.0g
Pigment (SC Pigments® Pardo 4660, Dark Brown Leather): 25.0g (5% of cement)
Water: 220.0ml
Level+ Plasticizer: 3.8ml
X33 Defoamer: 250mg (0.250g), weigh on a mg scale

Mixing Order:
  1. Weigh White Portland cement into vessel
  2. Add pigment, mix dry until color is uniform
  3. Add fine sand, stir to combine
  4. Add X33 powder, mix dry for 30 seconds until evenly distributed
  5. Mix plasticizer into water in a separate cup
  6. Add water+plasticizer to dry mix gradually
  7. Mix thoroughly for 2–3 minutes
  ⚠️  Do not exceed X33 dosage, overdosing weakens surface quality

📝 1:1 ratio | W/C: 0.44
```

### Cement-Only Paste (1000g, White Portland + 5% Pigment, experimental)

```
Dry mix total: 1000g
White Portland: 1000.0g
Sand: none (cement-only paste)
Pigment: 50.0g (5% of cement)
Water: 440.0ml
Level+ Plasticizer: 7.5ml
X33 Defoamer: 500mg (0.500g), weigh on a mg scale

📝 Cement only | W/C: 0.44 | ⚠️  Higher shrinkage, experimental
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

- Enough water for flow into fine molds without running the mix too wet
- Lower than typical structural mixes to limit shrinkage on thin sections

### White Portland Cement

- **Same ratios as grey Portland**, W/C 0.44, plasticizer 0.75%, X33 0.05% apply identically
- Provides a clean white base essential for true pigment colors
- **CSA cement is permitted** but not recommended, grey CSA will visibly shift the white color toward grey; there is no white CSA alternative
- Suitable for both sand mixes (1:1) and cement-only paste

### Cement-Only Paste (No Sand)

- Available for both grey and white Portland
- Entire `totalAmount` is cement; all additive dosages scale automatically
- Plasticizer still recommended, improves paste flow into molds even without sand
- **Higher shrinkage** than a sand mix, pure cement paste is more prone to cracking on larger pieces
- Best used for small experimental pieces and pigment color testing

### Pigment

- **Dosage**: 1–10% of cement weight (industry standard range)
- **Additive, not substitutive**, pigment weight is extra, on top of the cement+sand dry mix
- Blend into cement powder first (before sand) to ensure uniform color distribution
- **White Portland** gives vivid, true-to-pigment colors; **grey Portland** gives earthy, muted tones
- Products: SC Pigments® Pardo 4660 (brown), SC Pigments® Negro 55 (black), QUARKZMAN Ruby Red Mesh 500, QUARKZMAN Moss Green Mesh 325
- The CLI lets you select a product, it is shown in the results and mixing order output

### CSA Cement Benefits (35% blend)

- **Maximum 2-hour hardening time** guaranteed
- Rapid setting ideal for detailed mold work
- Early strength development for quick demolding
- **Grey Portland recommended**, grey CSA is not visually compatible with white Portland (color shift), but is permitted if the color shift is acceptable

### Level+ Plasticizer (RM38)

- **Dosage**: 0.75% of cement weight (125-250ml per 25kg cement)
- **pH**: 5.0, density ~1 g/cm³
- **Temperature range**: +5°C to +25°C
- Improves workability without compromising strength
- Dark brown liquid, 12-month stability

### X33 Entschäumer (Defoamer)

- **Dosage**: 0.05% of cement weight (calculator default, safe conservative start)
- **Safe range**: 0.01% to 0.20% of cement weight
- **Form**: Dry white powder, must be added to dry ingredients
- **Timing**: Added to dry mix before any water is introduced
- **Why powder matters**: Disperses uniformly through dry cement+sand; liquid defoamers at these tiny quantities are nearly impossible to dose accurately for small batches
- **Compatibility**: Works with Level+ RM38, PCE, and SNF plasticizers, no adverse reactions
- **Effect**: Breaks surface tension of air bubbles during mixing, prevents pinholes on mold-contact surfaces
- **Overdose warning**: Exceeding 0.20% can weaken surface finish, measure carefully on a milligram scale
- **Storage**: Sealed bag, cool and dry, away from moisture, 2-year shelf life

## ⚠️ Important Notes

1. **Always use clean, potable water**
2. **X33 defoamer must be blended into dry ingredients BEFORE adding any water**
3. **Mix Level+ Plasticizer with water before adding to concrete**
4. **Add water gradually to achieve desired consistency**
5. **1:1 cement:sand ratio, NO aggregate for smooth fine finish** (or cement-only paste for experimental work)
6. **CSA cement blend ensures maximum 2-hour hardening**
7. **Mixing grey CSA with white Portland is permitted but will visibly shift the white color toward grey**
8. **Pigment: blend into cement BEFORE adding sand or water, never exceed 10% of cement weight**
9. **Cement-only paste has higher shrinkage, suitable for small experimental pieces, not large castings**
10. **Ratios target detailed statue and decorative work, not structural pours**
11. **Operating temperature: +5°C to +25°C for plasticizer effectiveness**
12. **Weigh X33 on a milligram scale, kitchen scales are not accurate enough at these quantities**
13. **Never increase X33 dosage beyond 0.20% of cement weight, overdosing causes defects**

## 🎨 Color Simulator

Open `color-simulator.html` in any browser, no installation needed.

- Select cement type (grey or white Portland)
- Toggle fine sand on/off
- Enable pigment and pick from your four purchased products
- Preview **Dry/Cured** and **Wet/Fresh** swatches with hex codes
- See the full 0–10% pigment range strip to dial in the right amount before committing to a batch

```bash
# macOS
open color-simulator.html

# Linux
xdg-open color-simulator.html
```

> The simulator reads pigment data from `lib/data.browser.js` (generated by `yarn build:simulator`).
> If you modify `lib/data.js`, re-run `yarn build:simulator` to keep the simulator in sync.

## 🛠️ Development

### Requirements

- Node.js 24 or higher
- Yarn package manager

### Scripts

```bash
yarn start            # Run the calculator
yarn test             # Run smoke tests (node:test)
yarn lint             # ESLint
yarn format           # Prettier (write)
yarn format:check     # Prettier (check, used in CI)
yarn build:simulator  # Regenerate lib/data.browser.js from lib/data.js
```

### Project Structure

```
concrete-calculator/
├── lib/
│   ├── constants.js          # Mix ratios and dosage constants
│   ├── data.js               # Pigment products and cement types (source of truth)
│   ├── calculations.js       # Pure calculation functions
│   ├── prompts.js            # Inquirer CLI prompt helpers
│   ├── display.js            # Console output formatting
│   └── data.browser.js       # Auto-generated, for color-simulator.html
├── scripts/
│   └── build-simulator.js    # Generates lib/data.browser.js
├── .github/workflows/ci.yml  # CI: lint + format + test
├── index.js                  # Entry point (thin orchestrator)
├── smoke-test.js             # node:test smoke tests
└── color-simulator.html      # Standalone browser color preview tool
```

## 📝 License

MIT, see [LICENSE](LICENSE).

---

## 📋 Quick Reference

### For 1kg Total Mix (Grey Portland + CSA + X33):

- **Portland Cement**: 325g
- **CSA Cement**: 175g
- **Fine Sand**: 500g
- **Water**: 220ml (W/C: 0.44)
- **Level+ Plasticizer**: 3.8ml
- **X33 Defoamer**: 250mg (0.250g)
- **Hardening Time**: Maximum 2 hours

**Mixing order**: Blend dry (Portland + CSA + sand + X33) → dissolve plasticizer in water → combine gradually → mix 2–3 min

### For 1kg Total Mix (White Portland + 5% Pigment + X33, with sand):

- **White Portland**: 500g
- **Fine Sand**: 500g
- **Pigment**: 25g (5% of cement)
- **Water**: 220ml (W/C: 0.44)
- **Level+ Plasticizer**: 3.8ml
- **X33 Defoamer**: 250mg (0.250g)

**Mixing order**: Blend dry (white Portland + pigment until uniform + sand + X33) → dissolve plasticizer in water → combine gradually → mix 2–3 min

### For 1kg Cement-Only Paste (White Portland + 5% Pigment + X33, no sand, experimental):

- **White Portland**: 1000g
- **Pigment**: 50g (5% of cement)
- **Water**: 440ml (W/C: 0.44)
- **Level+ Plasticizer**: 7.5ml
- **X33 Defoamer**: 500mg (0.500g)

**Mixing order**: Blend dry (white Portland + pigment until uniform + X33) → dissolve plasticizer in water → combine gradually → mix 2–3 min
⚠️ Cement-only paste has higher shrinkage, use for small experimental pieces only
