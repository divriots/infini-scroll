import "../infini-scroll.js";

export default {
  parameters: {
    layout: "centered",
  },
};

export const oneRow = () => `
  <style>
    :root {
      --infini-scroll-container-height: 128px;
    }

    #root {
      max-width: 400px;
      margin: 0 auto;
    }

    .box {
      width: 100px;
      height: 100px;
      margin: 14px;
      background-color: grey;
    }
  </style>
  <infini-scroll scroll-gap="128">
    ${Array(20).fill('').map(box => `<div class="box"></div>`).reduce((acc, curr) => `${acc}${curr}`, '')}
  </infini-scroll>
`;

export const slow = () => `
  <style>
    :root {
      --infini-scroll-container-height: 128px;
    }

    #root {
      max-width: 400px;
      margin: 0 auto;
    }

    .box {
      width: 100px;
      height: 100px;
      margin: 14px;
      background-color: grey;
    }
  </style>
  <infini-scroll scroll-gap="128" scroll-speed="0.1">
    ${Array(20).fill('').map(box => `<div class="box"></div>`).reduce((acc, curr) => `${acc}${curr}`, '')}
  </infini-scroll>
`;

export const reverse = () => `
  <style>
    :root {
      --infini-scroll-container-height: 128px;
    }

    #root {
      max-width: 400px;
      margin: 0 auto;
    }

    .box {
      width: 100px;
      height: 100px;
      margin: 14px;
      background-color: grey;
    }
  </style>
  <infini-scroll scroll-gap="128" reverse>
    ${Array(20).fill('').map(box => `<div class="box"></div>`).reduce((acc, curr) => `${acc}${curr}`, '')}
  </infini-scroll>
`;

export const wideBoxes = () => `
  <style>
    :root {
      --infini-scroll-container-height: 128px;
    }

    #root {
      max-width: 400px;
      margin: 0 auto;
    }

    .box {
      width: 200px;
      height: 100px;
      margin: 14px;
      background-color: grey;
    }
  </style>
  <infini-scroll scroll-gap="228">
    ${Array(20).fill('').map(box => `<div class="box"></div>`).reduce((acc, curr) => `${acc}${curr}`, '')}
  </infini-scroll>
`;

export const twoRows = () => `
  <style>
    :root {
      --infini-scroll-container-height: 256px;
    }

    #root {
      max-width: 400px;
      margin: 0 auto;
    }

    .box {
      width: 100px;
      height: 100px;
      margin: 14px;
      background-color: grey;
    }
  </style>
  <infini-scroll scroll-gap="128">
    ${Array(20).fill('').map(box => `<div class="box"></div>`).reduce((acc, curr) => `${acc}${curr}`, '')}
  </infini-scroll>
`;

