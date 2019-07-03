<template>
  <div>
    <b-card class="border-0 my-4">
      <b-form @submit.prevent="updateInfo()">
        <b-form-group>
          <b-form-input required
                        type="text"
                        v-model="model.name"
                        placeholder="Enter your name">
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input required
                        type="email"
                        v-model="model.email"
                        @keyup="flags.confirmationPassword = true"
                        placeholder="Enter your email">
          </b-form-input>
        </b-form-group>
        <b-form-group v-if="flags.changePassword || flags.confirmationPassword">
          <b-form-input required
                        type="password"
                        v-model="model.password"
                        placeholder="Enter your current password">
          </b-form-input>
        </b-form-group>
        <template v-if="flags.changePassword">
          <b-form-group>
            <b-form-input required
                          type="password"
                          v-model="model.current_password"
                          placeholder="Enter your new password">
            </b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input required
                          type="password"
                          v-model="model.password_confirmation"
                          placeholder="Enter your new password again">
            </b-form-input>
          </b-form-group>
        </template>
        <hr>
        <b-row class="justify-content-between">
          <b-col sm="auto">
            <b-button variant="success"
                      type="submit"
                      class="px-4"
                      :disabled="flags.loading">
              Update info
            </b-button>
            <b-button class="ml-2 px-3"
                      @click="flags.changePassword = !flags.changePassword"
                      v-if="!flags.changePassword">
              Change password
            </b-button>
          </b-col>
          <b-col sm="auto">
            <b-button class="mt-sm-0 mt-5"
                      variant="danger"
                      block
                      v-b-modal.deleteModal
                      :disabled="flags.loading">
              Delete Me!
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-modal title="Confirmation"
             id="deleteModal"
             ok-variant="danger"
             @ok="deleteUser()">
      Are sure you want to delete your account?
    </b-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flags: {
          changePassword: false,
          confirmationPassword: false
        },
        model: {
          name: '',
          email: '',
          password: '',
          current_password: '',
          password_confirmation: ''
        }
      };
    },
    created() {
      this.fillModel();

      /**
       * ready for updating
       */
      this.$store.watch((state, getters) => getters['user/get'], () => {
          this.fillModel();
        }
      );
    },
    methods: {
      async updateInfo() {
        const { email } = this.$store.getters['user/get'];
        let body = {
          name: this.model.name,
          email: this.model.email
        };
        if (this.flags.changePassword) {
          body = this.model;
        } else if (this.model.email === email) {
          body = {
            name: this.model.name,
            email: this.model.email
          };
        } else if (this.model.password === '') {
          this.flags.confirmationPassword = true;

          this.$notify({
            type: 'danger',
            text: 'Please enter your password!'
          });
          return;
        }

        this.flags.loading = true;
        await this.$store.dispatch('user/update', body);
        await this.$store.dispatch('user/get');
        this.flags.loading = false;

        this.fillModel();
        this.$notify({
          type: 'success',
          text: 'Your info is updated!'
        });
      },
      async deleteUser() {
        await this.$store.dispatch('user/delete');
        this.commit('auth/logout');
      },

      fillModel() {
        const { name, email, password, current_password: currentPassword, password_confirmation: passwordConfirmation } = this.$store.getters['user/get'];
        this.model = {
          name: name,
          email: email,
          password: password,
          current_password: currentPassword,
          password_confirmation: passwordConfirmation
        };

        this.flags.changePassword = false;
        this.flags.confirmationPassword = false;
      }
    }
  };
</script>

<style scoped>

</style>
