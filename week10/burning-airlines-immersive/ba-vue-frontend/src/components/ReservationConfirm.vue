<template>
<div class="confirm">
  <h3>Your Seat Selection:</h3>
    <div class="seat">
      {{ row }} {{  col }}
    </div>
    <button @click="confirmSeat">Confirm</button>
</div>
</template>

<script>
export default {
  name: 'ReservationConfirm',
  props: ['row', 'col'],
  methods: {
    confirmSeat(){
      console.log('confirm clicked!');

      // Tell the parent to make the axios.post() request to save
      // the selected seat to the DB as a reservation for this user.
      // In Vue, we don't have to rely on a method being passed down
      // from parent to child as a prop, in order for the child
      // to send data to the parent;
      // instead, we just 'emit' an event:

      // You can optionally pass as many arguments as
      // you need to (usually some of the child's own
      // state), as long as the handler method in
      // the parent is expecting them as parameters
      this.$emit( 'seat-confirmed', 123, 456, 'hi' );

    }, // confirmSeat()
  }
}
</script>

<style scoped>
  .seat {
    padding: 20px;
    font-weight: bold;
    color: green;
    font-size: 24px;
  }
</style>