<template>
    <div class="today" id="today">
        <h1>{{ Day() }}</h1>
        <h3>{{ DateToday()}}</h3>
    </div>
</template>

<script>
    export default {
        name:'Header',
        data(){
            return{
            todayDate: new Date(),
            }
        },
        methods:{       
            Day(){ 
                const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[this.todayDate.getDay()];
            },
            DateToday(){
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
        ];
    return `${
      months[this.todayDate.getMonth()]
    } ${this.todayDate.getDate()}, ${this.todayDate.getFullYear()}`;
            }
        }

    }
</script>

<style scoped>
.today {
  margin: 0.5rem 0;
  text-align: center;
}

</style>