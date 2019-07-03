<template>
  <div class="my-4">
    <b-card class="mb-5">
      <b-row class="justify-content-between">
        <b-col class="py-1">
          Let's try to add some new books!
        </b-col>
        <b-col cols="auto">
          <b-button variant="success"
                    @click="flags.showAddNewBookPanel = !flags.showAddNewBookPanel">
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
      <h2>
        Add NEW BOOK
      </h2>
      <add-new-book-component v-on:bookAdded="getAllBooks()"></add-new-book-component>
    </b-collapse>
    <hr>
    <b-row class="justify-content-center mt-3">
      <b-col lg="6" md="9">
        <b-form @submit.prevent="search()">
          <b-input-group>
            <b-button slot="append"
                      type="submit">
              <i class="fas fa-search"></i>
            </b-button>
            <b-button slot="append"
                      @click="model.searchText = ''; search()"
                      v-if="model.searchText !== ''">
              <i class="fas fa-times"></i>
            </b-button>
            <b-form-input type="text"
                          :autofocus="true"
                          @keyup="search()"
                          v-model="model.searchText"
                          placeholder="search everything">
            </b-form-input>
          </b-input-group>
        </b-form>
      </b-col>
    </b-row>
    <b-card class="border-0 my-3 card-in"
            v-if="flags.loading">
      <b-spinner></b-spinner>
    </b-card>
    <b-card class="card-in my-2"
            v-else-if="data.books && data.books.length === 0">
      <div v-if="model.searchText !== ''">
        <h2>
          There is Nothing!
        </h2>
        You can search another text to find you result
      </div>
      <div v-else>
        <h2>
          Your library is empty!
        </h2>
        Add new book in your library
        <div class="clearfix"></div>
        <b-button class="mt-3"
                  @click="flags.showAddNewBookPanel = !flags.showAddNewBookPanel">
          Add new one
        </b-button>
      </div>
    </b-card>
    <template v-else>
      <b-card class="border-0 my-2 card-in overflow-hidden"
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
          <b-row class="justify-content-between">
            <b-col cols="auto">
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
            </b-col>
            <b-col cols="auto">
              <b-button-group>
                <b-button @click="showDetailModal(book)">
                  <i class="fas fa-info"></i>
                </b-button>
                <b-button @click="showEditModal(book)">
                  <i class="far fa-edit"></i>
                </b-button>
                <b-button @click="showDeleteModal(book)">
                  <i class="far fa-trash-alt"></i>
                </b-button>
              </b-button-group>
            </b-col>
          </b-row>
        </b-media>
      </b-card>
      <div class="my-5 text-center">
        <b-button-group>
          <b-button @click="previousPage()"
                    :disabled="params.currentPage === 1">
            Previous
          </b-button>
          <b-button @click="nextPage()"
                    :disabled="params.currentPage === params.totalPage">
            Next
          </b-button>
        </b-button-group>
      </div>
    </template>

    <b-modal title="Find your information"
             ref="bookDetail"
             @hide="resetModal()">
      {{data.modal}}
    </b-modal>
    <b-modal ref="bookEdit"
             hide-footer
             @hide="resetModal()">
      <template slot="modal-title">
        Edit your book
        <span v-if="data.modal">
          {{data.modal.title}}
        </span>
      </template>
      <add-new-book-component @updateBook="updateBook"
                              :fillData="data.modal"
                              v-if="data.modal">
      </add-new-book-component>
    </b-modal>
    <b-modal title="Confirmation"
             ref="bookDelete"
             @ok="deleteBook()"
             @hide="resetModal()">
      Are sure to delete this book?
    </b-modal>
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
          books: [],
          modal: null
        },
        model: {
          searchText: ''
        },
        params: {
          currentPage: 1,
          totalPage: 1
        }
      };
    },
    created() {
      this.flags.loading = true;

      const { page: routePage = 1, searchText: routeSearchText = '' } = this.$route.query;
      this.params.currentPage = routePage;
      this.model.searchText = routeSearchText;

      this.getAllBooks();
    },
    methods: {
      async getAllBooks(inputPage) {
        let filters = '';
        if (!inputPage) {
          inputPage = this.params.currentPage;
        }
        filters += `page=${inputPage}`;

        if (this.model.searchText !== '') {
          filters += `&search=${this.model.searchText}`;
        }

        const response = await this.$store.dispatch('book/get', filters);
        const { data, meta } = response.data;

        this.flags.loading = false;
        this.data.books = data;
        this.params.currentPage = meta.current_page;
        this.params.totalPage = meta.last_page;

        window.scrollTo(0, 0);
      },

      changeRoute() {
        const query = {
          page: this.params.currentPage
        };
        if (this.model.searchText !== '') {
          query.searchText = this.model.searchText;
        }
        this.$router.push({
          name: 'books',
          query: query
        });
      },

      nextPage() {
        if (this.params.currentPage < this.params.totalPage) {
          this.params.currentPage++;
          this.changeRoute();
        }
      },
      previousPage() {
        if (this.params.currentPage !== 1) {
          this.params.currentPage--;
          this.changeRoute();
        }
      },

      search() {
        this.changeRoute();
      },

      async getBookInfo(book) {
        const response = await this.$store.dispatch('book/bookInfo', book.id);
        this.data.modal = response.data.data;
      },
      async updateBook(event) {
        try {
          const body = {
            id: this.data.modal.id,
            body: event
          };
          await this.$store.dispatch('book/update', body);
          this.getAllBooks(1);
          this.$refs['bookEdit'].hide();

          this.$notify({
            group: 'axios',
            type: 'success',
            text: 'Your book is updated!'
          });
        } catch (e) {
          this.$notify({
            group: 'axios',
            type: 'danger',
            text: 'There is some problems here! please try again...'
          });
        }
      },
      async deleteBook() {
        try {
          await this.$store.dispatch('book/delete', this.data.modal.id);
          this.getAllBooks(1);

          this.$notify({
            group: 'axios',
            type: 'success',
            text: 'Your book is deleted!'
          });
        } catch (e) {
          this.$notify({
            group: 'axios',
            type: 'danger',
            text: 'There is some problems here! please try again...'
          });
        }
      },

      resetModal() {
        this.data.modal = null;
      },

      showDetailModal(book) {
        this.$refs['bookDetail'].show();
        this.getBookInfo(book);
      },
      showEditModal(book) {
        this.$refs['bookEdit'].show();
        this.getBookInfo(book);
      },
      showDeleteModal(book) {
        this.$refs['bookDelete'].show();
        this.data.modal = book;
      }
    }
  };
</script>
