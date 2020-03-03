function openModel(id){
  if(id==='inviteModel')
  getCode()
  document.getElementById(id).style.display='block'
 }


function openLayout(){
  closeModel('joinModel')
  closeModel('inviteModel')
  clearLayout()
  document.getElementsByClassName('box')[0].style.display='none'
  document.getElementsByClassName('game-layout')[0].style.display='grid'
  document.getElementById('exit').style.display='inline-block'
}
function exit(e){
 let ans=confirm('do you want to exit ?')
 if(ans){
  document.getElementsByClassName('box')[0].style.display='flex'
  document.getElementsByClassName('game-layout')[0].style.display='none'
  document.getElementById('exit').style.display='none'
 }
}

function clearLayout(){
  document.querySelectorAll('.game-layout div').forEach(node=>{
    node.style.backgroundImage="url('./img/white.png')"
})
}
function closeModel(id){
  document.getElementById(id).style.display='none'
  if(id=='inviteModel'&&state.room!='')
   leaveRoom()
}

function addimg(e){ 
    
  e.target.style.backgroundImage=`url('./img/${state.symbol}')`
  tick(e.target.dataset.index)
}
document.querySelectorAll('.game-layout div').forEach(node=>{
    node.addEventListener('click',addimg)
})

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

