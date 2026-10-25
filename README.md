# Omar Nassar — Portfolio

A complete redesign of the supplied HTML/CSS/JavaScript portfolio. The site is static and has no build step or package dependencies.

## Run

Open `dist/index.html` in a modern browser, or upload the contents of `dist/` to a static host. The downloadable ZIP places these files at its root, so open `index.html` after extraction. Keep the `assets/` folder beside it.

For local HTTP preview, run `python3 -m http.server 8000 --directory dist` from this source checkout, or run `python3 -m http.server 8000` from the extracted ZIP.

## Included

- Responsive English and Arabic layouts with a persistent language choice.
- Dark and light themes with a persistent preference; distinct full-width section palettes, a lime technology strip and a contrasting process section make each chapter easy to recognise.
- All nine original project links, category filters, and accessible project dialogs.
- An interactive project gallery: a nine-project index, one large changing preview, category filters, previous/next controls, local technology icons and accessible detail dialogs.
- Seven real project screenshots and two typographic covers for administration projects.
- Locally hosted fonts, original SVG artwork, and a favicon. Font license notices are in `assets/FONT-LICENSES.txt`.
- The supplied black-shirt portrait in the About section; the original sphere-and-code hero is restored.
- An 18-item My Tech Stack explorer with three keyboard-accessible category tabs, larger icon cards and animated category transitions.
- A seamless technology ticker with a pause/play control.
- Scroll reveals, staggered section entrances, a reading-progress line, floating hero details and subtle hover transitions, all respecting reduced-motion preferences.
- Laravel and OOP are included as completed studies in the English and Arabic copy.
- Keyboard navigation, visible focus states, reduced-motion support, and native form validation.
- Direct email, WhatsApp and LinkedIn links, plus a copy-email action.

## Contact form

The form prepares a `mailto:` draft in the visitor's email application. The visitor reviews and sends it. There is no server endpoint and no automatic message delivery. Direct email and WhatsApp remain available if an email application is not configured.

## Edit

- `index.html`: page content, bilingual `data-en` / `data-ar` text, and the project gallery mount points.
- `css.css`: base visual styles, themes and responsive layouts.
- `profile.css`: the About portrait and interactive technology-stack section.
- `motion.css` and `motion.js`: ticker, category navigation and motion effects.
- `work.css`: split project index, changing showcase, filters, responsive gallery and project-dialog styling.
- `sections.css`: section backgrounds, local colour tokens, chapter markers and contact-form surfaces for both themes.
- `projects.js`: the only editable project data source; loaded before `js.js` with `defer`.
- `js.js`: renders the gallery from project data and handles filtering, dialogs, language/theme switching and the email-draft form.
- `theme-init.js`: restores the saved theme before the page renders.
- `assets/`: images, artwork, fonts and license notices.

All project content, live URLs, screenshots, bilingual names, summaries and technologies are in the `portfolioProjects` array in `projects.js`. Edit this file to add, remove, reorder or update projects; numbering and category counts update automatically. The project index, filters, previews and dialogs are generated automatically from that same list. JavaScript is required for the project gallery. Project previews link to externally hosted demos; administration demos may require authentication.

The original ZIP did not include its referenced profile photograph, project screenshots or certificate files. The supplied black-shirt portrait appears in About. The other portrait is retained as an asset; the user requested restoring the original sphere-and-code hero. Project screenshots were captured from the supplied public demo links; missing certificate images and explicitly marked placeholder testimonials were omitted from the redesigned page. No client feedback, credentials or performance metrics have been invented.

## البيانات والتعديل بالعربية

افتح `index.html` بعد فك ضغط الملف. كل الصور والخطوط المطلوبة موجودة داخل مجلد `assets`، فلا تنقل الصفحة وحدها.

تعديل النصوص يتم من `index.html` من خلال خصائص `data-en` و`data-ar`. بيانات المشاريع وصورها وروابطها وتقنياتها موجودة بالكامل في ملف `projects.js`. عدّل هذا الملف فقط لإضافة مشروع أو حذفه أو تغيير ترتيبه؛ القائمة والمعاينة والفلاتر والعدادات والتفاصيل تتحدث تلقائيًا. حمّل `projects.js` قبل `js.js` كما هو موضح في `index.html`.

نموذج التواصل يجهز رسالة في تطبيق البريد، ولا يرسلها تلقائيًا. روابط واتساب والبريد ولينكدإن محفوظة من النسخة الأصلية.
