<template>
  <div id="contact" class="py-8 mt-12 bg-gray-100 md:mt-48 md:py-32">
    <div
      class="container flex flex-col-reverse items-center justify-center p-8 mx-auto text-lg text-gray-700 md:flex-row"
    >
      <div class="w-full mt-8 md:w-1/2 md:mt-0">
        <form class="flex flex-col" target="_self" @submit.prevent="contact">
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
        .$post('https://submit-form.com/P2S73gqlcN51WwihFSIR_', {
          email: this.email,
          message: this.message,
        })
        .then(function (response) {
          this.submitted = true
          this.error = ''
        })
        .catch(function (response) {
          this.submitted = false
          this.error = response.error
        })

      this.submitted = true
    },
  },
}
</script>
