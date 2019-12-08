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
    createTask: function() {
      this.validateInput();
      if (!this.errorMsg) {
        this.tasks.unshift({
          startTime: this.startTime,
          endTime: this.endTime,
          profit: this.profit
        });
        this.startTime = '';
        this.endTime = '';
        this.profit = '';
      }
    },
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
      if (this.tasks.length > 0) {
        this.showResult = true;

        //implement logic here

        this.errorMsg = '';
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
