import { shallowMount, mount, VueWrapper } from "@vue/test-utils";
import AddForm from "@/components/UI/AddForm.vue";

describe("text rendering", () => {
  let wrapper: VueWrapper;
  beforeAll(() => {
    wrapper = mount(AddForm, {
      props: {
        textLabel: "Add Form",
        onSubmit: () => {},
        submitButtonText: "Submit",
      },
    });
  });
  it("displays label text", () => {
    const label = wrapper.find(".add-text-label");
    expect(label.text()).toContain("Add Form");
  });
  it("displays button text", () => {
    const button = wrapper.find(".my-button");
    expect(button.text()).toContain("Submit");
  });
});
