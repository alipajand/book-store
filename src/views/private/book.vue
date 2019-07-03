<template>
  <div class="my-4">
    <b-card class="border-0 mb-3 card-in"
            v-if="flags.loading">
      <b-spinner></b-spinner>
    </b-card>
    <template v-else>
      <b-card class="border-0 mb-3 card-in overflow-hidden">
        <b-row class="justify-content-between">
          <b-col class="py-1 card-in">
            <div v-if="data.books && data.books.length === 0">
              Your library is empty!
            </div>
            <div v-else>
              Let's try to add some new books!
            </div>
          </b-col>
          <b-col cols="auto">
            <b-button @click="flags.showAddNewBookPanel = !flags.showAddNewBookPanel">
            <span v-if="!flags.showAddNewBookPanel">
              add new one
            </span>
              <span v-else>
              close panel
            </span>
            </b-button>
          </b-col>
        </b-row>
      </b-card>
      <b-collapse id="add-new-book"
                  v-model="flags.showAddNewBookPanel">
        <add-new-book-component v-on:bookAdded="getAllBooks()"></add-new-book-component>
      </b-collapse>
      <b-card class="border-0 mt-3 mb-2 card-in overflow-hidden"
              v-for="book in data.books"
              :key="book.id">
        <b-media>
          <b-img slot="aside"
                 :src="book.cover_url"
                 :blank="!Boolean(book.cover_url)"
                 blank-color="#ccc"
                 width="110"
                 height="110"
                 class="rounded">
          </b-img>
          <h5 class="mt-0">
            {{book.title}}
          </h5>
          <p class="m-0">
            Author: {{ book.author }}
          </p>
          <p>
            Publisher: {{ book.publisher }}
          </p>
          <p class="m-0 text-success large">
            {{ book.price }} $
          </p>
        </b-media>
      </b-card>
    </template>
  </div>
</template>

<script type="text/javascript">
  import addNewBookComponent from '../../components/addNewBook';

  export default {
    components: {
      'addNewBookComponent': addNewBookComponent
    },
    data() {
      return {
        flags: {
          showAddNewBookPanel: false,
          loading: false
        },
        data: {
          books: []
        },
        model: {
          search: ''
        },
        params: {
          currentPage: 1
        }
      };
    },
    created() {
      this.getAllBooks({ page: this.params.currentPage });
    },
    methods: {
      async getAllBooks({ page, search }) {
        let filters = '';
        if (page) {
          filters += `page=${page}`;
        }
        if (search) {
          filters += `search=${search}`;
        }
        this.flags.loading = true;
        const response = await this.$store.dispatch('book/get', filters);
        this.flags.loading = false;
        const { data, meta } = response.data;
        this.data.books = data;
        this.params.currentPage = meta.current_page;
      },
      nextPage() {
        this.params.currentPage++;
        this.getAllBooks({ page: this.params.currentPage });
      },
      previousPage() {
        this.params.currentPage--;
        this.getAllBooks({ page: this.params.currentPage });
      },
      search() {
        this.params.currentPage--;
        this.getAllBooks({ page: this.params.currentPage, search: this.model.search });
      },
      updateBook(id) {
        this.$store.dispatch('book/update', id);
      },
      deleteBook(id) {
        this.$store.dispatch('book/delete', id);
      }
    }
  };
</script>
