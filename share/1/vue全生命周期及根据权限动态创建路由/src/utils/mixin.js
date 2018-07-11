export const mixin = {
    data(){
        return{
            data1:'data1'
        }
    },
    methods: {
        handler(){
            console.log('mixin')
        },
        handler2(){
            console.log('mixin222')
        },
    },
    created(){
        console.log('mixin created')
    }
} 