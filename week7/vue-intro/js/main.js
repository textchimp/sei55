

Vue.component('dog-info', {
  props: ['name', 'roundness'],
  template: `
    <div>
      <h3>{{ name }}</h3>
      <p>Roundness: {{ roundness }}</p>
    </div>
  `,
}); // Vue.component



// item = Item.new
const app = new Vue({

  // Where does this Vue app attach to the
  // actual DOM?
  el: '#app',

  // What is the 'state' of the app?
  // i.e. what is the collection of variables
  // that change as a user interacts with
  // your app?
  data: {
    message: 'Hello Vuorld!',
    hoverText: 'This is the Vue hover text',
    billUrl: 'http://www.fillmurray.com/200/200',
    showMessage: true,
    errorStatus: 'allGood',
    queryText: '',

    todoList: [
      { text: 'Learn Vue', completed: false },
      { text: 'Finish homework', completed: false },
      { text: 'Relax', completed: false },
    ],

  }, // data

  methods: {
    changeMessage: function(){
      this.message = this.message.split('').reverse().join('');

      this.showMessage = !this.showMessage;

    },
    hoverHandler: function(){
      this.message = 'hover';
    },
  }, // methods




}); // new Vue
