<template>
  <q-page padding class="full-height">
    <q-space class="q-my-xl"/>
    <div class="row justify-center">
      <div class="col-8">
        <div class="q-py-xl">
          <div class="row">
            <div class="col-6 flex items-center q-gutter-md">
              <div class="text-h5">
                토익 (432)
                <div class="text-subtitle2 q-mt-md">
                  오늘 공부할 카드 (42)
                </div>
              </div>
            </div>
            <div class="col-6 flex justify-end items-center q-gutter-md">
              <q-btn label="종료" color="grey" to="/"/>
            </div>
          </div>
          <div class="row q-gutter-md justify-center items-center">
<!--            <q-card-->
<!--              class="col-md-3 q-pa-lg q-my-xl"-->
<!--              style="width: 40vw; height: 200px;"-->
<!--            >-->
<!--              <q-card-section>-->
<!--                <div class="text-caption">-->
<!--                  앞면-->
<!--                </div>-->
<!--              </q-card-section>-->
<!--              <q-card-section>-->
<!--                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur, excepturi expedita in libero minus modi obcaecati officiis possimus recusandae rerum sint totam ullam vero voluptate! Distinctio illo nam qui?-->
<!--              </q-card-section>-->
<!--            </q-card>-->
<!--            <div class="full-width flex justify-center q-gutter-x-xl">-->
<!--              <q-btn label="몰라요(q)" color="grey" size="large"/>-->
<!--              <q-btn label="힌트(w)" color="green" size="large"/>-->
<!--              <q-btn label="알아요(e)" color="primary" size="large"/>-->
<!--            </div>-->

            <q-card
              class="col-md-3 q-pa-lg q-my-xl"
              style="width: 40vw;"
            >
              <q-card-section class="flex justify-between">
                <span class="text-caption">1</span>
                <q-btn-dropdown flat dropdown-icon="more_vert">
                  <q-list>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>수정하기</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>삭제하기</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>

              </q-card-section>
              <q-card-section class="flex justify-center" style="min-height: 100px;">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eum excepturi hic id ipsam laboriosam maxime modi molestiae nam numquam, perferendis, placeat possimus quo ratione reprehenderit, tenetur veritatis voluptate voluptatem.
              </q-card-section>
              <q-separator class="q-my-md"/>
              <q-card-section>
                <div class="text-subtitle2">
                  레퍼런스
                </div>
                <div class="text-caption">
                  영단기 토익 VOCA
                </div>
              </q-card-section>
            </q-card>
            <div class="full-width flex justify-center q-gutter-x-xl">
              <q-btn label="몰라요(q)" color="grey" size="md" padding="md"/>
              <q-btn label="힌트(w)" color="green" size="md" padding="md"/>
              <q-btn label="알아요(e)" color="primary" size="md" padding="md"/>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2 q-gutter-y-md">
        <q-list bordered>
          <q-item-label header>바구니에 담긴 카드</q-item-label>
          <template v-for="item in 7" :key="item">
            <q-item>
              <q-item-section>{{item}}번째 단어</q-item-section>
            </q-item>
            <q-separator/>
          </template>
        </q-list>
        <q-list bordered>
          <q-item-label header>맞춘 카드</q-item-label>
          <template v-for="item in 7" :key="item">
            <q-item>
              <q-item-section>{{item}}번째 단어</q-item-section>
            </q-item>
            <q-separator/>
          </template>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">

</script>

<style lang="scss">

.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.absolute-bottom {
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
}

</style>

<route lang="yaml">
meta:
  title: Home
  layout: default
</route>
