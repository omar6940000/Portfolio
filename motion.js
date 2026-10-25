'use strict';

(() => {
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const explorer = document.querySelector('#stack-explorer');
  const tabs = [...document.querySelectorAll('[data-stack-tab]')];
  const panels = [...document.querySelectorAll('[data-stack-panel]')];
  const tabList = document.querySelector('.stack-tabs');
  let stackAnimations = [];

  function selectStack(tab, moveFocus = false, animate = true) {
    const selected = tab.dataset.stackTab;
    stackAnimations.forEach(animation => animation.cancel());
    stackAnimations = [];
    tabs.forEach(button => {
      const active = button === tab;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.stackPanel !== selected; });
    if (moveFocus) tab.focus({ preventScroll: true });
    const panel = panels.find(item => item.dataset.stackPanel === selected);
    if (animate && !motionPreference.matches && typeof panel.animate === 'function') {
      stackAnimations.push(panel.querySelector('.stack-panel-header').animate(
        [{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],
        {duration:350,easing:'cubic-bezier(.22,1,.36,1)'}
      ));
      panel.querySelectorAll('.skill-item').forEach((card, index) => {
        stackAnimations.push(card.animate(
          [{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],
          {duration:450,delay:Math.min(index,6)*35,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'}
        ));
      });
    }
  }

  if (explorer && tabs.length && panels.length) {
    tabList.setAttribute('role','tablist');
    const orientation = matchMedia('(min-width: 851px)');
    const setOrientation = () => tabList.setAttribute('aria-orientation', orientation.matches ? 'vertical' : 'horizontal');
    setOrientation();
    orientation.addEventListener('change',setOrientation);
    tabs.forEach(tab => {
      tab.setAttribute('role','tab');
      tab.setAttribute('aria-controls','stack-panel-'+tab.dataset.stackTab);
      tab.addEventListener('click',()=>selectStack(tab));
      tab.addEventListener('keydown',event => {
        const index = tabs.indexOf(tab);
        const rtl = document.documentElement.dir === 'rtl';
        let next;
        if (event.key==='Home') next=0;
        else if (event.key==='End') next=tabs.length-1;
        else if (event.key==='ArrowDown' || event.key===(rtl?'ArrowLeft':'ArrowRight')) next=(index+1)%tabs.length;
        else if (event.key==='ArrowUp' || event.key===(rtl?'ArrowRight':'ArrowLeft')) next=(index-1+tabs.length)%tabs.length;
        if (next !== undefined) {event.preventDefault();selectStack(tabs[next],true);}
      });
    });
    panels.forEach(panel => {panel.setAttribute('role','tabpanel');panel.tabIndex=0;});
    selectStack(tabs[0],false,false);
    explorer.classList.add('stack-interactive');
  }

  const ticker = document.querySelector('.stack-strip');
  const tickerButton = document.querySelector('#ticker-toggle');
  let tickerPaused = false;
  function updateTicker() {
    const arabic = document.documentElement.lang === 'ar';
    ticker.classList.toggle('is-paused',tickerPaused);
    tickerButton.setAttribute('aria-pressed',String(tickerPaused));
    const en = tickerPaused ? 'Play technology strip' : 'Pause technology strip';
    const ar = tickerPaused ? 'تشغيل شريط التقنيات' : 'إيقاف شريط التقنيات مؤقتًا';
    tickerButton.dataset.enLabel=en;
    tickerButton.dataset.arLabel=ar;
    tickerButton.setAttribute('aria-label',arabic?ar:en);
    tickerButton.title=arabic?ar:en;
  }
  if (ticker && tickerButton) {
    tickerButton.addEventListener('click',()=>{tickerPaused=!tickerPaused;updateTicker();});
    new MutationObserver(updateTicker).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    updateTicker();
  }

  let revealObserver;
  const revealTargets = [...document.querySelectorAll(
    '.section-top,.section-heading,.project-gallery,.about-identity,.about-copy,.stack-workbench,.service,.learning-note,.process-heading,.process-grid>div,.contact-layout>div,.contact-form'
  )];
  revealTargets.forEach((element,index) => {
    element.classList.add('reveal-target');
    const stagger = element.matches('.project-card') ? [...element.parentElement.children].indexOf(element)%2*85 : element.matches('.process-grid>div') ? [...element.parentElement.children].indexOf(element)*80 : 0;
    element.style.setProperty('--reveal-delay',stagger+'ms');
  });
  function setMotionPreference() {
    stackAnimations.forEach(animation => animation.cancel());
    revealObserver?.disconnect();
    if (motionPreference.matches || !('IntersectionObserver' in window)) {
      document.documentElement.classList.remove('motion-enabled');
      revealTargets.forEach(element=>element.classList.add('is-in-view'));
      return;
    }
    document.documentElement.classList.add('motion-enabled');
    revealObserver = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if (entry.isIntersecting) {entry.target.classList.add('is-in-view');revealObserver.unobserve(entry.target);}
      });
    },{threshold:.08,rootMargin:'0px 0px -25px 0px'});
    revealTargets.filter(element=>!element.classList.contains('is-in-view')).forEach(element=>revealObserver.observe(element));
  }
  document.addEventListener('focusin',event=>{
    const target=event.target.closest('.reveal-target');
    if (target) {target.classList.add('is-in-view');revealObserver?.unobserve(target);}
  });
  motionPreference.addEventListener('change',setMotionPreference);
  setMotionPreference();

  let scrollFrame = 0;
  const header=document.querySelector('.site-header');
  function updateScroll() {
    scrollFrame=0;
    const height=document.documentElement.scrollHeight-innerHeight;
    const progress=height>0?Math.min(1,Math.max(0,scrollY/height)):0;
    document.documentElement.style.setProperty('--scroll-progress',String(progress));
    header.classList.toggle('is-scrolled',scrollY>20);
  }
  const scheduleScroll=()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScroll);};
  addEventListener('scroll',scheduleScroll,{passive:true});
  addEventListener('resize',scheduleScroll,{passive:true});
  new ResizeObserver(scheduleScroll).observe(document.body);
  updateScroll();
})();
