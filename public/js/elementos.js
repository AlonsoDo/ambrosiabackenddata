var BufferBt;
var ElementoSeleccionadoId;
var CodigoElementoSeleccionado;
var BufferColorFondo = '#000000';
var BufferColorLetras = '#000000';
var EstadoElemento = 'Inserting';
var aElementosSeleccionados = [];
var TipoElementoUltimoSeleccionado;
var BufferUltimoSeleccionado = 'Normal';
var NombreContenedor;

function NuevoElemento(){
    
    EstadoElemento = 'Inserting';
    
    $('#tituloelemento').text('Crear elemento nuevo');
    $('#descripcion').val('');
    $('#precio').val('0');
    $('#impuesto').val('0');
    $('#colorfondo').val(BufferColorFondo);
    $('#colorletras').val(BufferColorLetras);
    
    socket.emit('CargarImpresorasDisponibles',{CompanyId:CompanyId});     
    socket.emit('CargarTerminalesDisponibles',{CompanyId:CompanyId});     

}

function CargarImpresorasDisponiblesBack(data){
    
    $('#ImpresoraDeSalida').empty();
    
    var dataJson = eval(data.ImpresorasDisponibles);    
    
    for(var j in dataJson){        
        
        $('#ImpresoraDeSalida').append($('<option>',{
            value: dataJson[j].NombreImpresora,
            text: dataJson[j].NombreImpresora
        }));       
        
        $('#ImpresoraDeSalida').multiselect('rebuild');
        
    }     
    
}

function CargarTerminalesDisponiblesBack(data){
    
    $('#TerminalDeSalida').empty();
    
    var dataJson = eval(data.TerminalesDisponibles);    
    
    for(var j in dataJson){        
        
        $('#TerminalDeSalida').append($('<option>',{
            value: dataJson[j].NombreTerminal,
            text: dataJson[j].NombreTerminal
        }));       
        
        $('#TerminalDeSalida').multiselect('rebuild');
        
    }
    
    $('#nuevoelementomodal').modal({
        backdrop:'static',
        keyboard:false  
    });
    
}

