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

const loadLevelWord=(id)=>{
    // console.log(id);
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        // console.log(data);
        displayLevelWord(data.data);
    })
}

const displayLevelWord=(words)=>{
    // console.log(words);
    const wordContainer=document.getElementById('word-container');
    wordContainer.innerHTML="";
    words.forEach(word=>{
        const levelWord=document.createElement("div");
        levelWord.innerHTML=`
        <div class="card bg-white p-5 rounded-lg text-center space-y-2">
            <h2 class="font-bold text-xl">${word.word}</h2>
            <p>Meaning /Pronounciation</p>
            <div class="font-semibold text-3xl opacity-[80%]">"${word.meaning} /${word.pronunciation}"</div>
            <div class="flex justify-between my-4 items-center">
                <button class="btn "><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn "><i class="fa-solid fa-volume-high"></i></button>
              
            </div>
        </div>
        `
        wordContainer.append(levelWord);
        console.log(word);
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
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-primary btn-outline"><i class="fa-solid fa-book-open"></i>lesson-${lesson.level_no}</button>
        `
 // 4.append the element
        // console.log(lesson);
        lessonContainer.appendChild(btnDiv);

    });
    
}
loadLesson();