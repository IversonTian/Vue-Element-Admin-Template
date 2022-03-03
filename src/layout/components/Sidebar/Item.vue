<script>
import i18n from '../../../i18n/index';

export default {
    name: "MenuItem",
    functional: true,
    props: {
        icon: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
    },
    render(h, context) {
        const { icon, title } = context.props;
        const vnodes = [];

        if (icon) {
            if (icon.includes("el-icon")) {
                vnodes.push(<i class={[icon, "sub-el-icon"]} />)
            } else {
                vnodes.push(<svg-icon icon-class={icon} />)
            }
        }

        if (title) {
            // vnodes.push(<span slot="title">{title}</span>)
            // 菜单国际化
            vnodes.push(<span slot="title">{i18n.t(title)}</span>)
        }
        return vnodes;
    },
};
</script>

<style scoped>
    .sub-el-icon {
        color: currentColor;
        width: 1em;
        height: 1em;
    }
</style>