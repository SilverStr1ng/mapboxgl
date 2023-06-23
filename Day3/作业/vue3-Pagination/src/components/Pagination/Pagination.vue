<template>
    <div class="pagination-view">
        <el-card :body-style="{ padding: '0px' }" class="el-card" v-if="showList" v-for="item in showList" :key="item.id">
            <img :src="item.pic">
            <span>{{ item.playbackVolume }}万</span>
            <span>{{ item.singularTitle }}</span>
            <span>by {{ item.singer }}</span>
        </el-card>
    </div>
    <!-- 分页器 -->
    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
        layout="prev, pager, next, jumper" :total="songList.length" :background="true"
        class="el-pagination"></el-pagination>
</template>

<script setup>
import axios from 'axios';
const songList = ref([]);
const showList = ref([]);
onMounted(() => {
    axios.get('http://localhost:8001/songlist')
        .then(res => {
            songList.value = res.data;
        })
        .catch(err => {
            console.log(err);
        })
})
setTimeout(() => {
    showList.value = songList.value.slice(0, 30);
    console.log(showList.value)
}, 50);

const currentPage = ref(1);
const pageSize = ref(30);
const handleCurrentChange = (val) => {
    showList.value = songList.value.slice((val - 1) * pageSize.value, val * pageSize.value);
    currentPage.value = val;
}
</script>

<style lang="scss" scoped>
.pagination-view {
    display: grid;
    // 五行六列
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 20px;
    padding: 10vw;
    padding-bottom: 10px;

    .el-card {
        ::v-deep(.el-card__body) {
            display: flex;
            flex-direction: column;

            img {
                object-fit: cover;
            }

            span {
                // 单行显示
                white-space: nowrap;
                overflow: hidden;
            }
        }
    }
}

.el-pagination {
    justify-content: center;
}
</style>