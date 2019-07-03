<template>
  <b-card class="border-0">
    <b-form @submit.prevent="addNewBook()">
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
      <hr>
      <b-button variant="success"
                type="submit"
                class="card-in"
                v-if="!fillData">
        Save the book
      </b-button>
      <b-button variant="success"
                type="submit"
                class="card-in"
                v-else>
        Update the book
      </b-button>
    </b-form>
  </b-card>
</template>

<script type="text/javascript">
  export default {
    props: {
      fillData: {
        type: Object
      }
    },
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
    created() {
      if (!this.fillData) {
        return;
      }
      const { title, author, price, publisher, cover_url: coverUrl } = this.fillData;
      this.model = {
        title: title,
        author: author,
        price: price,
        publisher: publisher,
        cover_url: coverUrl
      };
    },
    methods: {
      async addNewBook() {
        if (this.fillData) {
          this.$emit('updateBook', this.model);
          return;
        }

        try {
          const body = this.model;
          await this.$store.dispatch('book/add', body);
          this.$emit('bookAdded');
          this.resetModel();

          this.$notify({
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
                    type: 'danger',
                    text: item
                  });
                });
              }
            }
          } else {
            this.$notify({
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
