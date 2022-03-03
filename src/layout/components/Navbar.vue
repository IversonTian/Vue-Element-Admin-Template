<template>
    <div class="navbar">
        <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

        <!-- 面包屑 -->
        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

        <div class="right-menu">
            <template v-if="device !== 'mobile'">
                <!-- 页面搜索 -->
                <search id="header-search" class="right-menu-item" />
                <!-- 国际化 -->
                <language id="language" class="right-menu-item hover-effect" />
                <!-- 页面全屏 -->
                <screenfull id="screenfull" class="right-menu-item hover-effect" />
            </template>

            <el-dropdown @command="handleCommand" class="avatar-container right-menu-item hover-effect">
                <div class="avatar-wrapper">
                    <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="USER-INFO" icon="el-icon-user">个人中心</el-dropdown-item>
                    <el-dropdown-item command="DASHBOARD" icon="el-icon-odometer">仪表盘</el-dropdown-item>
                    <el-dropdown-item command="LOG-OUT" icon="el-icon-switch-button">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from "vuex";
    import Breadcrumb from "@/components/Breadcrumb";
    import Hamburger from "@/components/Hamburger";
    import Language from "@/components/Language";
    import Screenfull from "@/components/Screenfull";
    import Search from "@/components/HeaderSearch";

    export default {
        components: {
            Breadcrumb,
            Hamburger,
            Language,
            Screenfull,
            Search,
        },
        computed: {
            ...mapGetters(["sidebar", "avatar", "device"]),
        },
        methods: {
            // 菜单栏展开、收缩
            toggleSideBar() {
                this.$store.dispatch("app/toggleSideBar")
            },
            // 点击 el-dropdown-item
            async handleCommand(command) {
                switch (command) {
                    case 'USER-INFO':
                        // 跳转页面
                        this.$router.push('/profile/index');
                        break;
                    case 'DASHBOARD':
                        // 跳转页面
                        this.$router.push('/');
                        break;
                    case 'LOG-OUT':
                        // 跳转页面
                        await this.$store.dispatch("login/logout")
                        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
                        break;
                    default:
                        break;
                }
            }
        },
    };
</script>

<style lang="scss" scoped>
    .navbar {
        height: 50px;
        overflow: hidden;
        position: relative;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

        .hamburger-container {
            line-height: 46px;
            height: 100%;
            float: left;
            cursor: pointer;
            transition: background 0.3s;
            -webkit-tap-highlight-color: transparent;

            &:hover {
                background: rgba(0, 0, 0, 0.025);
            }
        }

        .breadcrumb-container {
            float: left;
        }

        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }

        .right-menu {
            float: right;
            height: 100%;
            line-height: 50px;

            &:focus {
                outline: none;
            }

            .right-menu-item {
                display: inline-block;
                padding: 0 8px;
                height: 100%;
                font-size: 18px;
                color: #5a5e66;
                vertical-align: text-bottom;

                &.hover-effect {
                    cursor: pointer;
                    transition: background 0.3s;

                    &:hover {
                        background: rgba(0, 0, 0, 0.025);
                    }
                }
            }

            .avatar-container {
                margin-right: 30px;

                .avatar-wrapper {
                    margin-top: 5px;
                    position: relative;

                    .user-avatar {
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                    }

                }
            }
        }
    }
</style>