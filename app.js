document.addEventListener("DOMContentLoaded", function() {
  loadSurahList();

  document.getElementById("surahSelect").addEventListener("change", function(e) {
    loadSurah(e.target.value);
  });
});

async function loadSurahList() {
  try {
    let res = await fetch("https://equran.id/api/v2/surat");
    let data = await res.json();
    let select = document.getElementById("surahSelect");

    // Kosongkan dulu dropdown
    select.innerHTML = "";

    data.data.forEach(s => {
      let opt = document.createElement("option");
      opt.value = s.nomor;
      opt.text = s.namaLatin;
      select.appendChild(opt);
    });

    // Otomatis load surah pertama
    if (data.data.length > 0) {
      loadSurah(data.data[0].nomor);
    }
  } catch (error) {
    console.error("Gagal load daftar surah:", error);
  }
}

async function loadSurah(nomor) {
  try {
    let res = await fetch(`https://equran.id/api/v2/surat/${nomor}`);
    let data = await res.json();
    let list = document.getElementById("quranList");

    list.innerHTML = ""; // Kosongkan dulu

    data.data.ayat.forEach(a => {
      list.innerHTML += `
        <div style="margin-bottom: 20px;">
          <div>
            <span style="background:#a7f3d0; padding: 2px 8px; border-radius: 9999px;">${a.nomorAyat}</span>
          </div>
          <p style="font-family: 'Amiri', serif; font-size: 28px; text-align: right;">${a.teksArab}</p>
          <p style="font-style: italic; color: #4b5563;">${a.teksIndonesia}</p>
          <audio controls>
            <source src="${a.audio['01']}" type="audio/mpeg" />
          </audio>
        </div>
      `;
    });
  } catch (error) {
    console.error("Gagal load ayat surah:", error);
  }
}function showTab(id){

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
