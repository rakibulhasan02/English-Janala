console.log("js connected");
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
                <button onclick="my_modal_5.showModal()" class="btn "><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn "><i class="fa-solid fa-volume-high"></i></button>
              
            </div>
        </div>
        `
        wordContainer.append(levelWord);
        // console.log(word);
    })
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