<template>
    <div class="menu_manage" style="display: flex;">
        <div style="min-width:200px;">
            <UnitSelect @getOrgId="getOrgId"/>
        </div>
        <div style="width:85%;padding-left:20px;">
            <rtmonitortop :orgId="orgId" v-if="orgId"></rtmonitortop>
            <rtmonitorlist :orgId="orgId"></rtmonitorlist>
        </div>
    </div>
</template>
<script src="./rtmonitor.js"></script>