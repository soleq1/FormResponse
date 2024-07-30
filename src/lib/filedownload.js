
import { toPng } from 'html-to-image';

export const captureScreenShot = async (/** @type {any} */ screenshot) =>{
    if (screenshot){
        try{
            const dataUrl = await toPng(screenshot)
            const link = document.createElement("a");
            link.href = dataUrl
            link.download = 'form.png'
            link.click()

        }catch(error){
            console.log("Error Downloading",error)
        }
    }
  }
    