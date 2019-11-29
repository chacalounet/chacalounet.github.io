if (isset(window.app) && isset(window.app.ui)){
  
    let element = MODULE('home', '<div>', {
      'icon':'apps',
      'title':'Acceuil',
      'class':'m-3',
      'min':1,
      'max':100,
      'delay':300,
    });

    element.button.add('click', ()=>{
        
      window.app.ui.navbar.option.active();
    });

    var Generer = (datas, nbr, f, finished) => {

        if(is_numeric(nbr)){

            var nbr = parseInt(nbr);
        }

        if(empty(datas instanceof Object_Container)){
            var datas = new Object_Container(datas);
        }

        var mat = new Object_Container();
                    
        var _stop = false;
        
        datas.foreach(null, (numero, id, stop)=>{

                var id = parseInt(id);
                var compt = 0;

                // var myReq;
                // console.log('id, numero', id, numero);
                // var calculer = ()=>{

                    // console.log(compt <= id && compt < nbr);
                    // if(compt <= id && compt < nbr){
                    while(compt <= id && compt < nbr){
                        
                        // console.log('compt', compt);
                        
                        if(empty(compt)){
                            
                            if(!empty(id)){

                                mat.get('indexes').get(0).add(id, clone(mat.get('indexes').get(0).get(id-1)));
                            }

                            mat.get('indexes').get(0).add(id, numero);
                            // mat.get('indexes').get(compt).get(id).json_array = true;

                            if(nbr == compt+1 && typeof f === 'function'){
                                f([numero], ()=>{
                                    _stop = true;
                                    stop();
                                });
                            }
                        }
                        else if(compt <= 1){

                            mat.get('indexes').get(0).foreach(id-1, (o, i)=>{
                                
                                mat.get('indexes').get(1).get(id-1).add(i, o);
                                mat.get('indexes').get(1).get(id-1).add(i, numero);

                                if(nbr == compt+1 && typeof f === 'function'){
                                    f(mat.get('indexes').get(1).get(id-1).get(i).get(), ()=>{
                                        _stop = true;
                                        stop();
                                    });
                                }
                            });
                        }
                        else{

                            mat.get('indexes').get(compt-1).parse(null, (d, idd, end)=>{
                            
                                if(is_numeric(idd)){
                                    

                                    if(parseInt(idd) > parseInt(id-compt)){
                        
                                        // console.log('(idd > id-compt), id, compt, idd', parseInt(idd) > parseInt(id-compt), id, compt, idd);
                                        // console.log('numero, d', numero, d.json());

                                        end();
                                    }
                                    else{

                                        // console.log('idd', idd);
                                        // console.log('idd, d', idd, d);

                                        d.parse(null, (o, i)=>{
                                
                                            if(is_numeric(i)){

                                                var cnt = mat.get('indexes').get(compt).get(id-compt).count()-1;
                                
                                                // console.log('i', i);
                                                // console.log('i, o', i, o);

                                                mat.get('indexes').get(compt).get(id-compt).add(cnt, clone(o.get()));
                                                mat.get('indexes').get(compt).get(id-compt).add(cnt, numero);

                                                if(nbr == compt+1 && typeof f === 'function'){
                                                    f(mat.get('indexes').get(compt).get(id-compt).get(cnt).get(), ()=>{
                                                        _stop = true;
                                                        stop();
                                                    });
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                                
                        compt++;

                        // // console.log(compt <= id && compt < nbr);
                        // if(_stop !== true){
                        //     myReq = window.requestAnimationFrame(calculer);
                        // }
                        // else{
                        //     cancelAnimationFrame(myReq);
                        // }
                    }
                // };
                // myReq = window.requestAnimationFrame(calculer);

            mat.add('max', numero);
            if(id < nbr){
                mat.add('min', numero);
            }
            else{
                mat.add('extra', numero);
            }
        });
        
        // foreach(mat.json(), (d , k)=>{

        //     console.log('mat', k, d);
        // });

        // console.log('mat', mat);
        
        if(typeof finished === 'function'){
            finished();
        }

        return mat;
    };
    
    if (isset(window.app.cache)){
        
        window.app.cache.load('home_params',  element, 'params');
        
        element.add('init', () => {
            
            element.params.event('save', element.save_params);
            element.params.event('change', element.change_params);
            element.params.save();
        });
    }
    
    insertBeforeElement(window.app.ui.drawer.content.list.divider, element.button);
    
    {
        var container = element.insert('<div class="m-1 p-3 bg-color rounded shadow-sm">');
        
        container.insert('<h6 class="border-bottom pb-2 mb-0">Paramètres</h6>');
        
        {
            var form = container.insert('<div class="d-flex flex-column p-2">');

            {
                var select_min = form.insert(window.app.tools.mdc.text_field({
                    label:'Selection minimum',
                    class:'w-100',
                }));
                select_min.input.setOptions('type', 'number');
                select_min.input.setOptions('min', element.options.last('min'));
                select_min.input.setOptions('max', element.options.last('max'));
                select_min.init();
                select_min.value = element.params.last('select_min');

                select_min.input.check_value = () => {

                    if(select_min.input.getOptions('type') == 'number'){

                        if(!is_numeric(select_min.value)){
                            select_min.value = element.options.last('min');
                        }

                        if(is_numeric(select_min.input.getOptions('min')) && parseInt(select_min.value) < parseInt(select_min.input.getOptions('min'))){
                            select_min.value = select_min.input.getOptions('min');
                        }

                        if(is_numeric(select_min.input.getOptions('max')) && parseInt(select_min.value) > parseInt(select_min.input.getOptions('max'))){
                            select_min.value = select_min.input.getOptions('max');
                        }
                            
                    }
                };

                select_min.input.check_change = () => {
    
                    if(select_min.value !== element.params.last('select_min')){
                        
                        select_min.leading.update('close');
                        form.options.set('select_min', select_min.value);
                    }
                    else{
                        select_min.leading.update();
                        form.options.remove('select_min');
                    }
                    
                    if(!empty(form.options)){
                        cancel.enable();
                        save.enable();
                    }
                    else{ 
                        cancel.disable();
                        save.disable();
                    }
                };
                
                select_min.input.add('submit', ()=>{
                    
                    if(isset(select_min._timeout)){
                        select_min.input.check_input();
                    }
                    else if(!empty_key(form.options.last('select_min'))){
                        save.click();
                    }
                });
                
                select_min.input.add('input', ()=>{

                    save.disable();
                    select_min.leading.update('loop');
                    select_min.timeout(select_min.input.check_input, element.options.last('delay'));
                    select_min.input.update(select_min.value);
                });
                
                select_min.input.add('check_input', ()=>{

                    select_min.timeout();
                    select_min.input.check_value();
                    select_min.input.check_change();
                    select_max.input.check_input();
                });
                
                select_min.input.add('escape', ()=>{
        
                    select_min.value = element.params.last('select_min');
                    select_min.input.check_input();
                });
                
                select_min.leading.add('click', ()=>{

                    select_min.input.escape();
                });

                element.add('save_params', ()=>{
                    
                    select_min.input.check_value();
                    element.params.set('select_min', select_min.value);
                });

                element.add('change_params', ()=>{
                    
                    select_min.input.escape();
                });
            }
            
            
            {
                var select_max = form.insert(window.app.tools.mdc.text_field({
                    label:'Selection maximum',
                    class:'w-100',
                }));
                select_max.input.setOptions('type', 'number');
                select_max.input.setOptions('min', element.options.last('min'));
                select_max.input.setOptions('max', element.options.last('max'));
                select_max.init();
                select_max.value = element.params.last('select_max');

                if(!isset(element.params.last('select_max'))){
                    select_max.value = element.options.last('max');
                }
                

                select_max.input.check_value = () => {

                    if(select_max.input.getOptions('type') == 'number'){

                        if(!is_numeric(select_max.value)){
                            select_max.value = element.options.last('min');
                        }
                        
                        if(parseInt(select_max.value) < parseInt(select_min.value)){
                            select_max.value = select_min.value;
                        }

                        if(is_numeric(select_max.input.getOptions('min')) && parseInt(select_max.value) < parseInt(select_max.input.getOptions('min'))){
                            select_max.value = select_max.input.getOptions('min');
                        }

                        if(is_numeric(select_max.input.getOptions('max')) && parseInt(select_max.value) > parseInt(select_max.input.getOptions('max'))){
                            select_max.value = select_max.input.getOptions('max');
                        }
                            
                    }
                };

                select_max.input.check_change = () => {

                    if(select_max.value !== element.params.last('select_max')){
                        
                        select_max.leading.update('close');
                        form.options.set('select_max', select_max.value);
                    }
                    else{
                        select_max.leading.update();
                        form.options.remove('select_max');
                    }
                    
                    if(!empty(form.options)){
                        cancel.enable();
                        save.enable();
                    }
                    else{ 
                        cancel.disable();
                        save.disable();
                    }
                };
                
                select_max.input.add('submit', ()=>{
                    
                    if(isset(select_max._timeout)){
                        select_max.input.check_input();
                    }
                    else if(!empty_key(form.options.last('select_max'))){
                        save.click();
                    }
                });
                
                select_max.input.add('input', ()=>{

                    save.disable();
                    select_max.leading.update('loop');
                    select_max.timeout(select_max.input.check_input, element.options.last('delay'));
                    select_max.input.update(select_max.value);
                });
                
                select_max.input.add('check_input', ()=>{

                    select_max.timeout();
                    select_max.input.check_value();
                    select_max.input.check_change();
                });
                
                select_max.input.add('escape', ()=>{
        
                    select_max.value = element.params.last('select_max');
                    select_max.input.check_input();
                });
                
                select_max.leading.add('click', ()=>{

                    select_max.input.escape();
                });

                element.add('save_params', ()=>{
                    
                    select_max.input.check_value();
                    element.params.set('select_max', select_max.value);
                });

                element.add('change_params', ()=>{
                    
                    select_max.input.escape();
                });
            }
        }
    
        {
            var bottom = container.insert(`<div class="border-top py-3">`);
        
            {
                var save = bottom.insert(window.app.tools.mdc.button({
                    icon:'save',
                    label:'Enregistrer',
                    class:'w-100 my-2 active',
                }));
                save.init();
                save.add('click', ()=>{
                    
                    if (isset(window.app.cache)){

                        element.params.save();
                            
                        window.app.ui.snackbar.event();
            
                        window.app.ui.snackbar.open({
                        '': 'Paramètres enregistré !',
                        options: {
                            actions: window.app.ui.snackbar.options.get('actions'),
                        },
                        });
                    }
                });
            }
        
            {
                var cancel = bottom.insert(window.app.tools.mdc.button({
                    icon:'cancel',
                    label:'Annuler',
                    class:'w-100 my-2',
                }));
                cancel.init();
                cancel.add('click', ()=>{
                    
                    if (isset(window.app.cache)){
                        element.params.reload();
                    }
                });
            }
        }
    }
    

    
    {
        var container = element.insert('<div class="m-1 p-3 bg-white rounded shadow-sm">');
    
        var chiffres = container.insert('<span class="badge rounded-pill bg-secondary float-right">0');
        container.insert('<h6 class="border-bottom pb-2 mb-0">Bulletin</h6>');
        
        {
            var numbers = container.insert('<div class="d-flex flex-wrap align-items-center justify-content-center p-2">');

            element.var('balls');

            element.toggleBall = (i)=>{

                if(!element.balls.get(i).hasClass('selected')){

                    element.balls.get(i).addClass('selected');
                    chiffres.first().textContent = parseInt(chiffres.first().textContent)+1;
                    element.balls.add(null, i);
                }
                else{

                    element.balls.get(i).removeClass('selected');
                    chiffres.first().textContent = parseInt(chiffres.first().textContent)-1;
                    element.balls.remove_values(i);
                }
                
                if(parseInt(chiffres.first().textContent) >= parseInt(element.params.last('select_min'))){
                    button.enable();
                }
                else{
                    button.disable();
                }
            };

            element.add('change_params', ()=>{

                numbers.clearAll();
                element.balls.destroy();

                chiffres.first().textContent = '0';
                button.disable();

                for(let i=1;i<=parseInt(element.params.last('select_max'));i++){

                    element.balls.var(i, numbers.insert('<span class="ball bg-color-inverted text-color-inverted m-2">'+i));

                    element.balls.first(i).addEventListener('click', (event) => {

                        element.toggleBall(i);
                    });


                }
            });
        }
    
        {
            var bottom = container.insert(`<div class="border-top py-3">`);

            {
                var clear_button = bottom.insert(window.app.tools.mdc.button({
                    icon:'delete',
                    label:'Effacer',
                    class:'w-100 my-2',
                }));
                clear_button.init();
                var button = bottom.insert(window.app.tools.mdc.button({
                    icon:'loop',
                    label:'Charger',
                    class:'w-100 my-2 active',
                }));
                button.init();
                
                var stop_button = bottom.insert(window.app.tools.mdc.button({
                    label:'Stop',
                    class:'w-100 my-2',
                }));
                stop_button.icon.options.set('class', 'spinner-border');
                stop_button.init();
            }
        }
    }

    
    
    {
        var container = element.insert('<div class="m-1 p-3 bg-white rounded shadow-sm">');
    
        var tirages = container.insert('<span class="badge rounded-pill bg-secondary float-right m-1">');
        var selects = container.insert('<span class="badge rounded-pill bg-warning float-right m-1">');
        container.insert('<h6 class="border-bottom pb-2 mb-0">Liste</h6>');
        
        {
            var form = container.insert('<div class="d-flex flex-column p-2">');

            clear_button.add('click', ()=>{
                stop_button.click();
                element.params.reload();
                container.desactive();
            });

            var  _stop_button = false;
            stop_button.add('click', ()=>{

                _stop_button = true;

                button.active();
                stop_button.desactive();
                
                window.app.ui.snackbar.event('loading');
            });
            
            element.add('change_params', ()=>{
                
                stop_button.click();
                container.desactive();
            });
            
            button.add('click', ()=>{
                
                window.app.ui.snackbar.event('loading');

                if(parseInt(chiffres.first().textContent) >= parseInt(element.params.last('select_min'))){
        
                    _stop_button = false;
                    button.desactive();
                    stop_button.active();
                    container.active();
                    element.destroy('filters');
                    form.options.destroy();

                    window.app.ui.snackbar.open({
                    '': 'Chargement ...',
                    query:'loading',
                    options: {
                        timeout:10000,
                    },
                    });
                    
                    form.clearAll();
                    
                    tirages.first().textContent = 0;
                    
                    Generer(element.balls, element.params.last('select_min'), (data, stop)=>{

                        tirages.first().textContent = parseInt(tirages.first().textContent)+1;
                        selects.first().textContent = tirages.first().textContent;

                        if(_stop_button === true){
                            stop();
                            _stop_button = false;
                        }
                        
                        var t_container = form.insert('<div class="d-flex flex-wrap align-items-center justify-content-center border rounded m-1">');
                        
                        foreach(data, (d)=>{
                            
                            var el = t_container.insert('<span class="ball bg-color-inverted text-color-inverted m-1">'+d);
                            
                            el.first().addEventListener('click', (event) => {
                                
                                element.dispatch(d, 'set_filters');
                                element.dispatch(d, 'filters');
                            });


                            element.add('set_filters', (n)=>{

                                if(d == n){
                                    
                                    if(el.hasClass('selected')){
                                        el.removeClass('selected');
                                        
                                        if(!empty(t_container.options.has(n))){
                                            t_container.options.remove_values(n);
                                        }
                                        if(!empty(form.options.has(n))){
                                            form.options.remove_values(n);
                                        }
                                    }
                                    else{
                                        el.addClass('selected');
                                        
                                        if(empty(t_container.options.has(n))){
                                            t_container.options.add(null, n);
                                        }
                                        if(empty(form.options.has(n))){
                                            form.options.add(null, n);
                                        }
                                    }
                                }
                            });

                            element.add('filters', (n)=>{

                                if(t_container.options.has(n) || empty(form.options)){

                                    if(!empty(t_container.first().style.getPropertyValue('display'))){
                                        t_container.active();
                                        selects.first().textContent = parseInt(selects.first().textContent||0)+1;
                                    }
                                }
                                else if(empty(t_container.options)){

                                    if(empty(t_container.first().style.getPropertyValue('display'))){
                                        
                                        t_container.desactive();
                                        selects.first().textContent = parseInt(selects.first().textContent||0)-1;
                                    }
                                }
                            });
                            
                        });

                    }, ()=>{
                        stop_button.click();
                    });
                }
                else{
        
                    window.app.ui.snackbar.open({
                    '': 'Il manque '+(parseInt(element.params.last('select_min'))-parseInt(chiffres.first().textContent))+' chiffre(s) !',
                    query:'loading',
                    });
                }
            });
        }
    }

    window.app.ui.add('init', () => {
  
      element.button.click();
    });
  }