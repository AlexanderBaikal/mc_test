<template>
  <add-form
    :onSubmit="onAddText"
    :submitButtonText="'Apply'"
    :textLabel="'Enter text'"
  >
    <input className="add-form-input" type="text" v-model="textInput" />
  </add-form>
</template>
<script>
  import MyButton from "@/components/UI/MyButton";
  import AddForm from "@/components/UI/AddForm";
  import { addTextLabel } from "@/utils/layers";
  import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

  export default {
    name: "text-form",
    components: {
      MyButton,
      AddForm,
    },
    props: {
      addTextActive: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        textInput: "",
      };
    },
    computed: {
      ...mapState({
        map: (state) => state.map.map,
      }),
    },
    methods: {
      onAddText() {
        this.$emit("update:addTextActive", false);
        const layer = "points";
        addTextLabel(this.map, layer, this.textInput);
        this.textInput = "";
      },
    },
  };
</script>
<style>
  .add-form-input {
    width: 100%;
    box-sizing: border-box;
    margin: 10px 0;
  }
</style>
