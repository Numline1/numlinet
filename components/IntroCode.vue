<template>
  <div
    class="flex flex-col container mx-auto mt-32 md:mt-48 mb-16 md:mb-32 bg-nn-primary font-code text-lg text-gray-400 rounded-md"
  >
    <div class="flex p-4">
      <div class="w-4 h-4 bg-red-500 rounded-full"></div>
      <div class="w-4 h-4 ml-2 bg-yellow-500 rounded-full"></div>
      <div class="w-4 h-4 ml-2 bg-green-500 rounded-full"></div>
    </div>

    <div class="p-4">
      <p>
        <span class="text-pink-700">package</span>
        <span class="text-blue-300">engineer</span>
      </p>

      <p class="mt-8"><span class="text-pink-700">import</span> (</p>
      <span class="text-orange-400">
        <p class="pl-8">"github.com/martin/backend"</p>
        <p class="pl-8">"github.com/martin/frontend"</p>
        <p class="pl-8">"github.com/martin/devops"</p>
        <p class="pl-8">"github.com/martin/misc"</p>
        <p class="pl-8">"time"</p>
      </span>
      <p>)</p>

      <p class="mt-8">
        <span class="text-pink-700">func</span>
        <span class="text-blue-300">about</span>(<span class="text-blue-300"
          >people ...misc.Human</span
        >) *<span class="text-blue-300">misc.Info</span> {
      </p>
      <p class="pl-8">
        <span class="text-pink-700">return</span> &amp;<span
          class="text-blue-300"
          >misc.Info</span
        >{
      </p>
      <p class="pl-16">
        name: "<span class="text-orange-400">Martin Krajcovic</span>",
      </p>
      <p class="pl-16">
        location: "<span class="text-orange-400">Bratislava, Slovakia</span>",
      </p>
      <p class="pl-16">
        age: {{ ageFromBirthday('07 Aug 1992 00:00:00 GMT+1') }} *
        <span class="text-orange-400">time.Year</span>,
      </p>
      <p class="pl-16">skills: misc.Skills{</p>
      <p class="pl-24"><span class="text-orange-400">backend.Go</span>,</p>
      <p class="pl-24"><span class="text-orange-400">backend.Laravel</span>,</p>
      <p class="pl-24"><span class="text-orange-400">backend.NodeJS</span>,</p>
      <p class="pl-24"><span class="text-orange-400">backend.SQL</span>,</p>
      <p class="pl-24"><span class="text-orange-400">frontend.VueJS</span>,</p>
      <p class="pl-24">
        <span class="text-orange-400">frontend.TailwindCSS</span>,
      </p>
      <p class="pl-24"><span class="text-orange-400">devops.Docker</span>,</p>
      <p class="pl-24">
        <span class="text-orange-400">devops.Kubernetes</span>,
      </p>
      <p class="pl-24">
        <span class="text-orange-400">devops.GoogleCloud</span>,
      </p>
      <p class="pl-24"><span class="text-orange-400">devops.AWS</span>,</p>
      <p class="pl-24 text-green-700">
        // And more, but let's save some memory :)
      </p>
      <p class="pl-16">},</p>
      <p class="pl-16">cleanCode: <span class="text-orange-400">true</span>,</p>
      <p class="pl-16">
        testedCode: <span class="text-orange-400">true</span>,
      </p>
      <p class="pl-16">
        contact:
        <a
          class="text-blue-300 border-b border-dashed"
          href="mailto:me@numli.net"
          >me@numli.net</a
        >,
      </p>
      <p class="pl-8">}</p>
      <p>}</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    ageFromBirthday(birthday) {
      birthday = Date.parse(birthday)

      const ageDiffMs = Date.now() - birthday
      const ageDate = new Date(ageDiffMs)
      return Math.abs(ageDate.getUTCFullYear() - 1970)
    }
  }
}
</script>