function GuardarElementoNuevo(){
    
    var ImprimirEnComanda = $('#imprimirencomanda').is(':selected');
    var ImprimirEnFactura = $('#imprimirenfactura').is(':selected');
    var FlagImprimirEnComanda;
    var FlagImprimirEnFactura;
    
    if (ImprimirEnComanda) {
        FlagImprimirEnComanda = 1;
    }else{
        FlagImprimirEnComanda = 0;
    }
    
    if (ImprimirEnFactura) {
        FlagImprimirEnFactura = 1;
    }else{
        FlagImprimirEnFactura = 0;
    }
    
    var GuardarElemento = $('#guardarelemento').is(':selected');
    var SalvarAGaleria = $('#salvaragaleria').is(':selected');
    
    var ImpresorasSeleccionadas = 0;
    var TerminalesSeleccionadas = 0;
    
    var aImpresorasSeleccionadas = [];
    var aTerminalesSeleccionadas = [];
    
    $('#nuevoelementomodal').modal('hide');    
     
     //Validar campos no vacios
    if ($('#descripcion').val()==''){
        //Mensage
        if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
            $('#colortitulo').toggleClass('modal-header-info modal-header-warning'); 
        }                    
        $('#mensage').text('Debe de introducir una descripcion para el elemento');
        $('#titulo').text('Atencion!');
        $('#dialoginfo').modal({
            backdrop:'static',
            keyboard:false  
        });
        UltimoFoco = $('#descripcion').attr('id');
        return
    }    
    
    if ($('#precio').val()==''){
        //Mensage
        if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
            $('#colortitulo').toggleClass('modal-header-info modal-header-warning'); 
        }                    
        $('#mensage').text('Debe de introducir un precio para el elemento. Puede ser cero o negativo.');
        $('#titulo').text('Atencion!');
        $('#dialoginfo').modal({
            backdrop:'static',
            keyboard:false  
        });
        UltimoFoco = $('#precio').attr('id');
        return
    }
    
    if ($('#impuesto').val()==''){
        //Mensage
        if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
            $('#colortitulo').toggleClass('modal-header-info modal-header-warning'); 
        }                    
        $('#mensage').text('Debe de introducir un impuesto para el elemento');
        $('#titulo').text('Atencion!');
        $('#dialoginfo').modal({
            backdrop:'static',
            keyboard:false  
        });
        UltimoFoco = $('#impuesto').attr('id');
        return
    }   
    
    if (EstadoElemento=='Inserting'){ 
        if (!GuardarElemento && !SalvarAGaleria){
            //Mensage
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                $('#colortitulo').toggleClass('modal-header-info modal-header-warning'); 
            }                    
            $('#mensage').text('Debe de introducir al menos un tipo de elemento para crearlo');
            $('#titulo').text('Atencion!');
            $('#dialoginfo').modal({
                backdrop:'static',
                keyboard:false  
            });
            UltimoFoco = 'TipoDeElemento';
            return
        }
    }
    
    if ($('#colorfondo').val()==''){
        //Mensage
        if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
            $('#colortitulo').toggleClass('modal-header-info modal-header-warning'); 
        }                    
        $('#mensage').text('Debe de introducir un color de fondo para el elemento');
        $('#titulo').text('Atencion!');
        $('#dialoginfo').modal({
            backdrop:'static',
            keyboard:false  
        });
        UltimoFoco = $('#colorfondo').attr('id');
        return
    }
    
    if ($('#colorletras').val()==''){
        //Mensage
        if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
            $('#colortitulo').toggleClass('modal-header-info modal-header-warning'); 
        }                    
        $('#mensage').text('Debe de introducir un color de letras para el elemento');
        $('#titulo').text('Atencion!');
        $('#dialoginfo').modal({
            backdrop:'static',
            keyboard:false  
        });
        UltimoFoco = $('#colorletras').attr('id');
        return
    }
    
    $('#ImpresoraDeSalida option').each(function(){
        if($(this).is(':selected')){
            ImpresorasSeleccionadas++;
            aImpresorasSeleccionadas.push($(this).text());
        }
    });    
    
    if (ImpresorasSeleccionadas>0){
        ImpresorasSeleccionadas = 1;
    }
    
    $('#TerminalDeSalida option').each(function(){
        if($(this).is(':selected')){
            TerminalesSeleccionadas++;
            aTerminalesSeleccionadas.push($(this).text());
        }
    });
    
    if (TerminalesSeleccionadas>0) {
        TerminalesSeleccionadas = 1;
    }
    
    if (EstadoElemento=='Inserting'){    
        //Grabar elemento nuevo
        if (GuardarElemento){
            socket.emit('GuardarElemento',{ComoGuardarElemento:'Normal',CodigoPadre:CodigoPadre,CompanyId:CompanyId,Descripcion:$('#descripcion').val(),Precio:$('#precio').val(),Impuesto:$('#impuesto').val(),FlagImprimirEnComanda:FlagImprimirEnComanda,FlagImprimirEnFactura:FlagImprimirEnFactura,ColorLetras:$('#colorletras').val(),ColorFondo:$('#colorfondo').val(),ImpresorasSeleccionadas:ImpresorasSeleccionadas,TerminalesSeleccionadas:TerminalesSeleccionadas,aImpresorasSeleccionadas:aImpresorasSeleccionadas,aTerminalesSeleccionadas:aTerminalesSeleccionadas});
        }    
        if (SalvarAGaleria){
            socket.emit('GuardarElemento',{ComoGuardarElemento:'Galeria',CodigoPadre:-1,CompanyId:CompanyId,Descripcion:$('#descripcion').val(),Precio:$('#precio').val(),Impuesto:$('#impuesto').val(),FlagImprimirEnComanda:FlagImprimirEnComanda,FlagImprimirEnFactura:FlagImprimirEnFactura,ColorLetras:$('#colorletras').val(),ColorFondo:$('#colorfondo').val(),ImpresorasSeleccionadas:ImpresorasSeleccionadas,TerminalesSeleccionadas:TerminalesSeleccionadas,aImpresorasSeleccionadas:aImpresorasSeleccionadas,aTerminalesSeleccionadas:aTerminalesSeleccionadas});
        }
    }else{
        //Actualizar datos elemento        
        socket.emit('ActualizarElemento',{CodigoElementoSeleccionado:CodigoElementoSeleccionado,Descripcion:$('#descripcion').val(),Precio:$('#precio').val(),Impuesto:$('#impuesto').val(),FlagImprimirEnComanda:FlagImprimirEnComanda,FlagImprimirEnFactura:FlagImprimirEnFactura,ColorLetras:$('#colorletras').val(),ColorFondo:$('#colorfondo').val(),ImpresorasSeleccionadas:ImpresorasSeleccionadas,TerminalesSeleccionadas:TerminalesSeleccionadas,aImpresorasSeleccionadas:aImpresorasSeleccionadas,aTerminalesSeleccionadas:aTerminalesSeleccionadas});
        //BufferBt.prop('value',$('#descripcion').val());
    }
    
    BufferColorFondo = $('#colorfondo').val();
    BufferColorLetras = $('#colorletras').val();    
    
}

