console.log("js connected");

const createElements=(arr)=>{
    const htmlElements=arr.map((el)=>`<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
}
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner=(status)=>{
    if(status==true){
        document.getElementById('spinner').classList.remove("hidden");
        document.getElementById('word-container').classList.add("hidden");
    }
    else {
         document.getElementById('word-container').classList.remove("hidden");
        document.getElementById('spinner').classList.add("hidden");
    }
}

const loadLesson=()=>{
    const url="https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
    .then(res=>res.json())
    .then(json=>{
        // console.log(data);
        displayLesson(json.data);
    })
}

const removeActive=()=>{
    const lessonButtons=document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn=>{
        btn.classList.remove("active");
    })
}

const loadLevelWord=(id)=>{
    manageSpinner(true);
    // console.log(id);
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        // console.log(data);
        removeActive();// remove active class from all buttons
        const clickBtn=document.getElementById(`lesson-btn-${id}`);
        // console.log(clickBtn);
        clickBtn.classList.add("active");// add active class to the clicked button
        displayLevelWord(data.data);
    })
}


// data
// : 
// {word: 'Eager', meaning: 'আগ্রহী', pronunciation: 'ইগার', level: 1, sentence: 'The kids were eager to open their gifts.', …}
// message
// : 
// "successfully fetched a word details"
// status
// : 
// true
const loadWordDetails=async(id)=>{

// console.log('rakibul'+id);
const url=`https://openapi.programming-hero.com/api/word/${id}`;
// console.log(url);
const res=await fetch(url);
const details=await res.json();
// console.log(details);
displayWordDetails(details.data);


}
const displayWordDetails=(details)=>{

    const detailBox=document.getElementById("details-container");
    detailBox.innerHTML=` <div class="modal-box w-11/12 max-w-sm">
     <!-- modal card -->
     <div class=" space-y-4 rounded-md">
        <h2 class="text-4xl">${details.word}</h2>
    <div>     
    <h3>Meaning</h3>
     <p>${details.meaning}</p>
    </div>
       
     <div>
        <h2>Example</h2>
        <p>${details.sentence}</p>
     </div>
      
     <div class="">    
<h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
 <div>${createElements(details.synonyms)}</div>

       
    <!-- <h3 class="text-lg font-bold">Hello!</h3>
    <p class="py-4">Press ESC key or click the button below to close</p> -->
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary">Complete Learning</button>
      </form>
    </div>
  </div>`;

    document.getElementById("word-modal").showModal();

}

const displayLevelWord=(words)=>{
    // console.log(words);
    const wordContainer=document.getElementById('word-container');
    wordContainer.innerHTML="";

    if(words.length==0){
        wordContainer.innerHTML=`
       
        <div class="text-center col-span-full font-bangla space-y-4">
         <span class="flex justify-center"><img src="./assets/alert-error.png"></span>
        <p class="text-opacity-40">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-4xl font-bold text-opacity-20">নেক্সট Lesson এ যান</h2>
    </div>
        `;
        manageSpinner(false);
        return;
        
    }
    words.forEach(word=>{
        const levelWord=document.createElement("div");
        levelWord.innerHTML=`
        <div class="card bg-white p-5 rounded-lg text-center space-y-2">
            <h2 class="font-bold text-xl">${word.word ? word.word:"শব্দ পাওয়া যায় নি।"}</h2>
            <p>Meaning /Pronounciation</p>
            <div class="font-semibold text-3xl opacity-[80%]">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি।"} /${word.pronunciation ? word.pronunciation:"pronounciation পাওয়া যায় নি।"}"</div>
            <div class="flex justify-between my-4 items-center">
                <button onclick="loadWordDetails(${word.id})" class="btn "><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn "><i class="fa-solid fa-volume-high"></i></button>
              
            </div>
        </div>
        `
        wordContainer.append(levelWord);
        // console.log(word);
    });
    manageSpinner(false);
}
const displayLesson=(lessons)=>{
    
    // 1.get the container and empty
    const lessonContainer=document.getElementById('lesson-container');
    lessonContainer.innerHTML="";
    // 2.get into every lessons

    
 
    lessons.forEach(lesson => {
       
   // 3.create Element
        const btnDiv=document.createElement('div');
        btnDiv.innerHTML=`
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-primary btn-outline lesson-btn"><i class="fa-solid fa-book-open"></i>lesson-${lesson.level_no}</button>
        `
 // 4.append the element
        // console.log(lesson);
        lessonContainer.appendChild(btnDiv);

    });
    
}
loadLesson();


document.getElementById('btn-search').addEventListener("click",()=>{
    const input=document.getElementById('input-search');
    const searchValue=input.value.trim().toLowerCase();
    // console.log(searchValue);
     fetch("https://openapi.programming-hero.com/api/words/all")
     .then(res=>res.json())
     .then(data=>{
        const allWords=data.data;
        console.log(allWords);
        const filterWords=allWords.filter(word=>
            word.word.toLowerCase().includes(searchValue)

        );
        displayLevelWord(filterWords);
     })

})