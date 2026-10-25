'use strict';

// Project content is loaded from projects.js; this file renders the interface.
const projects = portfolioProjects.map((project,index) => ({...project,number:String(index+1).padStart(2,'0')}));

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
let language = 'en';
let currentFilter = 'all';
let selectedProjectId = projects[0]?.id ?? '';
let galleryAnimations = [];
let openProject = null;
let previousFocus = null;
let toastTimer;
const translate = (value) => value[language];
const safeStore = (key, value) => { try {localStorage.setItem(key, value);} catch (_) {} };

function applyTranslations(scope = document) {
  $$('[data-en][data-ar]', scope).forEach(element => { element.textContent = element.dataset[language]; });
  $$('[data-en-label][data-ar-label]', scope).forEach(element => { element.setAttribute('aria-label', element.dataset[language + 'Label']); });
  $$('[data-en-alt][data-ar-alt]', scope).forEach(element => { element.alt = element.dataset[language + 'Alt']; });
  $$('[data-en-placeholder][data-ar-placeholder]', scope).forEach(element => { element.placeholder = element.dataset[language + 'Placeholder']; });
}

function setLanguage(nextLanguage) {
  language = nextLanguage === 'ar' ? 'ar' : 'en';
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  applyTranslations();
  $('#language-toggle').textContent = language === 'en' ? 'عربي' : 'EN';
  $('#language-toggle').setAttribute('aria-label', language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية');
  document.title = language === 'en' ? 'Omar Nassar — Full-Stack Web Developer' : 'عمر نصار — مطور ويب متكامل';
  document.querySelector('meta[name="description"]').content = language === 'en'
    ? 'Omar Nassar is a full-stack web developer working with Vue.js, PHP and MySQL. Explore e-commerce, restaurant, dashboard and business website projects.'
    : 'عمر نصار، مطور ويب متكامل باستخدام Vue.js وPHP وMySQL. اكتشف مشروعات المتاجر والمطاعم ولوحات التحكم ومواقع الأعمال.';
  updateProjects();
  if (openProject) populateDialog(openProject);
  $('#form-status').textContent = '';
  safeStore('omar-language', language);
  updateThemeButton();
}

// Build every project choice from projects.js; no per-project HTML is required.
function buildProjectIndex() {
  const fragment=document.createDocumentFragment();
  projects.forEach(project=>{
    const button=document.createElement('button');
    button.className='project-entry';
    button.type='button';
    button.dataset.selectProject=project.id;
    button.setAttribute('aria-pressed','false');
    button.setAttribute('aria-controls','project-stage');
    const number=document.createElement('span');
    number.className='entry-number';number.textContent=project.number;number.setAttribute('aria-hidden','true');
    const copy=document.createElement('span');copy.className='entry-copy';
    const name=document.createElement('strong');
    const category=document.createElement('span');category.className='entry-category';
    for(const lang of ['en','ar']) {
      name.dataset[lang]=project.name[lang];
      category.dataset[lang]=project.category[lang].split(' · ')[0];
    }
    name.textContent=translate(project.name);
    category.textContent=project.category[language].split(' · ')[0];
    copy.append(name,category);
    const arrow=document.createElement('span');arrow.className='entry-arrow';arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');
    button.append(number,copy,arrow);fragment.append(button);
  });
  $('.project-entries').replaceChildren(fragment);
  $('.collection-bar').hidden=false;
}

function matchingProjects() {
  return projects.filter(project => currentFilter === 'all' || project.group === currentFilter);
}

const projectIconFiles = {'HTML5':'html5','CSS3':'css3','JavaScript':'javascript','Vue.js':'vuejs','PHP':'php','MySQL':'mysql','AJAX':'ajax'};

function renderProject(project, animate = false) {
  const stage = $('#project-stage');
  galleryAnimations.forEach(animation => animation.cancel());
  galleryAnimations = [];
  stage.style.setProperty('--project-color',project.color);
  stage.style.setProperty('--project-ink',project.ink);
  stage.dataset.projectId = project.id;
  $('#showcase-canvas-label').textContent = `${project.number} / ${project.name.en.toUpperCase()}`;
  $('#showcase-watermark').textContent = project.number;
  $('#showcase-category').textContent = translate(project.category);
  $('#showcase-title').textContent = translate(project.name);
  $('#showcase-headline').textContent = translate(project.headline);
  $('#showcase-description').textContent = translate(project.description);
  $('#showcase-position').textContent = `${project.number} / ${String(projects.length).padStart(2,'0')}`;
  const image = $('#showcase-image');
  $('#showcase-screen').hidden = !project.image;
  $('#showcase-cover').hidden = !!project.image;
  if (project.image) {
    image.src = project.image;
    image.alt = translate(project.title);
    $('#showcase-host').textContent = project.host;
  } else {
    image.removeAttribute('src');
    image.alt = '';
    $('#showcase-cover-title').textContent = project.coverTitle;
    $('#showcase-cover-caption').textContent = project.coverCaption;
  }
  const previewLabel = $('#showcase-preview-label');
  previewLabel.dataset.en = project.image ? 'WEBSITE PREVIEW' : 'PROJECT COVER';
  previewLabel.dataset.ar = project.image ? 'معاينة الموقع' : 'غلاف المشروع';
  previewLabel.textContent = previewLabel.dataset[language];
  const live = $('#showcase-live-icon');
  live.href = project.url;
  live.setAttribute('aria-label',language==='en' ? `Open ${project.name.en} website` : `فتح موقع ${project.name.ar}`);
  $('#showcase-stack').replaceChildren(...project.stack.map(name => {
    const item=document.createElement('span');
    if(projectIconFiles[name]) {const icon=document.createElement('img');icon.src=`assets/icons/${projectIconFiles[name]}.svg`;icon.alt='';icon.width=15;icon.height=15;item.append(icon);}
    item.append(document.createTextNode(name));
    return item;
  }));
  const matching=matchingProjects();
  const position=matching.findIndex(item=>item.id===project.id);
  $('#showcase-step-count').textContent=`${String(position+1).padStart(2,'0')} — ${String(matching.length).padStart(2,'0')}`;
  $$('.project-entry').forEach(button=>{
    const active=button.dataset.selectProject===project.id;
    button.classList.toggle('is-selected',active);
    button.setAttribute('aria-pressed',String(active));
  });
  if (animate && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const targets=[$('#showcase-screen').hidden?$('#showcase-cover'):$('#showcase-screen'),$('.showcase-info')];
    targets.forEach((element,index)=>galleryAnimations.push(element.animate(
      [{opacity:0,transform:`translateY(${index?10:18}px)`},{opacity:1,transform:'translateY(0)'}],
      {duration:450,delay:index*45,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'}
    )));
  }
}

function selectProject(id, announce = true) {
  const project=matchingProjects().find(item=>item.id===id);
  if(!project || selectedProjectId===id) return;
  selectedProjectId=id;
  renderProject(project,true);
  if(announce) $('#gallery-announcement').textContent=language==='en' ? `${project.name.en} selected. ${translate(project.headline)}` : `تم اختيار ${project.name.ar}. ${translate(project.headline)}`;
}

function updateProjects() {
  const matching=matchingProjects();
  if(!matching.some(project=>project.id===selectedProjectId)) selectedProjectId=matching[0]?.id ?? '';
  $$('.project-entry').forEach(button=>{button.hidden=!matching.some(project=>project.id===button.dataset.selectProject);});
  $$('.filter').forEach(button=>{
    const active=button.dataset.filter===currentFilter;
    const count=projects.filter(project=>button.dataset.filter==='all'||project.group===button.dataset.filter).length;
    button.querySelector('sup').textContent=String(count).padStart(2,'0');
    button.disabled=count===0;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
  $('#project-count').textContent=language==='en' ? `${String(matching.length).padStart(2,'0')} PROJECTS` : `${String(matching.length).padStart(2,'0')} مشاريع`;
  $('#project-gallery').hidden=matching.length===0;
  $('#project-empty').hidden=matching.length>0;
  if(matching.length) renderProject(matching.find(project=>project.id===selectedProjectId));
}


function populateDialog(project) {
  $('#dialog-category').textContent = translate(project.category);
  $('#dialog-title').textContent = translate(project.title);
  $('#dialog-description').textContent = translate(project.description);
  $('#dialog-focus').textContent = translate(project.focus);
  $('#dialog-live').href = project.url;
  $('#dialog-stack').replaceChildren(...project.stack.map(name => {const tag = document.createElement('span');tag.textContent = name;return tag;}));
  const visual = $('#dialog-visual');
  visual.replaceChildren();
  if (project.image) {
    const image = document.createElement('img');
    image.src = project.image;
    image.alt = translate(project.title);
    visual.append(image);
  } else {
    const cover=document.createElement('div');
    cover.className='dialog-editorial-cover';
    cover.style.setProperty('--project-color',project.color);
    cover.style.setProperty('--project-ink',project.ink);
    const title=document.createElement('strong');title.textContent=project.coverTitle;
    const caption=document.createElement('span');caption.textContent=project.coverCaption;
    cover.append(title,caption);
    visual.append(cover);
  }
}

function showProject(id) {
  const project = projects.find(item => item.id === id);
  if (!project) return;
  openProject = project;
  previousFocus = document.activeElement;
  populateDialog(project);
  $('#project-dialog').showModal();
  document.body.style.overflow = 'hidden';
  $('#project-dialog').scrollTop = 0;
  $('#dialog-close').focus();
}

function closeProject() {$('#project-dialog').close();}
$('#project-dialog').addEventListener('close', () => {
  openProject = null;
  document.body.style.overflow = '';
  previousFocus?.focus({preventScroll:true});
});
$('#dialog-close').addEventListener('click', closeProject);
$('#project-dialog').addEventListener('click', event => {
  if (event.target === $('#project-dialog')) {
    const rect = event.target.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeProject();
  }
});
buildProjectIndex();
$$('.project-entry').forEach(button=>button.addEventListener('click',()=>selectProject(button.dataset.selectProject)));
$$('.filter').forEach(button=>button.addEventListener('click',()=>{
  currentFilter=button.dataset.filter;
  updateProjects();
  $('#gallery-announcement').textContent=language==='en' ? `${matchingProjects().length} projects. ${translate(projects.find(project=>project.id===selectedProjectId).name)} selected.` : `${matchingProjects().length} مشاريع. تم اختيار ${translate(projects.find(project=>project.id===selectedProjectId).name)}.`;
}));
$('#showcase-details').addEventListener('click',()=>showProject(selectedProjectId));
function stepProject(direction) {
  const matching=matchingProjects();
  const index=matching.findIndex(project=>project.id===selectedProjectId);
  selectProject(matching[(index+direction+matching.length)%matching.length].id);
}
$('#project-previous').addEventListener('click',()=>stepProject(-1));
$('#project-next').addEventListener('click',()=>stepProject(1));
const projectMotion=matchMedia('(prefers-reduced-motion: reduce)');
projectMotion.addEventListener('change',()=>{if(projectMotion.matches) galleryAnimations.forEach(animation=>animation.cancel());});

function closeMenu() {
  $('#menu-toggle').setAttribute('aria-expanded', 'false');
  $('#mobile-nav').hidden = true;
}
$('#menu-toggle').addEventListener('click', () => {
  const expanded = $('#menu-toggle').getAttribute('aria-expanded') === 'true';
  $('#menu-toggle').setAttribute('aria-expanded', String(!expanded));
  $('#mobile-nav').hidden = expanded;
});
$$('#mobile-nav a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !$('#mobile-nav').hidden) {closeMenu();$('#menu-toggle').focus();}
});
document.addEventListener('click', event => {if (!event.target.closest('.site-header')) closeMenu();});
matchMedia('(min-width: 851px)').addEventListener('change', event => {if (event.matches) closeMenu();});

function updateThemeButton() {
  const isDark = document.documentElement.dataset.theme !== 'light';
  $('#theme-toggle').setAttribute('aria-label',language === 'en' ? `Switch to ${isDark?'light':'dark'} mode` : `تفعيل المظهر ${isDark?'الفاتح':'الداكن'}`);
  $('#theme-toggle').setAttribute('aria-pressed', String(!isDark));
  document.querySelector('meta[name="theme-color"]').content = isDark ? '#111410' : '#f7f7ef';
}
$('#theme-toggle').addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  safeStore('omar-theme', theme);
  updateThemeButton();
});
$('#language-toggle').addEventListener('click', () => setLanguage(language === 'en' ? 'ar' : 'en'));

function notify(message) {
  const toast = $('#toast');
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3500);
}
$('#copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('omar6940000@gmail.com');
    notify(language === 'en' ? 'Email address copied.' : 'تم نسخ البريد الإلكتروني.');
  } catch (_) {
    const range = document.createRange();
    range.selectNodeContents($('.email-row>a'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    notify(language === 'en' ? 'Email selected. Use your device’s Copy action.' : 'تم تحديد البريد. استخدم خيار النسخ على جهازك.');
  }
});