function CrearElementoEnConteiner(ElementoId,ComoGuardarElemento,Descripcion,ColorLetras,ColorFondo){
    
    //alert(Descripcion)
    
    var $btElemento = $('<input/>')
                    .attr({ type:'button' , id:'bt'+ElementoId , value:Descripcion })
                    .addClass('botoneselementos')
                    .css('background-color', ColorFondo)
                    .css('color', ColorLetras)
                    .bind('click',{ CodigoElemento:ElementoId},function(event){                   
                        
                        TipoElementoUltimoSeleccionado = ComoGuardarElemento;
                        
                        if (event.ctrlKey) {                            
                            
                            $(this).css({"border-color":"#000000","border-width":"5px","border-style":"solid"}); //Select
                            
                            // Mismo container
                            if (TipoElementoUltimoSeleccionado==BufferUltimoSeleccionado) {                                
                                aElementosSeleccionados.push(this.id);
                            }else{                            
                                BufferBt.css({"border-color":"#777","border-width":"2px","border-style":"solid"}); //Unselect                                                                                         
                                
                                var datos = event.data;
                                CodigoElementoSeleccionado = datos.CodigoElemento;
                                ElementoSeleccionadoId = this.id;
                                
                                var Elemento = $("#" + ElementoSeleccionadoId);
                
                                NombreContenedor = Elemento.parent().attr('id');
                                                        
                                //BufferBt = $(this);
                                
                                for ( var i=0 ; i<aElementosSeleccionados.length ; i++){
                                    $('#'+aElementosSeleccionados[i]).css({"border-color":"#777","border-width":"2px","border-style":"solid"});
                                }
                                
                                aElementosSeleccionados = [];
                                aElementosSeleccionados.push(ElementoSeleccionadoId);                                
                            }                            
                            
                        }else{                            
                        
                            BufferBt.css({"border-color":"#777","border-width":"2px","border-style":"solid"});                                                                                              
                            
                            var datos = event.data;
                            CodigoElementoSeleccionado = datos.CodigoElemento;
                            ElementoSeleccionadoId = this.id;
                            
                            var Elemento = $("#" + ElementoSeleccionadoId);
                
                            NombreContenedor = Elemento.parent().attr('id');
                                                    
                            //BufferBt = $(this);
                            
                            for ( var i=0 ; i<aElementosSeleccionados.length ; i++){
                                $('#'+aElementosSeleccionados[i]).css({"border-color":"#777","border-width":"2px","border-style":"solid"});
                            }
                            
                            aElementosSeleccionados = [];
                            aElementosSeleccionados.push(ElementoSeleccionadoId);
                            $(this).css({"border-color":"#000000","border-width":"5px","border-style":"solid"});
                        
                        }
                        
                        BufferUltimoSeleccionado = ComoGuardarElemento;
                        
                        $('#BorrarElemento').prop('disabled',false);
                        $('#EditarElemento').prop('disabled',false);
                        $('#MoverElemento').prop('disabled',false);
                        $('#CopiarElementos').prop('disabled',false);
                        
                        if ($('#'+aElementosSeleccionados[0]).parent().attr('id')=='elementoscontainer'){
                            $('#BajarNivel').prop('disabled',false);                                
                        }else{
                            $('#BajarNivel').prop('disabled',true);
                        } 
                        
                    });
    
    if (ComoGuardarElemento=='Normal') {
        $('#elementoscontainer').append($btElemento);
    }else{
        $('#galeriacontainer').append($btElemento);
    }
    
    //Reset
    for ( var i=0 ; i<aElementosSeleccionados.length ; i++){
        $('#'+aElementosSeleccionados[i]).css({"border-color":"#777","border-width":"2px","border-style":"solid"});
    }                            
    aElementosSeleccionados = [];    
    aElementosSeleccionados.push($btElemento.attr('id'));
    
    BufferBt.css({"border-color":"#777","border-width":"2px","border-style":"solid"}); //Quitar borde
    BufferBt = $btElemento;
    BufferBt.css({"border-color":"#000000","border-width":"5px","border-style":"solid"}); 
    
}

