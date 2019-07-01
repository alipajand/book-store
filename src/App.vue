<template>
  <div id="app">
    <router-view v-bind:key="$route.fullPath"/>
    <notifications group="axios"
                   position="center bottom"
                   v-bind:speed="1000"
                   v-bind:duration="7000">
      <template slot="body"
                slot-scope="props">
        <div class="vue-notification shadow"
             v-bind:class="props.item.type">
          <b-row class="justify-content-between">
            <b-col cols="1"
                   class="pointer">
              <a class="close pt-1"
                 @click="props.close">
                <i class="fas fa-times"></i>
              </a>
            </b-col>
            <b-col cols="11">
              <h2 class="notification-title m-0"
                  v-if="props.item.title">
                {{props.item.title}}
              </h2>
              <p v-html="props.item.text"
                 v-if="props.item.text"
                 class="pt-1 m-0 text-justify">
              </p>
            </b-col>
          </b-row>
        </div>
      </template>
    </notifications>
  </div>
</template>

<script type="text/javascript">
  export default {};
</script>
