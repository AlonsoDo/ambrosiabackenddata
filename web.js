var express = require('express') ;
var http = require('http');
var app = express();
var server = http.createServer(app);

var mysql = require('mysql');
var pool  = mysql.createPool({
    host     : 'eu-cdbr-west-01.cleardb.com',
    user     : 'bec9f1dbb65163',
    password : '8a687c05', 
    database : 'heroku_f5b0ff88b3e8283',
    connectionLimit : 200
});

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
                                pass: "CaspiAutentico2"
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
  
});