function CargarDatosElementosBack(data){
    
    var dataJson = eval(data.Elementos);
    
    for(var j in dataJson){
        
	var Descripcion = dataJson[j].Descripcion;
        var ColorFondo = dataJson[j].ColorFondo;
        var ColorLetras = dataJson[j].ColorLetras;
        var CodigoElemento = dataJson[j].ElementoId;
        
        var $btElemento = $('<input/>')
                    .attr({ type:'button' , id:'bt'+CodigoElemento , value:Descripcion})
                    .addClass('botoneselementos')
                    .css('background-color',ColorFondo)
                    .css('color',ColorLetras)
                    .bind('click',{CodigoElemento:CodigoElemento},function(event){
                        
                        TipoElementoUltimoSeleccionado = data.TipoElemento;                        
                        
                        if (event.ctrlKey) {                            
                            
                            $(this).css({"border-color":"#000000","border-width":"5px","border-style":"solid"});
                            
                            if (TipoElementoUltimoSeleccionado==BufferUltimoSeleccionado) {                                
                                aElementosSeleccionados.push(this.id);
                            }else{                            
                                BufferBt.css({"border-color":"#777","border-width":"2px","border-style":"solid"});                                                                                          
                                
                                var datos = event.data;
                                CodigoElementoSeleccionado = datos.CodigoElemento;
                                ElementoSeleccionadoId = this.id;
                                
                                var Elemento = $("#" + ElementoSeleccionadoId);
                
                                NombreContenedor = Elemento.parent().attr('id');
                                                        
                                BufferBt = $(this);
                                
                                for ( var i=0 ; i<aElementosSeleccionados.length ; i++){
                                    $('#'+aElementosSeleccionados[i]).css({"border-color":"#777","border-width":"2px","border-style":"solid"});
                                }
                                
                                aElementosSeleccionados = [];
                                aElementosSeleccionados.push(ElementoSeleccionadoId);                                
                            }                            
                            
                        }else{                            
                        
                            BufferBt.css({"border-color":"#777","border-width":"2px","border-style":"solid"});                                                                                               
                            
                            var datos = event.data;
                            CodigoElementoSeleccionado = datos.CodigoElemento;
                            ElementoSeleccionadoId = this.id;
                            
                            var Elemento = $("#" + ElementoSeleccionadoId);
                
                            NombreContenedor = Elemento.parent().attr('id');
                                                    
                            BufferBt = $(this);
                            
                            for ( var i=0 ; i<aElementosSeleccionados.length ; i++){
                                $('#'+aElementosSeleccionados[i]).css({"border-color":"#777","border-width":"2px","border-style":"solid"});
                            }
                            
                            aElementosSeleccionados = [];
                            aElementosSeleccionados.push(ElementoSeleccionadoId);
                            $(this).css({"border-color":"#000000","border-width":"5px","border-style":"solid"});
                        
                        }
                        
                        BufferUltimoSeleccionado = data.TipoElemento;
                        
                        $('#BorrarElemento').prop('disabled',false);
                        $('#EditarElemento').prop('disabled',false);
                        $('#MoverElemento').prop('disabled',false);
                        $('#CopiarElementos').prop('disabled',false);                        
                        
                        if ($('#'+aElementosSeleccionados[0]).parent().attr('id')=='elementoscontainer'){
                            $('#BajarNivel').prop('disabled',false);                                
                        }else{
                            $('#BajarNivel').prop('disabled',true);
                        }                        
                        
                    });
        
        if (data.TipoElemento=='Normal') {
            $('#elementoscontainer').append($btElemento);
        }else{
            $('#galeriacontainer').append($btElemento);
        }
        
        BufferBt = $btElemento;
    
    }    
    
}

