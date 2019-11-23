console.log( "One Day You Will be Die" );



//total tasks to perform

let tasks=100;//document.getElementsByClassName('test');
let task=new Array(tasks);
for(let i=0;i<task.length;i++){
  task[i]=({
    taskNo:i+1,  
    endTime:(Math.floor(Math.random()*(task.length*(2/2)))+1),  
    startTime:0,  
    profit:Math.floor(Math.random()*(task.length))
  });
}


// original array of tasks in original variable
let original={...task};
console.log("Original list of Tasks to Perform");
console.log(original);

//sorted array of tasks by profits in task variable
task.sort(function(a,b){
  return b.profit-a.profit;
});

console.log("Sorted List of Tasks on the Base of Profit");
console.log(task);

// max ending time amoung all tasks
let maxEndTime=task[0].endTime;
for(let i=0;i<task.length;i++){
  if( maxEndTime<=task[i].endTime){
    maxEndTime = task[i].endTime;
  }
}

//resultant array of profit for tasks
let arrOfProfit = new Array(maxEndTime);

//resultant array of tasks no to perform
let arrOfTasks = new Array(maxEndTime);


// main chekaCheka bu xD
for(let i=0;i<task.length;i++){
  index=task[i].endTime;
  j=index;
  while(j>=0){
    if(arrOfProfit[j]==undefined){
      //fill the array of profits
      arrOfProfit[j]=task[i].profit;

      //fill the array of tasks no
      arrOfTasks[j]=task[i].taskNo;
      break;
    }
    else{
      j=j-1;
    }

  }
}



// total profit of the tasks in totalProfit
let totalProfit=0;
for(let i=1;i<arrOfProfit.length;i++){
  if(arrOfProfit[i]==undefined){
    //if no task to perform profit is zero
    arrOfProfit[i]=0;
  }

  totalProfit=totalProfit+arrOfProfit[i];
}


//to mantion if there is no task by processor
for(let i=1;i<arrOfTasks.length;i++){
  if(arrOfTasks[i]==undefined){
    arrOfTasks[i]="No Work To Do";
  }
}

//list of all task to perform by profit
for(let i=1;i<arrOfProfit.length;i++){
  console.log(i+"      Hour "+i+"  Task Number : "+arrOfTasks[i]+"      with Profit : "+arrOfProfit[i]);
}


console.log("Total Profit by the Tasks are : "+totalProfit);








