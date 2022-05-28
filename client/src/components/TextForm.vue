<template>
  <add-form
    :onSubmit="onAddText"
    :submitButtonText="'Apply'"
    :textLabel="'Enter text'"
  >
    <my-input v-model="textInput" />
  </add-form>
</template>
<script>
  import MyInput from "@/components/UI/MyInput";
  import MyButton from "@/components/UI/MyButton";
  import AddForm from "@/components/UI/AddForm";
  import { addTextLabel } from "@/utils/layers";
  import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

  export default {
    name: "text-form",
    components: {
      MyInput,
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
        this.$emit("update:addTextActive", !this.addTextActive);
        const layer = "points";
        addTextLabel(this.map, layer, this.textInput);
        this.textInput = "";
      },
    },
  };
</script>
<style></style>
