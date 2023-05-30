<template>
    <div>
        This is house id
    </div>
</template>
<script>
export default {
    data(){
        return {
            houseId: this.$route.params.houseId,
        };
    },

    created(){
        console.log(this.houseId);
    },

    methods: {
        
    }
}
</script>