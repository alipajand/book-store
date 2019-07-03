import Vue from 'vue';

Vue.filter('number', value => {
  if (!value) return;

  if (Number(value) === value && value % 1 !== 0) {
    value = Number(value).toFixed(2);
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});
