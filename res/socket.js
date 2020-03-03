let state={
    room:'',
    symbol:'o.png'
}
let board=[['','',''],['','',''],['','','']]


const socket=io.connect()

socket.on('startGame',code=>{
    state.room=code
    openModel('animationModel')
    let id=setInterval(startCount,1000)
    setTimeout(()=>stopCount(id),3000)    
    openLayout()
    
})
socket.on('noRoom',()=>{
    document.getElementById('join').style.borderBottomColor='red'
})

socket.on('tick',data=>{
    putInArray(data.index,data.img.substr(0,1))
    checkResult(data.index,data.img.substr(0,1))
    let img=data.img
    let index=data.index
    document.querySelectorAll('.game-layout div')[index].style.backgroundImage=`url('./img/${img}')`
    document.querySelectorAll('.game-layout div')[index].removeEventListener('click',addimg)
    myTurn()
})

socket.on('leaveRoom',data=>{
    alert('oops your friend has leaved game')
    closeGame()
    clearArray()
})

function getCode(){
   state.room=makeid(6)
   state.symbol='o.png'
   document.getElementById('code').innerText=state.room
   socket.emit('createRoom',state.room)
}

function joinCode(){
    let code=document.getElementById('join').value
    if(code.length==6)
     { 
         socket.emit('joinRoom',code)
         state.symbol='x.png'
         document.getElementById('join').value=''
    }    
}
function leaveRoom(){
    socket.emit('leaveRoom',state.room)
    clearArray()
}
function tick(index){
    socket.emit('tick',{room:state.room,index:index,img:state.symbol})
    document.querySelectorAll('.game-layout div')[index].removeEventListener('click',addimg)
    hisTurn()
}

