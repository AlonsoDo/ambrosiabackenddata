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
    $('#datosterminales').show();
    $('#datosempleados').show();
    
    socket.emit('CargarDatosElementos',{CompanyId:CompanyId,CodigoPadre:CodigoPadre,TipoElemento:'Normal'});
    socket.emit('CargarDatosElementos',{CompanyId:CompanyId,CodigoPadre:CodigoPadre2,TipoElemento:'Galeria'});
    
}

function GuardarDatosEmpresa(CompanyId,NombreComercial,NombreFiscal,Direccion,CodigoPostal,Ciudad,NIF,Telefono){
    
    $('#datosempresamodal').modal('hide');
    
    socket.emit('GuardarDatosEmpresa',{CompanyId:CompanyId,NombreComercial:NombreComercial,NombreFiscal:NombreFiscal,Direccion:Direccion,CodigoPostal:CodigoPostal,Ciudad:Ciudad,NIF:NIF,Telefono:Telefono});
    
}

function CargarDatosImpresoras(){
    
    $('#imgloader').show();
    
    socket.emit('CargarDatosImpresoras',{CompanyId:CompanyId});    
    
}

function CargarDatosImpresorasBack(data){
    
    $('#imgloader').hide();
    
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
    
    $('#imgloader').show();
    
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
    
    InsertUpdateImpresora = 'Update';
    
}

function NextImpresora(){
    
    $('#imgloader').show();
    
    socket.emit('NextImpresora',{BufferIdImpresora:BufferIdImpresora,CompanyId:CompanyId});    
    
}

function PrevImpresora(){
    
    $('#imgloader').show();
    
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
    
    $('#imgloader').hide();
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
    
    $('#imgloader').hide();
}

function BorrarImpresora(){
    
    $('#imgloader').show();
    
    socket.emit('BorrarImpresora',{BufferIdImpresora:BufferIdImpresora});
    
}

function CargarDatosTerminales(){
    
    $('#imgloader').show();
    
    socket.emit('CargarDatosTerminales',{CompanyId:CompanyId});    
    
}

function CargarDatosTerminalesBack(data){
    
    $('#imgloader').hide();
    
    $('#nombreterminal').val(data.NombreTerminal);
    BufferIdTerminal = data.TerminalId;
    BufferNombreTerminal = data.NombreTerminal;
    NumeroTerminales = data.NumeroTerminales;    
    
    $('#NuevaTerminal').prop('disabled',false);
    $('#BorrarTerminal').prop('disabled',false);
    $('#GuardarTerminal').prop('disabled',true);
    $('#CacelarEditTerminal').prop('disabled',true);    
    
    if (data.NumeroTerminales == 0){               
        $('#PrevTerminal').prop('disabled',true);
        BtPrevTerminalState = $('#PrevTerminal').is(':disabled');
        $('#NextTerminal').prop('disabled',true);
        BtNextTerminalState = $('#NextTerminal').is(':disabled');                      
    }else if (data.NumeroTerminales == 1){
        $('#PrevTerminal').prop('disabled',true);
        BtPrevTerminalState = $('#PrevTerminal').is(':disabled');
        $('#NextTerminal').prop('disabled',true);
        BtNextTerminalState = $('#NextTerminal').is(':disabled');        
    }else if (data.NumeroTerminales > 1){
        $('#PrevTerminal').prop('disabled',true);
        BtPrevTerminalState = $('#PrevTerminal').is(':disabled');
        $('#NextTerminal').prop('disabled',false);
        BtNextTerminalState = $('#NextTerminal').is(':disabled');        
    }
    
    $('#terminalesmodal').modal({
        backdrop:'static',
        keyboard:false  
    });
    
}

function NuevaTerminal(){
    
    //Guardar estado de los botones por si cancel edit
    BtPrevTerminalState = $('#PrevTerminal').is(':disabled');
    BtNextTerminalState = $('#NextTerminal').is(':disabled');   
    
    InsertUpdateTerminal = 'Inserting';
    $('#nombreterminal').val('');
    $('#CacelarEditTerminal').prop('disabled',false);
    
    $('#PrevTerminal').prop('disabled',true);
    $('#NextTerminal').prop('disabled',true);
    $('#BorrarTerminal').prop('disabled',true);
    $('#NuevaTerminal').prop('disabled',true);
    $('#GuardarTerminal').prop('disabled',true);
    
}

