function openModel(id){
  if(id==='inviteModel')
  { getCode()
    setTimeout(showLoader,2000)
  }
  document.getElementById(id).style.display='block'
 }

function showLoader(){
  document.getElementById('showLoader').style.display='block'
}
function openLayout(){
  clearLayout()
  closeModel('joinModel')
  closeModel('inviteModel')
  setTimeout(()=>closeModel('animationModel'),3000)

  document.querySelectorAll('.game-layout div').forEach(node=>{
    node.addEventListener('click',addimg)
})
  
  document.getElementsByClassName('box')[0].style.display='none'
  document.getElementsByClassName('game-layout')[0].style.display='grid'
  document.getElementById('exit').style.display='inline-block'
}

function startCount(){
  
  let count=document.getElementById('seconds').innerHTML
  document.getElementById('seconds').innerHTML=--count
}

function stopCount(id){
  clearInterval(id)
  document.getElementById('seconds').innerHTML='3'
  if(state.symbol=='o.png')
   myTurn()
  else
    hisTurn() 
}

function myTurn(){
  document.getElementById('turn-load').style.display='none'
  document.getElementsByClassName('game-layout')[0].style.pointerEvents ='auto';
  document.getElementsByClassName('game-layout')[0].style.opacity='1.0'
}

function hisTurn(){
  document.getElementById('turn-load').style.display='block'
  document.getElementsByClassName('game-layout')[0].style.pointerEvents ='none';
  document.getElementsByClassName('game-layout')[0].style.opacity='0.5'
}

function exit(){
 let ans=confirm('do you want to exit ?')
 if(ans){
  document.getElementsByClassName('box')[0].style.display='flex'
  document.getElementsByClassName('game-layout')[0].style.display='none'
  document.getElementById('turn-load').style.display='none'
  document.getElementById('exit').style.display='none'
  leaveRoom()
 }
}

function closeGame(){
  document.getElementsByClassName('box')[0].style.display='flex'
  document.getElementsByClassName('game-layout')[0].style.display='none'
  document.getElementById('exit').style.display='none'
  document.getElementById('turn-load').style.display='none'
  clearArray()
  
}

function clearLayout(){
  document.querySelectorAll('.game-layout div').forEach(node=>{
    node.style.backgroundImage="url('./img/white.png')"
})
}
function closeModel(id){
  document.getElementById(id).style.display='none'
  document.getElementById('showLoader').style.display='none'
}

function addimg(e){ 
    
  e.target.style.backgroundImage=`url('./img/${state.symbol}')`
  let symbol=state.symbol.substr(0,1) //get o or x
  putInArray(e.target.dataset.index,symbol)
  checkResult(e.target.dataset.index,symbol)
  tick(e.target.dataset.index)
}


function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function checkResult(index,symbol){
  let row=Math.floor(index/3)
  let column=Math.floor(index%3)
  let ans=false
  if(board[row][0]==symbol&&board[row][1]==symbol&&board[row][2]==symbol)
   ans=true
  else if(board[0][column]==symbol&&board[1][column]==symbol&&board[2][column]==symbol)
   ans=true
  else if(board[0][0]==symbol&&board[1][1]==symbol&&board[2][2]==symbol)
   ans=true
  else if(board[0][2]==symbol&&board[1][1]==symbol&&board[2][0]==symbol)  
   ans=true

  if(ans){
    if(symbol==state.symbol.substr(0,1))
     alert('you won')
     else
      alert('you lost')

      closeGame()
  }
  else if(isFullArray())
   {   alert('game tied') 
       closeGame()
  }

}
function isFullArray(){
  for(i in board)
  {
    for(j in board[i]){
   if(board[i][j]=='')
     return false
    }
  }
  return true
   
}



function putInArray(index,symbol){
   
    
  let row=Math.floor(index/3)
  let column=Math.floor(index%3)
  board[row][column]=symbol

}

function clearArray(){
  for(i in board)
   for(j in board[i])
    board[i][j]=''
}