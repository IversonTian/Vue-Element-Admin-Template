<template>
    <div>
        <svg-icon v-if="this.$i18n.locale === 'en'" :icon-class="'langEN'" @click="languageChange" />
        <svg-icon v-else :icon-class="'langCN'" @click="languageChange" />
    </div>
</template>

<script>
    import store from '@/store'

    // 国际化
    export default {
        name: "Language",
        data() {
            return {};
        },
        mounted() {},
        beforeDestroy() {},
        methods: {
            // 国际化切换
            languageChange() {
                let lang = 'zh';
                if (localStorage.getItem('lang') === 'zh') {
                    lang = 'en';
                }
                localStorage.setItem('lang', lang);
                this.$i18n.locale = lang;
                store.dispatch('app/setAppLang', lang);
            }
        },
    };
</script>