function GuardarNuevaTerminal(){
    
    if ($('#nombreterminal').val()==''){
        $('#terminalesmodal').modal('hide');
        UltimoFoco = 'nombreterminal';
        if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
            $('#colortitulo').toggleClass('modal-header-info modal-header-warning'); 
        }
        $('#titulo').text('Atencion!');
        $('#mensage').text('Debe de introducir un nombre de terminal');
        $('#dialoginfo').modal({
            backdrop:'static',
            keyboard:false  
        });                    
        return;
    }
    
    if (InsertUpdateTerminal == 'Inserting') { 
        socket.emit('GuardarNuevaTerminal',{NombreTerminal:$('#nombreterminal').val(),CompanyId:CompanyId});
        NumeroTerminales = NumeroTerminales + 1;
        $('#NextTerminal').prop('disabled',true);
        if (NumeroTerminales==1){
            $('#PrevTerminal').prop('disabled',true);
        }else{
            $('#PrevTerminal').prop('disabled',false);
        }
        $('#NuevaTerminal').prop('disabled',false);
        $('#BorrarTerminal').prop('disabled',false);        
        InsertUpdateTerminal = 'Update';
    }else if (InsertUpdateTerminal == 'Update'){
        socket.emit('ModificarNombreTerminal',{NombreTerminal:$('#nombreterminal').val(),BufferIdTerminal:BufferIdTerminal});
    }
    
    $('#GuardarTerminal').prop('disabled',true);
    $('#CacelarEditTerminal').prop('disabled',true);
    
    $('#imgloader').show();
    
}

function CacelarEditTerminal(){
    
    $('#nombreterminal').val(BufferNombreTerminal);
    $('#CacelarEditTerminal').prop('disabled',true);
    $('#GuardarTerminal').prop('disabled',true);
    $('#NuevaTerminal').prop('disabled',false);
    if (NumeroTerminales == 0){        
        $('#BorrarTerminal').prop('disabled',true);                
    }else{
        $('#BorrarTerminal').prop('disabled',false); 
    }
    
    if (!BtPrevTerminalState){
        $('#PrevTerminal').prop('disabled',false);
    }else{
        $('#PrevTerminal').prop('disabled',true);
    }
    
    if (!BtNextTerminalState){
        $('#NextTerminal').prop('disabled',false);
    }else{
        $('#NextTerminal').prop('disabled',true);
    }
    
    InsertUpdateTerminal = 'Update';
    
}

function NextTerminal(){
    
    $('#imgloader').show();
    
    socket.emit('NextTerminal',{BufferIdTerminal:BufferIdTerminal,CompanyId:CompanyId});    
    
}

function PrevTerminal(){
    
    $('#imgloader').show();
    
    socket.emit('PrevTerminal',{BufferIdTerminal:BufferIdTerminal,CompanyId:CompanyId});    
    
}

function CargarDatosNextTerminalesBack(data){
    
    $('#nombreterminal').val(data.NombreTerminal);
    BufferIdTerminal = data.TerminalId;
    BufferNombreTerminal = data.NombreTerminal;
    NumeroTerminales = data.NumeroTerminales;
    
    $('#NuevaTerminal').prop('disabled',false);
    $('#GuardarTerminal').prop('disabled',true);
    $('#CacelarEditTerminal').prop('disabled',true);
    
    if (data.NumeroTerminales == 1){               
        $('#PrevTerminal').prop('disabled',false);
        BtPrevTerminalState = $('#PrevTerminal').is(':disabled');
        $('#NextTerminal').prop('disabled',true);
        BtNextTerminalState = $('#NextTerminal').is(':disabled');                        
    }else if (data.NumeroTerminales > 1){               
        $('#PrevTerminal').prop('disabled',false);
        BtPrevTerminalState = $('#PrevTerminal').is(':disabled');
        $('#NextTerminal').prop('disabled',false);
        BtNextTerminalState = $('#NextTerminal').is(':disabled');                        
    }
    
    $('#BorrarTerminal').prop('disabled',false);
    
    $('#imgloader').hide();
}

function CargarDatosPrevTerminalesBack(data){
    
    $('#nombreterminal').val(data.NombreTerminal);
    BufferIdTerminal = data.TerminalId;
    BufferNombreTerminal = data.NombreTerminal;
    NumeroTerminales = data.NumeroTerminales;
    
    $('#NuevaTerminal').prop('disabled',false);
    $('#GuardarTerminal').prop('disabled',true);
    $('#CacelarEditTerminal').prop('disabled',true);
    
    if (data.NumeroTerminales == 1){               
        $('#PrevTerminal').prop('disabled',true);
        BtPrevTerminalState = $('#PrevTerminal').is(':disabled');
        $('#NextTerminal').prop('disabled',false);
        BtNextTerminalState = $('#NextTerminal').is(':disabled');                        
    }else if (data.NumeroTerminales > 1){               
        $('#PrevTerminal').prop('disabled',false);
        BtPrevTerminalState = $('#PrevTerminal').is(':disabled');
        $('#NextTerminal').prop('disabled',false);
        BtNextTerminalState = $('#NextTerminal').is(':disabled');                        
    } 
    
    $('#BorrarTerminal').prop('disabled',false);
    
    $('#imgloader').hide();
}

