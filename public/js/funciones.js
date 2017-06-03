function checkRegexp(obj,regexp){
    if (!(regexp.test(obj))){
    	return false;
    } else {
	return true;
    }
}

function CargarDatos(){
    
    $('#toolsbarcontainer').show();
    $('#elementoscontainer').show();
    $('#galeriacontainer').show();
    $('#datosempresa').show();
    $('#datosimpresoras').show();
    
}

function GuardarDatosEmpresa(CompanyId,NombreComercial,NombreFiscal,Direccion,CodigoPostal,Ciudad,NIF,Telefono){
    
    $('#datosempresamodal').modal('hide');
    
    socket.emit('GuardarDatosEmpresa',{CompanyId:CompanyId,NombreComercial:NombreComercial,NombreFiscal:NombreFiscal,Direccion:Direccion,CodigoPostal:CodigoPostal,Ciudad:Ciudad,NIF:NIF,Telefono:Telefono});
    
}

function CargarDatosImpresoras(){    
    
    socket.emit('CargarDatosImpresoras',{CompanyId:CompanyId});    
    
}

function CargarDatosImpresorasBack(data){
    
    $('#nombreimpresora').val(data.NombreImpresora);
    BufferIdImpresora = data.ImpresoraId;
    BufferNombreImpresora = data.NombreImpresora;
    NumeroImpresoras = data.NumeroImpresoras;
    
    $('#NuevaImpresora').prop('disabled',false);
    $('#BorrarImpresora').prop('disabled',false);
    $('#GuardarImpresora').prop('disabled',true);
    $('#CacelarEditImpresora').prop('disabled',true);    
    
    if (data.NumeroImpresoras == 0){               
        $('#PrevImpresora').prop('disabled',true);
        BtPrevImpresoraState = $('#PrevImpresora').is(':disabled');
        $('#NextImpresora').prop('disabled',true);
        BtNextImpresoraState = $('#NextImpresora').is(':disabled');                      
    }else if (data.NumeroImpresoras == 1){
        $('#PrevImpresora').prop('disabled',true);
        BtPrevImpresoraState = $('#PrevImpresora').is(':disabled');
        $('#NextImpresora').prop('disabled',true);
        BtNextImpresoraState = $('#NextImpresora').is(':disabled');        
    }else if (data.NumeroImpresoras > 1){
        $('#PrevImpresora').prop('disabled',true);
        BtPrevImpresoraState = $('#PrevImpresora').is(':disabled');
        $('#NextImpresora').prop('disabled',false);
        BtNextImpresoraState = $('#NextImpresora').is(':disabled');        
    }
    
    $('#impresorasmodal').modal({
        backdrop:'static',
        keyboard:false  
    });
    
}

function NuevaImpresora(){
    
    //Guardar estado de los botones por si cancel edit
    BtPrevImpresoraState = $('#PrevImpresora').is(':disabled');
    BtNextImpresoraState = $('#NextImpresora').is(':disabled');   
    
    InsertUpdateImpresora = 'Inserting';
    $('#nombreimpresora').val('');
    $('#CacelarEditImpresora').prop('disabled',false);
    
    $('#PrevImpresora').prop('disabled',true);
    $('#NextImpresora').prop('disabled',true);
    $('#BorrarImpresora').prop('disabled',true);
    $('#NuevaImpresora').prop('disabled',true);
    $('#GuardarImpresora').prop('disabled',true);
    
}

function GuardarNuevaImpresora(){
    
    if ($('#nombreimpresora').val()==''){
        $('#impresorasmodal').modal('hide');
        UltimoFoco = 'nombreimpresora';
        if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
            $('#colortitulo').toggleClass('modal-header-info modal-header-warning'); 
        }
        $('#titulo').text('Atencion!');
        $('#mensage').text('Debe de introducir un nombre de impresora');
        $('#dialoginfo').modal({
            backdrop:'static',
            keyboard:false  
        });                    
        return;
    }
    
    if (InsertUpdateImpresora == 'Inserting') {
        socket.emit('GuardarNuevaImpresora',{NombreImpresora:$('#nombreimpresora').val(),CompanyId:CompanyId});
        NumeroImpresoras = NumeroImpresoras +1;
        $('#NextImpresora').prop('disabled',true);
        if (NumeroImpresoras==1){
            $('#PrevImpresora').prop('disabled',true);
        }else{
            $('#PrevImpresora').prop('disabled',false);
        }
        $('#NuevaImpresora').prop('disabled',false);
        $('#BorrarImpresora').prop('disabled',false);        
        InsertUpdateImpresora = 'Update';
    }else if (InsertUpdateImpresora == 'Update'){
        socket.emit('ModificarNombreImpresora',{NombreImpresora:$('#nombreimpresora').val(),BufferIdImpresora:BufferIdImpresora});
    }
    
    $('#GuardarImpresora').prop('disabled',true);
    $('#CacelarEditImpresora').prop('disabled',true);
    
}

