<template>
  <div id="contact" class="mt-48 py-32 bg-gray-100">
    <div
      class="container mx-auto flex justify-center items-center p-8 text-lg text-gray-700"
    >
      <div class="w-1/2">
        <form class="flex flex-col" target="_self" @submit.prevent="contact">
          <label for="email">E-mail</label>
          <input
            id="email"
            v-model="email"
            class="appearance-none block w-full bg-gray-200 text-gray-700
          border rounded py-3 px-4 leading-tight
          focus:outline-none focus:bg-white"
            type="email"
            name="email"
            placeholder="your@email.com"
          />
          <label class="mt-4" for="message">Message</label>
          <textarea
            id="message"
            v-model="message"
            class="appearance-none block w-full h-48 bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            name="message"
            placeholder="Your message goes here..."
          ></textarea>
          <div class="flex items-center justify-between mt-4">
            <button
              v-if="!submitted"
              class="w-48 px-8 mr-2 py-2 bg-primary-gray text-gray-100"
              :disabled="submitting"
              @click="contact"
            >
              Submit
            </button>
            <p v-if="submitted" class="w-full text-sm text-green-600">
              Thank you for your message :)
            </p>
            <p v-if="error.length !== 0" class="w-1/2 text-sm text-red-500">
              {{ error }}
            </p>
          </div>
        </form>
      </div>
      <div class="w-1/2 pl-24">
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
      error: ''
    }
  },

  methods: {
    contact() {
      if (this.email.length < 3 || this.message.length < 3) {
        this.error = 'Both the e-mail and message fields must be filled in'

        return false
      }

      this.submitting = true

      this.$axios
        .$post('https://submit-form.com/P2S73gqlcN51WwihFSIR', {
          email: this.email,
          message: this.message
        })
        .then(function(response) {
          this.submitted = true
        })
        .catch(function(response) {
          this.submitted = false
          this.error = response.error
        })

      this.submitted = true
    }
  }
}
</script>
