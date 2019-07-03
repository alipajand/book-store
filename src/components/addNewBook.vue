<template>
  <b-card class="border-0">
    <b-form @submit.prevent="addNewBook()">
      <legend class="card-in">
        Add NEW BOOK
      </legend>
      <b-form-group class="card-in">
        <b-form-input
          v-model="model.title"
          type="text"
          required
          placeholder="Enter book title">
        </b-form-input>
      </b-form-group>
      <b-form-group class="card-in">
        <b-form-input
          v-model="model.author"
          type="text"
          required
          placeholder="Enter book author">
        </b-form-input>
      </b-form-group>
      <b-form-group class="card-in">
        <b-form-input
          v-model="model.price"
          type="number"
          required
          placeholder="Enter price">
        </b-form-input>
      </b-form-group>
      <b-form-group class="card-in">
        <b-form-input
          v-model="model.publisher"
          type="text"
          required
          placeholder="Enter book publisher">
        </b-form-input>
      </b-form-group>
      <b-form-group class="card-in">
        <b-form-input
          v-model="model.cover_url"
          type="url"
          required
          placeholder="Enter cover url">
        </b-form-input>
      </b-form-group>
      <b-button variant="success"
                type="submit"
                class="card-in">
        Add this book
      </b-button>
    </b-form>
  </b-card>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        model: {
          title: '',
          author: '',
          price: '',
          publisher: '',
          cover_url: ''
        }
      };
    },
    methods: {
      async addNewBook() {
        try {
          const body = this.model;
          await this.$store.dispatch('book/add', body);
          this.$emit('bookAdded');
          this.resetModel();

          this.$notify({
            group: 'axios',
            type: 'success',
            text: 'Congratulations! Your book successfully added!'
          });
        } catch (error) {
          const errorMessage = error.response;
          if (errorMessage) {
            for (const i in errorMessage.data.errors) {
              if (errorMessage.data.errors.hasOwnProperty(i)) {
                errorMessage.data.errors[i].map(item => {
                  this.$notify({
                    group: 'axios',
                    type: 'danger',
                    text: item
                  });
                });
              }
            }
          } else {
            this.$notify({
              group: 'axios',
              type: 'danger',
              text: 'There is some problems here! please try again...'
            });
          }
        }
      },
      resetModel() {
        this.model = {
          title: '',
          author: '',
          price: '',
          publisher: '',
          cover_url: ''
        };
      }
    }
  };
</script>
