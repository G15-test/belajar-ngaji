function showTab(id){

document.querySelectorAll(".tab")
.forEach(t=>t.classList.remove("active"))

document.getElementById(id).classList.add("active")

}



function toggleDark(){

document.body.classList.toggle("dark")

}



async function loadSurahList(){

let res = await fetch("https://equran.id/api/v2/surat")

let data = await res.json()

let select=document.getElementById("surahSelect")

data.data.forEach(s=>{

let opt=document.createElement("option")

opt.value=s.nomor
opt.text=s.namaLatin

select.appendChild(opt)

})

}



async function loadSurah(n){

let res=await fetch(`https://equran.id/api/v2/surat/${n}`)

let data=await res.json()

let list=document.getElementById("quranList")

list.innerHTML=""

data.data.ayat.forEach(a=>{

list.innerHTML+=`

<div>

<p class="arabic">${a.teksArab}</p>

<p>${a.teksIndonesia}</p>

<button onclick="saveAyat('${a.teksArab}')">
⭐
</button>

</div>

`

})

}



let dzikir=0

function countDzikir(){

dzikir++

document.getElementById("dzikirCount").innerText=dzikir

}



function saveAyat(a){

let list=JSON.parse(localStorage.getItem("ayat"))||[]

list.push(a)

localStorage.setItem("ayat",JSON.stringify(list))

}



loadSurahList()

document.getElementById("surahSelect").onchange=e=>loadSurah(e.target.value)
