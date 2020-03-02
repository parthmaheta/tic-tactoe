const express=require('express')
const socket=require('socket.io')
const app=express()
app.use(express.static('res'))

app.get('*',(req,res)=>{
    res.sendFile(__dirname+'/res/index.html')
})

const port=5000
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

   socket.on('tick',data=>{
       socket.broadcast.to(data.room).emit('tick',data)
   })
      
        
})