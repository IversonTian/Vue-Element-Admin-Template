import Vue from 'vue';
import VueI18n from 'vue-i18n';
import zh_CN from './zh-CN';
import en_US from './en-US';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'zh',
    messages: {
        'zh': {
            ...zh_CN,
            name: '中',
            text: '中文'
        },
        'en': {
            ...en_US,
            name: 'En',
            text: '英文'
        },
    },
    silentTranslationWarn: true,
});

export default i18n;