function BorrarElemento(){
    
    var aCodigosElementosSeleccionados = [];
    
    for ( var i=0 ; i<aElementosSeleccionados.length ; i++){
        $('#'+aElementosSeleccionados[i]).remove();
        aCodigosElementosSeleccionados.push(aElementosSeleccionados[i].substr(2));
    }
                            
    aElementosSeleccionados = [];
    
    socket.emit('BorrarElemento',{aCodigosElementosSeleccionados:aCodigosElementosSeleccionados});    
    
    $('#BorrarElemento').prop('disabled',true);
    $('#EditarElemento').prop('disabled',true);
    $('#MoverElemento').prop('disabled',true);
    $('#CopiarElementos').prop('disabled',true);    
    
}

function EditarElemento(){
    
    $('#EditarElemento').prop('disabled',true);
    $('#BorrarElemento').prop('disabled',true);
    $('#MoverElemento').prop('disabled',true);
    $('#CopiarElementos').prop('disabled',true);
    socket.emit('EditarElemento',{CodigoElementoSeleccionado:CodigoElementoSeleccionado});
    
}

function CargarDatosElementoBack(data){
    
    EstadoElemento = 'Updating';
    
    $('#descripcion').focus();
    
    var dataJson = eval(data.DatosElemento);
    
    $('#descripcion').val(dataJson[0].Descripcion);
    $('#precio').val(dataJson[0].Precio);
    $('#impuesto').val(dataJson[0].Impuesto);
    $('#colorfondo').val(dataJson[0].ColorFondo);
    $('#colorletras').val(dataJson[0].ColorLetras);
    
    socket.emit('CargarImpresoras',{CompanyId:CompanyId,CodigoElementoSeleccionado:CodigoElementoSeleccionado});    
    socket.emit('CargarTerminales',{CompanyId:CompanyId,CodigoElementoSeleccionado:CodigoElementoSeleccionado});    
    
    $('#TipoDeSalida').multiselect('deselectAll', true);
    $('#TipoDeSalida').multiselect('updateButtonText');
    $("#TipoDeSalida").multiselect("refresh"); 
    
    if (dataJson[0].ImprimirEnComanda==1){
        $('#TipoDeSalida').multiselect('select',['Imprimir en comanda']);             
    }
    if (dataJson[0].ImprimirEnFactura==1){        
        $('#TipoDeSalida').multiselect('select',['Imprimir en factura']);        
    }    
    $("#TipoDeSalida").multiselect("refresh");    
    
    $('#tituloelemento').text('Modificar datos del elemento');
    
    //$('#nuevoelementomodal').modal('show');
    
}

function CargarImpresorasConfigBack(data){
    
    setTimeout(function (){
    
        var dataJson = eval(data.ImpresorasConfig);    
        
        for(var j in dataJson){        
            $("#ImpresoraDeSalida option[value='" +  dataJson[j].NombreImpresora + "']").attr("selected",1);        
        }
        $('#ImpresoraDeSalida').multiselect('refresh');
    
    }, 1000);
    
}

function CargarTerminalesConfigBack(data){
    
    setTimeout(function (){
    
        var dataJson = eval(data.TerminalesConfig);    
        
        for(var j in dataJson){        
            $("#TerminalDeSalida option[value='" +  dataJson[j].NombreTerminal + "']").attr("selected",1);        
        }
        $('#TerminalDeSalida').multiselect('refresh');
    
    }, 1000);    
    
    $('#nuevoelementomodal').modal('show');
    
}

