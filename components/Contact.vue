<template>
  <div id="contact" class="py-8 bg-gray-100 md:py-32">
    <div
      class="container flex flex-col-reverse items-center justify-center p-8 mx-auto text-lg text-gray-700 md:flex-row"
    >
      <div class="w-full mt-8 md:w-1/2 md:mt-0">
        <form class="flex flex-col" target="_self" @submit.prevent="contact">
          <label style="position:absolute; left:-9999px; top:auto; width:1px; height:1px; overflow:hidden;" for="website">Website</label>
          <input id="website" name="website" v-model="antispamInput" autocomplete="off" tabindex="-1" />
          <input type="hidden" name="field1" :value="antispamToken" />

          <label for="email">E-mail</label>
          <input
            id="email"
            v-model="email"
            class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
            type="email"
            name="email"
            placeholder="your@email.com"
          />
          <label class="mt-4" for="message">Message</label>
          <textarea
            id="message"
            v-model="message"
            class="block w-full h-48 px-4 py-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
            name="message"
            placeholder="Your message goes here..."
          ></textarea>
          <div
            class="flex flex-col items-center justify-between mt-4 md:flex-row"
          >
            <button
              v-if="!submitted"
              class="w-48 px-8 py-2 mr-2 text-gray-100 bg-primary-gray"
              :disabled="submitting"
              @click="contact"
            >
              Submit
            </button>
            <p v-if="submitted" class="w-full text-sm text-green-600">
              Thank you for your message :)
            </p>
            <p
              v-if="error.length !== 0"
              class="mt-4 text-sm text-red-500 md:w-1/2 md:mt-0"
            >
              {{ error }}
            </p>
          </div>
        </form>
      </div>
      <div class="md:w-1/2 md:pl-24">
        <p class="text-4xl">Contact</p>
        <p class="text-gray-500">Let's get in touch</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',

      submitting: false,
      submitted: false,
      error: '',

      antispamInput: '',
      antispamToken: '',
      antispamInitializedAt: null
    }
  },

  mounted() {
    this.antispamToken = Math.random().toString(36).slice(2)
    this.antispamInitializedAt = Date.now()
  },

  methods: {
    contact() {
      if (this.email.length < 3 || this.message.length < 3) {
        this.error = 'Both the e-mail and message fields must be filled in'

        return false
      }

      if (this.antispamInput && this.antispamInput.trim().length > 0) {
        return this.submitted = true
      }

      if (! this.antispamToken) {
        return this.submitted = true
      }

      if (Date.now() - Number(this.antispamInitializedAt || 0) < 5000) {
        return this.submitted = true
      }

      this.submitting = true

      this.$axios
        .$post('https://submit-form.com/P2S73gqlcN51WwihFSIR_', {
          email: this.email,
          message: this.message,
        })
        .then(() => {
          this.submitted = true
          this.error = ''
        })
        .catch(response => {
          this.submitted = false
          this.error = response.error
        })
        .finally(() => {
          this.submitting = false
        })
    },
  },
}
</script>
