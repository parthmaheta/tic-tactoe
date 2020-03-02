let state={
    room:'',
    symbol:'o.png'
}

const socket=io.connect()

socket.on('startGame',code=>{
    state.room=code
    openLayout()
})
socket.on('noRoom',()=>{
    document.getElementById('join').style.borderBottomColor='red'
})

socket.on('tick',data=>{
    let img=data.img
    let index=data.index
    document.querySelectorAll('.game-layout div')[index].style.backgroundImage=`url('./img/${img}')`
})
function getCode(){
   state.room=makeid(6)
   document.getElementById('code').innerText=state.room
   socket.emit('createRoom',state.room)
}

function joinCode(){
    let code=document.getElementById('join').value
    if(code.length==6)
     { 
         socket.emit('joinRoom',code)
         state.symbol='x.png'
    }    
}

function tick(index){
    socket.emit('tick',{room:state.room,index:index,img:state.symbol})
    document.querySelectorAll('.game-layout div')[index].removeEventListener('click',addimg)
}