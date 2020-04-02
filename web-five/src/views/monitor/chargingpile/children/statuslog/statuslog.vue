<template>
    <div class="device_dialog">
        <basic-container>
            <avue-crud :data="data" :option="option" v-model="obj">
                    <template slot="empty">
                            <avue-empty
                            :image="timeout?'/img/bg/404.svg':'/img/empty.png'"
                            :desc="timeout?'请求超时,请稍后重试······':'暂无数据'"
                            >
                          </avue-empty>
                          </template>
            </avue-crud>
        </basic-container>
    </div>
</template>
<script>
import statuslog from './statuslog.js'
export default statuslog
</script>
<style lang="scss">
@import './statuslog.scss'
</style>

