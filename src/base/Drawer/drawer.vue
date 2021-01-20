<!--
  User: gaol
  Date: 2020/5/14
  功能： 抽屉组件
-->
<template>
    <div class="drawerBox">
        <el-drawer
            :title="tit"
            :before-close="handleClose"
            :visible.sync="dialogShow"
            :direction="direction"
            :wrapperClosable="wrapperClosable"
            :size="width"
            :modal="modal"
            :append-to-body="appendToBody"
            :modal-append-to-body="modalAppendToBody"
            custom-class="atris-drawer"
            ref="atrisDrawer"
        >
            <div class="drawerBox-content-wrap">
                <slot name="container-slot">
                </slot>
            </div>
            <div
                v-if="showFooterBox" 
                class="drawer_footer u-f-ajc">
                <el-button 
                    :size="saveBtnSize"
                    @click="cancelForm"
                >
                    取 消
                </el-button>
                <el-button 
                    v-if="showSaveBtn"
                    type="primary" 
                    :size="saveBtnSize"
                    @click="clickSureBtn" 
                    :loading="loading"
                >
                    {{ loading ? '提交中 ...' : '确 定' }}
                </el-button>
            </div>            
        </el-drawer>        
    </div>
</template>

<script>
    export default {
        props: {
            // 标题
            tit: {
                type: String,
                default: ''
            },
            // 方向
            direction: {
                type: String,
                default: 'rtl'
            },
            // 控制抽屉的显示/隐藏
            dialog: {
                type: Boolean,
                default: false,
            },
            showFooterBox: {
                type: Boolean,
                default: true
            },
            showSaveBtn: {
                type: Boolean,
                default: true
            },
            wrapperClosable: {
                type: Boolean,
                default: false
            },
            width: {
                type: [String, Number],
                default: '25%'
            },
            modal: {
                type: Boolean,
                default: true
            },
            appendToBody: {
                type: Boolean,
                default: false
            },
            modalAppendToBody: {
                type: Boolean,
                default: false
            },
            saveBtnSize: {
                type: String,
                default: 'small'
            }
        },
        data() {
            return {
                loading: false,
            }
        },
        computed: {
            dialogShow(){
                return this.dialog
            }
        },
        watch: {
            dialogShow:{
                handler(newValue, oldValue){
                    debugger
                    this.$emit("update:dialog", false)
                }
            }
        },
        methods: {
            handleClose(done) {
                if (this.loading) {
                    return;
                }
                this.loading = false
                this.$emit("update:dialog", false)                
                // this.$confirm('确定要提交表单吗？').then(_ => {
                //     this.loading = true
                //     this.timer = setTimeout(() => {
                //         done()
                //         // 动画关闭需要一定的时间
                //         setTimeout(() => {
                //             this.loading = false
                //         }, 400)
                //     }, 2000)
                //     }).catch(_ => {})
                },
                clickSureBtn(){
                    debugger
                    // 验证必填项
                    this.$emit('emitClickSureBtn')
                    // this.$refs.atrisDrawer.closeDrawer()                    
                },
                cancelForm() {
                    this.loading = false
                    this.$emit("update:dialog", false)
                    // clearTimeout(this.timer)
                }
            }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.atris-drawer
    overflow auto
    .el-drawer__body
        .drawerBox-content-wrap
            min-height calc(100vh - 150px)
            padding 20px !important
</style>