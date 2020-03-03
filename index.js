const express=require('express')
const socket=require('socket.io')
const app=express()
app.use(express.static('res'))

app.get('*',(req,res)=>{
    res.sendFile(__dirname+'/res/index.html')
})

const port= process.env.PORT || 5000
const server=app.listen(port)

const io=socket(server)
let user=0

io.on('connection',(socket)=>{
    
    socket.on('createRoom',(code)=>{
        if(socket.room!=undefined)
         {Object.keys(socket.room)
        .filter(it => it !== socket.id)
        .forEach(id => socket.leave(id));
         }
        socket.join(code)
        
    })
    socket.on('joinRoom',(code)=>{

        if(socket.room!=undefined)
         {Object.keys(socket.room)
        .filter(it => it !== socket.id)
        .forEach(id => socket.leave(id));
         }

         if(io.sockets.adapter.rooms[code])
          {  socket.join(code)
            io.sockets.in(code).emit('startGame',code)
          }
        else
         socket.emit('noRoom',{})      
    })

   socket.on('leaveRoom',room=>{
       socket.to(room).emit('leaveRoom',{})
       socket.leave(room)
   })

   socket.on('tick',data=>{
       socket.to(data.room).emit('tick',data)
   })
    
    socket.on('disconnecting', function(){
        var self = this;
        var rooms = Object.keys(self.rooms);
    
        rooms.forEach(function(room){
            self.to(room).emit('leaveRoom',{});
        });
    });  
        
})