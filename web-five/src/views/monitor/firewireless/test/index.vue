<template>
    <el-row>
        <el-col :span="6">
            <div class="grid-content bg-purple">
                <div class="weather_day">
                    <iframe scrolling="no" height="60" frameborder="0" allowtransparency="true" src="//i.tianqi.com/index.php?c=code&id=12&color=%23FFFFFF&icon=1&num=1&site=12"></iframe>
                </div>
            </div>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light">2</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">34</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light">5</div></el-col>
    </el-row>
</template>

<script>
import index from "./index.js";
export default index
</script>
<style lang="scss">
    .weather_day{
        background-color: #ccc;
    }
</style>

