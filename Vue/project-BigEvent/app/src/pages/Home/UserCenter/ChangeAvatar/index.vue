<template>
    <div class="box">
        <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="httpRequest"
        >
            <img
                v-if="imageUrl"
                :src="imageUrl"
                class="avatar"
            >
            <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
            ></i>
        </el-upload>
    </div>
</template>

<script>
export default {
    name: "changeAvatar",
    data() {
        return {
            imageUrl: "",
        };
    },
    methods: {
        httpRequest(options) {
            console.log(this);
            let file = options.file;
            let filename = options.filename;

            const reader = new FileReader();
            // 判断文章是否读取到
            if (file) {
                reader.readAsDataURL(file);
            }

            // 文件加载成功
            reader.onload = () => {
                // 获取 base64 字符串
                const base64Str = reader.result;

                this.$store
                    .dispatch("userOption/updateUserAvatar", base64Str)
                    .then(() => {
                        console.log(111)
                        // 更新数据
                        this.$store.dispatch("userOption/getUserInfoById");
                    });
            };
        },
    },
};
</script>

<style scoped>
    .box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-color: #eee;
    }

    .box .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>