import "./infini-scroll.js";

export default {
  parameters: {
    layout: "centered",
  },
};

export const oneRow = () => `
  <style>
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
  <infini-scroll box-width="128" container-height="128">
    ${Array(20).fill('').map(box => `<div class="box"></div>`).reduce((acc, curr) => `${acc}${curr}`, '')}
  </infini-scroll>
`;

export const slow = () => `
  <style>
    #root {
      max-width: 400px;
      margin: 0 auto;
    }

    .wrapper { 
      display: block;
    }

    .box {
      width: 100px;
      height: 100px;
      margin: 14px;
      background-color: grey;
    }
  </style>
  <div class="wrapper">
  <blockquote>On Chrome you can specify scroll-amount to decimal points below 1 to make it smoother, not supported in Firefox</blockquote>
  <infini-scroll scroll-interval="50" box-width="128" container-height="128">
    ${Array(20).fill('').map(box => `<div class="box"></div>`).reduce((acc, curr) => `${acc}${curr}`, '')}
  </infini-scroll>
  </div>
`;

export const fast = () => `
  <style>
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
  <infini-scroll scroll-amount="3" box-width="128" container-height="128">
    ${Array(20).fill('').map(box => `<div class="box"></div>`).reduce((acc, curr) => `${acc}${curr}`, '')}
  </infini-scroll>
`;

export const slowDrag = () => `
  <style>
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
  <infini-scroll drag-speed=".25" box-width="128" container-height="128">
    ${Array(20).fill('').map(box => `<div class="box"></div>`).reduce((acc, curr) => `${acc}${curr}`, '')}
  </infini-scroll>
`;

export const quickResume = () => `
  <style>
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
  <infini-scroll box-width="128" resume-time="200">
    ${Array(20).fill('').map(box => `<div class="box"></div>`).reduce((acc, curr) => `${acc}${curr}`, '')}
  </infini-scroll>
`;

export const reverse = () => `
  <style>
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
  <infini-scroll reverse box-width="128" container-height="128">
    ${Array(20).fill('').map(box => `<div class="box"></div>`).reduce((acc, curr) => `${acc}${curr}`, '')}
  </infini-scroll>
`;

export const followUserDirection = () => `
  <style>
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
  <infini-scroll follow-user-direction box-width="128" container-height="128">
    ${Array(20).fill('').map(box => `<div class="box"></div>`).reduce((acc, curr) => `${acc}${curr}`, '')}
  </infini-scroll>
`;

export const wideBoxes = () => `
  <style>
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
  <infini-scroll box-width="228" container-height="128">
    ${Array(20).fill('').map(box => `<div class="box"></div>`).reduce((acc, curr) => `${acc}${curr}`, '')}
  </infini-scroll>
`;

export const twoRows = () => `
  <style>
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
  <infini-scroll box-width="128" container-height="256" row-amount="2">
    ${Array(20).fill('').map(box => `<div class="box"></div>`).reduce((acc, curr) => `${acc}${curr}`, '')}
  </infini-scroll>
`;

