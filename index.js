const btnContainer = document.getElementById("btn-container");
const cardContainer = document.getElementById("card-container");
const errorContainer = document.getElementById("error-element");
const sortBtn = document.getElementById("sort-btn");
let selected =1000;
let sortByView = false;

sortBtn.addEventListener('click',()=>{
    sortByView=true;
    fetchDataCatagory(selected,sortByView);
})

const fetchCatagory = async()=>{
   
    
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data= await res.json();

    console.log(data.data);
    const btns = data.data;
    btns.forEach(btn => {
        console.log(btn);
      const newBtn = document.createElement("button");
      newBtn.innerText=btn.category;
      newBtn.classList = "btn ruhul3  btn-ghost bg-slate-700 text-white text-lg";
      newBtn.addEventListener('click',()=>
     { fetchDataCatagory(btn.category_id)
      const allBtns =document.querySelectorAll('.ruhul3')
    for(const singleBtn of allBtns){
        singleBtn.classList.remove('bg-red-600')
        singleBtn.classList.add('bg-slate-700')
        // singleBtn.classList.remove='bg-red-600'
    }
    newBtn.classList.remove('bg-slate-700')
    newBtn.classList.add('bg-red-600')
    }
      
      )
    
      btnContainer.appendChild(newBtn)
     
    });
  
}

const fetchDataCatagory=async(categoryId,sortByView)=>{

    selected = categoryId
    const p = parseInt(categoryId);
    console.log(typeof p);
    if(p ===1005){
        errorContainer.classList.remove("hidden")
        // cardContainer.classList.add("hidden")
    }
    else{
        errorContainer.classList.add("hidden")
    }
    
       
        const id =categoryId;
        const res2=await fetch(` https://openapi.programming-hero.com/api/videos/category/${id}`);
        const data2 =await res2.json();
        const cards = data2.data;
        
    if(sortByView){
        cards.sort((a,b)=>{
            const totalViewsStrFirst = a.others?.views;
            const totalViewsStrSecond = b.others?.views;
            const totalViewsFirstNu 
             
                            =parseFloat(totalViewsStrFirst.replace("K",'')) || 0;
            const totalViewsSecondNu =parseFloat(totalViewsStrSecond.replace("K",'')) ||0;

            return  totalViewsSecondNu -totalViewsFirstNu ;

        })
    }
        cardContainer.innerHTML=``;
        cards.forEach(card=>{
           
             const newCard = document.createElement("div");
    
             newCard.innerHTML=`
             <div class="card w-full bg-base-100 shadow-xl">
             <figure class="overflow-hidden h-72">
                 <img class="w-full" src="${card.thumbnail
                 }" />
                 <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
             </figure>
             <div class="card-body">
                 <div class="flex space-x-4 justify-start items-start">
                     <div>
                         <img class="w-12 h-12 rounded-full" src="${card.
                            authors['0'].profile_picture}" alt="Shoes" />
                     </div>
                     <div>
                         <h2 class="card-title">${card.title}</h2>
                         <div class="flex mt-3">
                             <p class="">${card.authors['0'].profile_name}</p>
                             <img class="w-6 h-6" src="./images/verify.png" alt="">
                         </div>
                         <p class="mt-3">${card.others.views} views</p>
                     </div>
                 </div>
             </div>
         </div>`
            
            console.log(card);
            cardContainer.appendChild(newCard)
        });
    
   
}
fetchCatagory()
fetchDataCatagory(selected,sortByView);