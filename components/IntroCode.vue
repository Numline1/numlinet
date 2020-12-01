<template>
  <div
    class="container flex flex-col pb-8 mx-auto mt-32 text-lg text-gray-400 bg-primary-gray font-code rounded-md"
  >
    <div class="flex p-4">
      <div class="w-4 h-4 bg-red-500 rounded-full"></div>
      <div class="w-4 h-4 ml-2 bg-yellow-500 rounded-full"></div>
      <div class="w-4 h-4 ml-2 bg-green-500 rounded-full"></div>
    </div>

    <div class="p-4 pl-8">
      <p>
        <span class="text-pink-700">package</span>
        <span class="text-blue-300">engineer</span>
      </p>

      <p class="mt-8"><span class="text-pink-700">import</span> (</p>
      <span class="text-orange-400">
        <p class="pl-8">"github.com/martin/backend"</p>
        <p class="pl-8">"github.com/martin/frontend"</p>
        <p class="pl-8">"github.com/martin/devops"</p>
        <p class="pl-8">"github.com/world/human"</p>
        <p class="pl-8">"time"</p>
      </span>
      <p>)</p>

      <p class="mt-8">
        <span class="text-pink-700">func</span>
        <span class="text-blue-300">aboutMe</span>() {
      </p>
      <p class="pl-8">
        <span class="text-pink-700">return</span> &amp;<span
          class="text-blue-300"
          >human.Info</span
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
      <p class="pl-16">cleanCode: <span class="text-orange-400">true</span>,</p>
      <p class="pl-16">
        testedCode: <span class="text-orange-400">true</span>,
      </p>
      <p class="pl-16">techStack: <span class="text-orange-400">{</span></p>
      <p class="pl-24"><span class="text-orange-400">backend.Go</span>,</p>
      <p class="pl-24"><span class="text-orange-400">backend.gRPC</span>,</p>
      <p class="pl-24"><span class="text-orange-400">backend.GORM</span>,</p>
      <p class="pl-24"><span class="text-orange-400">backend.Gin</span>,</p>
      <p class="pl-24"><span class="text-orange-400">backend.NodeJS</span>,</p>
      <p class="pl-24"><span class="text-orange-400">backend.Laravel</span>,</p>
      <p class="pl-24"><span class="text-orange-400">backend.MariaDB</span>,</p>
      <p class="pl-24">
        <span class="text-orange-400">backend.PostgreSQL</span>,
      </p>
      <p class="pl-24"><span class="text-orange-400">backend.MongoDB</span>,</p>
      <p class="pl-24"><span class="text-orange-400">frontend.NuxtJS</span>,</p>
      <p class="pl-24">
        <span class="text-orange-400">devops.Kubernetes</span>,
      </p>
      <p class="pl-24"><span class="text-orange-400">devops.GCP</span>,</p>
      <p class="pl-24"><span class="text-orange-400">devops.AWS</span>,</p>
      <p class="pl-24"><span class="text-orange-400">devops.CI/CD</span>,</p>
      <p class="pl-24"><span class="text-orange-400">devops.Git</span>,</p>

      <p class="pl-16">}</p>
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
    },
  },
}
</script>
