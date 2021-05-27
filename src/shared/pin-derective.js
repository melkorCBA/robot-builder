/* eslint-disable no-param-reassign */
// const setVisible = (element, binding) => {
//   const { visibility } = binding.value || {};
//   if (visibility === true) {
//     element.style.display = 'block';
//   }
//   if (visibility === false) {
//     element.style.display = 'none';
//     return;
//   }

//   if (visibility) {
//     element.style.display = 'block';
//   }

//   element.style.position = 'absolute';
//   element.style.bottom = '5px';
//   element.style.right = '5px';
// };

// export default {
//   bind: (element, binding) => setVisible(element, binding),
//   update: (element, binding) => setVisible(element, binding),

// };

export default function (element, binding) {
  const { visibility } = binding.value || {};
  if (visibility === true) {
    element.style.display = 'block';
  }
  if (visibility === false) {
    element.style.display = 'none';
    return;
  }

  if (visibility) {
    element.style.display = 'block';
  }

  element.style.position = 'absolute';
  element.style.bottom = '5px';
  element.style.right = '5px';
}