function BorrarTerminal(){
    
    $('#imgloader').show();
    
    socket.emit('BorrarTerminal',{BufferIdTerminal:BufferIdTerminal});
    
}

function CargarDatosEmpleados(){
    
    $('#imgloader').show();
    
    socket.emit('CargarDatosEmpleados',{CompanyId:CompanyId});    
    
}

function CargarDatosEmpleadosBack(data){
    
    $('#imgloader').hide();
    
    $('#nombreempleado').val(data.NombreEmpleado);
    $('#claveempleado').val(data.ClaveEmpleado);
    BufferIdEmpleado = data.EmpleadoId;
    BufferNombreEmpleado = data.NombreEmpleado;
    BufferClaveEmpleado = data.ClaveEmpleado;
    NumeroEmpleados = data.NumeroEmpleados;
    
    $('#NuevoEmpleado').prop('disabled',false);
    $('#BorrarEmpleado').prop('disabled',false);
    $('#GuardarEmpleado').prop('disabled',true);
    $('#CacelarEditEmpleado').prop('disabled',true);    
    
    if (data.NumeroEmpleados == 0){               
        $('#PrevEmpleado').prop('disabled',true);
        BtPrevEmpleadoState = $('#PrevEmpleado').is(':disabled');
        $('#NextEmpleado').prop('disabled',true);
        BtNextEmpleadoState = $('#NextEmpleado').is(':disabled');                      
    }else if (data.NumeroEmpleados == 1){
        $('#PrevEmpleado').prop('disabled',true);
        BtPrevEmpleadoState = $('#PrevEmpleado').is(':disabled');
        $('#NextEmpleado').prop('disabled',true);
        BtNextEmpleadoState = $('#NextEmpleado').is(':disabled');        
    }else if (data.NumeroEmpleados > 1){
        $('#PrevEmpleado').prop('disabled',true);
        BtPrevEmpleadoState = $('#PrevEmpleado').is(':disabled');
        $('#NextEmpleado').prop('disabled',false);
        BtNextEmpleadoState = $('#NextEmpleado').is(':disabled');        
    }
    
    $('#empleadosmodal').modal({
        backdrop:'static',
        keyboard:false  
    });
    
}

function NuevoEmpleado(){
    
    //Guardar estado de los botones por si cancel edit
    BtPrevEmpleadoState = $('#PrevEmpleado').is(':disabled');
    BtNextEmpleadoState = $('#NextEmpleado').is(':disabled');   
    
    InsertUpdateEmpleado = 'Inserting';
    $('#nombreempleado').val('');
    $('#claveempleado').val('');
    $('#CacelarEditEmpleado').prop('disabled',false);
    
    $('#PrevEmpleado').prop('disabled',true);
    $('#NextEmpleado').prop('disabled',true);
    $('#BorrarEmpleado').prop('disabled',true);
    $('#NuevoEmpleado').prop('disabled',true);
    $('#GuardarEmpleado').prop('disabled',true);
    
}

function GuardarNuevoEmpleado(){
    
    if ($('#nombreempleado').val()==''){
        $('#empleadosmodal').modal('hide');
        UltimoFoco = 'nombreempleado';
        if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
            $('#colortitulo').toggleClass('modal-header-info modal-header-warning'); 
        }
        $('#titulo').text('Atencion!');
        $('#mensage').text('Debe de introducir un nombre de empleado');
        $('#dialoginfo').modal({
            backdrop:'static',
            keyboard:false  
        });                    
        return;
    }
    
    if ($('#claveempleado').val()==''){
        $('#empleadosmodal').modal('hide');
        UltimoFoco = 'claveempleado';
        if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
            $('#colortitulo').toggleClass('modal-header-info modal-header-warning'); 
        }
        $('#titulo').text('Atencion!');
        $('#mensage').text('Debe de introducir una clave de empleado');
        $('#dialoginfo').modal({
            backdrop:'static',
            keyboard:false  
        });                    
        return;
    }
    
    if (InsertUpdateEmpleado == 'Inserting') {
        socket.emit('GuardarNuevoEmpleado',{NombreEmpleado:$('#nombreempleado').val(),ClaveEmpleado:$('#claveempleado').val(),CompanyId:CompanyId});
        NumeroEmpleados = NumeroEmpleados + 1;
        $('#NextEmpleado').prop('disabled',true);
        if (NumeroEmpleados==1){
            $('#PrevEmpleado').prop('disabled',true);
        }else{
            $('#PrevEmpleado').prop('disabled',false);
        }
        $('#NuevoEmpleado').prop('disabled',false);
        $('#BorrarEmpleado').prop('disabled',false);        
        InsertUpdateEmpleado = 'Update';
    }else if (InsertUpdateEmpleado == 'Update'){
        socket.emit('ModificarEmpleado',{NombreEmpleado:$('#nombreempleado').val(),ClaveEmpleado:$('#claveempleado').val(),BufferIdEmpleado:BufferIdEmpleado});
    }
    
    $('#GuardarEmpleado').prop('disabled',true);
    $('#CacelarEditEmpleado').prop('disabled',true);
    
    $('#imgloader').show();
    
}

