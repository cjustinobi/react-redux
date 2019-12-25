import React from "react";
import AuthorForm from "./AuthorForm";
import { shallow } from "enzyme";

function renderAuthorForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<AuthorForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderAuthorForm();

  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add Author");
});

it('labels save buttons as "Save" when not saving', () => {
  const wrapper = renderAuthorForm();
  expect(wrapper.find("button").text()).toBe("Save");
});

it('labels save button as "Saving..." when saving', () => {
  const wrapper = renderAuthorForm({ saving: true });
  expect(wrapper.find("button").text()).toBe("Saving...");
});
