function NuevoElemento(){
    
    $('#descripcion').val('');
    $('#precio').val('0');
    $('#impuesto').val('0');
    $('#colorfondo').val('#000000');
    $('#colorletras').val('#000000');
    
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
    
}