function MoverElemento(){
    
    var aCodigosElementosSeleccionados = [];       
    
    if (NombreContenedor=='elementoscontainer'){
        
        for ( var i=0 ; i<aElementosSeleccionados.length ; i++){
            
            aCodigosElementosSeleccionados.push(aElementosSeleccionados[i].substr(2));
            
            var Elementos = $("#" + aElementosSeleccionados[i]);
            Elementos.unbind('click');
            $('#'+aElementosSeleccionados[i]).appendTo($('#galeriacontainer'));
            Elementos.css({"border-color":"#777","border-width":"2px","border-style":"solid"});            
            
            Elementos.on('click',{CodigoElemento:aCodigosElementosSeleccionados[i]},function(event){
                
                $('#MoverElemento').prop('disabled',false);
                $('#BorrarElemento').prop('disabled',false);
                $('#EditarElemento').prop('disabled',false);
                $('#CopiarElementos').prop('disabled',false);
                
                var datos = event.data;
                CodigoElementoSeleccionado = datos.CodigoElemento;
                ElementoSeleccionadoId = this.id;
                
                TipoElementoUltimoSeleccionado = 'Galeria';
                
                if (event.ctrlKey) {                            
                            
                    $(this).css({"border-color":"#000000","border-width":"5px","border-style":"solid"});
                            
                    if (TipoElementoUltimoSeleccionado==BufferUltimoSeleccionado) {                                
                        aElementosSeleccionados.push(this.id);
                    }else{                            
                        BufferBt.css({"border-color":"#777","border-width":"2px","border-style":"solid"});                          
                
                        NombreContenedor = $(this).parent().attr('id');
                                                        
                        BufferBt = $(this);
                                
                        for ( var i=0 ; i<aElementosSeleccionados.length ; i++){
                            $('#'+aElementosSeleccionados[i]).css({"border-color":"#777","border-width":"2px","border-style":"solid"});
                        }
                                
                        aElementosSeleccionados = [];
                        ElementoSeleccionadoId = this.id;
                        aElementosSeleccionados.push(ElementoSeleccionadoId);                                
                    }                            
                            
                }else{                            
                        
                    BufferBt.css({"border-color":"#777","border-width":"2px","border-style":"solid"});                                                                                    
                            
                    NombreContenedor = $(this).parent().attr('id');
                                                    
                    BufferBt = $(this);
                            
                    for ( var i=0 ; i<aElementosSeleccionados.length ; i++){
                        $('#'+aElementosSeleccionados[i]).css({"border-color":"#777","border-width":"2px","border-style":"solid"});
                    }
                            
                    aElementosSeleccionados = [];
                    ElementoSeleccionadoId = this.id;
                    aElementosSeleccionados.push(ElementoSeleccionadoId);
                    $(this).css({"border-color":"#000000","border-width":"5px","border-style":"solid"}); 
                        
                }
                
                BufferUltimoSeleccionado = 'Galeria';
                
                if ($('#'+aElementosSeleccionados[0]).parent().attr('id')=='elementoscontainer'){
                    $('#BajarNivel').prop('disabled',false);                                
                }else{
                    $('#BajarNivel').prop('disabled',true);
                }                
                
            });       
            
        }
        socket.emit('MoverElementos',{CodigoPadre:CodigoPadre2,CodigosElementosSeleccionados:aCodigosElementosSeleccionados});
    
    }else{
        
        for ( var i=0 ; i<aElementosSeleccionados.length ; i++){
            
            aCodigosElementosSeleccionados.push(aElementosSeleccionados[i].substr(2));
            
            var Elementos = $("#" + aElementosSeleccionados[i]);
            Elementos.unbind('click');
            $('#'+aElementosSeleccionados[i]).appendTo($('#elementoscontainer'));
            Elementos.css({"border-color":"#777","border-width":"2px","border-style":"solid"});            
            
            Elementos.on('click',{CodigoElemento:aCodigosElementosSeleccionados[i]},function(event){
                
                $('#MoverElemento').prop('disabled',false);
                $('#BorrarElemento').prop('disabled',false);
                $('#EditarElemento').prop('disabled',false);
                $('#CopiarElementos').prop('disabled',false);
                
                var datos = event.data;
                CodigoElementoSeleccionado = datos.CodigoElemento;
                ElementoSeleccionadoId = this.id;
                
                TipoElementoUltimoSeleccionado = 'Normal';
                
                if (event.ctrlKey) {                            
                            
                    $(this).css({"border-color":"#000000","border-width":"5px","border-style":"solid"});
                            
                    if (TipoElementoUltimoSeleccionado==BufferUltimoSeleccionado) {                                
                        aElementosSeleccionados.push(this.id);
                    }else{                            
                        BufferBt.css({"border-color":"#777","border-width":"2px","border-style":"solid"});                          
                
                        NombreContenedor = $(this).parent().attr('id');
                                                        
                        BufferBt = $(this);
                                
                        for ( var i=0 ; i<aElementosSeleccionados.length ; i++){
                            $('#'+aElementosSeleccionados[i]).css({"border-color":"#777","border-width":"2px","border-style":"solid"});
                        }
                                
                        aElementosSeleccionados = [];
                        ElementoSeleccionadoId = this.id;
                        aElementosSeleccionados.push(ElementoSeleccionadoId);                                
                    }                            
                            
                }else{                            
                        
                    BufferBt.css({"border-color":"#777","border-width":"2px","border-style":"solid"});                                                                                      
                            
                    NombreContenedor = $(this).parent().attr('id');
                                                    
                    BufferBt = $(this);
                            
                    for ( var i=0 ; i<aElementosSeleccionados.length ; i++){
                        $('#'+aElementosSeleccionados[i]).css({"border-color":"#777","border-width":"2px","border-style":"solid"});
                    }
                            
                    aElementosSeleccionados = [];
                    ElementoSeleccionadoId = this.id;
                    aElementosSeleccionados.push(ElementoSeleccionadoId);
                    $(this).css({"border-color":"#000000","border-width":"5px","border-style":"solid"});
                        
                }
                
                BufferUltimoSeleccionado = 'Normal';
                
                if ($('#'+aElementosSeleccionados[0]).parent().attr('id')=='elementoscontainer'){
                    $('#BajarNivel').prop('disabled',false);                                
                }else{
                    $('#BajarNivel').prop('disabled',true);
                } 
                
            });       
            
        }
        socket.emit('MoverElementos',{CodigoPadre:CodigoPadre,CodigosElementosSeleccionados:aCodigosElementosSeleccionados});
        
    }                
    
}

