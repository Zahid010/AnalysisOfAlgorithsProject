new Vue({
  el: '#app',
  data: {
    startTime: '',
    endTime: '',
    profit: '',
    errorMsg: '',
    taskNo: 1,
    show: true,
    loading: false,
    showResult: false,
    tasks: [],
    taskWRTProfit: [],
    maxEndTime:0,
    arrOfProfit: [],
    arrOfTasks: [],
    totalProfit: 0
  },
  methods: {
    //create new tasks 
    createTask: function() {
      this.validateInput();
      if (!this.errorMsg) {
        this.tasks.unshift({
          taskNo: this.taskNo,
          startTime: this.startTime,
          endTime: this.endTime,
          profit: this.profit
        });
        this.taskWRTProfit.unshift({
          taskNo: this.taskNo,
          startTime: this.startTime,
          endTime: this.endTime,
          profit: this.profit
        });
        
        this.taskNo= this.taskNo+1;
        this.startTime = '';
        this.endTime = '';
        this.profit = '';
      }
    },
    //delete the task
    deleteTask: function(index) {
      
      let taskNoOfRemoving=this.tasks[index].taskNo;
      this.tasks.splice(index, 1);

      for(let i=0; i<this.taskWRTProfit.length;i++){
        if(this.taskWRTProfit[i].taskNo==taskNoOfRemoving){
          this.taskWRTProfit.splice(i, 1);
        }
      }
    },
    calculateProfit: function() {
      console.time('abc');
      /*let d = new Date();
      let startminut = d.getMinutes();
      let startsecond = d.getSeconds();
      let sTime=(startminut*60)+(startsecond)
      console.log('Start : '+sTime);*/
      
      if (this.tasks.length > 0) {
        this.showResult = true;

        this.tasks.sort(function(a, b) {
          return a.taskNo - b.taskNo;
        });
        this.taskWRTProfit.sort(function(a, b) {
          return b.profit - a.profit;
        });

        // max ending time amoung all tasks
        this.maxEndTime = this.tasks[0].endTime;
        for (let i = 0; i < this.tasks.length; i++) {
          if (this.maxEndTime <= this.tasks[i].endTime) {
            this.maxEndTime = this.tasks[i].endTime;
          }
        }
        for (let i = 0; i < this.maxEndTime; i++) {
          this.arrOfProfit.unshift(undefined);
          this.arrOfTasks.unshift(undefined);
        }

        for (let i = 0; i < this.taskWRTProfit.length; i++) {
          index = this.taskWRTProfit[i].endTime;
          j = index;
          while (j >= 0) {
            if (this.arrOfProfit[j] == (undefined)) {
              //fill the array of profits
              this.arrOfProfit[j] = this.taskWRTProfit[i].profit;

              //fill the array of tasks no
              this.arrOfTasks[j] = this.taskWRTProfit[i].taskNo;
              break;
            } 
            else {
              j = j - 1;
            }
          }
        }

        // total profit of the tasks in totalProfit
        for (let i = 1; i < this.arrOfProfit.length; i++) {
          if (this.arrOfProfit[i] == undefined) {
            this.arrOfProfit[i] = 0;
          }
          this.totalProfit = Number(this.totalProfit) + Number(this.arrOfProfit[i]);
        }

        //to mantion if there is no task by processor
        for (let i = 1; i < this.arrOfTasks.length; i++) {
          if (this.arrOfTasks[i] == undefined) {
            this.arrOfTasks[i] = 'No Work';
          }
        }
        console.log(this.arrOfProfit);
        console.log(this.arrOfTasks);

        //list of all task to perform by profit
        for (let i = 1; i < this.arrOfProfit.length; i++) {
          console.log(
            i 
            +'      Hour ' + i 
            +'  Task Number : '+this.arrOfTasks[i] 
            +'      with Profit : ' +this.arrOfProfit[i]
          );
        }

        console.log('Total Profit by the Tasks are : ' + this.totalProfit);

        this.errorMsg = '';
        console.timeEnd('abc');
        /*let d = new Date();
        let endminut = d.getMinutes();
        let endsecond = d.getSeconds();
        let eTime=(endminut*60)+(endsecond)
        console.log('End : '+eTime); */

      }

      this.errorMsg = 'Please Add Some Tasks First !';
    },
    calculateAnotherResult: function() {
      this.showResult = false;
      this.arrOfTasks.length=0;
      this.arrOfProfit.length=0;
      this.totalProfit=0;
    },
    validateInput: function() {
      /*if (this.startTime.trim() == '')
        return (this.errorMsg = 'Start Time Can Not Be Empty');
      */

      if (this.endTime.trim() == '')
        return (this.errorMsg = 'Ending Time Never Be Empty');
    
      if (this.endTime.trim() <= 0)
      return (this.errorMsg = 'Ending Time Never Be -ve or 0');  

      if (this.profit.trim() == '')
        return (this.errorMsg = 'Profit Can Not Be Empty');

      if (this.profit.trim() < 0)
      return (this.errorMsg = 'No Need To Perform Task with -ve Profit');  

      /*if (+this.startTime.trim() >= +this.endTime.trim())
        return (this.errorMsg =
          'Starting Time Should Be Equal or Less Than Ending Time');
      */
      this.errorMsg = '';
    }
  }
});