// This opens a draft in the visitor's mail app; it never claims a message was sent.
$('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const service = form.elements.service.selectedOptions[0].textContent;
  const subject = `${language === 'en' ? 'Portfolio enquiry' : 'استفسار من البورتفوليو'} — ${service}`;
  const body = language === 'en'
    ? `Hello Omar,\n\n${data.get('message').trim()}\n\nProject type: ${service}\nName: ${data.get('name').trim()}\nReply to: ${data.get('email').trim()}`
    : `أهلاً عمر،\n\n${data.get('message').trim()}\n\nنوع المشروع: ${service}\nالاسم: ${data.get('name').trim()}\nالبريد للرد: ${data.get('email').trim()}`;
  const link = document.createElement('a');
  link.href = `mailto:omar6940000@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  link.click();
  $('#form-status').textContent = language === 'en'
    ? 'Your draft is ready for your email app. If it does not open, use the email address or WhatsApp link alongside.'
    : 'رسالتك جاهزة لفتحها في تطبيق البريد. إذا لم يفتح، استخدم عنوان البريد أو رابط واتساب بجانب النموذج.';
});

if ('IntersectionObserver' in window) {
  const sections = $$('main section[id]').filter(section => section.id !== 'home');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) $$('.desktop-nav a').forEach(link => link.classList.toggle('active',link.hash === '#' + entry.target.id));
    });
  }, {rootMargin:'-12% 0px -60% 0px',threshold:0});
  sections.forEach(section => observer.observe(section));
}
$('#year').textContent = new Date().getFullYear();
try {language = localStorage.getItem('omar-language') === 'ar' ? 'ar' : 'en';} catch (_) {}
setLanguage(language);
