import { shallowMount, mount, VueWrapper, DOMWrapper } from "@vue/test-utils";
import MyButton from "@/components/UI/MyButton.vue";

describe("text rendering", () => {
  let wrapper: VueWrapper;
  beforeAll(() => {
    wrapper = mount(MyButton, {
      props: {
        buttonId: "test",
      },
      slots: {
        default: "Press me",
      },
    });
  });

  it("displays proper button text", () => {
    expect(wrapper.text()).toContain("Press me");
  });
  it("not displays incorrect button text", () => {
    expect(wrapper.text()).not.toContain("Hello");
  });
});

describe("styles changing", () => {
  let wrapper: VueWrapper;
  let a: DOMWrapper<HTMLAnchorElement>;

  beforeAll(() => {
    wrapper = mount(MyButton, {
      props: {
        buttonId: "test",
        active: true,
      },
      slots: {
        default: "Press me",
      },
    });
    a = wrapper.find("a");
  });

  it("active className", () => {
    expect(a.element.className).toMatch(/active/i);
  });
});
