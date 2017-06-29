var express = require('express') ;
var http = require('http');
var app = express();
var server = http.createServer(app);

var async = require('async');

var mysql = require('mysql');

var pool  = mysql.createPool({
    host : 'eu-cdbr-west-01.cleardb.com',
    user : 'bec9f1dbb65163',
    password : '8a687c05', 
    database : 'heroku_f5b0ff88b3e8283',
    connectionLimit : 200
}); //limit to 10 connectios on free plan

/*var pool  = mysql.createPool({
    host : '',
    user : 'root',
    password : 'charly', 
    database : 'ambrosia',
    connectionLimit : 200
});*/

var io = require('socket.io').listen(server);
var nodemailer = require('nodemailer');

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.static(__dirname + '/public'));
});

server.listen(app.get('port'),function(){
    console.log('Express server listening on port ' + app.get('port'));
});

io.sockets.on('connection',function(socket){  
    
    socket.on('CargarDatosEmpresa',function(data){                
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "SELECT * FROM login WHERE CompanyId='"+data.CompanyId+"'";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{                     
                    var NombreComercial = rows[0].NombreComercial;
                    var NombreFiscal = rows[0].NombreFiscal;
                    var Direccion = rows[0].Direccion;
                    var CodigoPostal = rows[0].CodigoPostal;
                    var Ciudad = rows[0].Ciudad;
                    var NIF = rows[0].NIF;
                    var Telefono = rows[0].Telefono;
                    socket.emit('CargarDatosEmpresaBack',{NombreComercial:NombreComercial,NombreFiscal:NombreFiscal,Direccion:Direccion,CodigoPostal:CodigoPostal,Ciudad:Ciudad,NIF:NIF,Telefono:Telefono});                                                            
                }                
            });
            connection.release();
        });        
        
    });
    
    socket.on('login',function(data){                
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "SELECT * FROM login WHERE User='"+data.User+"' AND Pass='"+data.Pass+"'";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{ 
                    console.log('Number of rows: '+rows.length);
                    if (rows.length==1){
                        var CompanyId = rows[0].CompanyId;
                        var Email = rows[0].Email;
                        socket.emit('LoginBackOk',{CompanyId:CompanyId,Email:Email}); 
                    }else if (rows.length==0){
                        socket.emit('LoginBackNotFound',{}); 
                    }                                        
                }                
            });
            connection.release();
        });        
        
    });
    
    socket.on('RecPass',function(data){
        
        console.log(data.User);
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "SELECT * FROM login WHERE User='"+data.User+"'";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;
                }else{ 
                    
                    console.log('Number of rows: '+rows.length);
                    
                    if (rows.length==1){                        
                        
                        var Email = rows[0].Email;
                        var Clave = rows[0].Pass;                      
                        
                        var smtpTransport = nodemailer.createTransport("SMTP",{
                            service: "hotmail",
                            auth: {
                                user: "alonso_caspi@hotmail.com",
                                pass: "****"
                           }
                        });        
                        smtpTransport.sendMail({
                            from: "Ambrosia BackEnd <alonso_caspi@hotmail.com>", // sender address
                            to: Email , // comma separated list of receivers
                            subject: "Aqui esta su clave",    
                            text:   
                                "Hola \r\n" +
                                " \r\n" +
                                " Olvido su clave? No se preocupe.\r\n" +
                                " Aqui esta.\r\n" +
                                " \r\n" +
                                " Su clave: " + Clave + "\r\n" +
                                " \r\n" +
                                " Espero que siga usando Ambrosia BackEnd.\r\n" +
                                " Saludos cordiales."   
                        },function(error,response){
                            if(error){
                                socket.emit('Error',{Error:error});
                                console.log(error);
                            }else{
                                console.log('Message sent: ' + response.message);
                                socket.emit('RecPassBackOk',{Email:Email}); 
                            }
                        });
                        smtpTransport.close();                        
                        
                    }else if (rows.length==0){
                        socket.emit('RecPassBackNotFound',{}); 
                    }                                        
                }                
            });
            connection.release();
        });        
        
    });
    
    socket.on('CheckUser',function(data){
        
        console.log(data.User);               
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "SELECT * FROM login WHERE User='"+data.User+"'";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;
                }else{ 
                    console.log('Number of rows: '+rows.length);
                    if (rows.length==1){                        
                        socket.emit('CheckUserBack',{User:true}); 
                    }else if (rows.length==0){
                        socket.emit('CheckUserBack',{User:false}); 
                    }                                        
                }                
            });
            connection.release();
        });        
        
    });
    
    socket.on('CreateUser',function(data){
        
        console.log(data.User);               
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "INSERT INTO login(User,Pass,Email) VALUES ('"+data.User+"','"+data.Pass+"','"+data.Email+"')";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;
                }else{ 
                    console.log('Usuario creado');                                                          
                }                
            });
            connection.release();
        });  
        
    });
    
    socket.on('GuardarDatosEmpresa',function(data){
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
                        
            cQuery = "UPDATE login SET NombreComercial='" + data.NombreComercial + "' , NombreFiscal='"+data.NombreFiscal+"' , Direccion='"+data.Direccion+"' , CodigoPostal='"+data.CodigoPostal+"' , Ciudad='"+data.Ciudad+"' , NIF='"+data.NIF+"' , Telefono='"+data.Telefono+"' WHERE CompanyId='"+data.CompanyId+"'";
                  
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;
                }else{ 
                    console.log('Datos de la empresa grabados');                                                          
                }                
            });
            connection.release();
            
        });
        
    });
    
    socket.on('CargarDatosImpresoras',function(data){                
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "SELECT * FROM impresoras WHERE CompanyId='"+data.CompanyId+"'";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{                     
                    if (rows.length>0){                    
                        var ImpresoraId = rows[0].ImpresoraId;
                        var NombreImpresora = rows[0].NombreImpresora;                    
                        socket.emit('CargarDatosImpresorasBack',{ImpresoraId:ImpresoraId,NombreImpresora:NombreImpresora,NumeroImpresoras:rows.length});                                                            
                    }else{
                        socket.emit('CargarDatosImpresorasBack',{ImpresoraId:0,NombreImpresora:'',NumeroImpresoras:0});
                    }
                }                
            });
            connection.release();
        });        
        
    });
    
    socket.on('GuardarNuevaImpresora',function(data){
        
        console.log(data.NombreImpresora);
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "INSERT INTO impresoras(NombreImpresora,CompanyId) VALUES ('"+data.NombreImpresora+"','"+data.CompanyId+"')";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;
                }else{ 
                    console.log('Nueva impresora creada con Id: ' + rows.insertId);
                    socket.emit('GuardarNuevaImpresoraBack',{ImpresoraId:rows.insertId});
                }                
            });
            connection.release();
        });  
        
    });
    
    socket.on('ModificarNombreImpresora',function(data){
        
        console.log(data.NombreImpresora);
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            
            cQuery = "UPDATE impresoras SET NombreImpresora='"+data.NombreImpresora +"' WHERE ImpresoraId='"+data.BufferIdImpresora+"'";
            
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;
                }else{ 
                    console.log('Cambio de nombre de impresora');                                                          
                }                
            });
            connection.release();
        });  
        
    });
    
    socket.on('NextImpresora',function(data){
        
        console.log(data.BufferIdImpresora);
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "SELECT * FROM impresoras WHERE ImpresoraId > " + data.BufferIdImpresora + " AND " + "CompanyId='"+data.CompanyId+"'";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{                     
                    if (rows.length>0){                    
                        var ImpresoraId = rows[0].ImpresoraId;
                        var NombreImpresora = rows[0].NombreImpresora;                    
                        socket.emit('CargarDatosNextImpresorasBack',{ImpresoraId:ImpresoraId,NombreImpresora:NombreImpresora,NumeroImpresoras:rows.length});                                                            
                    }else{
                        socket.emit('CargarDatosNextImpresorasBack',{ImpresoraId:0,NombreImpresora:'',NumeroImpresoras:0});
                    }
                }                
            });
            connection.release();
        });  
        
    });
    
    socket.on('PrevImpresora',function(data){
        
        console.log(data.BufferIdImpresora);
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "SELECT * FROM impresoras WHERE ImpresoraId < " + data.BufferIdImpresora + " AND " + "CompanyId='"+data.CompanyId+"' ORDER BY ImpresoraId DESC";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{                     
                    if (rows.length>0){                    
                        var ImpresoraId = rows[0].ImpresoraId;
                        var NombreImpresora = rows[0].NombreImpresora;                    
                        socket.emit('CargarDatosPrevImpresorasBack',{ImpresoraId:ImpresoraId,NombreImpresora:NombreImpresora,NumeroImpresoras:rows.length});                                                            
                    }else{
                        socket.emit('CargarDatosPrevImpresorasBack',{ImpresoraId:0,NombreImpresora:'',NumeroImpresoras:0});
                    }
                }                
            });
            connection.release();
        });  
        
    });
    
    socket.on('BorrarImpresora',function(data){
        
        console.log(data.BufferIdImpresora);
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "DELETE FROM impresoras WHERE ImpresoraId = " + data.BufferIdImpresora;
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{                    
                    socket.emit('BorrarImpresoraBack',{});
                }                
            });
            connection.release();
        });  
        
    });
    
    socket.on('CargarDatosTerminales',function(data){                
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "SELECT * FROM terminales WHERE CompanyId='"+data.CompanyId+"'";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{                     
                    if (rows.length>0){                    
                        var TerminalId = rows[0].TerminalId;
                        var NombreTerminal = rows[0].NombreTerminal;                    
                        socket.emit('CargarDatosTerminalesBack',{TerminalId:TerminalId,NombreTerminal:NombreTerminal,NumeroTerminales:rows.length});                                                            
                    }else{
                        socket.emit('CargarDatosTerminalesBack',{TerminalId:0,NombreTerminal:'',NumeroTerminales:0});
                    }
                }                
            });
            connection.release();
        });        
        
    });
    
    socket.on('GuardarNuevaTerminal',function(data){
        
        console.log(data.NombreTerminal);
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "INSERT INTO terminales(NombreTerminal,CompanyId) VALUES ('"+data.NombreTerminal+"','"+data.CompanyId+"')";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;
                }else{ 
                    console.log('Nueva terminal creada con Id: ' + rows.insertId);
                    socket.emit('GuardarNuevaTerminalBack',{TerminalId:rows.insertId});
                }                
            });
            connection.release();
        });  
        
    });
    
    socket.on('ModificarNombreTerminal',function(data){
        
        console.log(data.NombreTerminal);
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            
            cQuery = "UPDATE terminales SET NombreTerminal='"+data.NombreTerminal +"' WHERE TerminalId='"+data.BufferIdTerminal+"'";
            
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;
                }else{ 
                    console.log('Cambio de nombre de terminal');                                                          
                }                
            });
            connection.release();
        });  
        
    });
    
    socket.on('NextTerminal',function(data){
        
        console.log(data.BufferIdTerminal);
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "SELECT * FROM terminales WHERE TerminalId > " + data.BufferIdTerminal + " AND " + "CompanyId='"+data.CompanyId+"'";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{                     
                    if (rows.length>0){                    
                        var TerminalId = rows[0].TerminalId;
                        var NombreTerminal = rows[0].NombreTerminal;                    
                        socket.emit('CargarDatosNextTerminalesBack',{TerminalId:TerminalId,NombreTerminal:NombreTerminal,NumeroTerminales:rows.length});                                                            
                    }else{
                        socket.emit('CargarDatosNextTerminalesBack',{TerminalId:0,NombreTerminal:'',NumeroTerminales:0});
                    }
                }                
            });
            connection.release();
        });  
        
    });
    
    socket.on('PrevTerminal',function(data){
        
        console.log(data.BufferIdTerminal);
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "SELECT * FROM terminales WHERE TerminalId < " + data.BufferIdTerminal + " AND " + "CompanyId='"+data.CompanyId+"' ORDER BY TerminalId DESC";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{                     
                    if (rows.length>0){                    
                        var TerminalId = rows[0].TerminalId;
                        var NombreTerminal = rows[0].NombreTerminal;                    
                        socket.emit('CargarDatosPrevTerminalesBack',{TerminalId:TerminalId,NombreTerminal:NombreTerminal,NumeroTerminales:rows.length});                                                            
                    }else{
                        socket.emit('CargarDatosPrevTerminalesBack',{TerminalId:0,NombreTerminal:'',NumeroTerminales:0});
                    }
                }                
            });
            connection.release();
        });  
        
    });
    
    socket.on('BorrarTerminal',function(data){
        
        console.log(data.BufferIdTerminal);
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "DELETE FROM terminales WHERE TerminalId = " + data.BufferIdTerminal;
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{                    
                    socket.emit('BorrarTerminalBack',{});
                }                
            });
            connection.release();
        });  
        
    });
    
    socket.on('CargarDatosEmpleados',function(data){                
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "SELECT * FROM empleados WHERE CompanyId='"+data.CompanyId+"'";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{                     
                    if (rows.length>0){                    
                        var EmpleadoId = rows[0].EmpleadoId;
                        var NombreEmpleado = rows[0].NombreEmpleado;
                        var ClaveEmpleado = rows[0].ClaveEmpleado;
                        socket.emit('CargarDatosEmpleadosBack',{EmpleadoId:EmpleadoId,NombreEmpleado:NombreEmpleado,ClaveEmpleado:ClaveEmpleado,NumeroEmpleados:rows.length});                                                            
                    }else{
                        socket.emit('CargarDatosEmpleadosBack',{EmpleadoId:0,NombreEmpleado:'',ClaveEmpleado:'',NumeroEmpleados:0});
                    }
                }                
            });
            connection.release();
        });        
        
    });
    
    socket.on('GuardarNuevoEmpleado',function(data){
        
        console.log(data.NombreEmpleado);
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "INSERT INTO empleados(NombreEmpleado,ClaveEmpleado,CompanyId) VALUES ('"+data.NombreEmpleado+"','"+data.ClaveEmpleado+"','"+data.CompanyId+"')";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;
                }else{ 
                    console.log('Nuevo empleado con Id: ' + rows.insertId);
                    socket.emit('GuardarNuevoEmpleadoBack',{EmpleadoId:rows.insertId});
                }                
            });
            connection.release();
        });  
        
    });
    
    socket.on('ModificarEmpleado',function(data){
        
        console.log(data.NombreEmpleado);
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            
            cQuery = "UPDATE empleados SET NombreEmpleado='"+data.NombreEmpleado+"' , ClaveEmpleado='"+data.ClaveEmpleado+"' WHERE EmpleadoId='"+data.BufferIdEmpleado+"'";
            
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;
                }else{ 
                    console.log('Cambio de nombre de empleado');                                                          
                }                
            });
            connection.release();
        });  
        
    });
    
    socket.on('NextEmpleado',function(data){
        
        console.log(data.BufferIdEmpleado);
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "SELECT * FROM empleados WHERE EmpleadoId > " + data.BufferIdEmpleado + " AND " + "CompanyId='"+data.CompanyId+"'";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{                     
                    if (rows.length>0){                    
                        var EmpleadoId = rows[0].EmpleadoId;
                        var NombreEmpleado = rows[0].NombreEmpleado;
                        var ClaveEmpleado = rows[0].ClaveEmpleado;
                        socket.emit('CargarDatosNextEmpleadosBack',{EmpleadoId:EmpleadoId,NombreEmpleado:NombreEmpleado,ClaveEmpleado:ClaveEmpleado,NumeroEmpleados:rows.length});                                                            
                    }else{
                        socket.emit('CargarDatosNextEmpleadosBack',{EmpleadoId:0,NombreEmpleado:'',ClaveEmpleado:'',NumeroEmpleados:0});
                    }
                }                
            });
            connection.release();
        });  
        
    });
    
    socket.on('PrevEmpleado',function(data){
        
        console.log(data.BufferIdEmpleado);
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "SELECT * FROM empleados WHERE EmpleadoId < " + data.BufferIdEmpleado + " AND " + "CompanyId='"+data.CompanyId+"' ORDER BY EmpleadoId DESC";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{                     
                    if (rows.length>0){                    
                        var EmpleadoId = rows[0].EmpleadoId;
                        var NombreEmpleado = rows[0].NombreEmpleado;
                        var ClaveEmpleado = rows[0].ClaveEmpleado;
                        socket.emit('CargarDatosPrevEmpleadosBack',{EmpleadoId:EmpleadoId,NombreEmpleado:NombreEmpleado,ClaveEmpleado:ClaveEmpleado,NumeroEmpleados:rows.length});                                                            
                    }else{
                        socket.emit('CargarDatosPrevEmpleadosBack',{EmpleadoId:0,NombreEmpleado:'',ClaveEmpleado:'',NumeroEmpleados:0});
                    }
                }                
            });
            connection.release();
        });  
        
    });
    
    socket.on('BorrarEmpleado',function(data){
        
        console.log(data.BufferIdEmpleado);
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "DELETE FROM empleados WHERE EmpleadoId = " + data.BufferIdEmpleado;
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{                    
                    socket.emit('BorrarEmpleadoBack',{});
                }                
            });
            connection.release();
        });  
        
    });
    
    socket.on('CargarImpresorasDisponibles',function(data){
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "SELECT * FROM impresoras WHERE CompanyId='"+data.CompanyId+"'";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{                     
                    socket.emit('CargarImpresorasDisponiblesBack',{ImpresorasDisponibles:JSON.stringify(rows)});
                }                
            });
            connection.release();
        });
        
    });
    
    socket.on('CargarTerminalesDisponibles',function(data){
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "SELECT * FROM terminales WHERE CompanyId='"+data.CompanyId+"'";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{                     
                    socket.emit('CargarTerminalesDisponiblesBack',{TerminalesDisponibles:JSON.stringify(rows)});
                }                
            });
            connection.release();
        });
        
    });
    
    socket.on('GuardarElemento',function(data){
        
        console.log(data.CodigoPadre);
                
        var i;        
        var cQuery;
        var cQuery2;
        var cQuery3;
        var ElementoId;
      
        pool.getConnection(function(err,connection){
            
            cQuery = "INSERT INTO elementos(PadreId,CompanyId,Descripcion,Precio,Impuesto,ImprimirEnFactura,ImprimirEnComanda,ColorLetras,ColorFondo,TieneImpresora,TieneTerminal) VALUES ('"+data.CodigoPadre+"','"+data.CompanyId+"','"+data.Descripcion+"','"+data.Precio+"','"+data.Impuesto+"','"+data.FlagImprimirEnFactura+"','"+data.FlagImprimirEnComanda+"','"+data.ColorLetras+"','"+data.ColorFondo+"','"+data.ImpresorasSeleccionadas+"','"+data.TerminalesSeleccionadas+"')";     
            
            connection.query(cQuery,function(err,rows){
                if (err){
                    
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;
                
                }else{                    
                    
                    ElementoId = rows.insertId;
                    
                    socket.emit('GuardarElementoBack',{ElementoId:ElementoId,ComoGuardarElemento:data.ComoGuardarElemento});
                    
                    var values = [];
                    
                    for (var j = 0 ; j < data.aImpresorasSeleccionadas.length ; j++){                        
                        values.push([ElementoId,data.aImpresorasSeleccionadas[j]]);                    
                    }                
                        
                    if (values.length > 0){                    
                        pool.getConnection(function(err,connection){
                            cQuery2 = "INSERT INTO impresoraconfig ( ElementoId , NombreImpresora ) VALUES ?";     
                            connection.query(cQuery2,[values],function(err){
                                if (err){
                                    socket.emit('Error',{Error:err.message});
                                    console.log('Error: ' + err.message);
                                    throw err;
                                }else{                                     
                                    
                                }
                                connection.release();
                            });                            
                        });
                    }
                    
                }
                    
                var values2 = [];
                    
                for (var j = 0 ; j < data.aTerminalesSeleccionadas.length ; j++){                        
                    values2.push([ElementoId,data.aTerminalesSeleccionadas[j]]);                    
                }                
                        
                if (values2.length > 0){
                    pool.getConnection(function(err,connection){
                        cQuery3 = "INSERT INTO terminalconfig ( ElementoId , NombreTerminal ) VALUES ?";     
                        connection.query(cQuery3,[values2],function(err){
                            if (err){
                                socket.emit('Error',{Error:err.message});
                                console.log('Error: ' + err.message);
                                throw err;
                            }else{                                     
                                
                            }
                            connection.release();
                        });                            
                    });
                }
                
            });
            connection.release();        
        });        
        
    });
    
    socket.on('CargarDatosElementos',function(data){
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "SELECT * FROM elementos WHERE CompanyId='"+data.CompanyId+"' AND PadreId='"+data.CodigoPadre+"'";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{                     
                    socket.emit('CargarDatosElementosBack',{Elementos:JSON.stringify(rows),TipoElemento:data.TipoElemento});
                }                
            });
            connection.release();
        });
        
    });
    
    socket.on('BorrarElemento',function(data){
        
        console.log(data.CodigoElementoSeleccionado);        
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "DELETE FROM elementos WHERE ElementoId='"+data.CodigoElementoSeleccionado+"'";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{                     
                    
                }                
            });
            connection.release();
        });        
        
    });
    
    socket.on('EditarElemento',function(data){
        
        console.log(data.CodigoElementoSeleccionado);
        
        var cQuery;    
      
        pool.getConnection(function(err,connection){
            cQuery = "SELECT * FROM elementos WHERE ElementoId='"+data.CodigoElementoSeleccionado+"'";
            connection.query(cQuery,function(err,rows){
                if (err){
                    socket.emit('Error',{Error:err.message});
                    console.log('Error: ' + err.message);
                    throw err;                    
                }else{                     
                    socket.emit('CargarDatosElementoBack',{DatosElemento:JSON.stringify(rows)});
                }                
            });
            connection.release();
        });
        
    });
    
    socket.on('CargarImpresoras',function(data){
        
        async.series([
            function(callback) {
                // do some stuff ...
                console.log(data.CompanyId)
                var cQuery;       
                pool.getConnection(function(err,connection){
                    cQuery = "SELECT * FROM impresoras WHERE CompanyId='"+data.CompanyId+"'";
                    connection.query(cQuery,function(err,rows){
                        if (err){
                            socket.emit('Error',{Error:err.message});
                            console.log('Error: ' + err.message);
                            throw err;                    
                        }else{                     
                            socket.emit('CargarImpresorasDisponiblesBack',{ImpresorasDisponibles:JSON.stringify(rows)});
                        }                
                    });
                    connection.release();
                });
                callback(null, 'one');
            },
            function(callback) {
                // do some more stuff ...
                console.log(data.CodigoElementoSeleccionado)
                var cQuery;       
                pool.getConnection(function(err,connection){
                    cQuery = "SELECT * FROM impresoraconfig WHERE ElementoId='"+data.CodigoElementoSeleccionado+"'";
                    connection.query(cQuery,function(err,rows){
                        if (err){
                            socket.emit('Error',{Error:err.message});
                            console.log('Error: ' + err.message);
                            throw err;                    
                        }else{                     
                            socket.emit('CargarImpresorasConfigBack',{ImpresorasConfig:JSON.stringify(rows)});
                        }                
                    });
                    connection.release();
                });
                callback(null, 'two');
            }
        ],
        // optional callback
        function(err, results) {
            // results is now equal to ['one', 'two']
            console.log(err);
        });
        
    });
    
    socket.on('CargarTerminales',function(data){
        
        async.series([
            function(callback) {
                // do some stuff ...
                console.log(data.CompanyId)
                var cQuery;       
                pool.getConnection(function(err,connection){
                    cQuery = "SELECT * FROM terminales WHERE CompanyId='"+data.CompanyId+"'";
                    connection.query(cQuery,function(err,rows){
                        if (err){
                            socket.emit('Error',{Error:err.message});
                            console.log('Error: ' + err.message);
                            throw err;                    
                        }else{                     
                            socket.emit('CargarTerminalesDisponiblesBack',{TerminalesDisponibles:JSON.stringify(rows)});
                        }                
                    });
                    connection.release();
                });
                callback(null, 'one');
            },
            function(callback) {
                // do some more stuff ...
                console.log(data.CodigoElementoSeleccionado)
                var cQuery;       
                pool.getConnection(function(err,connection){
                    cQuery = "SELECT * FROM terminalconfig WHERE ElementoId='"+data.CodigoElementoSeleccionado+"'";
                    connection.query(cQuery,function(err,rows){
                        if (err){
                            socket.emit('Error',{Error:err.message});
                            console.log('Error: ' + err.message);
                            throw err;                    
                        }else{                     
                            socket.emit('CargarTerminalesConfigBack',{TerminalesConfig:JSON.stringify(rows)});
                        }                
                    });
                    connection.release();
                });
                callback(null, 'two');
            }
        ],
        // optional callback
        function(err, results) {
            // results is now equal to ['one', 'two']
            console.log(err);
        });
        
    });
    
    socket.on('ActualizarElemento',function(data){
        
        console.log('Codigo: '+data.CodigoElementoSeleccionado);
        
        async.series([
            function(callback) {
                // Borrar impresoras config ...
                var cQuery;      
                pool.getConnection(function(err,connection){
                    cQuery = "DELETE FROM impresoraconfig WHERE ElementoId='"+data.CodigoElementoSeleccionado+"'";
                    connection.query(cQuery,function(err,rows){
                        if (err){
                            socket.emit('Error',{Error:err.message});
                            console.log('Error: ' + err.message);
                            throw err;                    
                        }else{                            
                        }                
                    });
                    connection.release();
                });
                callback(null, '1');
            },
            function(callback) {
                // Borrar terminales config ...
                var cQuery;      
                pool.getConnection(function(err,connection){
                    cQuery = "DELETE FROM terminalconfig WHERE ElementoId='"+data.CodigoElementoSeleccionado+"'";
                    connection.query(cQuery,function(err,rows){
                        if (err){
                            socket.emit('Error',{Error:err.message});
                            console.log('Error: ' + err.message);
                            throw err;                    
                        }else{                            
                        }                
                    });
                    connection.release();
                });
                callback(null, '2');
            },
            function(callback) {
                // Actualizar registro elemento ...                
                var cQuery;      
                pool.getConnection(function(err,connection){
                    cQuery = "UPDATE elementos SET Descripcion='" + data.Descripcion + "' , Precio='" + data.Precio + "' , Impuesto='" + data.Impuesto + "' , ImprimirEnFactura='" + data.FlagImprimirEnFactura + "' , ImprimirEnComanda='" + data.FlagImprimirEnComanda + "' , ColorLetras='" + data.ColorLetras + "' , ColorFondo='" + data.ColorFondo + "' , TieneImpresora='" + data.ImpresorasSeleccionadas + "' , TieneTerminal='" + data.TerminalesSeleccionadas + "' WHERE ElementoId='"+data.CodigoElementoSeleccionado+"'";
                    connection.query(cQuery,function(err,rows){
                        if (err){
                            socket.emit('Error',{Error:err.message});
                            console.log('Error: ' + err.message);
                            throw err;                    
                        }else{                            
                        }                
                    });
                    connection.release();
                });                
                callback(null, '3');
            },
            function(callback) {
                // Grabar impresoras config ...
                var values = [];
                var cQuery;    
                for (var j = 0 ; j < data.aImpresorasSeleccionadas.length ; j++){                        
                    values.push([data.CodigoElementoSeleccionado,data.aImpresorasSeleccionadas[j]]);                    
                }                        
                if (values.length > 0){                    
                    pool.getConnection(function(err,connection){
                        cQuery = "INSERT INTO impresoraconfig ( ElementoId , NombreImpresora ) VALUES ?";     
                        connection.query(cQuery,[values],function(err){
                            if (err){
                                socket.emit('Error',{Error:err.message});
                                console.log('Error: ' + err.message);
                                throw err;
                            }else{                                     
                            }
                            connection.release();
                        });                            
                    });
                }
                callback(null, '4');
            },
            function(callback) {
                // Grabar terminales config ...
                var values = [];
                var cQuery;    
                for (var j = 0 ; j < data.aTerminalesSeleccionadas.length ; j++){                        
                    values.push([data.CodigoElementoSeleccionado,data.aTerminalesSeleccionadas[j]]);                    
                }                        
                if (values.length > 0){                    
                    pool.getConnection(function(err,connection){
                        cQuery = "INSERT INTO terminalconfig ( ElementoId , NombreTerminal ) VALUES ?";     
                        connection.query(cQuery,[values],function(err){
                            if (err){
                                socket.emit('Error',{Error:err.message});
                                console.log('Error: ' + err.message);
                                throw err;
                            }else{                                     
                            }
                            connection.release();
                        });                            
                    });
                }
                callback(null, '5');
            }
        ],
        // optional callback
        function(err, results) {
            // results is now equal to ['1','2','3','4','5']
            console.log(err);
        });
        
        
        
    });    
  
});