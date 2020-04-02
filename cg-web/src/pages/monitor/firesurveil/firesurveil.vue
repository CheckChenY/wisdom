<template>
    <div class="monitor_body">
        <a-row :gutter="24">
            <a-col :span="4">
                <buildingtree @selectedKeys="select"></buildingtree>
            </a-col>
            <a-col :span="20">
                <div style="height:800px;overflow-y:scroll;">
                    <a-row :gutter="24">
                        <a-col :span="6" v-for="(item, i) in dataSource" :key="i">
                            <a-card :title="item.deviceName" hoverable style="width: 300px;">
                                <img
                                    alt="example"
                                    :src="item.surroundingPhoto"
                                    style="height:200px"
                                    slot="cover"
                                    />
                                <p>{{item.buildingName}}，{{item.floorName}}，{{item.location}}</p>
                                <template class="ant-card-actions" slot="actions">
                                    <a-radio-group @change="onChange(value,item)" v-model="value">
                                        <a-radio-button :value="item.btna">信息</a-radio-button>
                                        <a-radio-button :value="item.btnb">视频</a-radio-button>
                                        <a-radio-button :value="item.btnc">回放</a-radio-button>
                                    </a-radio-group>
                                </template>
                            </a-card>
                        </a-col>
                    </a-row>
                </div>
            </a-col>
        </a-row>
        <firesurveilDialog ref="firesurveilDialog"></firesurveilDialog>
        <firesurveilLive ref="firesurveilLive"></firesurveilLive>
        <firesurveilReplay ref="firesurveilReplay"></firesurveilReplay>
    </div>
</template>
<script src="./firesurveil.js"></script>
<style lang="scss">
</style>

    