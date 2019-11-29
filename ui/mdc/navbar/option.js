if (isset(window.app) && isset(window.app.ui)){
        
  if (isset(window.app.ui.navbar)){

    window.app.ui.navbar.var('option', insertInToElementFirst(window.app.ui.navbar.row.sections.last(), `
    <div class="mdc-menu-surface--anchor">
    `));

    window.app.ui.navbar.option.options.import({
      "icon": 'more_vert',
      "label": 'Options',
    });

    window.app.ui.navbar.option.add('active', ()=>{
      
      window.app.ui.navbar.option.first().classList.remove('d-none');
    });

    window.app.ui.navbar.option.add('desactive', ()=>{

      window.app.ui.navbar.option.first().classList.add('d-none');
    });

    window.app.ui.add('is', (el) => {

      window.app.ui.navbar.option.desactive();
    });

    window.app.ui.navbar.option.var('button', insertInToElement(window.app.ui.navbar.option.last(), `
    <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button">
    `));

    window.app.ui.navbar.option.button.update = (icon, label, f) => {

      if(empty(label)){
        var label = window.app.ui.navbar.option.options.last('label');
      }

      if (is_object(label)) {

        if(typeof label.string === 'function'){

          var label = label.string();
        }
        else if(is_element(label)){
            
          var label = label.textContent;
        }
      }

      if (is_object(label)) {

        var label = '';
      }

      window.app.ui.navbar.option.button.first().setAttribute('aria-label', label);

      if(empty(icon)){
        var icon = window.app.ui.navbar.option.options.last('icon');
      }

      if (is_object(icon)) {

        if(typeof icon.string === 'function'){

          var icon = icon.string();
        }
        else if(is_element(icon)){
            
          var icon = icon.textContent;
        }
      }

      if (is_object(icon)) {

        var icon = '';
      }
          
      if(window.app.ui.navbar.option.button.first().textContent != icon){
      
        window.app.ui.navbar.option.button.first().textContent = icon;
        window.app.ui.navbar.option.button.dispatch(f, 'update');
        return true;
      }

      return false;
    };

    window.app.ui.navbar.option.var('menu', insertInToElement(window.app.ui.navbar.option.last(), `
    <div class="mdc-menu-surface">
    `));

    window.app.ui.navbar.option.menu.var('list', insertInToElement(window.app.ui.navbar.option.menu.last(), `
    <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
    `));
    
    // insertInToElement(window.app.ui.navbar.option.menu.list.first(), `
    // <li class="mdc-list-item" tabindex="0">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">card_giftcard</i>
    //   <span class="mdc-list-item__text">Offrir</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">payment</i>
    //   <span class="mdc-list-item__text">Payements</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">shopping_cart</i>
    //   <span class="mdc-list-item__text">Panier</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">stars</i>
    //   <span class="mdc-list-item__text">Etoile</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">grade</i>
    //   <span class="mdc-list-item__text">Etoile</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">event</i>
    //   <span class="mdc-list-item__text">Evenements</span>
    // </li>

    // <li role="separator" class="mdc-list-divider"></li>

    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">cancel</i>
    //   <span class="mdc-list-item__text">Annuler</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">block</i>
    //   <span class="mdc-list-item__text">Bloquer</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">arrow_back</i>
    //   <span class="mdc-list-item__text">Retour</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">refresh</i>
    //   <span class="mdc-list-item__text">Rafraichir</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">add</i>
    //   <span class="mdc-list-item__text">Ajouter</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">delete</i>
    //   <span class="mdc-list-item__text">Supprimer</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">edit</i>
    //   <span class="mdc-list-item__text">Modifier</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">insert_comment</i>
    //   <span class="mdc-list-item__text">Commenter</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">thumb_up_alt</i>
    //   <span class="mdc-list-item__text">Aimer</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">thumb_down_alt</i>
    //   <span class="mdc-list-item__text">Détester</span>
    // </li>

    // <li role="separator" class="mdc-list-divider"></li>

    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">help</i>
    //   <span class="mdc-list-item__text">Aide</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">help_outline</i>
    //   <span class="mdc-list-item__text">Aide</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">error</i>
    //   <span class="mdc-list-item__text">Erreurs</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">bug_report</i>
    //   <span class="mdc-list-item__text">Signaler</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">feedback</i>
    //   <span class="mdc-list-item__text">Signaler</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">warning</i>
    //   <span class="mdc-list-item__text">Signaler</span>
    // </li>
    // <li class="mdc-list-item">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">report</i>
    //   <span class="mdc-list-item__text">Signaler</span>
    // </li>
    // `);

    window.app.ui.navbar.option.add('init', () => {

        window.app.ui.navbar.option.mdc =  mdc.menuSurface.MDCMenuSurface.attachTo(window.app.ui.navbar.option.menu.first());

        window.app.ui.navbar.option.button.first().addEventListener('click', () => {
            if(empty(window.app.ui.navbar.option.mdc.isOpen())){
              window.app.ui.navbar.option.mdc.open();
            }
            else{
              window.app.ui.navbar.option.mdc.close();  
            }
          //   window.app.ui.navbar.option.mdc.open = empty(window.app.ui.navbar.option.mdc.open);
        });
        
      // var initialIcon = window.app.ui.navbar.option.button.first().textContent;
      window.app.ui.navbar.option.button.update();

      window.app.ui.navbar.option.mdc.root_.addEventListener('MDCMenuSurface:opened', () => {
        // console.log('MDCMenuSurface:opened');
        // window.app.ui.navbar.option.button.first().textContent = 'close';
        // window.app.ui.navbar.option.button.first().textContent = 'more_horiz';
        window.app.ui.navbar.option.button.update('more_horiz');
        
        // window.app.ui.navbar.option.menu.first().style.bottom = '';
        // window.app.ui.navbar.option.menu.first().style.top = parseInt(window.app.ui.navbar.options.last('height'))+'px';
        // window.app.ui.navbar.option.menu.first().style.maxHeight = (parseInt(window.innerHeight)-parseInt(window.app.ui.navbar.options.last('height')))+'px';

        // window.app.ui.navbar.option.menu.first().style.right = '0px';
        // window.app.ui.navbar.option.menu.first().style.left = '';
        // // window.app.ui.navbar.option.menu.first().style.maxHeight = 'none';

        window.app.ui.navbar.option.resize();

        window.app.tools.scrollTop({
          el: window.app.ui.navbar.option.menu.last(),
          duration: 350
        });
      });
  
      window.app.ui.navbar.option.mdc.root_.addEventListener('MDCMenuSurface:closed', () => {
        // window.app.ui.navbar.option.button.first().textContent = initialIcon;
        window.app.ui.navbar.option.button.update();
      });

    });

    
    // window.app.ui.add('update', (ui) => {
    // // window.app.ui.navbar.add('update', () => {
    // // window.app.ui.navbar.option.add('update', () => {

    //     window.app.ui.navbar.option.button.update();
    // });

    window.app.ui.add('init', () => {
      
        window.app.ui.navbar.option.init();
    });
    
    window.app.ui.navbar.option.menu.first().classList.add('mdc-menu-surface--fixed');

    window.app.ui.navbar.option.add('resize', () => {

      window.app.ui.navbar.option.menu.first().style.top = window.app.ui.navbar.options.last('height')+'px';
      window.app.ui.navbar.option.menu.first().style.maxHeight = window.app.ui.options.last('height')+'px';
      
      window.app.ui.navbar.option.menu.first().style.bottom = '';
      window.app.ui.navbar.option.menu.first().style.right = '0px';
      window.app.ui.navbar.option.menu.first().style.left = '';
    });

    window.app.ui.navbar.add('resize', () => {

      window.app.ui.navbar.option.resize();

      // window.app.ui.navbar.option.menu.first().style.top = parseInt(window.app.ui.navbar.options.last('height'))+'px';
      // window.app.ui.navbar.option.menu.first().style.maxHeight = (parseInt(window.innerHeight)-parseInt(window.app.ui.navbar.options.last('height')))+'px';

      // window.app.ui.navbar.option.mdc.setAnchorMargin({ 
      //   // right: 12,
      //   // right: 0,
      //   // bottom: 0,
      //   top: window.app.ui.navbar.options.last('height')
      // });

      // window.app.ui.navbar.option.mdc.setMaxHeight();
      // window.app.ui.navbar.option.mdc.setFixedPosition({ 
      // window.app.ui.navbar.option.mdc.setAbsolutePosition({ 
      //   // right: 12,
      //   // right: 0,
      //   // bottom: 0,
      //   top: window.app.ui.navbar.options.last('height')
      // });

      // window.app.ui.navbar.option.menu.first().style.maxHeight = '100px';

    });
  }
}