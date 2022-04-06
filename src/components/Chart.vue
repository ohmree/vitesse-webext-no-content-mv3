<template>
  <div
    class="flex flex-column justify-content-center align-items-center w-full h-full"
  >
    <h3 class="h-min todo-title">{{ todoTitle }}</h3>
    <v-chart
      class="mx-auto"
      autoresize
      :loading="!hasFetchedAlready"
      :option="option"
    />
    <p-button
      :loading="!hasFetchedAlready"
      label="Fetch Data!"
      icon="pi pi-refresh"
      @click="fetchData()"
    />
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import type { ComposeOption } from 'echarts/core';
import type { PieSeriesOption } from 'echarts/charts';
import type {
  AriaComponentOption,
  LegendComponentOption,
  TooltipComponentOption,
} from 'echarts/components';

type Option = ComposeOption<
  | PieSeriesOption
  | TooltipComponentOption
  | LegendComponentOption
  | AriaComponentOption
>;

let todoTitle: string = $ref('');

let consonantAmount = $ref<number>();
let vowelAmount = $ref<number>();

const option = $computed<Option>(() => ({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '5%',
    left: 'center',
  },
  aria: {
    enabled: true,
    decal: {
      show: true,
    },
  },
  series: {
    name: 'Vowels and Consonants',
    type: 'pie',
    radius: ['50%', '80%'],
    avoidLabelOverlap: false,
    itemStyle: {
      borderRadius: 10,
      borderColor: '#fff',
      borderWidth: 2,
    },
    label: {
      show: false,
      position: 'center',
    },
    emphasis: {
      label: {
        show: true,
        fontSize: '40',
        fontWeight: 'bold',
      },
    },
    labelLine: {
      show: false,
    },
    data: [
      { value: vowelAmount, name: 'Vowels' },
      { value: consonantAmount, name: 'Consonants' },
    ],
  },
}));

let todoNumber = $ref(1);
let baseUrl = $ref(`https://jsonplaceholder.typicode.com/todos/${todoNumber}`);
let hasFetchedAlready = $ref(false);

const {
  data,
  error,
  execute: fetchData,
} = $(
  useFetch<string>($$(baseUrl), {
    beforeFetch() {
      if (todoNumber >= 20) {
        todoNumber = 0;
      }

      todoNumber++;
    },
    afterFetch(args) {
      if (!hasFetchedAlready) {
        hasFetchedAlready = true;
      }

      return args;
    },
  }).json(),
);

watchEffect(
  () => (baseUrl = `https://jsonplaceholder.typicode.com/todos/${todoNumber}`),
);

/** Split an array into two parts:
 * elements for which `predicate` returns `true`,
 * and elements for which it returns `false`.
 * Taken from [this gist](https://gist.github.com/ChrisWhealy/b8c873a7753fc17ce0131c654caf60fa).
 **/
function partitionWith<T>(
  array: T[],
  predicate: (el: T) => boolean,
): [T[], T[]] {
  const partitionReducer = (acc: any[], el: T) =>
    (success =>
      success ? [acc[0], acc[1].concat(el)] : [acc[0].concat(el), acc[1]])(
      predicate(el),
    );

  // @ts-expect-error This code isn't meaningful enough for us to bother with types.
  return array.reduce(partitionReducer, [[], []]);
}
watchEffect(() => {
  if (data && !error) {
    todoTitle = data.title;
    const characters = todoTitle.split('');
    const [vowels, consonants] = partitionWith(characters, (el: string) =>
      /[aeiou]/.test(el),
    );
    consonantAmount = consonants.length;
    vowelAmount = vowels.length;
  }
});
</script>

<style scoped>
.todo-title {
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
