<script setup lang="ts">
  import Card from '@/components/layout/Card.vue'
  import CardTitle from '@/components/layout/CardTitle.vue'
  import NavBar from '@/components/premade/navbar/NavBar.vue'
  import ContentView from '@/components/navigation/ContentView.vue'
  import NavigationTitle from '@/components/navigation/NavigationTitle.vue'
  import {Icon} from '@iconify/vue'
  import Grid from '@/components/layout/Grid.vue'
  import ClockCard from '@/components/premade/ClockCard.vue'
</script>

<template>
  <ContentView id="homeView">
    <NavigationTitle title="Tickity">
      <button>
        <Icon icon="solar:pen-new-square-line-duotone" />
      </button>
    </NavigationTitle>

    <Card>
      <CardTitle
        title="Welcome to Tickity!"
        icon="solar:hearts-line-duotone"
      />
      <p>Add clocks with the button above.</p>
    </Card>

    <Card>
      <CardTitle
        title="Americas"
        icon="solar:cloud-line-duotone"
      />

      <Grid>
        <ClockCard
          city="San Francisco"
          :gmt="-8"
        />
      </Grid>
    </Card>

    <Card>
      <CardTitle
        title="Europe"
        icon="solar:wineglass-line-duotone"
      />
      
      <Grid>
        <ClockCard
          city="Paris"
          :gmt="+1"
        />
      </Grid>
    </Card>

    <Card>
      <CardTitle
        title="Asia"
        icon="solar:cpu-line-duotone"
      />

      <Grid>
        <ClockCard
          city="Beijing"
          :gmt="+7"
        />
      </Grid>
    </Card>

    <Card>
      <CardTitle
        title="Africa"
        icon="solar:sun-fog-line-duotone"
      />

      <Grid>
        <ClockCard
          city="South Africa"
          :gmt="+1"
        />
      </Grid>
    </Card>

    <Card>
      <CardTitle
        title="Australia"
        icon="solar:water-line-duotone"
      />

      <Grid>
        <ClockCard
          city="Melbourne"
          :gmt="+9"
        />
      </Grid>
    </Card>
    
    <Card>
      <CardTitle 
        title="Antarctica" 
        icon="solar:snowflake-line-duotone"
      />
      
      <Grid>
        <ClockCard
          city="Mawson Station"
          :gmt="+4"
        />
      </Grid>
    </Card>

    <NavBar />
  </ContentView>
</template>

<style scoped>

</style>