function CacelarEditEmpleado(){
    
    $('#nombreempleado').val(BufferNombreEmpleado);
    $('#claveempleado').val(BufferClaveEmpleado);
    $('#CacelarEditEmpleado').prop('disabled',true);
    $('#GuardarEmpleado').prop('disabled',true);
    $('#NuevoEmpleado').prop('disabled',false);
    if (NumeroEmpleados == 0){        
        $('#BorrarEmpleado').prop('disabled',true);                
    }else{
        $('#BorrarEmpleado').prop('disabled',false); 
    }
    
    if (!BtPrevEmpleadoState){
        $('#PrevEmpleado').prop('disabled',false);
    }else{
        $('#PrevEmpleado').prop('disabled',true);
    }
    
    if (!BtNextEmpleadoState){
        $('#NextEmpleado').prop('disabled',false);
    }else{
        $('#NextEmpleado').prop('disabled',true);
    }
    
    InsertUpdateEmpleado = 'Update';
    
}

function NextEmpleado(){
    
    $('#imgloader').show();
    
    socket.emit('NextEmpleado',{BufferIdEmpleado:BufferIdEmpleado,CompanyId:CompanyId});    
    
}

function PrevEmpleado(){
    
    $('#imgloader').show();
    
    socket.emit('PrevEmpleado',{BufferIdEmpleado:BufferIdEmpleado,CompanyId:CompanyId});    
    
}

function CargarDatosNextEmpleadosBack(data){
    
    $('#imgloader').hide();
    
    $('#nombreempleado').val(data.NombreEmpleado);
    $('#claveempleado').val(data.ClaveEmpleado);
    BufferIdEmpleado = data.EmpleadoId;
    BufferNombreEmpleado = data.NombreEmpleado;
    BufferClaveEmpleado = data.ClaveEmpleado;
    NumeroEmpleados = data.NumeroEmpleados;
    
    $('#NuevoEmpleado').prop('disabled',false);
    $('#GuardarEmpleado').prop('disabled',true);
    $('#CacelarEditEmpleado').prop('disabled',true);
    
    if (data.NumeroEmpleados == 1){               
        $('#PrevEmpleado').prop('disabled',false);
        BtPrevEmpleadoState = $('#PrevEmpleado').is(':disabled');
        $('#NextEmpleado').prop('disabled',true);
        BtNextEmpleadoState = $('#NextEmpleado').is(':disabled');                        
    }else if (data.NumeroEmpleados > 1){               
        $('#PrevEmpleado').prop('disabled',false);
        BtPrevEmpleadoState = $('#PrevEmpleado').is(':disabled');
        $('#NextEmpleado').prop('disabled',false);
        BtNextEmpleadoState = $('#NextEmpleado').is(':disabled');                        
    }
    
    $('#BorrarEmpleado').prop('disabled',false);
}

function CargarDatosPrevEmpleadosBack(data){
    
    $('#imgloader').hide();
    
    $('#nombreempleado').val(data.NombreEmpleado);
    $('#claveempleado').val(data.ClaveEmpleado);
    BufferIdEmpleado = data.EmpleadoId;
    BufferNombreEmpleado = data.NombreEmpleado;
    BufferClaveEmpleado = data.ClaveEmpleado;
    NumeroEmpleados = data.NumeroEmpleados;
    
    $('#NuevoEmpleado').prop('disabled',false);
    $('#GuardarEmpleado').prop('disabled',true);
    $('#CacelarEditEmpleado').prop('disabled',true);
    
    if (data.NumeroEmpleados == 1){               
        $('#PrevEmpleado').prop('disabled',true);
        BtPrevEmpleadoState = $('#PrevEmpleado').is(':disabled');
        $('#NextEmpleado').prop('disabled',false);
        BtNextEmpleadoState = $('#NextEmpleado').is(':disabled');                        
    }else if (data.NumeroEmpleados > 1){               
        $('#PrevEmpleado').prop('disabled',false);
        BtPrevEmpleadoState = $('#PrevEmpleado').is(':disabled');
        $('#NextEmpleado').prop('disabled',false);
        BtNextEmpleadoState = $('#NextEmpleado').is(':disabled');                        
    }
    
    $('#BorrarEmpleado').prop('disabled',false);
}

function BorrarEmpleado(){
    
    $('#imgloader').show();
    
    socket.emit('BorrarEmpleado',{BufferIdEmpleado:BufferIdEmpleado});
    
}
