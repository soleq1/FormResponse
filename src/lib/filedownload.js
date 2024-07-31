import * as htmlToImage from 'html-to-image';

function injectStyles(element) {
  const style = document.createElement('style');
  style.textContent = `
    
    /* Additional styles to ensure consistency */
    input[type="radio"] {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      border: 1px solid currentColor;
      background-color: white;
      position: relative;
      display: inline-block;
      vertical-align: middle;
    }
    input[type="radio"]:checked::before {
      content: '';
      display: inline-block;
      width: 0.5em;
      height: 0.5em;
      border-radius: 50%;
      background-color: currentColor;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
      textarea:{
      resize:none;
      }
  `;
  element.appendChild(style);
}

export async function downloadImage(screenshot) {
  if (screenshot) {
    injectStyles(screenshot);
    try {
      const dataUrl = await htmlToImage.toPng(screenshot);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'form.png';
      link.click();
    } catch (error) {
      console.error('Oops, something went wrong!', error);
    }
  } else {
    console.error('Screenshot element is not defined.');
  }
}
