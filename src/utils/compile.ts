/* eslint-disable no-param-reassign */
import Block from './block';

export default function compile(tmpl: (ctx: any) => string, props: any): DocumentFragment {
  const fragment = document.createElement('template');
  const components: Record<string, Block> = {};

  Object.entries(props).forEach(([key, value]) => {
    if (value instanceof Block) {
      components[value.id] = value;
      props[key] = `<div id="id-${value.id}"></div>`;
    }
  });

  fragment.innerHTML = tmpl(props);

  Object.entries(components).forEach(([id, component]) => {
    const stub = fragment.content.querySelector(`#id-${id}`);
    stub?.replaceWith(component.getContent());
  });

  return fragment.content;
}
