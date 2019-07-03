<template>
  <div class="my-4">
    <b-card class="border-0"
            v-for="book in data.books"
            :key="book.id">
      <b-media>
        <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
        <h5 class="mt-0">Media Title</h5>
        <p>
          {{ book }}
        </p>
      </b-media>
    </b-card>
    <b-card class="border-0"
            v-if="data.books && data.books.length === 0">
      Your library is empty!
    </b-card>
    <b-card class="border-0"
            v-if="flags.loading">
      <b-spinner variant="primary"></b-spinner>
    </b-card>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        flags: {
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
      addNewBook() {
        const body = {};
        this.$store.dispatch('book/add', body);
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
