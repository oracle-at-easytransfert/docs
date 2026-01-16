// Masquer toutes les mentions EASYTRANSFERT en texte (sauf celle générée par CSS via ::after)
(function() {
  'use strict';
  
  function hideDuplicateEasyTransfert() {
    // Sélectionner tous les éléments de navigation qui pourraient contenir EASYTRANSFERT
    const selectors = [
      'nav a',
      'nav span', 
      'nav div',
      '[class*="sidebar"] a',
      '[class*="sidebar"] span',
      '[class*="sidebar"] div',
      '[class*="navbar"] a',
      '[class*="navbar"] span',
      '[class*="navbar"] div',
      'header a',
      'header span',
      'aside a',
      'aside span'
    ];
    
    const navElements = document.querySelectorAll(selectors.join(', '));
    
    navElements.forEach(element => {
      // Ignorer les éléments qui sont des logos ou à l'intérieur d'un logo
      if (element.closest('[class*="logo"]') || element.classList.contains('nav-logo')) {
        return;
      }
      
      const text = (element.textContent || element.innerText || '').trim();
      const upperText = text.toUpperCase();
      
      // Si l'élément contient "EASYTRANSFERT" ou "EASY TRANSFERT" (variations)
      if (upperText.includes('EASYTRANSFERT') || 
          upperText.includes('EASY TRANSFERT') ||
          upperText === 'EASYTRANSFERT' ||
          text.includes('Easy Transfert')) {
        // Masquer l'élément
        element.style.display = 'none';
        element.style.visibility = 'hidden';
      }
    });
    
    // Masquer aussi les éléments parents qui ne contiennent que EASYTRANSFERT
    const allNavElements = document.querySelectorAll('nav *, [class*="sidebar"] *, [class*="navbar"] *');
    allNavElements.forEach(element => {
      if (element.closest('[class*="logo"]')) {
        return;
      }
      
      const text = (element.textContent || element.innerText || '').trim();
      if (text === 'EASYTRANSFERT' || text === 'Easy Transfert') {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
      }
    });
  }
  
  // Exécuter au chargement de la page
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideDuplicateEasyTransfert);
  } else {
    hideDuplicateEasyTransfert();
  }
  
  // Exécuter plusieurs fois pour gérer les chargements dynamiques
  setTimeout(hideDuplicateEasyTransfert, 100);
  setTimeout(hideDuplicateEasyTransfert, 500);
  setTimeout(hideDuplicateEasyTransfert, 1000);
  setTimeout(hideDuplicateEasyTransfert, 2000);
  
  // Observer les changements du DOM
  if (window.MutationObserver) {
    const observer = new MutationObserver(hideDuplicateEasyTransfert);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
})();
