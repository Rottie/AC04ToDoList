// 初始變數
//my-todo 在 html ul 的 id 值
const list = document.querySelector("#my-todo");
//my-done 在 html ul 的 id 值
const doneList = document.querySelector("#my-done");
//addBtn 在 html  的 Add button
const addBtn = document.querySelector("#addBtn");
//newTodo 在 hmtl 的 add Item 的input 欄位
const input = document.querySelector("#newTodo");

// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];

for (const todo of todos) {
  addItem(todo);
}

//新增 li 功能的函式
function addItem(text) {
  const newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  list.appendChild(newItem);
}

// Create
//Add 按鍵按后，就執開始做新增資料動作
addBtn.addEventListener("click", function () {
  const inputValue = input.value;
  if (inputValue.length > 0) {
    addItem(inputValue);
  }
});


/*----------------------程式碼撰寫在下方開始------------------------------*/

// Delete and check
//針對原先題目給的程式碼，這裏有四個部分做修改
list.addEventListener("click", function (event) {
  const doneTarget = event.target;
  //第一.選取被點擊元素的“渲染”文本内容，用作把文本内容回傳到Done區域做運算 
  const doneText = doneTarget.innerText;
  if (doneTarget.classList.contains("delete")) {
    const parentElement = doneTarget.parentElement;
    parentElement.remove();
  } else if (doneTarget.tagName === "LABEL") {
    const doneContent = doneTarget.parentElement;
    //第二.移除當下點擊任務名字範圍的li元素，也就等於把點擊的任務從Todo區域刪除掉
    doneContent.remove();
     /*第三.把Todo 區域被點擊任務的文字内容用 moveItem 函式重新把任務展現在Done區域
         完成把已完成的任務移動到Done區域做展示，成爲已完成任務事項
    */
    moveItem(doneText);
    /*第四，就把 tooggle checked部分刪除，因爲不需要點擊動作來顯示被刪除任務*/
  }
});

//1A.在 Done 區域新增 li 欄位功能
function moveItem(doneText) {
  //1B，先創造空的 Li element
  const doneContent = document.createElement("li");
  //1C.把外部資料也就是Done區域任務的文字内容  用 inner Html 顯示在網頁上
  doneContent.innerHTML = `
    <label for="todo" class="checked">${doneText}</label>
    <i class="delete fa fa-trash"></i>
  `;
  //1D.確保資料安排順序，先來排最後，以此類推
  doneList.appendChild(doneContent);
}

// 在輸入欄 完成輸入文字，並當下按鍵后 並限定只能按 Enter 完成作業第二規格
//2A.針對 input 也就是文字輸入欄位，做 keypress 功能，當有按鍵按下時，執行以下動作
input.addEventListener("keypress", function () {
  //2B.當按鍵是Enter,才執行以下動作，其他按鍵不接受
  if (event.keyCode === 13) {
    //2C.inputValue 代表表單控件的值，也就是字串型態
    const inputValue = input.value;
    //2D.inputValue 表單控件值的長度大於 0，偵測有輸入值
    if (inputValue.length > 0) {
      //2E.把控件的值回傳到 addItem 函數，其内容功能就是把控件值轉換輸出在Todo區域
      addItem(inputValue);
    }
  }
});



//把在Done區域任務還原到Todo區域的功能

/*3A.針對 doneList也就是 my-done 在 html ul 的 id 值
     用click方式把Done區域的事項還原到Todo區域的事項
*/
doneList.addEventListener("click", function (event) {
  //3B.選取被點擊Done區域任務範圍，可以是 label或者 i 元素，方便之後dom操作
  const target = event.target;
  
  //3C.選取被點擊元素的“渲染”文本内容，用作把文本内容回傳到Todo做運算
  const toDoText = target.innerText;

  //3D.如果點擊到帶有垃圾桶圖標且 class 為 delete 話，執行以下動作
  if (target.classList.contains("delete")) {
    //3E.針對在Done區域被點擊的垃圾桶圖片範圍，選取此Li元素的所有子元素
    const parentElement = target.parentElement;
    
   //3F.移除當下點擊垃圾桶圖標的li元素，也就等於把點擊的任務從Done區域刪除掉
    parentElement.remove();
    
    //3G.若以上動作沒執行話，而是點擊到任務的名字，且tagName 為 Label話就執行以下動作
  } else if (target.tagName === "LABEL") {
    
    //3H.針對在Done區域被點擊的任務名字範圍，選取此Li元素所有子元素
    const done = target.parentElement;
    
    //3I.移除當下點擊任務名字範圍的li元素，也就等於把點擊的任務從Done區域刪除掉
    done.remove();

    /*3J.把Done 區域被點擊任務的文字内容用 addItem 函式重新把任務展現在Todo區域
         完成把已刪除的任務還原到Todo區域做展示，成爲未完成任務事項
    */
    addItem(toDoText);
  }
});
