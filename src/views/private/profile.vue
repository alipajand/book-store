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
                        placeholder="Enter your email">
          </b-form-input>
        </b-form-group>
        <template v-if="flags.changePassword">
          <b-form-group>
            <b-form-input required
                          type="password"
                          v-model="model.password"
                          placeholder="Enter your current password">
            </b-form-input>
          </b-form-group>
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
            class="px-4">
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
                      v-b-modal.deleteModal>
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
          changePassword: false
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
    },
    methods: {
      async updateInfo() {
        const body = this.model;
        await this.$store.dispatch('user/update', body);
        await this.$store.dispatch('user/get');
        this.fillModel();
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
      },
      resetData() {
        this.model = {
          name: '',
          email: '',
          password: '',
          current_password: '',
          password_confirmation: ''
        };
      }
    }
  };
</script>

<style scoped>

</style>
