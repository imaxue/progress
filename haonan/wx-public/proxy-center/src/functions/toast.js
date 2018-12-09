import Vue from 'vue'
import Toast from 'src/components/Toast'

const ToastConstructor = Vue.extend(Toast)

export default (options) => {
    let _options = options
    if (typeof options === 'string') {
        _options = {
            msg: options
        }
    }

    const instance = new ToastConstructor({
        data: _options
    })
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    instance.isShowToast = true

    return instance.vm
}