function CacelarEditImpresora(){
    
    $('#nombreimpresora').val(BufferNombreImpresora);
    $('#CacelarEditImpresora').prop('disabled',true);
    $('#GuardarImpresora').prop('disabled',true);
    $('#NuevaImpresora').prop('disabled',false);
    if (NumeroImpresoras == 0){        
        $('#BorrarImpresora').prop('disabled',true);                
    }else{
        $('#BorrarImpresora').prop('disabled',false); 
    }
    
    if (!BtPrevImpresoraState){
        $('#PrevImpresora').prop('disabled',false);
    }else{
        $('#PrevImpresora').prop('disabled',true);
    }
    
    if (!BtNextImpresoraState){
        $('#NextImpresora').prop('disabled',false);
    }else{
        $('#NextImpresora').prop('disabled',true);
    }   
    
}

function NextImpresora(){
    
    socket.emit('NextImpresora',{BufferIdImpresora:BufferIdImpresora,CompanyId:CompanyId});    
    
}

function PrevImpresora(){
    
    socket.emit('PrevImpresora',{BufferIdImpresora:BufferIdImpresora,CompanyId:CompanyId});    
    
}

function CargarDatosNextImpresorasBack(data){
    
    $('#nombreimpresora').val(data.NombreImpresora);
    BufferIdImpresora = data.ImpresoraId;
    BufferNombreImpresora = data.NombreImpresora;
    NumeroImpresoras = data.NumeroImpresoras;
    
    $('#NuevaImpresora').prop('disabled',false);
    $('#GuardarImpresora').prop('disabled',true);
    $('#CacelarEditImpresora').prop('disabled',true);
    
    if (data.NumeroImpresoras == 1){               
        $('#PrevImpresora').prop('disabled',false);
        BtPrevImpresoraState = $('#PrevImpresora').is(':disabled');
        $('#NextImpresora').prop('disabled',true);
        BtNextImpresoraState = $('#NextImpresora').is(':disabled');                        
    }else if (data.NumeroImpresoras > 1){               
        $('#PrevImpresora').prop('disabled',false);
        BtPrevImpresoraState = $('#PrevImpresora').is(':disabled');
        $('#NextImpresora').prop('disabled',false);
        BtNextImpresoraState = $('#NextImpresora').is(':disabled');                        
    }
    
    $('#BorrarImpresora').prop('disabled',false);
}

function CargarDatosPrevImpresorasBack(data){
    
    $('#nombreimpresora').val(data.NombreImpresora);
    BufferIdImpresora = data.ImpresoraId;
    BufferNombreImpresora = data.NombreImpresora;
    NumeroImpresoras = data.NumeroImpresoras;
    
    $('#NuevaImpresora').prop('disabled',false);
    $('#GuardarImpresora').prop('disabled',true);
    $('#CacelarEditImpresora').prop('disabled',true);
    
    if (data.NumeroImpresoras == 1){               
        $('#PrevImpresora').prop('disabled',true);
        BtPrevImpresoraState = $('#PrevImpresora').is(':disabled');
        $('#NextImpresora').prop('disabled',false);
        BtNextImpresoraState = $('#NextImpresora').is(':disabled');                        
    }else if (data.NumeroImpresoras > 1){               
        $('#PrevImpresora').prop('disabled',false);
        BtPrevImpresoraState = $('#PrevImpresora').is(':disabled');
        $('#NextImpresora').prop('disabled',false);
        BtNextImpresoraState = $('#NextImpresora').is(':disabled');                        
    } 
    
    $('#BorrarImpresora').prop('disabled',false);
}

function BorrarImpresora(){
    
    socket.emit('BorrarImpresora',{BufferIdImpresora:BufferIdImpresora});
    
}