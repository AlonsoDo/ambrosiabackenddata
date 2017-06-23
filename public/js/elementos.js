var BufferBt;
var ElementoSeleccionadoId;
var CodigoElementoSeleccionado;
var BufferColorFondo = '#000000';
var BufferColorLetras = '#000000'; 

function NuevoElemento(){
    
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
            value: dataJson[j].ImpresoraId,
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
            value: dataJson[j].TerminalId,
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
    
    //Grabar elemento
    if (GuardarElemento){
        socket.emit('GuardarElemento',{ComoGuardarElemento:'Normal',CodigoPadre:CodigoPadre,CompanyId:CompanyId,Descripcion:$('#descripcion').val(),Precio:$('#precio').val(),Impuesto:$('#impuesto').val(),FlagImprimirEnComanda:FlagImprimirEnComanda,FlagImprimirEnFactura:FlagImprimirEnFactura,ColorLetras:$('#colorletras').val(),ColorFondo:$('#colorfondo').val(),ImpresorasSeleccionadas:ImpresorasSeleccionadas,TerminalesSeleccionadas:TerminalesSeleccionadas,aImpresorasSeleccionadas:aImpresorasSeleccionadas,aTerminalesSeleccionadas:aTerminalesSeleccionadas});
    }
    
    if (SalvarAGaleria){
        socket.emit('GuardarElemento',{ComoGuardarElemento:'Galeria',CodigoPadre:-1,CompanyId:CompanyId,Descripcion:$('#descripcion').val(),Precio:$('#precio').val(),Impuesto:$('#impuesto').val(),FlagImprimirEnComanda:FlagImprimirEnComanda,FlagImprimirEnFactura:FlagImprimirEnFactura,ColorLetras:$('#colorletras').val(),ColorFondo:$('#colorfondo').val(),ImpresorasSeleccionadas:ImpresorasSeleccionadas,TerminalesSeleccionadas:TerminalesSeleccionadas,aImpresorasSeleccionadas:aImpresorasSeleccionadas,aTerminalesSeleccionadas:aTerminalesSeleccionadas});
    }
    
    BufferColorFondo = $('#colorfondo').val();
    BufferColorLetras = $('#colorletras').val();
    
}

function CrearElementoEnConteiner(ElementoId,ComoGuardarElemento){
    
    var $btElemento = $('<input/>')
                    .attr({ type:'button' , id:'bt'+ElementoId , value:$('#descripcion').val() })
                    .addClass('botoneselementos')
                    .css('background-color', $('#colorfondo').val())
                    .css('color', $('#colorletras').val())
                    .bind('click', { CodigoElemento:ElementoId},function(event){
                        var datos = event.data;
                        CodigoElementoSeleccionado = datos.CodigoElemento;                        
                        ElementoSeleccionadoId = this.id;
                        $('#BorrarElemento').prop('disabled',false);
                    });
    
    if (ComoGuardarElemento=='Normal') {
        $('#elementoscontainer').append($btElemento);
    }else{
        $('#galeriacontainer').append($btElemento);
    }    
    
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
                    .bind('click', {CodigoElemento:CodigoElemento},function(event){                   
                        
                        BufferBt.css({"border-color":"#777","border-width":"2px","border-style":"solid"});                        
                        $(this).css({"border-color":"#000000","border-width":"5px","border-style":"solid"});                                                                 
                        
                        var datos = event.data;
                        CodigoElementoSeleccionado = datos.CodigoElemento;
                        ElementoSeleccionadoId = this.id;
                                                
                        BufferBt = $(this);
                        
                        $('#BorrarElemento').prop('disabled',false);
                        
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
    
    $('#'+ElementoSeleccionadoId).remove();
    $('#BorrarElemento').prop('disabled',true);
    socket.emit('BorrarElemento',{CodigoElementoSeleccionado:CodigoElementoSeleccionado});
    
}