function CopiarElementos(){
    
    for ( var i=0 ; i<aElementosSeleccionados.length ; i++){
    
        NombreContenedor = $('#'+aElementosSeleccionados[i]).parent().attr('id');
        
        if (NombreContenedor=='elementoscontainer') {
            socket.emit('CopiarElementos',{CodigoPadre:CodigoPadre2,ElementoSeleccionado:aElementosSeleccionados[i].substr(2)});
        }else{
            socket.emit('CopiarElementos',{CodigoPadre:CodigoPadre,ElementoSeleccionado:aElementosSeleccionados[i].substr(2)});
        }
    
    }
    
}

function BajarNivel(){
    
    var Elemento = $('#'+aElementosSeleccionados[0]);
       
    $('#BajarNivel').prop('disabled',true);
    CodigoPadre = aElementosSeleccionados[0].substr(2);
    
    LevelControl++;
    aLevels[LevelControl] = CodigoPadre;
    aPaths[LevelControl] = Elemento.attr("value");
    
    $('#elementoscontainer').empty();
    socket.emit('CargarDatosElementos',{CompanyId:CompanyId,CodigoPadre:CodigoPadre,TipoElemento:'Normal'});
    
    $('#pathcontainer').empty();
    
    for (var i=0;i<LevelControl+1;i++) {        
        var cName = 'Lb'+aLevels[i];
        $("#pathcontainer").append('<a href="#" id='+cName+' onClick="path_click(id)" style="float:left; margin-left:16px; margin-top:10px; margin-right:12px; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:16px;">'+aPaths[i]+'</a>');
    }    
    
}

function SubirNivel(){
    
    LevelControl--;
    if (LevelControl<0){
        LevelControl = 0;
    }
    
    CodigoPadre = aLevels[LevelControl];
    
    $('#elementoscontainer').empty();
    socket.emit('CargarDatosElementos',{CompanyId:CompanyId,CodigoPadre:CodigoPadre,TipoElemento:'Normal'});
    
    $('#pathcontainer').empty();
    
    for (var i=0;i<LevelControl+1;i++) {
        var cName = 'Lb'+aLevels[i];
        $("#pathcontainer").append('<a href="#" id='+cName+' onClick="path_click(id)" style="float:left; margin-left:16px; margin-top:10px; margin-right:12px; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:16px;">'+aPaths[i]+'</a>');
    }
    
}

function path_click(clicked_id){    
    
    CodigoPadre = clicked_id.substr(2);
    $('#elementoscontainer').empty();
    socket.emit('CargarDatosElementos',{CompanyId:CompanyId,CodigoPadre:CodigoPadre,TipoElemento:'Normal'});    
    
    LevelControl = $('#'+clicked_id).index();
    
    $('#pathcontainer').empty();
    
    for (var i=0;i<LevelControl+1;i++) {
        var cName = 'Lb'+aLevels[i];
        $("#pathcontainer").append('<a href="#" id='+cName+' onClick="path_click(id)" style="float:left; margin-left:16px; margin-top:10px; margin-right:12px; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:16px;">'+aPaths[i]+'</a>');
    }
    
}