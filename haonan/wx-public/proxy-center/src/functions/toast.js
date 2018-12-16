import Vue from 'vue'
import Toast from 'src/components/Toast'

const ToastConstructor = Vue.extend(Toast)

export default (msg = '', duration = 2) => {
    const instance = new ToastConstructor({
        data: {
            msg,
            duration
        }
    })
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    instance.isShowToast = true

    return instance.vm
}
